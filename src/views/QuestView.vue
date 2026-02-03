<template>
  <AppLayout title="퀘스트" :showTabs="true">
    <SegmentedControl v-model="activeTab" :options="['일일', '주간']" />
    <div class="section">
      <label v-for="task in visibleTasks" :key="task.id" class="task">
        <input type="checkbox" :checked="task.checked" @change="toggle(task.id)" />
        <span>{{ task.title }}</span>
      </label>
    </div>
    <PrimaryButton @click="goHistory">히스토리(캘린더)</PrimaryButton>
  </AppLayout>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import AppLayout from '../layouts/AppLayout.vue';
import SegmentedControl from '../components/SegmentedControl.vue';
import PrimaryButton from '../components/PrimaryButton.vue';
import { useQuestStore } from '../stores/questStore';

const router = useRouter();
const questStore = useQuestStore();

const activeTab = ref('일일');

const visibleTasks = computed(() =>
  activeTab.value === '일일' ? questStore.dailyTasks : questStore.weeklyTasks,
);

const toggle = (id: string) => {
  questStore.toggleTask(activeTab.value === '일일' ? 'daily' : 'weekly', id);
};

const goHistory = () => {
  router.push('/quest/history');
};
</script>

<style scoped>
.task {
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid var(--line);
  background: #fff;
}
</style>
