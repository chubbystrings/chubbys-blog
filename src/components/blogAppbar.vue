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
        <base-btn
          class="ml-3"
          color="primary"
          @click="goBack"
          v-if="postRoute"
          style="position: fixed; right: 0.8rem; z-index: 10;"
        >
          <v-icon>mdi-arrow-left</v-icon>
        </base-btn>
         <v-btn
        v-if="isAuth"
        text
        small
        to="/cms/dashboard"
        >
        admin
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
        <v-btn
        v-if="loginRoute"
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
    ...mapState(['currentUser', 'showLoginForm', 'articles']),

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
      return this.$store.getters.isAuthenticated && !this.$route.path.includes('cms');
    },
  },

  methods: {
    goBack() {
      this.$router.push({ name: 'Home' });
      this.$store.commit('UNSET_ARTICLE');
    },
    search() {
      this.$store.commit('SERACH_ARTICLES', this.searchWord);
    },
  },
};
</script>
<style>
@import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css";
</style>
