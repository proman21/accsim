<template lang="pug">
  div
    b-navbar(toggleable="md" type="dark" variant="primary")
      b-navbar-brand ACCSIM
      b-nav-text Trial
      b-navbar-nav.ml-auto
          b-button.mx-2(v-if="step == 'decisions'"
            variant="success"
            right
            @click="simulateTrading") Simulate Trading
          b-button.mx-2(v-else
            variant="success"
            right) Start Next Session
          b-button.mx-2(variant="danger" to="/" right) Exit
    b-container
      decisions(v-if="step == 'decisions'")
      results(v-else)
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Decisions from './Decisions.vue'
import Results from './Results.vue'

export default {
  name: "Simulator",
  components: {
    Decisions,
    Results
  },
  computed: {
    ...mapState({
      step: state => state.simulator.step
    })
  },
  methods: {
    ...mapMutations([
      "simulateTrading"
    ])
  }
}
</script>

<style scoped>

</style>
