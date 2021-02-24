/* eslint-disable import/no-cycle */
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export default {
  namespaced: true,
  state() {
    return {
      currentUser: null,
      userProfile: {},
      token: '',
    };
  },
  mutations,
  actions,
  getters,
};
