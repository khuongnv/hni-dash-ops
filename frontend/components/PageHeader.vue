<template>
  <div class="mb-4">
    <!-- Title and Description -->
    <div class="flex items-center justify-between mb-2">
      <div class="flex-1">
        <h1 class="text-2xl font-bold text-foreground">{{ title }}</h1>
      </div>
      <Breadcrumb />
    </div>
    
    <!-- Action Buttons -->
    <div v-if="$slots.actions" class="flex items-center gap-2">
      <slot name="actions" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  description?: string
}

defineProps<Props>()
</script>
