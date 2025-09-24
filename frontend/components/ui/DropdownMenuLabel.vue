<template>
  <DropdownMenuLabel
    :class="cn('px-2 py-1.5 text-sm font-semibold', $attrs.class)"
    v-bind="$attrs"
  >
    <slot />
  </DropdownMenuLabel>
</template>

<script setup lang="ts">
import { DropdownMenuLabel } from 'radix-vue'
import { cn } from '~/lib/utils'
</script>
