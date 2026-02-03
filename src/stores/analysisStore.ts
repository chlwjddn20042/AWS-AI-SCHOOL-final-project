import { defineStore } from 'pinia';
import { loadFromStorage, saveToStorage } from '../utils/storage';
import { analysisService } from '../services/analysisService';

export type AnalysisInputForm = {
  name: string;
  age: string;
  occupation: string;
};

export type YoutubeTaste = {
  channels: string[];
  keywords: string[];
};

export type AnalysisResult = {
  id: string;
  summary: string;
  traits: string;
  taste: string;
  coaching: string;
  createdAt: string;
};

type AnalysisState = {
  input: AnalysisInputForm;
  youtubeTaste: YoutubeTaste;
  surveyAnswers: number[];
  results: AnalysisResult[];
};

const emptyForm: AnalysisInputForm = {
  name: '',
  age: '',
  occupation: '',
};

const emptyTaste: YoutubeTaste = {
  channels: [],
  keywords: [],
};

const emptySurvey = Array.from({ length: 50 }, () => 0);

export const useAnalysisStore = defineStore('analysis', {
  state: (): AnalysisState => ({
    input: loadFromStorage('analysis.input', emptyForm),
    youtubeTaste: loadFromStorage('analysis.youtubeTaste', emptyTaste),
    surveyAnswers: loadFromStorage('analysis.surveyAnswers', emptySurvey),
    results: loadFromStorage('analysis.results', []),
  }),
  actions: {
    updateInput(partial: Partial<AnalysisInputForm>) {
      this.input = { ...this.input, ...partial };
      saveToStorage('analysis.input', this.input);
    },
    setYoutubeTaste(taste: YoutubeTaste) {
      this.youtubeTaste = taste;
      saveToStorage('analysis.youtubeTaste', this.youtubeTaste);
    },
    updateSurvey(index: number, value: number) {
      const updated = [...this.surveyAnswers];
      updated[index] = value;
      this.surveyAnswers = updated;
      saveToStorage('analysis.surveyAnswers', this.surveyAnswers);
    },
    finalizeResult() {
      const result = analysisService.createResult(this.input, this.youtubeTaste, this.surveyAnswers);
      this.results = [result, ...this.results];
      saveToStorage('analysis.results', this.results);
      return result;
    },
  },
});
