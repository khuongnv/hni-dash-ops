<template>
  <span v-html="highlightedText"></span>
</template>

<script setup lang="ts">
interface Props {
  text: string
  query: string
}

const props = defineProps<Props>()

// Function to remove Vietnamese diacritics
const removeDiacritics = (str: string) => {
  // First normalize and remove combining diacritical marks
  let result = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  
  // Handle special Vietnamese characters
  result = result
    .replace(/[đĐ]/g, 'd')  // đ/Đ → d
    .replace(/[ăĂ]/g, 'a')  // ă/Ă → a  
    .replace(/[âÂ]/g, 'a')  // â/Â → a
    .replace(/[êÊ]/g, 'e')  // ê/Ê → e
    .replace(/[ôÔ]/g, 'o')  // ô/Ô → o
    .replace(/[ơƠ]/g, 'o')  // ơ/Ơ → o
    .replace(/[ưƯ]/g, 'u')  // ư/Ư → u
  
  return result
}

const highlightedText = computed(() => {
  if (!props.query.trim()) {
    return props.text
  }
  
  // Remove diacritics for comparison
  const normalizedQuery = removeDiacritics(props.query)
  const normalizedText = removeDiacritics(props.text)
  
  // Check if text contains query (case-insensitive, no diacritics)
  if (!normalizedText.toLowerCase().includes(normalizedQuery.toLowerCase())) {
    return props.text
  }
  
  // Create a more flexible regex that handles both with and without diacritics
  const escapedQuery = props.query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  
  // Create regex that matches both original query and its diacritics version
  const diacriticsMap: { [key: string]: string } = {
    'a': '[aàáạảãâầấậẩẫăằắặẳẵ]',
    'e': '[eèéẹẻẽêềếệểễ]',
    'i': '[iìíịỉĩ]',
    'o': '[oòóọỏõôồốộổỗơờớợởỡ]',
    'u': '[uùúụủũưừứựửữ]',
    'y': '[yỳýỵỷỹ]',
    'd': '[dđ]'
  }
  
  let flexibleRegex = escapedQuery
  for (const [base, pattern] of Object.entries(diacriticsMap)) {
    flexibleRegex = flexibleRegex.replace(new RegExp(base, 'gi'), pattern)
  }
  
  const regex = new RegExp(`(${flexibleRegex})`, 'gi')
  return props.text.replace(regex, '<mark class="bg-yellow-200 text-yellow-900 px-1 rounded">$1</mark>')
})
</script>
