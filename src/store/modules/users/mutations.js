export default {
  SET_CURRENT_USER(state, val) {
    state.currentUser = val;
  },
  SET_USER_PROFILE(state, val) {
    state.userProfile = val;
  },

  SET_USER_TOKEN(state, val) {
    state.token = val;
  },
};
