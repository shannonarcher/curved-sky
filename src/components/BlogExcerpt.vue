<template>
  <router-link
    :to="{ name: 'post', params: { id: post.id } }"
    class="blog-excerpt"
    :style="{
      borderTop: `solid 3px ${post.coverBackground}`
    }"
  >
    <h1 class="blog-excerpt__title">{{ post.title }}</h1>
    <div class="blog-excerpt__subtitle">
      <div class="blog-excerpt__created-at" v-if="createdAt">{{ post.createdAt }}</div>
      <div class="blog-excerpt__tags" v-if="post.tags.length">
        in
        <span class="blog-excerpt__tag" v-for="(tag, index) in post.tags" :key="index">
          <template>{{ tag }}</template>
          <template v-if="index + 1 < post.tags.length">,&nbsp;</template>
        </span>
      </div>
    </div>
    <div class="blog-excerpt__body">
      <div v-html="excerpt"></div>
      <div class="blog-excerpt__mask"></div>
    </div>
  </router-link>
</template>

<script>
import moment from "moment";
import render from "../services/markdown";

export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  computed: {
    excerpt() {
      return render(this.post.excerpt);
    },
    createdAt() {
      return moment(this.post._created * 1000).fromNow();
    }
  }
};
</script>


<style lang="sass">
@import '../styles/global.sass'

.blog-excerpt
  background: #fff
  display: block
  border-radius: 2px
  transform: scale(1)
  transition: transform 250ms, box-shadow 250ms
  padding: 30px
  color: inherit
  text-decoration: none
  box-shadow: rgba(0,0,0,0.1) 0 0 5px

  &:hover
    transform: scale(1.02)
    box-shadow: rgba(0, 0, 0, 0.1) 0 0 15px

  &__title
    font-size: 20px
    text-decoration: none
    color: $blue
    margin-bottom: 0px

  &__subtitle
    display: flex
    flex-direction: row
    font-size: 14px

  &__created-at
    color: $light-gray
    margin: 0 5px 0 0

  &__tag
    color: $orange

  &__body
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
