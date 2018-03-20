<template>
  <div class="simulation">
    <h1>Round 1</h1>
    <div>
      <h2>Pricing</h2>
      <div class="products">
        <product-pricer v-for="p in products"
          :key="p.title"
          :title="p.title"
          :price="p.price"></product-pricer>
      </div>
    </div>
  </div>
</template>

<script>
import ProductPricer from "./components/ProductPricer";

export default {
  name: "Simulator",
  components: {
    ProductPricer
  },
  data: () => {
    return {
      products: [
        { title: "Luxury Product", price: 300.00 },
        { title: "Standard Product", price: 75.52 },
        { title: "Budget Product", price: 29.95 }
      ]
    }
  }
}
</script>

<style scoped>

</style>
