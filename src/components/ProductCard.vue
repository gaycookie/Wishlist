<template lang="pug">
.column.is-12-mobile.is-4-tablet.is-3-desktop
  .card.has-background-dark.has-text-light
    .card-image
      figure.image.is-16by9
        img.card-img-top(:src="product.image" :alt="product.name")
    .card-content
      p.title.has-text-light.is-4(style="margin-top: -5px;" :title="product.name") {{ quantity }}{{ product.name }}
      ul.list-group
        li.list-group-item.has-text-light.is-flex.is-justify-content-space-between.is-align-items-center
          p {{ product.price }} 
            span.has-text-muted ({{ timestamp }})
          i.fas.fa-money-bill.ml-1
        li.list-group-item.has-text-light.is-flex.is-justify-content-space-between.is-align-items-center
          p.product-tags
            a.has-text-light(v-for="tag in product.tags" :key="tag" @click="$store.commit('setSearch', tag)") {{ tag }}
          i.fas.fa-tag.ml-1
    .buttons.has-addons.is-flex.is-justify-content-space-between.menu
      a.button.is-dark.has-tooltip-bottom(data-tooltip="View product on store" target="_blank" :href="product.link")
        i.fas.fa-shopping-bag.has-text-light
      a.button.is-dark.has-tooltip-bottom(data-tooltip="Open specifications page" target="_blank" :href="product.specs")
        i.fas.fa-clipboard-list.has-text-light
      router-link.button.is-dark.has-tooltip-bottom(data-tooltip="Edit this product" :to="'/products/edit/' + product.id")
        i.fas.fa-edit.has-text-light
      a.button.is-dark.has-tooltip-bottom(data-tooltip="Delete this product" @click="deleteProduct(product.id)")
        i.fas.fa-trash-alt.has-text-danger
</template>

<style lang="sass" scoped>
  .card
    display: inline-block
    position: relative
    width: 100%
    margin-bottom: 32px
    padding-bottom: 3px

  .card p
    text-overflow: ellipsis
    overflow: hidden
    white-space: nowrap

  .card .product-tags a + a:before
    content: ", "

  .card .menu
    border-top: 1px dotted rgba(255, 255, 255, 0.2)
    margin-bottom: -11px

  .card .menu .button
    width: 25%

  .card .card-image 
    transform: scale(1)
    transition: all 1s cubic-bezier(0.25, 0.8, 0.25, 1)
    position: relative
    overflow: hidden
    margin-left: 15px
    margin-right: 15px
    margin-top: -30px
    border-radius: 6px
    box-shadow: 0 16px 38px -12px rgba(0, 0, 0, 0.56), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)

  .card .card-image:hover
    transform: scale(1.05)
    transition: all 1s cubic-bezier(0.25, 0.8, 0.25, 1)

  .card .card-image img
    width: 100%
    height: 100%
    object-fit: cover

  .card .list-group li:not(:last-child)
    margin-bottom: 5px

  .card .list-group li:not(:first-child)
    padding-top: 5px
    border-top: 1px solid rgba(255, 255, 255, 0.2)

  .card .button
    border-top-right-radius: 0
    border-top-left-radius: 0
</style>

<script>
import moment from 'moment';
import Swal from 'sweetalert2';
import '@sweetalert2/theme-bulma/bulma.min.css';
import '@creativebulma/bulma-tooltip/dist/bulma-tooltip.min.css';

export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  methods: {
    deleteProduct(product) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, yeet it!',
        buttonsStyling: false,
        customClass: {
          confirmButton: 'button is-danger',
          cancelButton: 'button is-light ml-2',
        }
      }).then((result) => {
        if (result.value) {
          console.log(product)
          //this.$emit('delete-product', product)
        }
      });
    }
  },
  computed: {
    timestamp() {
      return moment(this.product.timestamp).format('ll');
    },
    quantity() {
      return this.product.quantity > 1 ? '(x' + this.product.quantity + ') ' : '';
    },
  }
}
</script>