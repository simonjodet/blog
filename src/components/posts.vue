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
              <span class="font-weight-thin">{{ post.tags }}</span>
            </div>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'posts',
  props: {
    posts: {
      type: Array,
      required: true
    }
  }
};
</script>
