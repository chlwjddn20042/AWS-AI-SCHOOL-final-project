<template>
  <AppLayout title="성향 분석" :showTabs="true">
    <BaseCard>
      <p>간단 입력으로 성향을 확인해요.</p>
    </BaseCard>
    <PrimaryButton @click="start">성향 분석 시작하기</PrimaryButton>
  </AppLayout>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import AppLayout from '../layouts/AppLayout.vue';
import BaseCard from '../components/BaseCard.vue';
import PrimaryButton from '../components/PrimaryButton.vue';

const router = useRouter();

const start = () => {
  router.push('/analysis/input');
};
</script>
