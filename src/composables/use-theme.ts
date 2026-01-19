import { ref, watch, onMounted, onUnmounted } from 'vue'

type Theme = 'dark' | 'light' | 'system'

/**
 * Theme management composable with system preference detection
 */
export function useTheme() {
  const theme = ref<Theme>('system')
  const isDark = ref(false)
  let mediaQuery: MediaQueryList | null = null

  function applyTheme() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const shouldBeDark = theme.value === 'dark' || (theme.value === 'system' && prefersDark)

    isDark.value = shouldBeDark
    document.documentElement.classList.toggle('dark', shouldBeDark)
  }

  function setTheme(newTheme: Theme) {
    theme.value = newTheme
    applyTheme()
  }

  onMounted(() => {
    mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', applyTheme)
    applyTheme()
  })

  onUnmounted(() => {
    if (mediaQuery) {
      mediaQuery.removeEventListener('change', applyTheme)
    }
  })

  watch(theme, applyTheme)

  return { theme, isDark, setTheme }
}
