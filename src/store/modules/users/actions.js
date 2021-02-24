import axios from '../../../admin-auth';
import Admin from '../../../services/admin';
import { usersCollection } from '../../../firebaseConfig';

export default {
  addUser({ commit, state }, userData) {
    commit('OVERLAY_ON', null, { root: true });
    const url = '/admin/signup';
    const config = {
      headers: {
        Authorization: `Bearer ${state.token}`,
      },
    };
    axios.post(url, userData, config)
      .then(() => {
        commit('OVERLAY_OFF', null, { root: true });
        const alert = {
          alert: true,
          type: 'success',
          message: 'user Successfully created',
        };
        commit('SET_ALERT', alert, { root: true });
      })
      .catch((error) => {
        commit('OVERLAY_OFF', null, { root: true });
        const alert = {
          alert: true,
          type: 'error',
          message: error.error ? 'Oops an error occurred' : 'Oops an error ocurred',
        };
        commit('SET_ALERT', alert, { root: true });
      });
  },

  editUser({ commit, state }, userData) {
    commit('OVERLAY_ON', null, { root: true });
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
        commit('OVERLAY_OFF', null, { root: true });
        const alert = {
          alert: true,
          type: 'success',
          message: 'successfully updated',
        };
        commit('SET_ALERT', alert, { root: true });
      })
      .catch((error) => {
        commit('OVERLAY_OFF', null, { root: true });
        const alert = {
          alert: true,
          type: 'error',
          message: error.message ? 'Oops an error occurred' : 'Oops an error ocurred',
        };
        commit('SET_ALERT', alert, { root: true });
      });
  },

  suspendUser({ commit, state }, id) {
    commit('OVERLAY_ON', null, { root: true });
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
        commit('OVERLAY_OFF', null, { root: true });
        const alert = {
          alert: true,
          type: 'success',
          message: 'user Successfully suspended!!',
        };
        commit('SET_ALERT', alert, { root: true });
      })
      .catch((error) => {
        commit('OVERLAY_OFF', null, { root: true });
        const alert = {
          alert: true,
          type: 'error',
          message: error.message ? 'Oops an error occurred' : 'Oops an error ocurred',
        };
        commit('SET_ALERT', alert, { root: true });
      });
  },

  reactivateUser({ commit, state }, id) {
    commit('OVERLAY_ON', null, { root: true });
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
        commit('OVERLAY_OFF', null, { root: true });
        const alert = {
          alert: true,
          type: 'success',
          message: 'user Successfully reactivated',
        };
        commit('SET_ALERT', alert, { root: true });
      })
      .catch((error) => {
        commit('OVERLAY_OFF', null, { root: true });
        const alert = {
          alert: true,
          type: 'error',
          message: error.message ? 'Oops an error occurred' : 'Oops an error ocurred',
        };
        commit('SET_ALERT', alert, { root: true });
      });
  },

  // login({ commit, dispatch, state }, authData) {
  //   commit('OVERLAY_ON', null, { root: true });
  //   Admin.login(authData)
  //     .then((user) => {
  //       commit('SET_CURRENT_USER', user.user);
  //       usersCollection.doc(state.currentUser.uid).get().then((res) => {
  //         if (res.data().isactive === false) {
  //           dispatch('logout');
  //           const alert = {
  //             alert: true,
  //             type: 'error',
  //             message: 'this account has been suspended',
  //           };
  //           commit('SET_ALERT', alert, { root: true });
  //         } else {
  //           commit('SET_USER_PROFILE', res.data());
  //           Admin.getToken()
  //             .then((idToken) => {
  //               commit('SET_USER_TOKEN', idToken);
  //               commit('OVERLAY_OFF', null, { root: true });
  //             })
  //             .catch((error) => {
  //               const alert = {
  //                 alert: true,
  //                 type: 'error',
  //                 message: `An error occurred ${error}`,
  //               };
  //               commit('SET_ALERT', alert, { root: true });
  //               commit('OVERLAY_OFF', null, { root: true });
  //             });
  //         }
  //       }).catch((err) => {
  //         const alert = {
  //           alert: true,
  //           type: 'error',
  //           message: `An error occurred ${err}`,
  //         };
  //         commit('SET_ALERT', alert, { root: true });
  //         commit('OVERLAY_OFF', null, { root: true });
  //       });
  //     })
  //     .catch((error) => {
  //       const alert = {
  //         alert: true,
  //         type: 'error',
  //         message: `An error occurred ${error}`,
  //       };
  //       commit('SET_ALERT', alert, { root: true });
  //       commit('OVERLAY_OFF', { root: true });
  //     });
  // },

  fetchUserProfile({ commit, dispatch, state }) {
    commit('OVERLAY_ON', null, { root: true });
    usersCollection.doc(state.currentUser.uid).get().then((res) => {
      if (res.data().isactive === false) {
        dispatch('logout');
        const alert = {
          alert: true,
          type: 'error',
          message: 'this account has been suspended',
        };
        commit('SET_ALERT', alert, { root: true });
      } else {
        commit('SET_USER_PROFILE', res.data());
        Admin.getToken()
          .then((idToken) => {
            commit('SET_USER_TOKEN', idToken);
            commit('OVERLAY_OFF', null, { root: true });
          })
          .catch((error) => {
            const alert = {
              alert: true,
              type: 'error',
              message: error.message ? 'Oops an error occurred' : 'Oops an error ocurred',
            };
            commit('SET_ALERT', alert, { root: true });
            commit('OVERLAY_OFF', null, { root: true });
          });
      }
    }).catch((err) => {
      const alert = {
        alert: true,
        type: 'error',
        message: err.message ? 'Oops an error occurred' : 'Oops an error ocurred',
      };
      commit('SET_ALERT', alert, { root: true });
      commit('OVERLAY_OFF', null, { root: true });
    });
  },

  logout({ commit, dispatch }) {
    commit('OVERLAY_ON', null, { root: true });
    Admin.logout()
      .then(() => {
        dispatch('clearData', null, { root: true });
        setTimeout(() => {
          commit('OVERLAY_OFF', null, { root: true });
        }, 3000);
      })
      .catch((error) => {
        const alert = {
          alert: true,
          type: 'error',
          message: error.message ? 'Oops an error occurred' : 'Oops an error ocurred',
        };
        commit('SET_ALERT', alert, { root: true });
        commit('OVERLAY_OFF', null, { root: true });
      });
  },

};
