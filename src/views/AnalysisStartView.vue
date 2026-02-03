<template>
  <AppLayout title="성향 분석" :showTabs="false" contentWidth="narrow">
    <div class="section">
      <p class="muted">간단한 입력으로 성향 분석을 시작합니다.</p>
      <PrimaryButton type="button" @click="goInput">시작하기</PrimaryButton>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import AppLayout from '../layouts/AppLayout.vue';
import PrimaryButton from '../components/PrimaryButton.vue';

const router = useRouter();

const goInput = () => {
  router.push('/analysis/input');
};
</script>
