<template>
  <AppLayout title="홈" :showTabs="true">
    <BaseCard>
      <div class="character">
        <div class="avatar">☺</div>
        <div>
          <p class="name">오늘도 함께</p>
          <span class="pill">마음 루틴</span>
        </div>
      </div>
    </BaseCard>

    <section class="section">
      <h3>오늘 퀘스트</h3>
      <ListItem v-for="quest in quests" :key="quest">
        {{ quest }}
      </ListItem>
    </section>

    <PrimaryButton @click="goAnalysis">성향 분석</PrimaryButton>
  </AppLayout>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import AppLayout from '../layouts/AppLayout.vue';
import BaseCard from '../components/BaseCard.vue';
import ListItem from '../components/ListItem.vue';
import PrimaryButton from '../components/PrimaryButton.vue';

const router = useRouter();
const quests = ['심호흡 3번', '햇볕 5분', '물 1잔'];

const goAnalysis = () => {
  router.push('/analysis');
};
</script>

<style scoped>
.character {
  display: flex;
  gap: 12px;
  align-items: center;
}

.avatar {
  width: 56px;
  height: 56px;
  border-radius: 16px;
  background: #fff;
  border: 1px solid var(--line);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

.name {
  margin: 0 0 6px;
}
</style>
