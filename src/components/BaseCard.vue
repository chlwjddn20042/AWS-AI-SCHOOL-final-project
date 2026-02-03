<template>
  <div class="card">
    <slot />
  </div>
</template>

<style scoped>
.card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 2px 10px rgba(15, 23, 42, 0.04);
}
</style>
