<template>
  <div class="sidebar">
    <div class="sidebar__profile-image">
      <img src="https://via.placeholder.com/200">
    </div>
    <div class="sidebar__social-links">
      <ul>
        <li>Email</li>
        <li>Github</li>
      </ul>
    </div>
    <div class="sidebar__project-links">
      <ul>
        <li v-for="project in projects" :key="project.id">
          <a :href="project.link">{{ project.name }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  mounted() {
    this.getProjects();
  },
  computed: mapGetters({
    projects: 'projects/entries',
  }),
  methods: mapActions({
    getProjects: 'projects/getEntries',
  }),
};
</script>

<style lang="sass">

</style>
