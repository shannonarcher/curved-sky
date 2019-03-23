<template>
  <div class="blogroll">
    <BlogExcerpt v-for="post in posts" :key="post.id" :post="post" class="blogroll__excerpt"></BlogExcerpt>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import BlogExcerpt from "../components/BlogExcerpt";

export default {
  name: "BlogRoll",
  components: {
    BlogExcerpt
  },
  props: {
    limit: {
      type: Number,
      default: 10
    }
  },
  computed: mapGetters({
    posts: "blog/entries"
  }),
  mounted() {
    this.getEntries();
  },
  methods: mapActions({
    getEntries: "blog/getEntries"
  })
};
</script>

<style lang="sass">
@import '../styles/global.sass';

.blogroll
  text-align: left
  display: grid
  grid-template-columns: 100%
  grid-gap: 30px
  max-width: 100%

  @include respond-to('small')
    margin: 0 30px

  @include respond-to('medium')
    grid-template-columns: calc(50% - 15px) calc(50% - 15px)

  @include respond-to('large')
    grid-template-columns: calc(33% - 10px) calc(33% - 10px) calc(33% - 10px)

  &__excerpt
    align-self: start

</style>
