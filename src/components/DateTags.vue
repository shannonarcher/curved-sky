<script>
import moment from 'moment';

export default {
  props: {
    tags: {
      type: Array,
      default: [],
    },
    date: {
      type: Number,
      default: '',
    },
  },
  computed: {
    formattedDate() {
      return moment(this.date * 1000).fromNow();
    },
  },
};
</script>

<template>
  <div class="date-tags heading-font">
    <div class="date-tags__date" v-if="formattedDate"></div>
    <div class="date-tags__tags" v-if="tags.length">
      {{ formattedDate }} in
      <span class="date-tags__tag" v-for="(tag, index) in tags" :key="index">
        <template>{{ tag }}</template>
        <template v-if="index + 1 < tags.length">,&nbsp;</template>
      </span>
    </div>
  </div>
</template>

<style lang="sass">
@import '../styles/global.sass'

.date-tags
  &__tag
    color: $orange
</style>
