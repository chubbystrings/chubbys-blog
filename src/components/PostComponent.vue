<template>
<v-container v-if="!loading">
  <transition
  appear
  mode="out-in"
  enter-active-class="animated fadeIn"
  leave-active-class="animated fadeOut"
  >
  <v-row no-gutters>
    <v-col cols="3" class="hidden-md-and-down borderClassForSideBar" >
      <v-card
        width="256"
        class="mx-auto"
        style="height: 80vh; overflow: auto;"
        v-if="!loading"
        color="transparent"
        outlined
      >
        <v-navigation-drawer permanent color="transparent">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="title primary--text">
                Other Stories
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider class="primary pa-1 rounded--divider"></v-divider>

          <v-list
            dense
            nav
          >
            <v-list-item
              v-for="item in articles"
              :key="item.id"
              link
              @click="linkClick(item)"
              :class="{activeLink: item.id === postId}"
            >
              <v-list-item-icon>
                <v-icon color="primary">mdi-sign-direction-plus</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                  <v-list-item-title :class="{'primary--text': item.id !== postId}">
                    {{ item.title }}
                  </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
      </v-card>
    </v-col>
    <v-col cols="12" class="ma-auto borderClassForMain" md="12" sm="12" lg="9" xs="12">
      <v-card
        rounded
        style="width: 95vw; height: 80vh; overflow: auto"
        class="mx-auto"
        outlined
        color="transparent"
        v-if="!loading"
      >
        <v-list-item class="">
          <v-list-item-avatar color="grey"></v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title
            class="headline font-weight-bold primary--text">{{article.title
             ? article.title.toUpperCase() : ''}}</v-list-item-title>
            <v-list-item-subtitle>by {{article.author}}
              {{ article.createdOn | formatDate}}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-card-text class="text-subtitle-1 font-weight-bold text-justify">
          {{ formatContent }}
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
  </transition>
</v-container>
</template>

<script>
import moment from 'moment';

export default {
  data: () => ({
    loading: true,
    selection: 1,
  }),

  computed: {
    article() {
      return this.$store.getters['posts/getArticle'];
    },
    articles() {
      const posts = this.$store.getters['posts/getArticles'];
      if (posts && posts.length > 8) {
        return posts.splice(0, 8);
      }
      return posts;
    },
    loadArticle() {
      return this.article.title !== '';
    },

    postId() {
      return this.$route.params.id;
    },

    formatContent() {
      if (this.article.content) {
        const newArr = this.article.content.split(' ');
        const firstWord = newArr[0].toUpperCase();
        newArr.shift();
        newArr.unshift(firstWord);
        return newArr.join(' ');
      }
      return '';
    },
  },
  methods: {
    loadData() {
      this.$store.dispatch('posts/getArticle', this.$route.params.id)
        .then(() => {
          this.$store.dispatch('posts/getArticles');
          this.loading = false;
        });
    },
    goBack() {
      this.$router.push({ name: 'Home' });
      this.$store.commit('posts/UNSET_ARTICLE');
    },

    linkClick(link) {
      if (this.$route.params.id !== link.id) {
        this.$router.push({ name: 'Post', params: { id: link.id } });
      }
    },
  },

  filters: {
    formatDate(date) {
      if (date) {
        const newDate = date.seconds * 1000;
        return moment(newDate).format('D/MM/YY, h:mm a');
      }

      return '';
    },
  },

  created() {
    this.$store.commit('OVERLAY_ON', null, { root: true });
    this.loadData();
  },

  watch: {
    $route() {
      this.loadData();
    },
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
.activeLink {
  background-color: #607D8B;
}

.borderClassForSideBar {
  border: 3px solid #607D8B;
}

.borderClassForMain {
  border-top: 3px solid #607D8B;
  border-bottom: 3px solid #607D8B;
  border-left: 3px solid #607D8B;
  border-right: 4px solid #607D8B;
}

.rounded--divider {
  border-radius: 10px;
}

</style>
