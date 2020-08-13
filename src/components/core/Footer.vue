<template>
  <v-footer
  fixed
  color="transparent"
  >
    <v-container class="mx-auto">
      <v-row>
        <v-col cols="9">
          <base-btn
            v-for="(item, i) in items"
            :key="i"
            :href="item.href"
            class="ml-0 mr-3"
            color="primary"
            target="_blank"
          >
            <v-icon v-text="item.icon" />
          </base-btn>
        </v-col>

        <v-spacer />

        <base-btn
        v-if="currentRoute"
          class="mr-0"
          title="Go to top"
          @click="$vuetify.goTo(0)"
        >
          <v-icon>mdi-chevron-up</v-icon>
        </base-btn>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  name: 'CoreFooter',

  data: () => ({
    items: [
      {
        href: 'https://twitter.com/chubby_code',
        icon: 'mdi-twitter',
      },
      {
        href: 'https://linkedin.com/in/emekaokwor',
        icon: 'mdi-linkedin',
      },
      {
        href: 'https://facebook.com/chubbystrings',
        icon: 'mdi-facebook',
      },
    ],
  }),

  computed: {
    currentRoute() {
      return this.$route.name === 'Home';
    },
  },
};
</script>
