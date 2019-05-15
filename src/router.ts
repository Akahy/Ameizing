import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';

import Landing from './views/Landing.vue';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'landing',
      component: Landing,
    },
    {
      path: '/home',
      name: 'home',
      component: () => import(/* webpackChunkName home */ './views/Home.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/authorize',
      name: 'authorize',
      component: () => import(/* webpackChunkName authorize */ './views/Authorize.vue'),
      props: (route) => ({ code: route.query.code, state: route.query.state }),
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
  ],
});

router.beforeEach((to, from, next) => {
  store.commit('initToken');

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.state.authentification.token
      && store.state.authentification.expireAt > Math.floor(Date.now() / 1000)) {
        return next();
    }
    store.commit('deleteToken');
    return next({
      path: '/',
    });
  }

  return next ();
});

export default router;
