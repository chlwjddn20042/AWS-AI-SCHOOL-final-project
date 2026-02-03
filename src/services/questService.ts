import type { QuestItem, QuestType } from '../stores/questStore';

const dailyPool = [
  '물 1L 이상 마시기',
  '스트레칭 10회',
  '짧은 산책',
  '눈 휴식 5분',
  '하루 일정 정리',
  '가벼운 정리 정돈',
];

const weeklyPool = [
  '운동 2회',
  '휴식 계획 세우기',
  '취미 시간 만들기',
  '주간 목표 점검',
  '친구에게 안부 보내기',
  '긴 산책 1회',
];

const poolMap: Record<QuestType, string[]> = {
  daily: dailyPool,
  weekly: weeklyPool,
};

const createItem = (type: QuestType, title: string): QuestItem => ({
  id: `${type}-${title}-${Math.random().toString(36).slice(2, 8)}`,
  title,
  checked: false,
});

const pickTasks = (type: QuestType, count: number, exclude: string[] = []) => {
  const pool = poolMap[type].filter((title) => !exclude.includes(title));
  const picks: string[] = [];
  const source = pool.length ? pool : poolMap[type];
  while (picks.length < count) {
    const next = source[Math.floor(Math.random() * source.length)];
    picks.push(next);
  }
  return picks.map((title) => createItem(type, title));
};

export const questService = {
  getInitialTasks(type: QuestType): QuestItem[] {
    return pickTasks(type, 3);
  },
  getReplacementTasks(type: QuestType, count: number, excludeTitles: string[]): QuestItem[] {
    return pickTasks(type, count, excludeTitles);
  },
};
