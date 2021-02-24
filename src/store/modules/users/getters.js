import { auth } from '../../../firebaseConfig';

export default {
  isAuthenticated() {
    return auth.currentUser !== null;
  },

  getCurrentUser(state) {
    return state.currentUser;
  },

  getUserProfile(state) {
    return state.userProfile;
  },
};
