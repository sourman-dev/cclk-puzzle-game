<script setup lang="ts">
import type { RuleType } from '@/types'
import { RULE_LABELS } from '@/data/knowledge/sequences'

interface Props {
  rule: RuleType
}

defineProps<Props>()

const ruleColors: Record<RuleType, string> = {
  tuong_sinh: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  phan_sinh: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  tuong_khac: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
}
</script>

<template>
  <div
    :class="[
      'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
      ruleColors[rule]
    ]"
  >
    {{ RULE_LABELS[rule] }}
  </div>
</template>
