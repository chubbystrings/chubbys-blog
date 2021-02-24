<template>
  <v-navigation-drawer
    :value="drawer"
    app
    dark
    temporary
    v-if="adminPath"
  >
    <v-list>
      <v-list-item
        @click="onClick('route', 'Dashboard')"
      >
        <v-list-item-action >
            <v-icon color="primary">mdi-view-dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="text-color">
                 Dashboard
            </v-list-item-title>
          </v-list-item-content>
      </v-list-item>
      <v-list-item
      v-if="superuserTypeLink"
        @click="onClick('route', 'CreateUser')"
      >
        <v-list-item-action >
            <v-icon color="primary">mdi-account-plus</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="text-color">
                 Create New User
            </v-list-item-title>
          </v-list-item-content>
      </v-list-item>
      <v-list-item
        @click="onClick('route', 'Posts')"
      >
        <v-list-item-action >
            <v-icon color="primary">mdi-note-plus</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="text-color">
                 User Articles
            </v-list-item-title>
          </v-list-item-content>
      </v-list-item>
      <v-list-item
      v-if="superuserTypeLink"
        @click="onClick('route', 'Users')"
      >
        <v-list-item-action >
            <v-icon color="primary">mdi-account-plus</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="text-color">
                 Users
            </v-list-item-title>
          </v-list-item-content>
      </v-list-item>
      <v-list-item
        @click="onClick('event', 'users/logout')"
      >
        <v-list-item-action >
            <v-icon color="primary">mdi-logout</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="text-color">
                 Logout
            </v-list-item-title>
          </v-list-item-content>
      </v-list-item>
      <v-list-item
        @click="onClick('route', 'Home')"
      >
        <v-list-item-action >
            <v-icon color="primary">mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="text-color">
                 Back To Blog
            </v-list-item-title>
          </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
// Utilities

export default {
  name: 'CoreDrawer',
  data: () => ({
    links: [
      {
        name: 'Dashboard',
        type: 'route',
        to: 'Dashboard',
        icon: 'mdi-view-dashboard',
        user: ['admin', 'superuser'],

      },

      {
        name: 'Create User',
        type: 'route',
        to: 'CreateUser',
        icon: 'mdi-account-plus',
        user: ['superuser'],
      },

      {
        name: 'Posts',
        type: 'route',
        to: 'Posts',
        icon: 'mdi-note-plus',
        user: ['admin', 'superuser'],

      },

      {
        name: 'Users',
        type: 'route',
        to: 'Users',
        icon: 'mdi-account-plus',
        user: ['superuser'],
      },

      {
        name: 'Logout',
        type: 'button',
        event: 'logout',
        icon: 'mdi-logout',
        user: ['admin', 'superuser'],
        module: 'users',

      },

      {
        name: 'Back to Blog',
        type: 'route',
        to: 'Home',
        icon: 'mdi-home',
        user: ['admin', 'superuser'],
      },
    ],
  }),

  computed: {
    currentRoute() {
      return this.$route.name;
    },

    adminPath() {
      return this.$route.path.includes('cms');
    },

    drawer() {
      return this.$store.getters.getDrawer;
    },

    userProfile() {
      return this.$store.getters['users/getUserProfile'];
    },

    superuserTypeLink() {
      return this.userProfile.role === 'superuser';
    },
  },

  methods: {

    onClick(type, name) {
      if (type === 'route') {
        if (this.currentRoute === name) {
          return;
        }

        this.$router.push({ name });
      }

      if (type === 'button') {
        if (name === 'logout') {
          this.$store.dispatch(name)
            .then(() => {
              this.$router.push({ name: 'Login' });
            });
        } else {
          this.$store.dispatch(name);
        }
      }
    },
  },
};
</script>
