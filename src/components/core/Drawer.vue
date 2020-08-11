<template>
  <v-navigation-drawer
    v-model="drawer"
    app
    dark
    temporary
  >
    <v-list>
      <v-list-item
        v-for="(link, i) in links"
        :key="i"
        :to="link.to"
        :href="link.href"
        @click="onClick($event, link)"
      >
        <v-list-item-title v-text="link.text" />
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
// Utilities

export default {
  name: 'CoreDrawer',

  computed: {

  },

  methods: {

  },
};
</script>
