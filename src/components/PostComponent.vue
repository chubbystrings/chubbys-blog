<template>
<v-container style="">
  <transition
  appear
  mode="out-in"
  enter-active-class="animated fadeIn"
  leave-active-class="animated fadeOut"
  >
  <v-row >
    <v-col cols="12" class="ma-auto">
      <v-card
        style="width: 95vw"
        class="mx-auto"
        outlined
        color="transparent"
        elevation="5"
        :loading="!loadArticle"
      >
        <v-list-item>
          <v-list-item-avatar color="grey"></v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title
            class="headline">{{article.title
             ? article.title.toUpperCase() : ''}}</v-list-item-title>
            <v-list-item-subtitle>by {{article.author}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-card-text class="subheader pa-8">
          {{ article.content }}
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
  </transition>
</v-container>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data: () => ({
    loading: false,
    selection: 1,
  }),

  computed: {
    ...mapState(['article', 'articles']),
    loadArticle() {
      return this.article.title !== '';
    },
  },
  methods: {
    goBack() {
      this.$router.push({ name: 'Home' });
      this.$store.commit('UNSET_ARTICLE');
    },
  },

  async created() {
    this.$store.commit('OVERLAY_ON');
    this.$store.dispatch('getArticle', this.$route.params.id);
  },
};
</script>
<style scoped>
@import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css";
.fullWidth {
  width: 100%;
  height: 100vh;
}
.postPage {
  transition: all 1s ease-in;
}
</style>
