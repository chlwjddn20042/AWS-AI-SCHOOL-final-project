import { defineStore } from 'pinia';
import { loadFromStorage, saveToStorage } from '../utils/storage';
import { questService } from '../services/questService';

export type QuestItem = {
  id: string;
  title: string;
  checked: boolean;
};

type QuestState = {
  daily: QuestItem[];
  weekly: QuestItem[];
  completionByDate: Record<string, string[]>;
};

export const useQuestStore = defineStore('quest', {
  state: (): QuestState => ({
    daily: loadFromStorage('quest.daily', questService.getDailyTasks()),
    weekly: loadFromStorage('quest.weekly', questService.getWeeklyTasks()),
    completionByDate: loadFromStorage('quest.completionByDate', {}),
  }),
  actions: {
    toggleTask(type: 'daily' | 'weekly', taskId: string) {
      const listKey = type === 'daily' ? 'daily' : 'weekly';
      const tasks = this[listKey].map((task) =>
        task.id === taskId ? { ...task, checked: !task.checked } : task,
      );
      this[listKey] = tasks;
      saveToStorage(`quest.${listKey}`, tasks);
      this.trackCompletion();
    },
    trackCompletion(date = new Date()) {
      const key = date.toISOString().slice(0, 10);
      const completed = [...this.daily, ...this.weekly]
        .filter((task) => task.checked)
        .map((task) => task.title);
      this.completionByDate = { ...this.completionByDate, [key]: completed };
      saveToStorage('quest.completionByDate', this.completionByDate);
    },
  },
});
