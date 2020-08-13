<template>

  <v-container

    id="about"
    tag="section"
  >
  <v-divider class=""></v-divider>
  <v-avatar class="mt-1">
    <v-img
      :src="require('@/assets/logo.png')"
      class=""
      @click="$vuetify.goTo(0)"
    />
    </v-avatar>
    <base-subheading>About Me</base-subheading>

    <p>
      My name is Okowr Emeka,
      a seasoned blogger and a web developer.
      I love javascript, python and playing the guitar.
    </p>
  </v-container>
</template>

<script>
export default {
  name: 'HomeAbout',
};
</script>
<style>
.theme--light.v-divider {
    border-color: #607D8B !important;
}
</style>
