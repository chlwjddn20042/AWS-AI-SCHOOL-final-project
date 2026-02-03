<template>
  <AppLayout title="퀘스트 히스토리" :showTabs="true">
    <BaseCard>
      <h3>{{ monthLabel }}</h3>
      <table class="calendar">
        <thead>
          <tr>
            <th v-for="day in weekDays" :key="day">{{ day }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(week, index) in calendar" :key="index">
            <td
              v-for="date in week"
              :key="date.key"
              :class="{ empty: !date.day, active: date.key === selectedKey }"
              @click="selectDate(date.key)"
            >
              {{ date.day }}
            </td>
          </tr>
        </tbody>
      </table>
    </BaseCard>

    <section class="section">
      <h3>완료한 퀘스트</h3>
      <ListItem v-for="item in selectedTasks" :key="item">
        {{ item }}
      </ListItem>
      <p v-if="selectedTasks.length === 0" class="muted">기록 없음</p>
    </section>
  </AppLayout>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import AppLayout from '../layouts/AppLayout.vue';
import BaseCard from '../components/BaseCard.vue';
import ListItem from '../components/ListItem.vue';
import { useQuestStore } from '../stores/questStore';

const questStore = useQuestStore();

const today = new Date();
const selectedKey = ref(today.toISOString().slice(0, 10));

const monthLabel = computed(() => `${today.getFullYear()}년 ${today.getMonth() + 1}월`);

const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

const calendar = computed(() => {
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const weeks: { key: string; day: number | null }[][] = [];
  let currentWeek: { key: string; day: number | null }[] = [];

  for (let i = 0; i < firstDay.getDay(); i += 1) {
    currentWeek.push({ key: `empty-${i}`, day: null });
  }

  for (let day = 1; day <= lastDay.getDate(); day += 1) {
    const date = new Date(today.getFullYear(), today.getMonth(), day);
    const key = date.toISOString().slice(0, 10);
    currentWeek.push({ key, day });
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }

  if (currentWeek.length) {
    while (currentWeek.length < 7) {
      currentWeek.push({ key: `empty-${currentWeek.length}`, day: null });
    }
    weeks.push(currentWeek);
  }

  return weeks;
});

const selectDate = (key: string) => {
  if (key.startsWith('empty')) {
    return;
  }
  selectedKey.value = key;
};

const selectedTasks = computed(() => questStore.completionByDate[selectedKey.value] ?? []);
</script>

<style scoped>
.calendar {
  width: 100%;
  border-collapse: collapse;
  text-align: center;
  font-size: 12px;
}

.calendar th,
.calendar td {
  border: 1px solid var(--line);
  padding: 6px;
}

.calendar td {
  cursor: pointer;
}

.calendar td.empty {
  background: rgba(255, 255, 255, 0.6);
  cursor: default;
}

.calendar td.active {
  background: var(--accent);
  color: #fff;
}
</style>
