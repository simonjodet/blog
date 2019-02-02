<template>
  <v-container grid-list-xl>
    <v-layout row wrap>
      <v-flex xl12 v-for="post of posts" :key="post.id">
        <v-card>
          <v-card-title>
            <div>
              <div class="title">{{ post.title }}</div>
              <div class="caption font-weight-light">{{ post.date }}</div>
            </div>
          </v-card-title>
          <v-card-text v-html="post.html"></v-card-text>
          <v-card-actions>
            <div class="caption font-weight-light">
              Tags:
              <span class="font-weight-thin">{{ post.tags.join(', ') }}</span>
            </div>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import markdown from 'markdown';
import * as moment from 'moment';
import postsJson from '../assets/posts.json';
const postsMap = new Map(postsJson);

const context = require.context('../assets/posts/', true, /.*\.markdown$/);
const extensionLength = '.markdown'.length;

for (const postFilePath of context.keys()) {
  const markdownContent = context(postFilePath);
  const postId = postFilePath.substring(2, postFilePath.length - extensionLength);

  if (postsMap.has(postId)) {
    const post = postsMap.get(postId);
    post.markdown = markdownContent;
    post.html = markdown.parse(markdownContent);
    post.date = moment(post.date).format('LL');
  }
}

export default {
  name: 'posts',
  data() {
    return {
      posts: [...postsMap.values()].reverse()
    };
  }
};
</script>
