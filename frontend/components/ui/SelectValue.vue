<template>
  <SelectValue :placeholder="placeholder" />
</template>

<script setup lang="ts">
import { SelectValue } from 'radix-vue'

interface Props {
  placeholder?: string
}

defineProps<Props>()
</script>
