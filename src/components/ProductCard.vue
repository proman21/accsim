<template lang="pug">
  b-card.product-card(:title="title" :img-src="absImg")
    slot
</template>

<script>
export default {
  name: "product-card",
  props: {
    'title': String,
    'img': String
  },
  computed: {
    absImg () {
      return `${process.env.BASE_URL}${this.img}`
    }
  }
}
</script>

<style lang="css" scoped>

</style>
