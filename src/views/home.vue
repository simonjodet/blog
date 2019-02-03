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
    },
    search: {
      type: String
    }
  },
  computed: {
    postList() {
      let posts = [...this.posts.values()];
      if (this.search) {
        posts = posts.filter((post) => {
          return post.markdown.includes(this.search) || post.tags.includes(this.search);
        });
      }
      return posts.reverse();
    }
  }
};
</script>
