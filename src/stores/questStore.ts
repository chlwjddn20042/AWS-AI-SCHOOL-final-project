import { defineStore } from 'pinia';
import { loadFromStorage, saveToStorage } from '../utils/storage';
import { questService } from '../services/questService';

export type QuestItem = {
  id: string;
  title: string;
  checked: boolean;
};

type QuestState = {
  dailyTasks: QuestItem[];
  weeklyTasks: QuestItem[];
  completionByDate: Record<string, string[]>;
};

export const useQuestStore = defineStore('quest', {
  state: (): QuestState => ({
    dailyTasks: loadFromStorage('quest.dailyTasks', questService.getDailyTasks()),
    weeklyTasks: loadFromStorage('quest.weeklyTasks', questService.getWeeklyTasks()),
    completionByDate: loadFromStorage('quest.completionByDate', {}),
  }),
  actions: {
    toggleTask(type: 'daily' | 'weekly', taskId: string) {
      const listKey = type === 'daily' ? 'dailyTasks' : 'weeklyTasks';
      const tasks = this[listKey].map((task) =>
        task.id === taskId ? { ...task, checked: !task.checked } : task,
      );
      this[listKey] = tasks;
      saveToStorage(`quest.${listKey}`, tasks);
      this.trackCompletion();
    },
    trackCompletion(date = new Date()) {
      const key = date.toISOString().slice(0, 10);
      const completed = [...this.dailyTasks, ...this.weeklyTasks]
        .filter((task) => task.checked)
        .map((task) => task.title);
      this.completionByDate = { ...this.completionByDate, [key]: completed };
      saveToStorage('quest.completionByDate', this.completionByDate);
    },
  },
});
