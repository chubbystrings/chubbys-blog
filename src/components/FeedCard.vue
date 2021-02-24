<template>
  <v-col
    cols="12"
    :md="size === 2 ? 6 : size === 3 ? 4 : undefined"
    style="cursor: pointer;"
  >
  <transition
  appear
  enter-active-class="animated fadeIn"
  leave-active-class="animated fadeOut"
  >
   <v-hover
      v-slot:default="{ hover }"
    >
    <div
    @click="view(value.id)"
    >
     <v-alert
      border="left"
      colored-border
      color="primary"
      :elevation="hover ? 10 : 2"
      style="height: 10rem;"
      prominent
    >
    <small class="cat-position ml-2">{{value.category}}
      <span class="ml-3">{{value.createdOn | formatDate}}</span>
    </small>
    <base-subheading>{{ value.title}}</base-subheading>
      {{ value.content | trimLength}}
       <div class="absolutePosition">
          <!-- <v-icon class="mr-2"> mdi-comment-outline</v-icon> -->
          <span class="mr-2">{{value.viewed}}</span>
         <v-icon> mdi-eye-outline</v-icon>
       </div>
    </v-alert>
    </div>
   </v-hover>
  </transition>
  </v-col>
</template>

<script>
import moment from 'moment';

export default {
  name: 'FeedCard',
  data: () => ({
    jpegs: ['ruins.jpg', 'july4.jpg', 'lightcave.jpg', 'rain.jpg'],
  }),
  props: {
    size: {
      type: Number,
      required: true,
    },
    value: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    randomJpegs() {
      const jpegs = ['ruins.jpg', 'july4.jpg', 'lightcave.jpg', 'rain.jpg'];

      const randomNum = Math.floor(Math.random() * (jpegs.length - 1));

      return jpegs[randomNum];
    },

    view(id) {
      this.$router.replace({ name: 'Post', params: { id } });
    },
  },

  filters: {
    formatDate(date) {
      // eslint-disable-next-line no-underscore-dangle
      const newDate = date.seconds * 1000;
      return moment(newDate).format('D/MM/YY, h:mm a');
    },
    upperCase(value) {
      return value.toUpperCase();
    },

    trimLength(val) {
      if (val.length < 200) { return val; }
      return `${val.substring(0, 100)}...`;
    },
  },
};
</script>

<style>
@import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css";
.v-image__image {
  transition: .3s linear;
}
.absolutePosition {
  position: absolute;
  bottom: 0.5rem;
  right: 0.5rem;

}
.cat-position {
  position: absolute;
  bottom: 0.5rem;
  left: 0.5rem;
}
</style>
