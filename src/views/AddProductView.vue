<template lang="pug">
.columns.is-multiline(style="padding-top: 22px;")
  .column.is-12
    .box.has-background-dark
      p.title.has-text-white
        | Add Product
  .column.is-9
    form.box.has-background-dark
      .field
        label.label.has-text-light Product Name
          span.has-text-danger *
        .control
          input.input.dark(type="text" placeholder="e.g. Apple iPhone X" v-model="product.name")

      .field
        label.label.has-text-light Product Price
        .control
          input.input.dark(type="text" placeholder="e.g. $999.99" v-model="product.price")
      
      .field
        label.label.has-text-light Product Quantity
        .control
          input.input.dark(type="number" placeholder="e.g. 1" v-model="product.quantity")

      .field
        label.label.has-text-light Product Tags
        .control
          input.input(type="text" data-type="tags" data-tag-class="is-success" data-placeholder="e.g. Apple, iPhone, X")

      //.field
        label.label.has-text-light Product Tags
        .tagsfield.input.is-grouped.is-grouped-multiline
          div
            input(type="hidden" v-model="product.tags")
            span(placeholder="e.g. Apple, iPhone, X" contenteditable)
      
      .field
        label.label.has-text-light Product Image
        .control
          input.input.dark(type="url" placeholder="e.g. https://www.apple.com/iphone/x/images/hero_overview/iphone-x-silver-select-2018_hero.jpg" v-model="product.image")

      .field
        label.label.has-text-light Product Store Page
        .control
          input.input.dark(type="url" placeholder="e.g. https://www.apple.com/iphone/x" v-model="product.link")

      .field
        label.label.has-text-light Product Specification Page
        .control
          input.input.dark(type="url" placeholder="e.g. https://www.apple.com/iphone/x/specs/" v-model="product.specs")

  ProductCard(:product="{ name: productName, price: productPrice, quantity: quantity, timestamp: timestamp, tags: productTags, image: productImage, link: productLink, specs: productSpecs }" style="padding-top: 42px;")

</template>

<style lang="sass" scoped>
  .control .input.dark
    background-color: rgba(0, 0, 0, .1)
    border-color: rgba(0, 0, 0, .2)
    color: rgba(255, 255, 255, .8)
    
    &::placeholder
      color: rgba(255, 255, 255, .5)

    &:hover, &:focus
      background-color: rgba(0, 0, 0, .2)
      border-color: rgba(0, 0, 0, .3)
      box-shadow: 0 0 0 .125em rgba(72, 72, 72, .5)
</style>

<script>
import moment from 'moment'
import BulmaTagsInput from '@creativebulma/bulma-tagsinput';
import ProductCard from '@/components/ProductCard.vue'

export default {
  name: 'AddProductView',
  components: {
    ProductCard
  },
  data() {
    return {
      product: {
        name: '',
        price: '',
        quantity: 0,
        timestamp: moment(new Date()).format('ll'),
        tags: [],
        image: '',
        link: '',
        specs: ''
      }
    }
  },
  computed: {
    productName() {
      return this.product.name !== '' ? this.product.name : 'Example Product';
    },
    productPrice() {
      return this.product.price !== '' ? this.product.price : '$100.00';
    },
    quantity() {
      return this.product.quantity !== '' ? this.product.quantity : 0;
    },
    timestamp() {
      return this.product.timestamp;
    },
    productTags() {
      return this.product.tags.length ? this.product.tags : [ 'exampleTag1', 'exampleTag2' ];
    },
    productImage() {
      return this.product.image !== '' ? this.product.image : 'https://bulma.io/images/placeholders/640x360.png';
    },
    productLink() {
      return this.product.link !== '' ? this.product.link : 'https://www.gaycookie.dev/';
    },
    productSpecs() {
      return this.product.specs !== '' ? this.product.specs : 'https://www.gaycookie.dev/';
    }
  },
  mounted() {
    const tag_input = new BulmaTagsInput('input[data-type="tags"]');

    tag_input.on('after.add', (tag) => {
      this.product.tags.push(tag.item);
    });

    tag_input.on('after.remove', (tag) => {
      this.product.tags.splice(this.product.tags.indexOf(tag.item), 1);
    });

  }
}
</script>