<template>
  <div id="app">
    <div class="app__header">
      <Header/>
    </div>
    <div class="app__body">
      <RouterView/>
    </div>
    <div class="app__footer">
      <Footer/>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faMapMarker } from '@fortawesome/free-solid-svg-icons/faMapMarker';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope';
import { faInstagram } from '@fortawesome/free-brands-svg-icons/faInstagram';
import { faGithubAlt } from '@fortawesome/free-brands-svg-icons/faGithubAlt';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import BlogRoll from './pages/BlogRoll.vue';
import Post from './pages/Post.vue';
import Resume from './pages/Resume.vue';
import Footer from './components/Footer.vue';
import Header from './components/Header.vue';
import storeConfig from './store/store.js';

library.add(faMapMarker);
library.add(faEnvelope);
library.add(faInstagram);
library.add(faGithubAlt);
Vue.component('fa-icon', FontAwesomeIcon);

Vue.use(VueRouter);
const router = new VueRouter({
  routes: [
    {
      name: 'home',
      path: '/',
      component: BlogRoll,
    },
    {
      name: 'post',
      path: '/post/:id',
      component: Post,
    },
    {
      name: 'resume',
      path: '/resume',
      component: Resume,
    },
  ],
  scrollBehavior() {
    // page scroll to top for all route navigations
    return { x: 0, y: 0 };
  },
});

Vue.use(Vuex);
const store = new Vuex.Store(storeConfig);

export default {
  name: 'app',
  components: {
    Footer,
    Header,
  },
  router,
  store,
};
</script>

<style lang="sass">
@import 'styles/global.sass'

html, body, #app
  font-size: 10px
  width: 100%
  height: 100%
  background: #fcfcfc
  margin: 0
  padding: 0

#app
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50
  margin: 0
  padding: 0
  display: flex
  flex-direction: column

  .app__body
    max-width: 100%
    min-width: 100%
    margin: auto
    flex: 1

    @include respond-to('medium')
      max-width: $screen-m
      min-width: $screen-m
</style>
