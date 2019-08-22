<script>
import render from '@/services/markdown';

export default {
  computed: {
    rendered() {
      return render(this.$slots.default[0].text || '');
    },
  },
};
</script>

<template>
    <div v-html="rendered" />
</template>
