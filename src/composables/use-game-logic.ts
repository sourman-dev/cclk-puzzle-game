import { ref } from 'vue'
import type { Question, Card, RuleType, TopicType, Level, GameSettings } from '@/types'
import { getSequenceForTopic, calculateAnswer } from '@/data/rules'
import { RULE_LABELS } from '@/data/knowledge/sequences'
import { LEVELS } from '@/data/levels'

function shuffle<T>(array: T[]): T[] {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = arr[i]
    arr[i] = arr[j] as T
    arr[j] = temp as T
  }
  return arr
}

function pickRandom<T>(array: T[], count: number): T[] {
  return shuffle(array).slice(0, count)
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function useGameLogic() {
  const currentQuestion = ref<Question | null>(null)
  const selectedAnswer = ref<string | null>(null)
  const isCorrect = ref<boolean | null>(null)
  const roundStartTime = ref<number>(0)

  /**
   * Reset round timer - call when displaying a new question
   */
  function resetRoundTimer() {
    roundStartTime.value = Date.now()
  }

  /**
   * Generate a question for the given level and settings
   * NOTE: Does NOT set roundStartTime - call resetRoundTimer() when displaying
   */
  function generateQuestion(level: Level, settings: GameSettings): Question {
    // Pick random topic from level's topics
    const topic = pickRandom(level.topics, 1)[0] as TopicType

    // Pick random rule from intersection of level rules and enabled rules
    const availableRules = level.rules.filter(r => settings.enabledRules.includes(r))
    const rule = pickRandom(availableRules.length > 0 ? availableRules : level.rules, 1)[0] as RuleType

    // Get sequence for topic
    const sequence = getSequenceForTopic(topic)

    // Pick target position (1-6)
    const targetPosition = randomInt(1, 6)

    // Pick revealed positions (excluding target)
    const otherPositions = [1, 2, 3, 4, 5, 6].filter(p => p !== targetPosition)
    const revealedPositions = pickRandom(otherPositions, settings.revealedCards)

    // Pick one revealed position to use as reference for answer calculation
    const referencePosition = revealedPositions[0] as number
    const referenceIndex = referencePosition - 1
    const referenceValue = sequence[referenceIndex] as string

    // Calculate correct answer
    const correctAnswer = calculateAnswer(
      sequence,
      referencePosition,
      referenceValue,
      targetPosition,
      rule
    )

    // Create cards array with rotated sequence
    // Rotate the sequence to start from a random position (but keep order)
    const rotateOffset = randomInt(0, 5)
    const rotatedSequence: string[] = []
    for (let i = 0; i < 6; i++) {
      rotatedSequence.push(sequence[(i + rotateOffset) % 6] as string)
    }

    // Find where the target value ends up after rotation
    const targetValue = sequence[targetPosition - 1] as string
    const rotatedTargetPosition = rotatedSequence.indexOf(targetValue) + 1

    // Find revealed values and their new positions
    const rotatedRevealedPositions = revealedPositions.map(pos => {
      const value = sequence[pos - 1] as string
      return rotatedSequence.indexOf(value) + 1
    })

    const cards: Card[] = []
    for (let i = 1; i <= 6; i++) {
      cards.push({
        position: i,
        value: rotatedSequence[i - 1] as string,
        isRevealed: rotatedRevealedPositions.includes(i),
        isTarget: i === rotatedTargetPosition
      })
    }

    // Shuffle answers
    const answers = shuffle([...sequence])

    const question: Question = {
      cards,
      targetPosition,
      correctAnswer,
      rule,
      ruleLabel: RULE_LABELS[rule],
      answers,
      topic
    }

    // Don't set currentQuestion here - let caller do it
    // This allows pre-generation without affecting state

    return question
  }

  /**
   * Submit answer and check if correct
   */
  function submitAnswer(answer: string): boolean {
    if (!currentQuestion.value) return false

    selectedAnswer.value = answer
    isCorrect.value = answer === currentQuestion.value.correctAnswer

    // Reveal target card
    const targetCard = currentQuestion.value.cards.find(c => c.isTarget)
    if (targetCard) {
      targetCard.isRevealed = true
    }

    return isCorrect.value
  }

  /**
   * Use hint - reveal a random hidden card
   */
  function useHint(): Card | null {
    if (!currentQuestion.value) return null

    // Find hidden cards (not revealed, not target)
    const hiddenCards = currentQuestion.value.cards.filter(
      c => !c.isRevealed && !c.isTarget
    )

    if (hiddenCards.length === 0) return null

    // Pick one randomly and reveal it
    const cardToReveal = pickRandom(hiddenCards, 1)[0]
    if (!cardToReveal) return null
    cardToReveal.isRevealed = true

    return cardToReveal
  }

  /**
   * Calculate points based on elapsed time
   * 0-30s = 1.0, 30-60s = 0.5, 60s+ = 0
   * Hint penalty: -0.25 per hint
   */
  function calculatePoints(elapsedSeconds: number, hintsUsed: number): number {
    let points = 0

    if (elapsedSeconds <= 30) {
      points = 1.0
    } else if (elapsedSeconds <= 60) {
      points = 0.5
    } else {
      points = 0
    }

    // Hint penalty
    points = Math.max(0, points - hintsUsed * 0.25)

    return points
  }

  /**
   * Calculate stars from total points
   * 80%+ = 3★, 50-79% = 2★, 20-49% = 1★
   */
  function calculateStarsFromPoints(totalPoints: number, maxPoints: number): number {
    const percentage = (totalPoints / maxPoints) * 100
    if (percentage >= 80) return 3
    if (percentage >= 50) return 2
    if (percentage >= 20) return 1
    return 0
  }

  /**
   * Get elapsed time since round started
   */
  function getElapsedTime(): number {
    return Math.floor((Date.now() - roundStartTime.value) / 1000)
  }

  /**
   * Generate questions with spaced repetition
   * Mix questions from previous levels if configured
   */
  function generateMixedQuestions(
    level: Level,
    settings: GameSettings,
    count: number
  ): Question[] {
    const questions: Question[] = []

    // Calculate how many questions from previous levels
    const reviewCount = level.reviewFromLevels
      ? Math.floor(count * 0.25) // 25% from previous levels
      : 0
    const currentCount = count - reviewCount

    // Generate current level questions
    for (let i = 0; i < currentCount; i++) {
      questions.push(generateQuestion(level, settings))
    }

    // Generate review questions from previous levels
    if (level.reviewFromLevels) {
      for (let i = 0; i < reviewCount; i++) {
        const reviewLevelId = pickRandom(level.reviewFromLevels, 1)[0]
        const reviewLevel = LEVELS.find(l => l.id === reviewLevelId)
        if (reviewLevel) {
          questions.push(generateQuestion(reviewLevel, settings))
        }
      }
    }

    // Shuffle all questions
    return shuffle(questions)
  }

  /**
   * Generate questions from multiple levels with proportional distribution
   */
  function generateComprehensiveQuestions(
    levelIds: string[],
    settings: GameSettings,
    totalCount: number
  ): Question[] {
    const questions: Question[] = []
    const levels = levelIds.map(id => LEVELS.find(l => l.id === id)).filter(Boolean) as Level[]

    if (levels.length === 0) return questions

    // Calculate questions per level (proportional distribution)
    const questionsPerLevel = Math.floor(totalCount / levels.length)
    const remainder = totalCount % levels.length

    for (let i = 0; i < levels.length; i++) {
      const level = levels[i] as Level
      const count = questionsPerLevel + (i < remainder ? 1 : 0)

      for (let j = 0; j < count; j++) {
        questions.push(generateQuestion(level, settings))
      }
    }

    // Shuffle all questions
    return shuffle(questions)
  }

  return {
    currentQuestion,
    selectedAnswer,
    isCorrect,
    generateQuestion,
    generateMixedQuestions,
    generateComprehensiveQuestions,
    submitAnswer,
    useHint,
    calculatePoints,
    calculateStarsFromPoints,
    getElapsedTime,
    resetRoundTimer
  }
}
