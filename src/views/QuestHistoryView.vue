<template>
  <AppLayout>
    <template #header>
      <AppHeader title="퀘스트 히스토리" :showBack="true" backTo="/quest" />
    </template>

    <section class="section">
      <div class="month-controls">
        <label class="select-field">
          <span class="select-label">연도</span>
          <select v-model.number="currentYear" class="select">
            <option v-for="year in years" :key="year" :value="year">{{ year }}년</option>
          </select>
        </label>
        <label class="select-field">
          <span class="select-label">월</span>
          <select v-model.number="currentMonth" class="select">
            <option v-for="month in months" :key="month" :value="month - 1">
              {{ String(month).padStart(2, '0') }}월
            </option>
          </select>
        </label>
      </div>

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
            <span>{{ day.label }}</span>
            <span class="dots" v-if="day.events.length">
              <span
                v-for="event in day.events.slice(0, 2)"
                :key="event.id"
                class="dot"
                :class="event.status"
              ></span>
            </span>
          </button>
        </div>
      </div>
    </section>

    <section class="section">
      <h3 class="history-title">히스토리</h3>
      <div v-if="!selectedEvents.length" class="empty">선택한 날짜의 기록이 없습니다.</div>
      <ul v-else class="history-list">
        <li v-for="event in selectedEvents" :key="event.id" class="history-item">
          <span class="dot" :class="event.status"></span>
          <span class="history-text">
            {{ event.title }}<span v-if="event.status === 'deleted'"> (삭제됨)</span>
          </span>
        </li>
      </ul>
    </section>
  </AppLayout>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import AppLayout from '../layouts/AppLayout.vue';
import AppHeader from '../components/AppHeader.vue';
import { useQuestStore } from '../stores/questStore';

const questStore = useQuestStore();
const today = new Date();
const selectedDate = ref(today.toISOString().slice(0, 10));
const currentYear = ref(today.getFullYear());
const currentMonth = ref(today.getMonth());

const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

const years = computed(() => {
  const current = today.getFullYear();
  return Array.from({ length: 5 }, (_, index) => current - 2 + index);
});

const months = Array.from({ length: 12 }, (_, index) => index + 1);

type DayCell = {
  dateKey: string;
  label: number;
  inMonth: boolean;
  events: ReturnType<typeof getEvents>;
};

type HistoryEvent = {
  id: string;
  title: string;
  status: 'completed' | 'deleted';
};

const getEvents = (dateKey: string): HistoryEvent[] => {
  const history = questStore.completionByDate[dateKey];
  if (!history) {
    return [];
  }
  const completed = history.completed.map((title, index) => ({
    id: `completed-${dateKey}-${index}`,
    title,
    status: 'completed' as const,
  }));
  const deleted = history.deleted.map((title, index) => ({
    id: `deleted-${dateKey}-${index}`,
    title,
    status: 'deleted' as const,
  }));
  return [...completed, ...deleted];
};

const weeks = computed(() => {
  const year = currentYear.value;
  const month = currentMonth.value;
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const days: DayCell[] = [];

  const startOffset = firstDay.getDay();
  for (let i = startOffset; i > 0; i -= 1) {
    const date = new Date(year, month, 1 - i);
    const key = date.toISOString().slice(0, 10);
    days.push({
      dateKey: key,
      label: date.getDate(),
      inMonth: false,
      events: getEvents(key),
    });
  }

  for (let day = 1; day <= lastDay.getDate(); day += 1) {
    const date = new Date(year, month, day);
    const key = date.toISOString().slice(0, 10);
    days.push({
      dateKey: key,
      label: day,
      inMonth: true,
      events: getEvents(key),
    });
  }

  let extraDay = 1;
  while (days.length % 7 !== 0) {
    const date = new Date(year, month + 1, extraDay);
    const key = date.toISOString().slice(0, 10);
    days.push({
      dateKey: key,
      label: date.getDate(),
      inMonth: false,
      events: getEvents(key),
    });
    extraDay += 1;
  }

  const grouped: DayCell[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    grouped.push(days.slice(i, i + 7));
  }
  return grouped;
});

const selectedEvents = computed(() => getEvents(selectedDate.value));

const selectDate = (dateKey: string) => {
  selectedDate.value = dateKey;
};

watch([currentYear, currentMonth], () => {
  const date = new Date(currentYear.value, currentMonth.value, 1);
  selectedDate.value = date.toISOString().slice(0, 10);
});
</script>

<style scoped>
.month-controls {
  display: flex;
  align-items: flex-end;
  gap: 12px;
}

.select-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
}

.select-label {
  font-size: 12px;
  color: var(--muted);
}

.select {
  border: 1px solid var(--border);
  background: var(--surface);
  border-radius: 10px;
  padding: 8px 10px;
  font-size: 13px;
  color: var(--text);
}

.calendar {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 12px;
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
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: center;
}

.day.inactive {
  opacity: 0.4;
}

.day.selected {
  border-color: var(--text);
  background: var(--surface-muted);
}

.dots {
  display: flex;
  gap: 4px;
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--text);
}

.dot.deleted {
  background: var(--danger);
}

.history-title {
  margin: 0;
  font-size: 15px;
}

.history-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.history-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid var(--border);
  background: var(--surface);
}

.history-text {
  flex: 1;
}

.empty {
  border: 1px dashed var(--border);
  border-radius: 12px;
  padding: 12px;
  color: var(--muted);
}
</style>
