import Vue from 'vue';
import Router from 'vue-router';
import home from './views/home.vue';
import post from './views/post.vue';

Vue.use(Router);

import marked from 'marked';
import * as moment from 'moment';
import postsJson from './assets/posts.json';
const posts = new Map(postsJson);

const context = require.context('./assets/posts/', true, /.*\.markdown$/);
const extensionLength = '.markdown'.length;

for (const postFilePath of context.keys()) {
  const markdownContent = context(postFilePath);
  const postId = postFilePath.substring(2, postFilePath.length - extensionLength);

  if (posts.has(postId)) {
    const post = posts.get(postId);
    post.markdown = markdownContent;
    post.html = marked(markdownContent);
    post.date = moment(post.date).format('LL');
    post.tags = post.tags ? post.tags.join(', ') : '';
  }
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
      props: { posts }
    },
    {
      path: '/:id',
      name: 'post',
      component: post,
      props: { posts }
    },
    {
      path: '/:year/:month/:day/:id',
      redirect: (route) => {
        return `${route.params.year}-${route.params.month}-${route.params.day}-${route.params.id.substring(
          0,
          route.params.id.length - 5
        )}`;
      }
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { x: 0, y: 0 };
  }
});
