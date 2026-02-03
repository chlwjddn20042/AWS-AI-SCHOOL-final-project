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
  background: var(--surface-muted);
  padding: 4px;
  border-radius: 12px;
}

.segment {
  flex: 1;
  padding: 8px 10px;
  border-radius: 10px;
  border: 1px solid transparent;
  background: transparent;
  color: var(--muted);
}

.segment.active {
  background: var(--surface);
  color: var(--text);
  border-color: var(--border);
  box-shadow: 0 1px 4px rgba(15, 23, 42, 0.08);
}
</style>
