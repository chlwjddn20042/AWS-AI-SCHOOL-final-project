<template>
  <button class="button" :type="type" :disabled="disabled">
    <slot />
  </button>
</template>

<script setup lang="ts">
defineProps<{ type?: 'button' | 'submit'; disabled?: boolean }>();
</script>

<style scoped>
.button {
  width: 100%;
  padding: 12px 16px;
  border-radius: 12px;
  border: none;
  background: var(--primary);
  color: #fff;
  font-weight: 600;
}

.button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
