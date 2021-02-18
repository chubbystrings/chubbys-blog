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
        v-for="(link, i) in links"
        :key="i"
        @click="onClick(link)"
      >
        <v-list-item-action>
            <v-icon color="primary">{{link.icon}}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="text-color">
                 {{link.name}}
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

      },

      {
        name: 'Create User',
        type: 'route',
        to: 'CreateUser',
        icon: 'mdi-account-plus',

      },

      {
        name: 'Posts',
        type: 'route',
        to: 'Posts',
        icon: 'mdi-note-plus',

      },

      {
        name: 'Users',
        type: 'route',
        to: 'Users',
        icon: 'mdi-account-plus',
      },

      {
        name: 'Logout',
        type: 'button',
        event: 'logout',
        icon: 'mdi-logout',

      },

      {
        name: 'Back to Blog',
        type: 'route',
        to: 'Home',
        icon: 'mdi-home',

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
  },

  methods: {

    onClick(link) {
      if (link.type === 'route') {
        if (this.currentRoute === link.to) {
          return;
        }

        this.$router.push({ name: link.to });
      }

      if (link.type === 'button') {
        this.$store.dispatch(link.event);
      }
    },
  },
};
</script>
