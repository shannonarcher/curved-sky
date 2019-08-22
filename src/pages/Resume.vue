<script>
import PhoneFormatter from '@/filters/phone.js';
import DateFormatter from '@/filters/date.js';
import Markdown from '@/components/Markdown.vue';

import get from 'lodash/get';
import { mapActions, mapGetters } from 'vuex';
import moment from 'moment';

export default {
  filters: {
    phone: PhoneFormatter,
    date: DateFormatter,
  },
  components: {
    Markdown,
  },
  computed: {
    ...mapGetters({
      resume: 'resume/resume',
    }),
    contact() {
      return get(this.resume, 'contacts', {});
    },
  },
  mounted() {
    this.getResume();
  },
  methods: mapActions({
    getResume: 'resume/getResume',
  }),
};
</script>

<template>
  <div class="resume" v-if="resume">
    <div class="personal-info">
      <h1 class="personal-info__name title">
        {{ resume.name }}
      </h1>
      <h2 class="personal-info__title subtitle">
        {{ resume.title }}
      </h2>
    </div>

    <div class="contact-info">
      <ul>
        <li><a :href="`mailto:${contact.email}`">{{ contact.email }}</a></li>
        <li><a :href="`https://${contact.github}`">{{ contact.github }}</a></li>
        <li><a :href="`http://${contact.website}`">{{ contact.website }}</a></li>
        <li>
          <a :href="`tel:${contact.phone}`">
            {{ contact.phone | phone }}
          </a>
        </li>
      </ul>
    </div>

    <div class="summary">
      <Markdown>{{ resume.summary }}</Markdown>
    </div>

    <div class="experience">
      <h1>Experience</h1>

      <div
        v-for="{ title, company, start, end, description } in resume.experience"
        :key="`${title}:${company}`"
      >
        <h2>{{ title }}</h2>
        <h3>{{ company }}</h3>
        <h3>{{ start | date('MM/YYYY') }} - {{ end | date('MM/YYYY') }}</h3>
        <Markdown v-if="description">{{ description }}</Markdown>
      </div>
    </div>

    <div class="education">
      <h1>Education</h1>

      <div
        v-for="{ title, institution, start, end } in resume.education"
        :key="title"
      >
        <h2>{{ title }}</h2>
        <h3>{{ institution }}</h3>
        <h3>{{ start | date('YYYY') }} - {{ end | date('YYYY') }}</h3>
      </div>
    </div>
  </div>
</template>

<style lang="sass">
@import '../styles/global.sass'

$gray: #999

@media print
  .resume
    border: none !important
    margin-top: 0

  .app__header, .app__footer
    display: none

.resume
  display: grid
  grid-template-areas: "personal contact" "sum sum" "xp xp" "edu edu"
  text-align: left
  margin: 30px 0
  padding: 30px
  background: #fff
  border: solid 1px #ccc

  @include respond-to('large')
    margin: 30px 120px

  .title
    font-size: 4em
    margin-bottom: 0

  .subtitle
    font-size: 2em
    margin: 0
    color: $gray

  h1:not(.title)
    font-size: 3em
    padding-bottom: 0.67em
    border-bottom: solid 1px $gray

  h2
    font-size: 2em

  h3
    font-size: 1.4em
    margin: 0

  ul
    font-size: 1.5em
    line-height: 1.8em

  .personal-info
    grid-area: personal
    padding: 15px 0

  .contact-info
    grid-area: contact
    justify-self: flex-end
    align-content: flex-end
    text-align: right
    padding-top: 0.67em
    display: flex
    flex-direction: column
    justify-content: flex-end
    padding: 15px 0

    ul
      list-style: none
      font-size: 1.5em
      margin: 0
      padding: 0

  .summary
    grid-area: sum
    border-top: #000 solid 1px

  .experience
    grid-area: xp

  .education
    grid-area: edu

</style>
