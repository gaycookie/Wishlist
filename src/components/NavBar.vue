<template lang="pug">
nav.navbar.is-link.is-fixed-top(role="navigation" aria-label="main navigation")
  .container
    .navbar-brand
      .navbar-burger(@click="showNav = !showNav" :class="{ 'is-active': showNav }")
        span(aria-hidden="true")
        span(aria-hidden="true")
        span(aria-hidden="true")
    .navbar-menu(v-bind:class="{ 'is-active' : showNav }")
      .navbar-start
        router-link.navbar-item(to="/" :class="{ 'is-active' : $route.path === '/' }" @click.native="$store.commit('setSearch', '')") 
          i.fa.fa-home
        router-link.navbar-item(to="/products/add" :class="{ 'is-active' : $route.path === '/products/add' }") Add product
        router-link.navbar-item(to="/collection/manage" :class="{ 'is-active' : $route.path === '/collection/manage' }") Manage collection
      .navbar-end
        .navbar-item.field
          .control.has-icons-left.clearable-input
            input.search.input(type="search" placeholder="Search..." ref="search")
            i(data-clear-input @click="clearSearch()" :class="{ 'has-text-muted' : !hasInput }") &times;
            span.icon.is-small.is-left
              i.fas.fa-search
</template>

<style lang="sass" scoped>
  .search
    width: 250px
    transition: width .5s ease-in-out
    background-color: rgba(0, 0, 0, .1)
    border-color: rgba(0, 0, 0, .2)
    color: rgba(255, 255, 255, .8)
    
    &::placeholder
      color: rgba(255, 255, 255, .5)

  .search:hover, .search:focus
    background-color: rgba(0, 0, 0, .2)
    border-color: rgba(0, 0, 0, .3)
    box-shadow: 0 0 0 .125em rgba(72, 72, 72, .5)

  .search:focus, .search:active
    width: 400px
    transition: width .5s ease-in-out

  .clearable-input
    position: relative
    display: inline-block

  .clearable-input > input
    padding-right: 2.7em

  .clearable-input > [data-clear-input]
    position: absolute
    top: 0
    right: 0
    font-weight: bold
    font-size: 1.4em
    padding: 0 0.70em
    line-height: 1.65em
    cursor: pointer

  .clearable-input > input::-ms-clear
    display: none
</style>

<script>
export default {
  data() {
    return {
      showNav: false
    }
  },
  watch: {
    '$store.state.search': function() {
      this.$refs.search.value = this.$store.state.search;
    }
  },
  methods: {
    clearSearch() {
      this.$store.commit('setSearch', '');
    }
  },
  computed: {
    hasInput() {
      return this.$store.state.search.length > 0;
    }
  },
  mounted() {
    this.$refs.search.addEventListener('keyup', () => {
      this.$store.commit('setSearch', this.$refs.search.value);
    });
  }
}
</script>