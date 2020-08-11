/* eslint-disable import/no-cycle */
/* eslint-disable no-return-assign */
/* eslint-disable no-restricted-syntax */
import Vue from 'vue';
import Vuex from 'vuex';
import { RegExp } from 'core-js';
import Articles from '../services/articles';
import Admin from '../services/admin';
import routes from '../router/index';
import axios from '../admin-auth';

const fb = require('../firebaseConfig.js');

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
    searchedArticles: null,
    articles: null,
    article: [],
    drawer: false,
    showLoginForm: true,
  },
  getters: {
    getLoginForm(state) {
      return state.showLoginForm;
    },
  },
  mutations: {
    setDrawer: (state, payload) => (state.drawer = payload),
    toggleDrawer: (state) => (state.drawer = !state.drawer),
    LOAD_ARTICLES(state, payload) {
      state.articles = payload;
    },

    SERACH_ARTICLES(state, word) {
      if (word) {
        const regex = new RegExp(word, 'gi');
        state.searchedArticles = state.articles.filter((article) => article.title.match(regex));
      } else {
        state.searchedArticles = null;
      }
    },

    SET_ARTICLE(state, payload) {
      state.article = payload;
    },

    UNSET_ARTICLE(state) {
      state.article = [];
    },

    SET_CURRENT_USER(state, val) {
      state.currentUser = val;
    },
    SET_USER_PROFILE(state, val) {
      state.userProfile = val;
    },

    SET_USER_TOKEN(state, val) {
      state.token = val;
    },

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
    getArticles({ commit }) {
      commit('OVERLAY_ON');
      Articles.getAll()
        .then((response) => {
          commit('LOAD_ARTICLES', response.data.data);
          commit('OVERLAY_OFF');
        })
        .catch((err) => {
          console.log(err);
          commit('OVERLAY_OFF');
        });
    },

    getArticle({ commit }, id) {
      Articles.getArticle(id)
        .then((doc) => {
          commit('SET_ARTICLE', doc.data.data);
          commit('OVERLAY_OFF');
        })
        .catch((error) => {
          console.log(error);
          commit('OVERLAY_OFF');
        });
    },

    clearData({ commit }) {
      commit('SET_CURRENT_USER', null);
      commit('SET_USER_PROFILE', {});
    },

    // eslint-disable-next-line no-unused-vars
    addUser({ commit, dispatch, state }, userData) {
      commit('OVERLAY_ON');
      const url = '/admin/signup';
      const config = {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      };
      axios.post(url, userData, config)
        .then((res) => {
          console.log(res);
          routes.push({ name: 'Users' });
          commit('OVERLAY_OFF');
          const alert = {
            alert: true,
            type: 'success',
            message: 'user Successfully created',
          };
          commit('SET_ALERT', alert);
        })
        .catch((error) => {
          console.log(error);
          commit('OVERLAY_OFF');
          const alert = {
            alert: true,
            type: 'error',
            message: error.error,
          };
          commit('SET_ALERT', alert);
        });
    },

    editUser({ commit, state }, userData) {
      commit('OVERLAY_ON');
      const url = `/admin/${userData.id}/edit-user`;
      const data = {
        firstname: userData.firstname,
        lastname: userData.lastname,
        role: userData.role,
      };
      const config = {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      };

      axios.patch(url, data, config)
        .then(() => {
          commit('OVERLAY_OFF');
          const alert = {
            alert: true,
            type: 'success',
            message: 'successfully updated',
          };
          commit('SET_ALERT', alert);
        })
        .catch((error) => {
          commit('OVERLAY_OFF');
          const alert = {
            alert: true,
            type: 'error',
            message: error.code ? error.message : error,
          };
          commit('SET_ALERT', alert);
        });
    },

    suspendUser({ commit, state }, id) {
      commit('OVERLAY_ON');
      const url = '/admin/suspend-user';
      const data = {
        id,
      };
      const config = {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      };
      axios.post(url, data, config)
        .then(() => {
          commit('OVERLAY_OFF');
          const alert = {
            alert: true,
            type: 'success',
            message: 'user Successfully suspended!!',
          };
          commit('SET_ALERT', alert);
        })
        .catch((error) => {
          console.log(error);
          commit('OVERLAY_OFF');
          const alert = {
            alert: true,
            type: 'error',
            message: error.code ? error.message : error,
          };
          commit('SET_ALERT', alert);
        });
    },

    reactivateUser({ commit, state }, id) {
      commit('OVERLAY_ON');
      const url = '/admin/reactivate-user';
      const data = {
        id,
      };
      const config = {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      };
      axios.post(url, data, config)
        .then(() => {
          commit('OVERLAY_OFF');
          const alert = {
            alert: true,
            type: 'success',
            message: 'user Successfully reactivated',
          };
          commit('SET_ALERT', alert);
        })
        .catch((error) => {
          console.log(error);
          commit('OVERLAY_OFF');
          const alert = {
            alert: true,
            type: 'error',
            message: error.error ? error.error : error,
          };
          commit('SET_ALERT', alert);
        });
    },

    // Log In functionality
    login({ commit, dispatch, state }, authData) {
      commit('OVERLAY_ON');
      Admin.login(authData)
        .then((user) => {
          commit('SET_CURRENT_USER', user.user);
          fb.usersCollection.doc(state.currentUser.uid).get().then((res) => {
            if (res.data().isactive === false) {
              dispatch('logout');
              const alert = {
                alert: true,
                type: 'error',
                message: 'this account has been suspended',
              };
              commit('SET_ALERT', alert);
            } else {
              commit('SET_USER_PROFILE', res.data());
              Admin.getToken()
                .then((idToken) => {
                  commit('SET_USER_TOKEN', idToken);
                  commit('OVERLAY_OFF');
                  routes.push('/dashboard');
                })
                .catch((error) => {
                  console.log(error);
                  commit('OVERLAY_OFF');
                });
            }
          }).catch((err) => {
            console.log(err);
            commit('OVERLAY_OFF');
          });
        })
        .catch((error) => {
          console.log(error);
          commit('OVERLAY_OFF');
        });
    },

    fetchUserProfile({ commit, dispatch, state }) {
      commit('OVERLAY_ON');
      fb.usersCollection.doc(state.currentUser.uid).get().then((res) => {
        if (res.data().isactive === false) {
          dispatch('logout');
          const alert = {
            alert: true,
            type: 'error',
            message: 'this account has been suspended',
          };
          commit('SET_ALERT', alert);
        } else {
          commit('SET_USER_PROFILE', res.data());
          Admin.getToken()
            .then((idToken) => {
              commit('SET_USER_TOKEN', idToken);
              commit('OVERLAY_OFF');
            })
            .catch((error) => {
              console.log(error);
              commit('OVERLAY_OFF');
            });
        }
      }).catch((err) => {
        console.log(err);
        commit('OVERLAY_OFF');
      });
    },

    // eslint-disable-next-line no-unused-vars

    logout({ commit, dispatch }) {
      commit('OVERLAY_ON');
      Admin.logout()
        .then(() => {
          dispatch('clearData');
          routes.push({ name: 'Login' });
          setTimeout(() => {
            commit('OVERLAY_OFF');
          }, 3000);
        })
        .catch((error) => {
          console.log(error);
          commit('OVERLAY_OFF');
        });
    },

    // eslint-disable-next-line no-unused-vars
    createPost({ commit }, payload) {
      commit('OVERLAY_ON');
      Admin.createPost(payload)
        .then((res) => {
          console.log(res);
          routes.push({ name: 'Posts' });
          commit('OVERLAY_OFF');
          const alert = {
            alert: true,
            type: 'success',
            message: 'Post created Successfully',
          };
          commit('SET_ALERT', alert);
        })
        .catch((error) => {
          console.log(error);
          commit('OVERLAY_OFF');
          const alert = {
            type: 'error',
            message: error.code ? error.message : error.error,
          };
          commit('SET_ALERT', alert);
        });
    },

    // eslint-disable-next-line no-unused-vars
    updatePost({ commit, state }, postData) {
      console.log(postData);
      commit('OVERLAY_ON');
      const config = {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      };
      const data = {
        title: postData.title,
        content: postData.content,
        category: postData.category,
      };
      Articles.updateArticle(config, postData.id, data)
        .then(() => {
          const alert = {
            alert: true,
            type: 'success',
            message: 'Updated Successfully',
          };
          commit('OVERLAY_OFF');
          commit('SET_ALERT', alert);
        })
        .catch((error) => {
          const alert = {
            alert: true,
            type: 'error',
            message: error.error ? error.error : error,
          };
          commit('OVERLAY_OFF');
          commit('SET_ALERT', alert);
        });
    },
    // eslint-disable-next-line no-unused-vars
    deletePost({ commit, state }, id) {
      commit('OVERLAY_ON');
      const config = {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      };
      Articles.deleteArticle(config, id)
        .then(() => {
          const alert = {
            alert: true,
            type: 'success',
            message: 'deleted Successfully',
          };
          commit('OVERLAY_OFF');
          commit('SET_ALERT', alert);
        })
        .catch((error) => {
          const alert = {
            alert: true,
            type: 'error',
            message: error.error ? error.error : error,
          };
          commit('OVERLAY_OFF');
          commit('SET_ALERT', alert);
        });
    },
  },
});
