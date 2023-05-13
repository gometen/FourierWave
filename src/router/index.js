import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import FourierWaveMic from '../components/FourierWaveMic.vue'
import FourierWaveRecord from '../components/FourierWaveRecord.vue'
import TestPage from '../components/TestPage.vue'
import AnalyzeSpectrum from '../components/AnalyzeSpectrum.vue'
import MakeWave from '../components/MakeWave.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/fourierwavemic',
    name: 'fourierwavemic',
    component: FourierWaveMic
  },
  {
    path: '/fourierwaverecord',
    name: 'fourierwaverecord',
    component: FourierWaveRecord
  },
  {
    path: '/analyzespectrum',
    name: 'analyzespectrum',
    component: AnalyzeSpectrum
  },
  {
    path: '/makewave',
    name: 'makewave',
    component: MakeWave
  },
  {
    path: '/testpage',
    name: 'testpage',
    component: TestPage
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
