import { RegExp } from 'core-js';

export default {
  LOAD_ARTICLES(state, payload) {
    state.articles = payload;
  },

  SEARCH_ARTICLES(state, word) {
    if (word) {
      const regex = new RegExp(word, 'gi');
      state.searchedArticles = state.articles.filter((article) => article.title.match(regex));
    } else {
      state.searchedArticles = null;
    }
  },

  SET_ARTICLE(state, payload) {
    state.article = { ...payload };
  },

  UNSET_ARTICLE(state) {
    state.article = [];
  },
};
