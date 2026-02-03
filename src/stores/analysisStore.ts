import { defineStore } from 'pinia';
import { loadFromStorage, saveToStorage } from '../utils/storage';
import { analysisService } from '../services/analysisService';
import type { UserProfile } from './authStore';

export type AnalysisInputForm = {
  name: string;
  age: string;
  gender: '남' | '여' | '';
  hobby: string;
  sleepStart: string;
  sleepEnd: string;
  exercise: '예' | '아니오' | '';
  pet: string;
  mbti: string;
  outingCount: string;
  satisfaction: '맞음' | '틀림' | '';
  expressionApps: string[];
};

export type AnalysisResult = {
  id: string;
  summary: string;
  character: string;
  createdAt: string;
};

type AnalysisState = {
  inputForm: AnalysisInputForm;
  surveyAnswers: Record<string, number>;
  results: AnalysisResult[];
  currentResult: AnalysisResult | null;
};

const emptyForm: AnalysisInputForm = {
  name: '',
  age: '',
  gender: '',
  hobby: '',
  sleepStart: '',
  sleepEnd: '',
  exercise: '',
  pet: '',
  mbti: '',
  outingCount: '',
  satisfaction: '',
  expressionApps: [],
};

export const useAnalysisStore = defineStore('analysis', {
  state: (): AnalysisState => ({
    inputForm: loadFromStorage('analysis.inputForm', emptyForm),
    surveyAnswers: loadFromStorage('analysis.surveyAnswers', {}),
    results: loadFromStorage('analysis.results', []),
    currentResult: loadFromStorage('analysis.currentResult', null),
  }),
  actions: {
    hydrateFromUser(user: UserProfile) {
      this.inputForm = {
        ...this.inputForm,
        name: user.name || this.inputForm.name,
        gender: user.gender || this.inputForm.gender,
      };
      saveToStorage('analysis.inputForm', this.inputForm);
    },
    updateForm(partial: Partial<AnalysisInputForm>) {
      this.inputForm = { ...this.inputForm, ...partial };
      saveToStorage('analysis.inputForm', this.inputForm);
    },
    updateSurvey(questionId: string, value: number) {
      this.surveyAnswers = { ...this.surveyAnswers, [questionId]: value };
      saveToStorage('analysis.surveyAnswers', this.surveyAnswers);
    },
    finalizeResult() {
      const result = analysisService.createResult(this.inputForm, this.surveyAnswers);
      this.currentResult = result;
      this.results = [result, ...this.results];
      saveToStorage('analysis.currentResult', this.currentResult);
      saveToStorage('analysis.results', this.results);
    },
  },
});
