import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/authStore';

import StartView from '../views/StartView.vue';
import LoginView from '../views/LoginView.vue';
import SignupView from '../views/SignupView.vue';
import HomeView from '../views/HomeView.vue';
import AnalysisStartView from '../views/AnalysisStartView.vue';
import AnalysisInputView from '../views/AnalysisInputView.vue';
import AnalysisYoutubeView from '../views/AnalysisYoutubeView.vue';
import AnalysisSurveyView from '../views/AnalysisSurveyView.vue';
import AnalysisLoadingView from '../views/AnalysisLoadingView.vue';
import AnalysisResultView from '../views/AnalysisResultView.vue';
import QuestView from '../views/QuestView.vue';
import QuestHistoryView from '../views/QuestHistoryView.vue';
import ChatbotView from '../views/ChatbotView.vue';
import MyView from '../views/MyView.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'start', component: StartView },
    { path: '/login', name: 'login', component: LoginView },
    { path: '/signup', name: 'signup', component: SignupView },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: '/analysis',
      redirect: '/analysis/start',
      meta: { requiresAuth: true },
    },
    {
      path: '/analysis/start',
      name: 'analysis-start',
      component: AnalysisStartView,
      meta: { requiresAuth: true },
    },
    {
      path: '/analysis/input',
      name: 'analysis-input',
      component: AnalysisInputView,
      meta: { requiresAuth: true },
    },
    {
      path: '/analysis/youtube',
      name: 'analysis-youtube',
      component: AnalysisYoutubeView,
      meta: { requiresAuth: true },
    },
    {
      path: '/analysis/survey',
      name: 'analysis-survey',
      component: AnalysisSurveyView,
      meta: { requiresAuth: true },
    },
    {
      path: '/analysis/loading',
      name: 'analysis-loading',
      component: AnalysisLoadingView,
      meta: { requiresAuth: true },
    },
    {
      path: '/analysis/result/:id',
      name: 'analysis-result',
      component: AnalysisResultView,
      meta: { requiresAuth: true },
    },
    {
      path: '/quest',
      name: 'quest',
      component: QuestView,
      meta: { requiresAuth: true },
    },
    {
      path: '/quest/history',
      name: 'quest-history',
      component: QuestHistoryView,
      meta: { requiresAuth: true },
    },
    {
      path: '/chatbot',
      name: 'chatbot',
      component: ChatbotView,
      meta: { requiresAuth: true },
    },
    {
      path: '/my',
      name: 'my',
      component: MyView,
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach((to) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    return { name: 'login' };
  }
  return true;
});

export default router;
