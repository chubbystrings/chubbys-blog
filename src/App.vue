<template>
  <v-app style="background-color: #ECEFF1">
    <base-alert />
    <base-overlay />
    <blog-bar v-if="!currentUser || checkRoutes" />
    <admin-bar   v-else />
    <core-drawer />
    <core-view />

    <core-footer />
  </v-app>
</template>

<script>
import { mapState } from 'vuex';

const fb = require('./firebaseConfig.js');

export default {
  name: 'App',

  computed: {
    ...mapState(['currentUser', 'showLoginForm']),
    checkRoutes() {
      return this.$route.name === 'Home' || this.$route.name === 'Post';
    },
  },

  components: {
    CoreFooter: () => import('@/components/core/Footer'),
    CoreView: () => import('@/components/core/View'),
    CoreDrawer: () => import('@/components/core/Drawer'),
    blogBar: () => import('@/components/blogAppbar'),
    adminBar: () => import('@/components/adminAppbar'),
  },

  created() {
    fb.auth.onAuthStateChanged((user) => {
      if (user && !this.currentRoute) {
        this.$store.commit('SET_CURRENT_USER', user);
        this.$store.dispatch('fetchUserProfile');
      }
    });
  },
};
</script>
<style>
.pagination--view {
  position: absolute;
  bottom: 0.4rem;
  left: 0;
  right: 0;
  z-index: 100;
}
.v-pagination__item, .v-pagination__navigation {
  outline: none !important;
}
</style>
