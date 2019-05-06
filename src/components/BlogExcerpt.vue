<template>
  <router-link
    :to="{ name: 'post', params: { id: post.id } }"
    class="blog-excerpt"
  >
    <DateTags 
      class="blog-excerpt__subtitle"
      :tags="post.tags"
      :date="post._created"
    />
    <h1 class="blog-excerpt__title">{{ post.title }}</h1>
    <div class="blog-excerpt__body">
      <div v-html="excerpt"></div>
      <div class="blog-excerpt__mask"></div>
    </div>
  </router-link>
</template>

<script>
import render from '../services/markdown';
import DateTags from '@/components/DateTags';

export default {
  components: {
    DateTags,
  },
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  computed: {
    excerpt() {
      return render(this.post.excerpt);
    },
  },
};
</script>


<style lang="sass">
@import '../styles/global.sass'

.blog-excerpt
  display: block
  padding: 3em
  color: inherit
  text-decoration: none
  text-align: left

  &__title
    text-decoration: none
    color: $title
    margin: 10px 0 0

  &__subtitle
    display: flex
    flex-direction: row
    font-size: 1.5em
    text-transform: uppercase

  &__body
    max-height: 400px
    overflow: hidden
    @extend .body-font

    h2, h3, h4, h5, img
      display: none

    p
      padding: 0
      line-height: 2em
</style>
