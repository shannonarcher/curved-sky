<template>
  <div class="sidebar">
    <div v-if="profile.image" class="sidebar__profile-image">
      <img :src="profile.image">
    </div>
    <div class="sidebar__social-links">
      <ul>
        <li v-if="profile.locationName">
          <a :href="profile.locationUrl" target="_blank">
            <fa-icon icon="map-marker"></fa-icon>
            {{ profile.locationName }}
          </a>
        </li>
        <li v-if="profile.email">
          <a :href="`mailto:${profile.email}`" target="_blank">
            <fa-icon icon="envelope"></fa-icon>Email
          </a>
        </li>
        <li v-if="profile.github">
          <a :href="profile.github" target="_blank">
            <fa-icon :icon="{ prefix: 'fab', iconName: 'github-alt' }"></fa-icon>Github
          </a>
        </li>
        <li v-if="profile.instagram">
          <a :href="profile.instagram" target="_blank">
            <fa-icon :icon="{ prefix: 'fab', iconName: 'instagram' }"></fa-icon>Instagram
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
  text-align: center;

  ul
    padding: 0
    margin: 0
    list-style: none

  a
    text-decoration: none

  &__social-links ul
    display: flex
    flex-direction: row
    margin: 10px auto
    justify-content: center

    li
      border-left: solid 1px #000
      padding: 0 10px

      &:first-child
        border: none
  
  @include respond-to('large')
    ul
      padding: 0 20px

      li
        padding: 0 10px
        text-align: left

    &__social-links ul
      flex-direction: column

      li
        border: 0
</style>
