<template>
  <div class="page start">
    <div class="section">
      <h1 class="logo">Mindful Pocket</h1>
      <p class="muted">오늘의 마음 루틴</p>
    </div>
    <div class="section">
      <RouterLink to="/login" class="link">
        <PrimaryButton>로그인</PrimaryButton>
      </RouterLink>
      <RouterLink to="/signup" class="link">
        <PrimaryButton>회원가입</PrimaryButton>
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import PrimaryButton from '../components/PrimaryButton.vue';
</script>

<style scoped>
.start {
  justify-content: center;
  text-align: center;
}

.logo {
  margin: 0 0 8px;
  font-size: 24px;
}

.link {
  text-decoration: none;
}
</style>
