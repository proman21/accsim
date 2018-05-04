<template lang="pug">
  b-card-group
    product-card(v-for="(p, id) in products"
    :key="id"
    :title="p.title"
    :img="p.img")
      product-price(:id="p.id" :price="p.price" @priceEdit="editProduct")
</template>

<script>
import { mapState } from 'vuex'
import ProductCard from "./ProductCard.vue"
import ProductPrice from './ProductPrice.vue'

export default {
  name: 'products',
  components: {
    ProductCard,
    ProductPrice
  },
  computed: {
    ...mapState({
      products: state => state.business.products
    })
  },
  methods: {
    editProduct(id, price) {
      this.$store.commit('changeProductPrice', { id, price })
    }
  }
}
</script>

<style>

</style>
