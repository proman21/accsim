<template lang="pug">
  div
    h1 {{ name }}
      small.text-muted  {{ roundName() }}
    b-card(no-body)
      b-tabs(card)
        b-tab(title="Products")
          products
        b-tab(title="Inventory")
          inventory
        b-tab(title="Bank")
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import Products from "./components/Products.vue"
import Inventory from "./components/Inventory.vue"

export default {
  name: 'decisions',
  components: {
    Products,
    Inventory
  },
  computed: {
    ...mapState({
      name: state => state.business.name
    })
  },
  methods: {
    ...mapGetters([
      "roundName"
    ])
  }
}
</script>

<style>

</style>
