<template>
<v-hover
v-slot:default="{ hover }"
>
  <v-card
  outlined
    :elevation=" hover ?  20 : 5"
    flat
    tile
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot />
  </v-card>
</v-hover>
</template>

<script>
export default {
  name: 'BaseCard',
};
</script>
