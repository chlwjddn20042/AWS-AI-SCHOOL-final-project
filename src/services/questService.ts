import type { QuestItem } from '../stores/questStore';

export const questService = {
  getDailyTasks(): QuestItem[] {
    return [
      { id: 'd-1', title: '물 1L 이상 마시기', checked: false },
      { id: 'd-2', title: '스트레칭 10회', checked: false },
      { id: 'd-3', title: '짧은 산책', checked: false },
    ];
  },
  getWeeklyTasks(): QuestItem[] {
    return [
      { id: 'w-1', title: '운동 2회', checked: false },
      { id: 'w-2', title: '휴식 계획 세우기', checked: false },
      { id: 'w-3', title: '취미 시간 만들기', checked: false },
    ];
  },
};
