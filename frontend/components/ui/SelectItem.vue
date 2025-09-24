<template>
  <SelectItem
    :class="cn(
      'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      $attrs.class
    )"
    v-bind="$attrs"
  >
    <slot />
  </SelectItem>
</template>

<script setup lang="ts">
import { SelectItem } from 'radix-vue'
import { cn } from '~/lib/utils'
</script>
