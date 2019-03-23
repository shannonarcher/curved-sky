<template>
  <div class="post">
    <div class="post__content">
      <div class="post__cover" v-if="post.cover && post.cover.url">
        <img :src="post.cover.url">
      </div>
      <div class="post__header">
        <div class="post__created">{{ post.createdAt }}</div>
        <h1>{{ post.title }}</h1>
        <div class="post__tags">
          <span class="post__tag" v-for="(tag, index) in post.tags" :key="index">
            {{ tag }}
            <template v-if="index + 1 < post.tags.length">,</template>
          </span>
        </div>
      </div>
      <Markdown v-if="post.body" class="post__body">{{ post.body }}</Markdown>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Markdown from "vue-markdown";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Post",
  components: {
    Markdown
  },
  computed: {
    id() {
      return this.$router.currentRoute.params.id;
    },
    post() {
      return this.posts.find(p => p.id.toString() === this.id.toString()) || {};
    },
    ...mapGetters({
      posts: "blog/entries"
    })
  },
  beforeMount() {
    this.getEntry(this.id);
  },
  methods: mapActions({
    getEntry: "blog/getEntry"
  })
};
</script>
<style lang="sass">
@import '../styles/global.sass'

.post
  height: 100%

  &__header
    padding: 30px 0 0
    text-align: center

  &__content
    height: 100%
    padding: 0 30px
    text-align: left
    background: #fff
    box-shadow: rgba(0, 0, 0, 0.1) 0 0 5px

  h1
    font-size: 48px

  &__cover
    margin: 0 -30px
    width: calc(100% + 60px)
    
    img
      width: 100%
      object-fit: contain

  &__body
    max-width: 1000px
    margin: auto
    padding-bottom: 60px

    img
      display: block
      margin: auto
      width: 100%

    @include respond-to('medium')
      padding: 0 30px 30px

      img 
        max-width: 80%
        
  @include respond-to('small')
    margin: 30px

  @include respond-to('large')
    margin-left: 0
</style>
