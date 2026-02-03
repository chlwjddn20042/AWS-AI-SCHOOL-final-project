import type { QuestItem } from '../stores/questStore';

export const questService = {
  getDailyTasks(): QuestItem[] {
    return [
      { id: 'd-1', title: '물 한 컵', checked: false },
      { id: 'd-2', title: '스트레칭 5분', checked: false },
      { id: 'd-3', title: '감사 기록', checked: false },
    ];
  },
  getWeeklyTasks(): QuestItem[] {
    return [
      { id: 'w-1', title: '산책 30분', checked: false },
      { id: 'w-2', title: '취미 시간', checked: false },
      { id: 'w-3', title: '친구 연락', checked: false },
    ];
  },
};
