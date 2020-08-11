<template>
  <v-container class="pa-0">
    <base-subheading>Newest Blog Posts</base-subheading>

    <v-row
      v-for="(article, i) in articlesPage"
      :key="i"
      align="center"
      class="mb-2"
    >
      <v-col
        class="d-flex"
        cols="12"
      >
        <v-img
          :src="
          require(`@/assets/articles/${ jpegs[Math.floor(Math.random() * (jpegs.length - 1))]}`)"
          class="mr-3"
          height="36"
          max-width="36"
        />

        <div>
          <div class="subheading">
            {{article.title}}
          </div>

          <div class="caption">
            {{article.createdOn | formatDate }}
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// Utilities
import { mapState } from 'vuex';
import moment from 'moment';

export default {
  name: 'NewestPosts',
  data: () => ({
    jpegs: ['ruins.jpg', 'july4.jpg', 'lightcave.jpg', 'rain.jpg'],
    articlesPage: [],
  }),
  computed: {
    ...mapState(['articles']),
  },

  filters: {
    formatDate(date) {
      // eslint-disable-next-line no-underscore-dangle
      const newDate = date._seconds * 1000;
      return moment(newDate).format('MMMM Do YY, h:mm a');
    },
  },

  watch: {
    articles(val) {
      this.articlesPage = [val[0], val[1], val[2]];
    },
  },

};
</script>
