/* eslint-disable import/no-cycle */
import Vue from 'vue';
import Router from 'vue-router';
import firebase from 'firebase';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Dashboard from '../views/Dashboard.vue';
import Settings from '../views/Settings.vue';
import AddUser from '../views/AddUser.vue';
import UserPosts from '../views/UserPosts.vue';
import Users from '../views/Users.vue';
import Post from '../views/Post.vue';
import store from '../store/index';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/post/:id',
      name: 'Post',
      component: Post,

      beforeEnter(to, from, next) {
        if (!to.params || !to.params.id) {
          next({ name: 'Home' });
        } else {
          next();
        }
      },
    },
    {
      path: '/cms/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/cms/admin',
      name: 'Login',
      component: Login,
      beforeEnter(to, from, next) {
        const { currentUser } = firebase.auth();
        if (currentUser) {
          next({ name: 'Dashboard' });
        }

        next();
      },
    },
    {
      path: '/cms/create-user',
      name: 'CreateUser',
      component: AddUser,
      meta: {
        requiresAuth: true,
      },
      beforeEnter(to, from, next) {
        if (store.state.userProfile.role === 'superuser') {
          next();
        } else {
          next({ name: 'Dashboard' });
        }
      },
    },
    {
      path: '/cms/users',
      name: 'Users',
      component: Users,
      meta: {
        requiresAuth: true,
      },
      beforeEnter(to, from, next) {
        if (store.state.userProfile.role === 'superuser') {
          next();
        } else {
          next({ name: 'Dashboard' });
        }
      },
    },
    {
      path: '/cms/posts',
      name: 'Posts',
      component: UserPosts,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((x) => x.meta.requiresAuth);
  const { currentUser } = firebase.auth();

  if (requiresAuth && !currentUser) {
    next({ name: 'Login' });
  } else if (requiresAuth && currentUser) {
    next();
  } else {
    next();
  }
});

export default router;
