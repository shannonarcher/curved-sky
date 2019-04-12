<template>
  <div class="post">
    <div class="post__content">
      <div class="post__header">
        <h1 :style="{
          background: post.coverBackground
        }">{{ post.title }}</h1>
        <div class="post__details">
          <div class="post__created">{{ createdAt }}</div>
          <div class="post__tags">
            <span
              class="post__tag"
              v-for="(tag, index) in post.tags"
              :key="index"
              :style="{
              background: post.coverBackground,
            }"
            >{{ tag }}</span>
          </div>
        </div>
      </div>
      <div v-if="post.body" class="post__body" v-html="body"></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import Markdown from "vue-markdown";
import render from "../services/markdown";
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
    createdAt() {
      return moment(this.post._created * 1000).format("MMMM Do, YYYY");
    },
    body() {
      if (this.post.body) {
        return render(this.post.body);
      }
      return "";
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
    padding: 30px 0
    text-align: center

    h1
      margin: -30px -30px 0
      padding: 90px 0 15px
      font-size: 48px
      color: #fff
      text-shadow: rgba(0,0,0,0.1) 0 0 5px

  &__created
    text-transform: uppercase
    margin: 15px 0
    font-weight: bold
    font-size: 14px

  &__content
    height: 100%
    padding: 0 30px
    text-align: left
    background: #fff
    box-shadow: rgba(0, 0, 0, 0.1) 0 0 5px

  &__cover
    margin: 0 -30px
    width: calc(100% + 60px)
    height: 300px
    
    img
      width: 100%
      object-fit: contain

  &__body
    max-width: 1000px
    margin: auto
    padding-bottom: 60px

    h2
      padding-top: 30px

    p
      line-height: 28px

    a
      color: $blue

    img
      display: block
      margin: auto
      width: 100%

    @include respond-to('medium')
      padding: 0 30px 30px

      img 
        max-width: 80%

  &__tag
    margin: 0 3px
    padding: 3px 7px
    border-radius: 4px
    color: #fff
    font-weight: bold

  pre
    color: #fff
    background: #383830
    padding: 30px
    border-radius: 4px
    font-weight: bold
    max-width: 100%
    overflow: scroll
        
  @include respond-to('small')
    margin: 30px

  @include respond-to('large')
    margin-left: 0
</style>
