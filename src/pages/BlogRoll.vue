<template>
  <div class="blogroll">
    <div class="blogroll__heading">
      <h1>As a developer and someone finding their way, here's a look into what I think about.</h1>
    </div>
    <div class="blogroll__excerpts">
      <BlogExcerpt v-for="post in posts" :key="post.id" :post="post" class="blogroll__excerpt"></BlogExcerpt>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import BlogExcerpt from '../components/BlogExcerpt';

export default {
  name: 'BlogRoll',
  components: {
    BlogExcerpt,
  },
  props: {
    limit: {
      type: Number,
      default: 10,
    },
  },
  computed: mapGetters({
    posts: 'blog/entries',
  }),
  mounted() {
    this.getEntries();
  },
  methods: mapActions({
    getEntries: 'blog/getEntries',
  }),
};
</script>

<style lang="sass">
@import '../styles/global.sass';

.blogroll
  &__heading
    h1
      font-size: 3em
      padding: 2em
      margin: 0
</style>
