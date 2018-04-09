<template lang="pug">
  div#app
    b-navbar(variant="primary" type="dark")
      b-navbar-brand ACCSIM
      b-nav-form
        b-button(variant="light") Logout
    b-container
      b-card-group(deck)
        b-card(header="Trial Version"
          border-variant="primary"
          header-bg-variant="primary"
          header-text-variant="white"
          align="center")
          p.card-text.
            You have an unlimited amount of attempts. These attempts do not
            affect your grade. The game operates almost the exact same as
            the real version.
          b-button(slot="footer" to="/trial") Start Trial Version
        b-card(header="Real Version"
          border-variant="primary"
          header-bg-variant="primary"
          header-text-variant="white"
          align="center")
          p.card-text.
            You have one attempt only. You have 50 minutes and that attempt
            is graded. The full system experience is delivered in this
            version.
          b-button(slot="footer" to="/real") Start Real Version
</template>

<script>
export default {
  name: 'app',
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
