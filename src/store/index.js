/* eslint-disable import/no-cycle */
/* eslint-disable no-return-assign */
/* eslint-disable no-restricted-syntax */
import Vue from 'vue';
import Vuex from 'vuex';
import postModules from './modules/posts/index';
import usersModules from './modules/users/index';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentUser: null,
    userProfile: {},
    token: '',
    overlay: false,
    dialogType: {
      type: '',
      message: '',
    },
    dialog: false,
    alerts: {
      alert: false,
    },
    // eslint-disable-next-line global-require
    drawer: false,
    showLoginForm: true,
  },

  getters: {
    getLoginForm(state) {
      return state.showLoginForm;
    },
    getDrawer(state) {
      return state.drawer;
    },
  },
  mutations: {
    setDrawer: (state, payload) => (state.drawer = payload),
    TOGGLE_DRAWER: (state) => (state.drawer = !state.drawer),
    TOGGLE_FORM(state) {
      state.showLoginForm = !state.showLoginForm;
    },

    OVERLAY_ON(state) {
      state.overlay = true;
    },

    OVERLAY_OFF(state) {
      state.overlay = false;
    },

    SET_ALERT(state, payload) {
      state.alerts.alert = true;
      state.alerts.type = payload.type;
      state.alerts.message = payload.message;
      setTimeout(() => {
        state.alerts.alert = false;
      }, 4000);
    },
  },
  actions: {
    clearData({ commit }) {
      commit('users/SET_CURRENT_USER', null);
      commit('users/SET_USER_PROFILE', {});
    },
  },

  modules: {
    posts: postModules,
    users: usersModules,
  },
});
