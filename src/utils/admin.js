export default {
  userRole: () => {
    if (this.$store.state.userProfile && this.$store.state.userProfile.role === 'superuser') {
      return true;
    }
    return false;
  },
};
