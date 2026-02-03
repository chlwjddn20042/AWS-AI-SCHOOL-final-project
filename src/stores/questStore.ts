import { defineStore } from 'pinia';
import { loadFromStorage, saveToStorage } from '../utils/storage';
import { questService } from '../services/questService';

export type QuestType = 'daily' | 'weekly';

export type QuestItem = {
  id: string;
  title: string;
  checked: boolean;
};

export type QuestEvent = {
  id: string;
  title: string;
  status: 'completed' | 'deleted';
  createdAt: string;
};

type QuestState = {
  daily: QuestItem[];
  weekly: QuestItem[];
  eventsByDate: Record<string, QuestEvent[]>;
};

const ensureList = (type: QuestType, list: QuestItem[]) => {
  if (list.length === 3) {
    return list;
  }
  const replacements = questService.getReplacementTasks(
    type,
    Math.max(0, 3 - list.length),
    list.map((item) => item.title),
  );
  return [...list.slice(0, 3), ...replacements].slice(0, 3);
};

export const useQuestStore = defineStore('quest', {
  state: (): QuestState => ({
    daily: ensureList('daily', loadFromStorage('quest.daily', questService.getInitialTasks('daily'))),
    weekly: ensureList(
      'weekly',
      loadFromStorage('quest.weekly', questService.getInitialTasks('weekly')),
    ),
    eventsByDate: loadFromStorage('quest.eventsByDate', {}),
  }),
  actions: {
    toggleTask(type: QuestType, taskId: string) {
      const listKey = type === 'daily' ? 'daily' : 'weekly';
      const tasks = this[listKey].map((task) =>
        task.id === taskId ? { ...task, checked: !task.checked } : task,
      );
      this[listKey] = tasks;
      saveToStorage(`quest.${listKey}`, tasks);

      const updated = tasks.find((task) => task.id === taskId);
      if (updated?.checked) {
        this.addEvent(updated.title, 'completed');
      }
    },
    deleteChecked(type: QuestType) {
      const listKey = type === 'daily' ? 'daily' : 'weekly';
      const current = this[listKey];
      const toDelete = current.filter((task) => task.checked);
      if (!toDelete.length) {
        return;
      }
      toDelete.forEach((task) => this.addEvent(task.title, 'deleted'));
      const remaining = current.filter((task) => !task.checked);
      const replacements = questService.getReplacementTasks(
        type,
        toDelete.length,
        remaining.map((task) => task.title),
      );
      this[listKey] = ensureList(type, [...remaining, ...replacements]);
      saveToStorage(`quest.${listKey}`, this[listKey]);
    },
    addEvent(title: string, status: QuestEvent['status'], date = new Date()) {
      const key = date.toISOString().slice(0, 10);
      const event: QuestEvent = {
        id: `${status}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        title,
        status,
        createdAt: date.toISOString(),
      };
      const current = this.eventsByDate[key] || [];
      this.eventsByDate = { ...this.eventsByDate, [key]: [event, ...current] };
      saveToStorage('quest.eventsByDate', this.eventsByDate);
    },
  },
});
