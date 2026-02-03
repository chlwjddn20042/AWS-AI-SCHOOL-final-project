import { defineStore } from 'pinia';
import { loadFromStorage, saveToStorage } from '../utils/storage';
import { questService } from '../services/questService';

export type QuestType = 'daily' | 'weekly';

export type QuestItem = {
  id: string;
  title: string;
  checked: boolean;
};

export type QuestHistory = {
  completed: string[];
  deleted: string[];
};

type QuestState = {
  daily: QuestItem[];
  weekly: QuestItem[];
  completionByDate: Record<string, QuestHistory>;
  homeChecklistState: Record<string, Record<string, boolean>>;
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
    completionByDate: loadFromStorage('quest.completionByDate', {}),
    homeChecklistState: loadFromStorage('quest.homeChecklistState', {}),
  }),
  actions: {
    toggleTask(type: QuestType, taskId: string) {
      const listKey = type === 'daily' ? 'daily' : 'weekly';
      const tasks = this[listKey].map((task) =>
        task.id === taskId ? { ...task, checked: !task.checked } : task,
      );
      this[listKey] = tasks;
      saveToStorage(`quest.${listKey}`, tasks);
    },
    deleteChecked(type: QuestType) {
      const listKey = type === 'daily' ? 'daily' : 'weekly';
      const current = this[listKey];
      const toDelete = current.filter((task) => task.checked);
      if (!toDelete.length) {
        return;
      }
      const dateKey = new Date().toISOString().slice(0, 10);
      toDelete.forEach((task) => this.addHistory(task.title, 'deleted', dateKey));
      const remaining = current.filter((task) => !task.checked);
      const replacements = questService.getReplacementTasks(
        type,
        toDelete.length,
        remaining.map((task) => task.title),
      );
      this[listKey] = ensureList(type, [...remaining, ...replacements]);
      saveToStorage(`quest.${listKey}`, this[listKey]);
    },
    addHistory(title: string, status: 'completed' | 'deleted', dateKey: string) {
      const current = this.completionByDate[dateKey] || { completed: [], deleted: [] };
      if (status === 'completed') {
        if (!current.completed.includes(title)) {
          current.completed = [...current.completed, title];
        }
      } else if (!current.deleted.includes(title)) {
        current.deleted = [...current.deleted, title];
      }
      this.completionByDate = { ...this.completionByDate, [dateKey]: current };
      saveToStorage('quest.completionByDate', this.completionByDate);
    },
    completeHomeQuest(title: string, date = new Date()) {
      const dateKey = date.toISOString().slice(0, 10);
      const current = this.homeChecklistState[dateKey] || {};
      if (current[title]) {
        return;
      }
      const updated = { ...current, [title]: true };
      this.homeChecklistState = { ...this.homeChecklistState, [dateKey]: updated };
      saveToStorage('quest.homeChecklistState', this.homeChecklistState);
      this.addHistory(title, 'completed', dateKey);
    },
  },
});
