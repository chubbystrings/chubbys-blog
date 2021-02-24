/* eslint-disable import/no-cycle */
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export default {
  namespaced: true,
  state() {
    return {
      searchedArticles: null,
      articles: null,
      article: {},
    };
  },
  actions,
  mutations,
  getters,
};
