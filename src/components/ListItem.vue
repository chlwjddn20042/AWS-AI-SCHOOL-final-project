<template>
  <div class="item">
    <div class="content">
      <slot />
    </div>
    <div class="meta">
      <slot name="meta" />
    </div>
  </div>
</template>

<style scoped>
.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px solid var(--border);
  background: var(--surface);
}

.content {
  color: var(--text);
}

.meta {
  font-size: 12px;
  color: var(--muted);
}
</style>
