<script>
export default {
  
}
</script>

<template>
  <div class="nav">
    <div class="nav__inner">
      <router-link :to="{ name: 'home' }">Shannon Archer</router-link>
      <!-- <router-link :to="{ name: 'projects' }">Projects</router-link> -->
    </div>
  </div class="nav">
</template>

<style lang="sass">
@import '../styles/global.sass'

.nav
  background: $darkBackground
  width: 100%
  text-align: left
  padding: 0 3em

  .nav__inner
    max-width: 100%
    margin: auto
    @include respond-to('medium')
      max-width: $screen-m

  a
    @extend .heading-font
    font-size: 2em
    line-height: 3em

    text-decoration: none
    color: $lightForeground

</style>