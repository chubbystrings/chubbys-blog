import axios from '../admin-auth';

const fb = require('../firebaseConfig.js');

export default {
  login: (payload) => fb.auth.signInWithEmailAndPassword(payload.email, payload.password),
  getToken: () => fb.auth.currentUser.getIdToken(),
  logout: () => fb.auth.signOut(),
  signup: (config, payload) => axios.post('/admin/signup', config, payload),
  createPost: (payload) => fb.postsCollection.add({
    createdOn: new Date(),
    title: payload.title,
    category: payload.category,
    content: payload.content,
    author_id: payload.userId,
    author: payload.userName,
  }),
  find_user_by_id: async (id) => {
    const userRef = fb.usersCollection.doc(id);
    const userDoc = await userRef.get();
    if (!userDoc) {
      return '';
    }
    return userDoc.data();
  },

  find_by_email: (email) => fb.usersCollection.where('email', '==', email).get(),
  suspend: (id, config) => axios.post(`/admin/${id}/suspend-user`, config),
  reactivate: (id, config) => axios.post(`/admin/${id}/reactivate-user`, config),
};
