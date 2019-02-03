<template>
  <v-container grid-list-xl>
    <v-layout row wrap>
      <v-flex xl12 v-for="post of posts" :key="post.id">
        <v-card>
          <v-card-title>
            <div>
              <div class="title">
                <router-link :to="'/' + post.id">{{ post.title }}</router-link>
              </div>
              <div class="caption font-weight-light">{{ post.date }}</div>
            </div>
          </v-card-title>
          <v-card-text v-html="post.html"></v-card-text>
          <v-card-actions>
            <div class="caption font-weight-light" v-if="post.tags">
              Tags:
              <span class="font-weight-thin">{{ post.tags }}</span>
            </div>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import hljs from 'highlight.js';

export default {
  name: 'posts',
  props: {
    posts: {
      type: Array,
      required: true
    }
  },
  mounted() {
    document.querySelectorAll('pre').forEach((block) => {
      hljs.highlightBlock(block);
    });
  }
};
</script>
<style lang="scss">
@import '~highlight.js/styles/github.css';

code {
  display: block;
  overflow-x: auto;
  padding: 0.5em;
  color: #333;
  background: #f8f8f8;
  box-shadow: none;
}

.float-right {
  float: right;
}

.post-img {
  max-width: 200px;
  max-height: 200px;
}
img {
  max-width: 400px;
  max-height: 400px;
}
</style>
