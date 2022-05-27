<template lang="pug">
#app
  NavBar
  section.container
    router-view
</template>

<style lang="sass" scoped>
  section.container
    padding-top: 58px
</style>

<script>
import NavBar from './components/NavBar.vue'

export default {
  components: {
    NavBar
  },
  beforeMount() {
    this.$store.dispatch('getFromLocalStorage');
  }
}
</script>