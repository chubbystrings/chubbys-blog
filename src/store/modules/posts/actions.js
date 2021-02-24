/* eslint-disable import/no-cycle */
import { postsCollection, viewsCollection } from '../../../firebaseConfig';
import Admin from '../../../services/admin';
import Articles from '../../../services/articles';

export default {
  async getArticles({ commit }) {
    commit('OVERLAY_ON', null, { root: true });
    const articles = [];
    try {
      const doc = await postsCollection.orderBy('createdOn', 'desc').get();
      const viewsDoc = await viewsCollection.get();
      doc.forEach((post) => {
        articles.push({
          id: post.id,
          author: post.data().author,
          content: post.data().content,
          author_id: post.data().author_id,
          category: post.data().category,
          title: post.data().title,
          createdOn: post.data().createdOn,
        });
      });

      // for some reason if view docs is more than the article docs filter the views doc
      let index = null;
      const newView = [];
      if (viewsDoc.size > doc.size) {
        viewsDoc.forEach((view) => {
          if (articles.findIndex((article) => article.id === view.id) >= 0) {
            newView.push({
              id: view.id,
              ...view.data(),
            });
          }
        });
      }

      if (newView.length > 0) {
        newView.forEach((view) => {
          index = articles.findIndex((article) => article.id === view.id);
          articles[index].viewed = view.viewed ? view.viewed : 0;
        });
      } else {
        viewsDoc.forEach((view) => {
          index = articles.findIndex((article) => article.id === view.id);
          articles[index].viewed = view.data().viewed ? view.data().viewed : 0;
        });
      }

      commit('LOAD_ARTICLES', articles);
      commit('OVERLAY_OFF', null, { root: true });
    } catch (error) {
      if (error.message && error.message === 'Network Error') {
        const alert = {
          alert: true,
          type: 'error',
          message: error.message,
        };
        commit('SET_ALERT', alert, { root: true });
      } else {
        const alert = {
          alert: true,
          type: 'error',
          message: 'Opps an error occurred',
        };
        this.$store.commit('SET_ALERT', alert, { root: true });
      }
      commit('OVERLAY_OFF', null, { root: true });
    }
  },

  async getArticle({ commit }, id) {
    try {
      const docRef = await postsCollection.doc(id);
      const viewDoc = await viewsCollection.doc(id).get();
      const { viewed } = await viewDoc.data();
      const doc = await docRef.get();
      const article = {
        id: doc.id,
        author: doc.data().author,
        content: doc.data().content,
        author_id: doc.data().author_id,
        category: doc.data().category,
        title: doc.data().title,
        createdOn: doc.data().createdOn,
      };
      commit('SET_ARTICLE', article);
      await Admin.updateViews(article.id, viewed);
      commit('OVERLAY_OFF', null, { root: true });
    } catch (error) {
      if (error.message && error.message === 'Network Error') {
        const alert = {
          alert: true,
          type: 'error',
          message: error.message,
        };
        commit('SET_ALERT', alert, { root: true });
      } else {
        const alert = {
          alert: true,
          type: 'error',
          message: 'Oops An error occurred',
        };
        this.$store.commit('SET_ALERT', alert, { root: true });
      }
      commit('OVERLAY_OFF', null, { root: true });
    }
  },

  createPost({ commit }, payload) {
    commit('OVERLAY_ON', null, { root: true });
    Admin.createPost(payload)
      .then((res) => {
        Admin.addViews(res.id)
          .then(() => {
            commit('OVERLAY_OFF', null, { root: true });
            const alert = {
              alert: true,
              type: 'success',
              message: 'Post created Successfully',
            };
            commit('SET_ALERT', alert, { root: true });
          })
          .catch((error) => {
            commit('OVERLAY_OFF', null, { root: true });
            const alert = {
              type: 'error',
              message: error.code ? 'Oops An error occurred' : 'Oops An error occurred',
            };
            commit('SET_ALERT', alert, { root: true });
          });
      })
      .catch((error) => {
        commit('OVERLAY_OFF', null, { root: true });
        const alert = {
          type: 'error',
          message: error.code ? 'Oops An Error Occurred' : 'Oops An error occurred',
        };
        commit('SET_ALERT', alert, { root: true });
      });
  },

  updatePost({ commit, rootState }, postData) {
    const data = {};
    commit('OVERLAY_ON', null, { root: true });
    const config = {
      headers: {
        Authorization: `Bearer ${rootState.users.token}`,
      },
    };
    if (postData.viewed) {
      data.viewed = postData.viewed;
    } else {
      data.title = postData.title;
      data.content = postData.content;
      data.category = postData.category;
    }

    Articles.updateArticle(config, postData.id, data)
      .then(() => {
        const alert = {
          alert: true,
          type: 'success',
          message: 'Updated Successfully',
        };
        commit('OVERLAY_OFF', null, { root: true });
        commit('SET_ALERT', alert, { root: true });
      })
      .catch((error) => {
        const alert = {
          alert: true,
          type: 'error',
          message: error.error ? 'Oops an error Occurred' : 'Oops An error Occurred',
        };
        commit('OVERLAY_OFF', null, { root: true });
        commit('SET_ALERT', alert, { root: true });
      });
  },

  deletePost({ commit, rootState }, id) {
    commit('OVERLAY_ON', null, { root: true });
    const config = {
      headers: {
        Authorization: `Bearer ${rootState.users.token}`,
      },
    };
    Articles.deleteArticle(config, id)
      .then(() => {
        Admin.deleteView(id)
          .then(() => {
            const alert = {
              alert: true,
              type: 'success',
              message: 'deleted Successfully',
            };
            commit('OVERLAY_OFF', null, { root: true });
            commit('SET_ALERT', alert, { root: true });
          })
          .catch((error) => {
            const alert = {
              alert: true,
              type: 'error',
              message: error.error ? 'Oops An error occurred' : 'Oops An error ocurred',
            };
            commit('OVERLAY_OFF', null, { root: true });
            commit('SET_ALERT', alert, { root: true });
          });
      })
      .catch((error) => {
        const alert = {
          alert: true,
          type: 'error',
          message: error.error ? 'Oops An error Occurred' : 'Oops An error ocurred',
        };
        commit('OVERLAY_OFF', null, { root: true });
        commit('SET_ALERT', alert, { root: true });
      });
  },

  deleteManyPosts({ commit, rootState }, payload) {
    commit('OVERLAY_ON', null, { root: true });
    const config = {
      headers: {
        Authorization: `Bearer ${rootState.users.token}`,
      },
    };

    Articles.deleteMany(config, payload)
      .then(() => {
        const alert = {
          alert: true,
          type: 'success',
          message: 'deleted Successfully',
        };
        commit('OVERLAY_OFF', null, { root: true });
        commit('SET_ALERT', alert, { root: true });
      })
      .catch((error) => {
        const alert = {
          alert: true,
          type: 'error',
          message: error.message ? 'failed to delete' : 'Oops An error ocurred',
        };
        commit('OVERLAY_OFF', null, { root: true });
        commit('SET_ALERT', alert, { root: true });
      });
  },
};
