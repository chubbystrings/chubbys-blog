<template>
  <div>
    <blog-bar v-if="!currentUser || checkRoutes" />
    <admin-bar  v-else />
  </div>
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
    ...mapState(['showLoginForm']),
    checkRoutes() {
      return this.$route.name === 'Home' || this.$route.name === 'Post';
    },
    currentUser() {
      return this.$store.getters['users/getCurrentUser'];
    },
  },

  components: {
    blogBar: () => import('../blogAppbar'),
    adminBar: () => import('../adminAppbar'),
  },
};
</script>
