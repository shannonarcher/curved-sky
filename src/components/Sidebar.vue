<template>
  <div class="sidebar">
    <div class="sidebar__card">
      <div v-if="profile.image" class="sidebar__profile-image">
        <router-link :to="{ name: 'home' }">
          <img :src="profile.image">
        </router-link>
      </div>
      <div class="sidebar__social-links">
        <ul>
          <li v-if="profile.locationName" class="link link--map">
            <a :href="profile.locationUrl" target="_blank">
              <fa-icon icon="map-marker"></fa-icon>
              <!-- need span because space before location name -->
              <span>{{ profile.locationName }}</span>
            </a>
          </li>
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
      <div class="sidebar__project-links" v-if="projects.length">
        <ul>
          <li v-for="project in projects" :key="project.id">
            {{ project.name }}
            <template v-if="project.demo">
              |
              <a :href="project.demo" target="_blank">Demo</a>
            </template>
            <template v-if="project.repo">
              |
              <a :href="project.repo" target="_blank">Source</a>
            </template>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  mounted() {
    this.getSingleton("profile");
    this.getProjects();
  },
  computed: mapGetters({
    profile: "singletons/profile",
    projects: "projects/entries"
  }),
  methods: mapActions({
    getSingleton: "singletons/getSingleton",
    getProjects: "projects/getEntries"
  })
};
</script>

<style lang="sass">
@import '../styles/global.sass'

.sidebar 
  text-align: center

  &__card
    background: #fff
    padding: 30px
    margin: 30px 0
    box-shadow: rgba(0, 0, 0, 0.1) 0 0 5px

    @include respond-to('small')
      margin: 30px

  ul
    padding: 0
    margin: 0
    list-style: none

  a
    color: $blue
    text-decoration: none

    &:hover
      opacity: 0.7

  &__social-links ul
    display: flex
    flex-direction: row
    flex-wrap: wrap
    margin: 10px auto
    justify-content: center

    svg 
      width: 20px !important
      margin-right: 5px

    li:first-child
      width: 100%
      margin-bottom: 10px
      border: none
    
    li
      padding: 0 10px
      border-left: solid 1px #000

      &:nth-child(2)
        border: none

  .link
    &--map svg, &--map a, &--github svg
      color: #000000
    &--email svg
      color: #d14836
    &--instagram svg
      color: #cd486b
  
  @include respond-to('large')
    ul li
      flex: 1
      text-align: left

    &__social-links ul
      flex-direction: column

      li
        border: 0
        padding: 0
</style>
