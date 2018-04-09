<template lang="pug">
  div
    h1 {{name}}
      small.text-muted  {{roundName}}
    b-card(no-body)
      b-tabs(card)
        b-tab(title="Products")
          products
        b-tab(title="Inventory")
          inventory
        b-tab(title="Bank")
</template>

<script>
import { mapState } from 'vuex'
import Products from "./components/Products.vue"
import Inventory from "./components/Inventory.vue"

export default {
  name: 'decisions',
  components: {
    Products,
    Inventory
  },
  computed: {
    roundName () {
      let start_year = this.$store.state.business.start_year
      let round = this.$store.state.simulator.round
      let year = start_year + (round / 2)
      let period = (round % 2) + 1;
      return `${year} Q${period}`
    },
    ...mapState({
      name: state => state.business.name
    })
  }
}
</script>

<style>

</style>
