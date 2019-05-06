<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  mounted() {
    this.getSingleton('profile');
  },
  computed: mapGetters({
    profile: 'singletons/profile',
  }),
  methods: mapActions({
    getSingleton: 'singletons/getSingleton',
  }),
};
</script>

<template>
  <div class="header">
    <div class="header__inner">
      <router-link class="link link--home" :to="{ name: 'home' }">Shannon Archer</router-link>
      <!-- <router-link :to="{ name: 'projects' }">Projects</router-link> -->
      <ul>
        <li v-if="profile.email" class="link link--email">
          <a :href="`mailto:${profile.email}`" target="_blank">
            <fa-icon icon="envelope"></fa-icon>
          </a>
        </li>
        <li v-if="profile.github" class="link link--github">
          <a :href="profile.github" target="_blank">
            <fa-icon :icon="['fab', 'github-alt']"></fa-icon>
          </a>
        </li>
        <li v-if="profile.instagram" class="link link--instagram">
          <a :href="profile.instagram" target="_blank">
            <fa-icon :icon="['fab', 'instagram']"></fa-icon>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="sass">
@import '../styles/global.sass'

.header
  background: $darkBackground
  width: 100%
  text-align: left
  padding: 0 3em

  &__inner
    max-width: 100%
    margin: auto
    display: flex
    flex-direction: row

    *:first-child
      flex: 1
      opacity: 

    @include respond-to('medium')
      max-width: $screen-m

  a
    @extend .heading-font
    font-size: 2em
    line-height: 3em

    text-decoration: none
    color: $lightForeground
  
  .link
    &--home a:hover
      opacity: 0.8
    &--github a:hover svg
      color: $orange
    &--email a:hover svg
      color: #d14836
    &--instagram a:hover svg
      color: #cd486b

  ul
    display: flex
    flex-direction: row
    margin: 0
    padding: 0
    list-style: none

    li a
      display: block
      padding: 0 0.7em
      
      svg
        margin: auto

</style>