<template>
  <posts></posts>
</template>

<script>
// @ is an alias to /src
import posts from "@/components/posts.vue";

export default {
  name: "home",
  components: {
    posts
  }
};
</script>
