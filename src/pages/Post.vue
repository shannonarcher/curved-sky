<template>
  <div class="post">
    <router-link :to="{ name: 'home' }" class="back-button">&lt;</router-link>
    <div class="post__cover">
      <img :src="coverImageUrl">
    </div>
    <h1>{{ post.title }}</h1>
    <Markdown v-if="post.body">{{ post.body }}</Markdown>
  </div>
</template>

<script>
import axios from 'axios';
import Markdown from 'vue-markdown';
import { mapActions, mapGetters } from 'vuex';
import { get } from 'lodash';

export default {
  name: 'Post',
  components: {
    Markdown,
  },
  computed: {
    id() {
      return this.$router.currentRoute.params.id;
    },
    coverImageUrl() {
      return get(this.post, 'cover.url', '');
    },
    post() {
      return this.posts.find(p => p.id.toString() === this.id.toString()) || {};
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
.post
  .back-button
    font-size: 30px
</style>
