<template>
  <h3
    class="subheading text-uppercase font-weight-medium mb-1 primary--text"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot />
  </h3>
</template>

<script>
export default {
  name: 'BaseSubheading',
};
</script>
