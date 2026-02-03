<template>
  <label class="field">
    <span class="label">{{ label }}</span>
    <input
      v-if="type !== 'textarea'"
      class="input"
      :type="type"
      :value="modelValue"
      :disabled="disabled"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <textarea
      v-else
      class="input textarea"
      :value="modelValue"
      rows="3"
      :disabled="disabled"
      @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
    ></textarea>
  </label>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{ label: string; modelValue: string; type?: string; disabled?: boolean }>(),
  { type: 'text', disabled: false },
);

defineEmits<{ 'update:modelValue': [value: string] }>();
</script>

<style scoped>
.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 14px;
}

.label {
  color: var(--line);
}

.input {
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid var(--line);
  background: #fff;
}

.textarea {
  resize: vertical;
}
</style>
