<template>
  <v-app-bar
    app
    flat
    color="accent"
  >

    <v-container class="mx-auto py-0">
      <v-row align="center">
        <v-avatar>
        <v-img
          :src="require('@/assets/logo.png')"
          class=""
          @click="$vuetify.goTo(0)"
        />
        </v-avatar>
        <v-btn
        v-if="isAuth"
        icon
        small
        to="/cms/dashboard"
        >
        <v-icon color="primary">mdi-account-circle</v-icon>
        </v-btn>
        <v-spacer />
        <transition
        appear
        mode="out-in"
        enter-active-class="animated fadeInLeftBig"
        leave-active-class="animated fadeOut"
        >
        <v-text-field
        v-model="searchWord"
          append-icon="mdi-magnify"
          flat
          hide-details
          solo-inverted
          style="max-width: 300px;"
          label="Search blog"
          rounded
          dense
          v-if="homeRoute"
          @input="search"
        />
        </transition>
         <base-btn
          class="ml-3"
          color="primary"
          @click="goBack"
          v-if="postRoute"
          style=""
        >
          <v-icon>mdi-arrow-left</v-icon>
        </base-btn>
        <v-btn
        v-if="loginRoute && !homeRoute"
        text
        to="/"
        >
        Go to blog
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
    searchWord: '',
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
    currentUser() {
      return this.$store.getters['users/getCurrentUser'];
    },
    articles() {
      return this.$store.getters.getArticles;
    },
    postRoute() {
      return this.$route.name === 'Post';
    },
    loginRoute() {
      return this.$route.name === 'Login';
    },

    homeRoute() {
      return this.$route.name === 'Home';
    },

    isAuth() {
      return this.$store.getters['users/isAuthenticated'] && !this.$route.path.includes('cms');
    },
  },

  methods: {
    goBack() {
      this.$router.push({ name: 'Home' });
      this.$store.commit('posts/UNSET_ARTICLE');
    },
    search() {
      this.$store.commit('posts/SEARCH_ARTICLES', this.searchWord);
    },
  },
};
</script>
<style>
@import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css";
</style>
