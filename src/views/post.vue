<template>
  <div>
    <posts :posts="postList"></posts>
  </div>
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
      return [this.posts.get(this.$route.params.id)];
    }
  }
};
</script>
