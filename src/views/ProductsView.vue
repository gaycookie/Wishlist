<template lang="pug">
.columns.is-multiline#items
  ProductCard(v-for="product in products" :key="product.name" :product="product")
</template>

<style lang="sass" scoped>
  #items
    padding-top: 48px
</style>

<script>
import ProductCard from '../components/ProductCard.vue'

export default {
  name: 'ProductsView',
  components: {
    ProductCard
  },
  computed: {
    products() {
      return this.$store.state.products.filter(product => {
        if (this.$store.state.search === '') return true;
        return product.tags.some(tag => tag.toLowerCase().includes(this.$store.state.search.toLowerCase())) || product.name.toLowerCase().includes(this.$store.state.search.toLowerCase());
      })
    }
  }
}
</script>
