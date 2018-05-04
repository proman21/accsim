<template lang="pug">
div
  p Current: {{inventory.lastPeriod}}
  b-form(inline validated)
    label(for="supply-edit") Order:
    b-input#supply-edit(
      v-model.number="order"
      type="number"
      min="0"
      required
      :plaintext='!editing'
    )
  div
    b-button(
      :variant="editing ? 'primary' : 'outline-primary'"
      @click="toggleEdit"
      ) {{ editing ? 'Done' : 'Edit'}}
</template>

<script>
export default {
  name: "product-supply",
  props: {
    id: String,
    inventory: Object
  },
  data () {
    return {
      order: this.inventory.thisPeriod,
      editing: false
    }
  },
  methods: {
    toggleEdit() {
      if (this.editing) {
        this.$emit('supplyEdit', this.id, this.order)
        this.editing = false
      } else {
        this.editing = true
      }
    }
  }
}
</script>

<style scoped>
#supply-edit {
  width: 5em;
}

input[type='number'] {
  -moz-appearance:textfield;
}
</style>
