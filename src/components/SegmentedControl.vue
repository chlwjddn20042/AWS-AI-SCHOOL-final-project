<template>
  <div class="segmented">
    <button
      v-for="option in options"
      :key="option"
      class="segment"
      :class="{ active: option === modelValue }"
      type="button"
      @click="$emit('update:modelValue', option)"
    >
      {{ option }}
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{ options: string[]; modelValue: string }>();

defineEmits<{ 'update:modelValue': [value: string] }>();
</script>

<style scoped>
.segmented {
  display: flex;
  gap: 8px;
}

.segment {
  flex: 1;
  padding: 10px;
  border-radius: 999px;
  border: 1px solid var(--line);
  background: #fff;
  color: var(--line);
}

.segment.active {
  background: var(--accent);
  color: #fff;
  border-color: var(--accent);
}
</style>
