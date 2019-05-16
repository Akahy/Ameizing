import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';

import Landing from './views/Landing.vue';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'landing',
      component: Landing,
    },
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName profile */ './views/Home.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/authorize',
      name: 'authorize',
      component: () => import(/* webpackChunkName authorize */ './views/Authorize.vue'),
      props: (route) => ({ code: route.query.code, state: route.query.state }),
    },
  ],
});

router.beforeEach((to, from, next) => {
  store.commit('initToken');

  if (store.state.authentification.token
    && store.state.authentification.expireAt > Math.floor(Date.now() / 1000)) {

    if (to.name === 'landing' || to.name === 'authorize') {
      return next({
        path: '/',
      });
    }
    return next();
  }

  store.commit('deleteToken');
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    return next({
      path: '/login',
    });
  }

  return next();
});

export default router;
