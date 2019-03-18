<template>
  <div class="blogroll">
    <section v-for="post in posts" :key="post.id" class="blogroll__post post">
      <h1 class="post__title">
        <router-link :to="{ name: 'post', params: { id: post.id } }">{{ post.title }}</router-link>
      </h1>
      <div class="post__body">
        <Markdown>{{ post.body }}</Markdown>
        <div class="post__mask"></div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Markdown from "vue-markdown";

export default {
  name: "BlogRoll",
  components: {
    Markdown
  },
  data: () => ({
    posts: []
  }),
  props: {
    limit: {
      type: Number,
      default: 10
    }
  },
  mounted() {
    this.getPosts();
  },
  methods: mapActions({
    getPosts: "blog/getPosts"
  })
};
</script>

<style lang="sass">
.blogroll
  text-align: left

  &__post

  .post
    &__title

    &__body
      position: relative
      max-height: 400px
      overflow: hidden

      h2, h3, h4, h5, img
        display: none

      p
        margin: 10px 0
        padding: 0
        font-weight: normal
        font-size: 14px

    &__mask
      position: absolute
      top: 0
      width: 100%
      height: 100%
      z-index: 2
      background: linear-gradient(180deg, rgba(255,255,255,0) 50%, rgba(255,255,255,1) 100%)
</style>
