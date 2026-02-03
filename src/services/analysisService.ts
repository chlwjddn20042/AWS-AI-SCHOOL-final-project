import type { AnalysisInputForm, AnalysisResult, YoutubeTaste } from '../stores/analysisStore';

const summaries = ['차분한 탐험가', '따뜻한 동반자', '꾸준한 성장형', '유연한 에너지'];

export const analysisService = {
  createResult(
    input: AnalysisInputForm,
    taste: YoutubeTaste,
    survey: number[],
  ): AnalysisResult {
    const score = survey.reduce((acc, value) => acc + value, 0);
    const summary = summaries[score % summaries.length];
    return {
      id: `result-${Date.now()}`,
      summary,
      traits: `${input.name || '사용자'}의 기본 성향은 안정적이며 꾸준한 편입니다.`,
      taste: taste.keywords.length
        ? `관심 키워드: ${taste.keywords.slice(0, 3).join(', ')}`
        : '관심 키워드가 아직 없습니다.',
      coaching: '매일 짧은 루틴을 유지하며 리듬을 만들어 보세요.',
      createdAt: new Date().toISOString(),
    };
  },
  mockYoutubeTaste(): YoutubeTaste {
    return {
      channels: ['Daily Focus', 'Calm Studio', 'Health Lab'],
      keywords: ['집중', '수면', '루틴', '운동'],
    };
  },
};
