<template>
  <posts :posts="postList"></posts>
</template>

<script>
import posts from '../components/posts.vue';

export default {
  components: {
    posts
  },
  props: {
    posts: {
      type: Map,
      required: true
    }
  },
  computed: {
    postList() {
      return [...this.posts.values()].reverse();
    }
  }
};
</script>
