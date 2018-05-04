<template lang="pug">
div
  b-form(inline novalidate)
    label(for="price-edit") Price: $
    b-input#price-edit(
      v-model="editedPrice"
      type="text"
      required
      :state='validPrice'
      :plaintext='!editing'
      :formatter="formatPrice"
      lazy-formatter
    )
  div
    b-button(
      :variant="editing ? 'primary' : 'outline-primary'"
      @click="toggleEdit"
      ) {{ editing ? 'Done' : 'Edit'}}
</template>

<script>
export default {
  name: "product-price",
  props: {
    id: String,
    price: Number
  },
  data () {
    return {
      editedPrice: this.formatPrice(this.price),
      editing: false
    }
  },
  computed: {
    validPrice () {
      let price = Number.parseFloat(this.editedPrice)
      return !Number.isNaN(price) && price > 0
    }
  },
  methods: {
    formatPrice(value) {
      let price = value
      if (!(value instanceof Number)) {
        price = Number.parseFloat(value)
        if (Number.isNaN(price)) {
          return value
        }
      }
      return price.toFixed(2)
    },
    toggleEdit() {
      if (this.editing) {
        if (this.validPrice) {
          this.$emit('priceEdit', this.id, Number.parseFloat(this.editedPrice))
          this.editing = false
        }
      } else {
        this.editing = true
      }
    }
  }
}
</script>

<style scoped>
#price-edit {
  width: 5em;
}

input[type='number'] {
  -moz-appearance:textfield;
}
</style>
