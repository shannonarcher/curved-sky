<template>
  <div id="app">
    <Sidebar/>
    <RouterView/>
  </div>
</template>

<script>
import Vue from "vue";
import Vuex from "vuex";
import VueRouter from "vue-router";
import Sidebar from "./components/Sidebar";
import BlogRoll from "./pages/BlogRoll";
import Post from "./pages/Post.vue";
import storeConfig from "./store/store.js";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faMapMarker, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faInstagram, faGithubAlt } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faMapMarker);
library.add(faEnvelope);
library.add(faInstagram);
library.add(faGithubAlt);
Vue.component("fa-icon", FontAwesomeIcon);

Vue.use(VueRouter);
const router = new VueRouter({
  routes: [
    {
      name: "home",
      path: "/",
      component: BlogRoll
    },
    {
      name: "post",
      path: "/post/:id",
      component: Post
    }
  ]
});

Vue.use(Vuex);
const store = new Vuex.Store(storeConfig);

export default {
  name: "app",
  components: {
    Sidebar
  },
  router,
  store
};
</script>

<style lang="sass">
@import 'styles/global.sass'

#app
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50
  margin-top: 60px

  @include respond-to('large')
    display: flex
    flex-direction: row

    .sidebar
      width: 300px

    .blogroll
      flex: 1
</style>
