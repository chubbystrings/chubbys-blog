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
    ...mapState(['showLoginForm']),
    checkRoutes() {
      return this.$route.name === 'Home' || this.$route.name === 'Post';
    },
    currentUser() {
      return this.$store.getters['users/getCurrentUser'];
    },
  },

  components: {
    CoreFooter: () => import('@/components/core/Footer'),
    CoreView: () => import('@/components/core/View'),
    CoreDrawer: () => import('@/components/core/Drawer'),
    blogBar: () => import('@/components/blogAppbar'),
    adminBar: () => import('@/components/adminAppbar'),
  },

  async created() {
    fb.auth.onAuthStateChanged((user) => {
      if (user && !this.currentRoute) {
        this.$store.commit('users/SET_CURRENT_USER', user);
        this.$store.dispatch('users/fetchUserProfile');
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

/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #B0BEC5;
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #555;
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #607D8B;;
}

</style>
