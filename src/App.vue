<template>
  <v-app style="background-color: #F3E5F5">
    <base-alert />
    <base-overlay />
    <core-app-bar />

    <core-view />

    <core-footer />
  </v-app>
</template>

<script>

const fb = require('./firebaseConfig.js');

export default {
  name: 'App',

  components: {
    CoreFooter: () => import('@/components/core/Footer'),
    CoreAppBar: () => import('@/components/core/AppBar'),
    CoreView: () => import('@/components/core/View'),
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
