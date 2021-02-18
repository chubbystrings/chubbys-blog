<template>
  <v-app-bar
    app
    flat
    color="primary"
    v-if="currentUser"
    elevation="5"
  >
    <v-app-bar-nav-icon
      class="hidden-md-and-up"
      @click="bar"
      v-click-outside="outside"
    />

    <v-container class="mx-auto py-0">
      <v-row align="center">
        <v-btn
         to="/cms/dashboard"
          class="hidden-sm-and-down "
          text
          v-if="currentUser"
        >
        Dashboard
        </v-btn>
         <v-btn
         to="/cms/create-user"
         v-if="currentUser && userRole"
          class="hidden-sm-and-down "
          text
        >
        Create User
        </v-btn>
        <v-btn
         to="/cms/posts"
         v-if="currentUser"
          class="hidden-sm-and-down "
          text
        >
        Posts
        </v-btn>
        <v-btn
         to="/cms/users"
         v-if="currentUser && userRole"
          class="hidden-sm-and-down "
          text
        >
        Users
        </v-btn>
         <v-btn
         @click="logout"
         v-if="currentUser"
          class="hidden-sm-and-down"
          text
        >
        logout
        </v-btn>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script>
// Utilities
import { mapState } from 'vuex';

export default {
  name: 'CoreAppBar',
  data: () => ({
    items: [
      {
        href: '#!',
        icon: 'mdi-twitter',
      },
      {
        href: '#!',
        icon: 'mdi-instagram',
      },
      {
        href: '#!',
        icon: 'mdi-facebook',
      },
    ],
  }),
  computed: {
    ...mapState(['currentUser']),

    userRole() {
      let user = '';
      if (this.$store.state.userProfile) {
        user = this.$store.state.userProfile.role;
      }

      return user === 'superuser';
    },
    loginRoute() {
      return this.$route.name === 'Login';
    },
  },

  methods: {
    logout() {
      this.$store.dispatch('logout');
    },
    bar() {
      this.$store.commit('TOGGLE_DRAWER');
    },

    outside() {
      if (this.$store.getters.getDrawer) {
        this.$store.commit('TOGGLE_DRAWER');
      }
    },
  },
};
</script>
