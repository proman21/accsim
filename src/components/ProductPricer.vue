<template lang="html">
  <span class="product_pricer">
    <span>{{ title }}</span>
    <input type="text" name="price" required step="0.05" min="0" v-bind:value="roundedPrice.toFixed(2)">
  </span>
</template>

<script>
export default {
  props: {
    'title': String,
    'price': Number
  },
  computed: {
    roundedPrice: function() {
      return Math.round(this.price * 20) / 20
    }
  }
}
</script>

<style lang="css" scoped>

input[type='number'] {
  -moz-appearance:textfield;
}

</style>
