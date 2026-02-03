<template>
  <AppLayout contentWidth="narrow">
    <template #header>
      <AppHeader title="시작" :showBack="true" />
    </template>

    <section class="stack">
      <h2 class="logo">다마코치</h2>
      <p class="muted">로그인 또는 회원가입으로 시작합니다.</p>
    </section>

    <section class="stack">
      <RouterLink to="/login" class="link">
        <PrimaryButton>로그인</PrimaryButton>
      </RouterLink>
      <RouterLink to="/signup" class="link">
        <PrimaryButton>회원가입</PrimaryButton>
      </RouterLink>
    </section>
  </AppLayout>
</template>

<script setup lang="ts">
import AppLayout from '../layouts/AppLayout.vue';
import AppHeader from '../components/AppHeader.vue';
import PrimaryButton from '../components/PrimaryButton.vue';
</script>

<style scoped>
.logo {
  margin: 0;
  font-size: 24px;
  font-weight: 600;
}

.stack {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.link {
  text-decoration: none;
}
</style>
