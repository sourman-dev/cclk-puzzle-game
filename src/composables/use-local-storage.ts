import { ref, watch, type Ref } from 'vue'

/**
 * Reactive LocalStorage wrapper with auto-sync
 */
export function useLocalStorage<T>(key: string, defaultValue: T): {
  data: Ref<T>
  reset: () => void
} {
  let initialValue = defaultValue
  try {
    const stored = localStorage.getItem(key)
    if (stored) {
      initialValue = JSON.parse(stored)
    }
  } catch {
    // Corrupted data - use default
    console.warn(`Failed to parse localStorage key "${key}", using default`)
  }

  const data = ref<T>(initialValue) as Ref<T>

  watch(data, (newValue) => {
    localStorage.setItem(key, JSON.stringify(newValue))
  }, { deep: true })

  function reset() {
    data.value = defaultValue
    localStorage.removeItem(key)
  }

  return { data, reset }
}
