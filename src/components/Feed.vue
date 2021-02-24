<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <slot />
      </v-col>

      <feed-card
        v-for="(article) in paginatedArticles"
        :key="article.title"
        :size="layout"
        :value="article"
      />
    </v-row>

    <v-row align="center">
      <v-col cols="3">
        <base-btn
          v-if="page !== 1"
          class="ml-0"
          square
          title="Previous page"
          @click="page--"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </base-btn>
      </v-col>

      <v-col
        class="text-center primary--text subheading"
        cols="6"
      >
        PAGE {{ page }} OF {{ pages  }}
      </v-col>

      <v-col
        class="text-right"
        cols="3"
      >
        <base-btn
          v-if="pages > 1 && page < pages"
          class="mr-0"
          title="Next page"
          @click="page++"
        >
          <v-icon>mdi-chevron-right</v-icon>
        </base-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// Utilities

export default {
  name: 'Feed',

  components: {
    FeedCard: () => import('@/components/FeedCard'),
  },

  data: () => ({
    layout: 2,
    page: 1,
    numberPerPage: 8,
  }),

  computed: {
    articles() {
      return this.$store.getters['posts/getArticles'];
    },
    searchedArticles() {
      return this.$store.getters['posts/getSearchArticles'];
    },
    pages() {
      return Math.ceil(
        this.articles && this.articles.length > 0 ? this.articles.length / this.numberPerPage : 1,
      );
    },
    paginatedArticles() {
      if (this.searchedArticles) {
        const start = (this.page - 1) * this.numberPerPage;
        const stop = this.page * this.numberPerPage;

        return this.searchedArticles ? this.searchedArticles.slice(start, stop) : '';
      }
      const start = (this.page - 1) * this.numberPerPage;
      const stop = this.page * this.numberPerPage;

      return this.articles ? this.articles.slice(start, stop) : '';
    },
  },

  watch: {
    page() {
      window.scrollTo(0, 0);
    },
  },
};
</script>
