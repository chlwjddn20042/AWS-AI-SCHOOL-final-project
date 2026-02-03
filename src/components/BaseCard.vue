<template>
  <div class="card">
    <slot />
  </div>
</template>

<style scoped>
.card {
  background: var(--beige);
  border: 1px solid var(--line);
  border-radius: 16px;
  padding: 16px;
}
</style>
