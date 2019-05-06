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
  <div class="footer">
    <div class="footer__location">
      <ul>
        <li v-if="profile.locationName" class="link link--map">
          <fa-icon icon="map-marker"></fa-icon>
          <!-- need span because space before location name -->
          <span class="heading-font">{{ profile.locationName }}</span>
        </li>
      </ul>
    </div>
    <div class="footer__social-links">
      <ul>
        <li v-if="profile.email" class="link link--email">
          <a :href="`mailto:${profile.email}`" target="_blank">
            <fa-icon icon="envelope"></fa-icon>Email
          </a>
        </li>
        <li v-if="profile.github" class="link link--github">
          <a :href="profile.github" target="_blank">
            <fa-icon :icon="['fab', 'github-alt']"></fa-icon>Github
          </a>
        </li>
        <li v-if="profile.instagram" class="link link--instagram">
          <a :href="profile.instagram" target="_blank">
            <fa-icon :icon="['fab', 'instagram']"></fa-icon>Instagram
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="sass">
@import '../styles/global.sass';

.footer
  width: 100%
  padding: 2em 0
  background: $darkBackground
  display: flex
  flex-direction: column
  font-size: 2em

  a
    @extend .heading-font
    text-decoration: none
    color: $lightForeground
    opacity: 0.7

    &:hover 
      opacity: 1

  ul
    display: flex
    flex-direction: column
    justify-content: center
    list-style: none
    padding: 0

    svg
      width: 20px !important
      margin-right: 5px

    .link--map
      color: $lightForeground
      display: flex
      flex-direction: column
      justify-content: center
      font-size: 2em

      svg
        margin: 0 auto
        width: 40px !important

    .link
      &--map svg, &--map a, &--github svg
        color: $lightForeground
      &--email svg
        color: #d14836
      &--instagram svg
        color: #cd486b
</style>
