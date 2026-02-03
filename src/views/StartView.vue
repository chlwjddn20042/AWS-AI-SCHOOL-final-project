<template>
  <div class="page start">
    <div class="section">
      <h1 class="logo">다마코치</h1>
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
  font-size: 26px;
}

.link {
  text-decoration: none;
}
</style>
