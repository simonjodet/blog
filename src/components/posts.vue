<template>
  <div>
    <template v-for = "post of posts">
      <div v-html="post"></div>
    </template>
  </div>
</template>

<script>
import posts from '../assets/posts.json';
import markdown from 'markdown';

export default {
  name: 'posts',

  computed: {
    posts() {
      const postContents = [];
      for (const post of posts) {
        postContents.push(markdown.parse(post.content));
      }

      return postContents;
    }
  }
};
</script>

<style scoped lang="scss">
</style>
