<template>
  <div class="post">
    <div class="post__content">
      <div class="post__header">
        <h1>{{ post.title }}</h1>
        <DateTags
          class="post__details"
          :date="post._created"
          :tags="post.tags"
        />
      </div>
      <div v-if="post.body" class="post__body" v-html="body"></div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import render from '@/services/markdown';
import DateTags from '@/components/DateTags';

export default {
  name: 'Post',
  components: {
    DateTags,
  },
  computed: {
    id() {
      return this.$router.currentRoute.params.id;
    },
    post() {
      return this.posts.find(p => p.id.toString() === this.id.toString()) || {};
    },
    body() {
      if (this.post.body) {
        return render(this.post.body);
      }
      return '';
    },
    ...mapGetters({
      posts: 'blog/entries',
    }),
  },
  beforeMount() {
    this.getEntry(this.id);
  },
  methods: mapActions({
    getEntry: 'blog/getEntry',
  }),
};
</script>

<style lang="sass">
@import '../styles/global.sass'

.post
  height: 100%
  text-align: left

  &__header
    padding: 3em 0

    h1
      margin: 0
      padding: 1em 0 0
      font-size: 4em
      color: $title
      font-weight: $weight-thin

  &__details
    margin: 1em 0
    font-size: 1.5em
    display: flex
    flex-direction: row
    text-transform: uppercase

  &__content
    width: 100%
    height: 100%
    padding: 0 3em

  &__body
    padding-bottom: 6em
    @extend .body-font

    h2
      padding-top: 1em

    a
      color: $blue

    img
      display: block
      margin: auto
      width: 100%

    @include respond-to('medium')
      img
        max-width: 80%

  pre
    font-size: 0.8em
    line-height: 1.2em
    padding: 30px
    border-radius: 4px
    max-width: 100%
    overflow: scroll
</style>
