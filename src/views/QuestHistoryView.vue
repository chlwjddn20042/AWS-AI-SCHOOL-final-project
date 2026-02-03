<template>
  <AppLayout title="퀘스트 히스토리" :showTabs="false" contentWidth="narrow">
    <div class="section">
      <div class="month">{{ monthLabel }}</div>
      <div class="calendar">
        <div class="week header">
          <span v-for="day in weekDays" :key="day">{{ day }}</span>
        </div>
        <div v-for="(week, index) in weeks" :key="index" class="week">
          <button
            v-for="day in week"
            :key="day.dateKey"
            class="day"
            :class="{ inactive: !day.inMonth, selected: day.dateKey === selectedDate }"
            type="button"
            @click="selectDate(day.dateKey)"
          >
            {{ day.label }}
          </button>
        </div>
      </div>

      <div class="section">
        <h3>완료 목록</h3>
        <div v-if="!completedTasks.length" class="empty">선택한 날짜의 완료 항목이 없습니다.</div>
        <ul v-else class="list">
          <li v-for="task in completedTasks" :key="task">{{ task }}</li>
        </ul>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import AppLayout from '../layouts/AppLayout.vue';
import { useQuestStore } from '../stores/questStore';

const questStore = useQuestStore();
const today = new Date();
const selectedDate = ref(today.toISOString().slice(0, 10));

const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

const monthLabel = computed(() => `${today.getFullYear()}년 ${today.getMonth() + 1}월`);

type DayCell = { dateKey: string; label: number; inMonth: boolean };

const weeks = computed(() => {
  const year = today.getFullYear();
  const month = today.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const days: DayCell[] = [];

  const startOffset = firstDay.getDay();
  for (let i = startOffset; i > 0; i -= 1) {
    const date = new Date(year, month, 1 - i);
    days.push({
      dateKey: date.toISOString().slice(0, 10),
      label: date.getDate(),
      inMonth: false,
    });
  }

  for (let day = 1; day <= lastDay.getDate(); day += 1) {
    const date = new Date(year, month, day);
    days.push({
      dateKey: date.toISOString().slice(0, 10),
      label: day,
      inMonth: true,
    });
  }

  let extraDay = 1;
  while (days.length % 7 !== 0) {
    const date = new Date(year, month + 1, extraDay);
    days.push({
      dateKey: date.toISOString().slice(0, 10),
      label: date.getDate(),
      inMonth: false,
    });
    extraDay += 1;
  }

  const grouped: DayCell[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    grouped.push(days.slice(i, i + 7));
  }
  return grouped;
});

const completedTasks = computed(() => questStore.completionByDate[selectedDate.value] || []);

const selectDate = (dateKey: string) => {
  selectedDate.value = dateKey;
};
</script>

<style scoped>
.month {
  font-weight: 600;
  font-size: 16px;
}

.calendar {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.week {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
}

.week.header {
  color: var(--muted);
  font-size: 12px;
}

.day {
  border: 1px solid var(--border);
  background: var(--surface);
  border-radius: 8px;
  padding: 6px 0;
  font-size: 12px;
}

.day.inactive {
  opacity: 0.4;
}

.day.selected {
  border-color: var(--primary);
  background: var(--primary-soft);
}

.list {
  margin: 0;
  padding-left: 18px;
}

.empty {
  border: 1px dashed var(--border);
  border-radius: 12px;
  padding: 12px;
  color: var(--muted);
}
</style>
