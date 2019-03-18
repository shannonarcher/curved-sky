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
import axios from "axios";
import Markdown from "vue-markdown";
import { mapActions } from "vuex";

export default {
  name: "Post",
  components: {
    Markdown
  },
  data: () => ({
    post: {}
  }),
  computed: {
    id() {
      return this.$router.currentRoute.params.id;
    },
    coverImageUrl() {
      if (this.post && this.post.cover && this.post.cover.url) {
        return `http://cms.shannonarcher.me${this.post.cover.url}`;
      }
      return "";
    }
  },
  async beforeMount() {
    const post = await this.getPost(this.id);
    this.post = post;
  },
  methods: mapActions({
    getPost: "blog/getPost"
  })
};
</script>
<style lang="sass">
.post
  .back-button
    font-size: 30px
</style>

