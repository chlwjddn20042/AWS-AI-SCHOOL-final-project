<template>
  <AppLayout contentWidth="narrow">
    <template #header>
      <AppHeader title="퀘스트 히스토리" :showBack="true" />
    </template>

    <section class="section">
      <div class="month-controls">
        <button class="nav-button" type="button" @click="prevMonth">이전</button>
        <div class="month-label">{{ monthLabel }}</div>
        <button class="nav-button" type="button" @click="nextMonth">다음</button>
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
          <span class="history-text">{{ event.title }}</span>
          <span v-if="event.status === 'deleted'" class="deleted">삭제됨</span>
        </li>
      </ul>
    </section>
  </AppLayout>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import AppLayout from '../layouts/AppLayout.vue';
import AppHeader from '../components/AppHeader.vue';
import { useQuestStore } from '../stores/questStore';

const questStore = useQuestStore();
const today = new Date();
const selectedDate = ref(today.toISOString().slice(0, 10));
const currentYear = ref(today.getFullYear());
const currentMonth = ref(today.getMonth());

const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

const monthLabel = computed(
  () => `${currentYear.value}년 ${String(currentMonth.value + 1).padStart(2, '0')}월`,
);

type DayCell = {
  dateKey: string;
  label: number;
  inMonth: boolean;
  events: ReturnType<typeof getEvents>;
};

const getEvents = (dateKey: string) => questStore.eventsByDate[dateKey] || [];

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

const selectedEvents = computed(() => questStore.eventsByDate[selectedDate.value] || []);

const selectDate = (dateKey: string) => {
  selectedDate.value = dateKey;
};

const prevMonth = () => {
  if (currentMonth.value === 0) {
    currentYear.value -= 1;
    currentMonth.value = 11;
  } else {
    currentMonth.value -= 1;
  }
};

const nextMonth = () => {
  if (currentMonth.value === 11) {
    currentYear.value += 1;
    currentMonth.value = 0;
  } else {
    currentMonth.value += 1;
  }
};
</script>

<style scoped>
.month-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.month-label {
  font-weight: 600;
  font-size: 16px;
}

.nav-button {
  border: 1px solid var(--border);
  background: var(--surface);
  border-radius: 8px;
  padding: 6px 10px;
  font-size: 12px;
  color: var(--muted);
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

.deleted {
  color: var(--danger);
  font-size: 12px;
}

.empty {
  border: 1px dashed var(--border);
  border-radius: 12px;
  padding: 12px;
  color: var(--muted);
}
</style>
