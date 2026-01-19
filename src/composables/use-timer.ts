import { ref, computed, onUnmounted } from 'vue'

export function useTimer(initialTime: number = 90) {
  const timeRemaining = ref(initialTime)
  const maxTime = ref(initialTime)
  const isRunning = ref(false)
  const isPaused = ref(false)

  let intervalId: number | null = null

  const formattedTime = computed(() => {
    const mins = Math.floor(timeRemaining.value / 60)
    const secs = timeRemaining.value % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  })

  function start(time?: number) {
    if (time !== undefined) {
      timeRemaining.value = time
      maxTime.value = time
    }
    isRunning.value = true
    isPaused.value = false

    intervalId = window.setInterval(() => {
      if (timeRemaining.value > 0) {
        timeRemaining.value--
      } else {
        stop()
      }
    }, 1000)
  }

  function stop() {
    isRunning.value = false
    if (intervalId) {
      clearInterval(intervalId)
      intervalId = null
    }
  }

  function pause() {
    isPaused.value = true
    if (intervalId) {
      clearInterval(intervalId)
      intervalId = null
    }
  }

  function resume() {
    if (isPaused.value && timeRemaining.value > 0) {
      isPaused.value = false
      intervalId = window.setInterval(() => {
        if (timeRemaining.value > 0) {
          timeRemaining.value--
        } else {
          stop()
        }
      }, 1000)
    }
  }

  function addTime(seconds: number) {
    timeRemaining.value = Math.min(timeRemaining.value + seconds, maxTime.value)
  }

  function reset(time: number = initialTime) {
    stop()
    timeRemaining.value = time
    isPaused.value = false
  }

  onUnmounted(() => {
    if (intervalId) {
      clearInterval(intervalId)
    }
  })

  return {
    timeRemaining,
    formattedTime,
    isRunning,
    isPaused,
    start,
    stop,
    pause,
    resume,
    addTime,
    reset
  }
}
