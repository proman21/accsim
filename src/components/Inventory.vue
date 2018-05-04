<template lang="pug">
  b-card-group
    product-card(v-for="(p, id) in products"
      :key="id"
      :title="p.title"
      :img="p.img"
    )
      product-supply(:id="id", :inventory="p.inventory", @supplyEdit="editInventory")
</template>

<script>
import { mapState } from 'vuex'
import ProductCard from './ProductCard.vue'
import ProductSupply from './ProductSupply.vue'

export default {
  name: 'inventory',
  components: {
    ProductCard,
    ProductSupply
  },
  computed: {
    ...mapState({
      products: state => state.business.products
    })
  },
  methods: {
    editInventory (id, order) {
      this.$store.commit('changeInventorySupply', {id, order})
    }
  }
}
</script>

<style scoped>

</style>
