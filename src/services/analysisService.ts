import type { AnalysisInputForm, AnalysisResult } from '../stores/analysisStore';

const summaries = ['차분한 탐험가', '따뜻한 동반자', '꾸준한 성장형', '유연한 에너지'];

export const analysisService = {
  createResult(input: AnalysisInputForm, survey: Record<string, number>): AnalysisResult {
    const score = Object.values(survey).reduce((acc, value) => acc + value, 0);
    const summary = summaries[score % summaries.length];
    return {
      id: `result-${Date.now()}`,
      summary,
      character: input.hobby ? `${input.hobby} 러버` : '새싹 캐릭터',
      createdAt: new Date().toISOString(),
    };
  },
};
