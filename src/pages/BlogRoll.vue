<template>
  <div class="blogroll">
    <section v-for="post in posts" :key="post.id" class="blogroll__post post">
      <h1 class="post__title">
        <router-link :to="{ name: 'post', params: { id: post.id } }">{{ post.title }}</router-link>
      </h1>
      <div class="post__tags">
        <span class="post_tag" v-for="(tag, index) in post.tags" :key="index">{{ tag }}</span>
      </div>
      <div class="post__body">
        <Markdown>{{ post.excerpt }}</Markdown>
        <div class="post__mask"></div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Markdown from 'vue-markdown';

export default {
  name: 'BlogRoll',
  components: {
    Markdown,
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
</style>
