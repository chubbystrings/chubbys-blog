<template>
  <base-card dark>
    <v-img
      :src="require('@/assets/articles/blurcamera.jpg')"
      class="grey lighten-2"
      height="200"
      width="100%"
    >
      <v-row
        class="fill-height pa-3"
        align="center"
      >
        <v-col
          cols="12"
        >
          <h1 @click="goHome" class="display-2 text-center font-weight-bold primary--text">
            Welcome to Chubby's Blog
          </h1>

          <div class="subheading text-uppercase text-center pl-2 mb-4">
            An unbaised mind....
          </div>
        </v-col>
      </v-row>
    </v-img>
  </base-card>
</template>

<script>
export default {
  name: 'HomeBanner',

  methods: {
    goHome() {
      if (this.$route.name !== 'Home') {
        this.$router.go();
      }
    },
  },
};
</script>
