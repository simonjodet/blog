<template>
  <v-app>
    <v-toolbar app>
      <v-btn dark fab exact color="primary" to="/" v-if="isBackButtonDisplayed">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title class="headline text-uppercase">
        <span>Simon Jodet</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-content>
      <router-view></router-view>
    </v-content>
    <v-footer height="auto" color="primary lighten-1">
      <v-layout justify-center row wrap>
        <v-flex primary lighten-2 py-3 text-xs-center white--text xs12>
          &copy;2019 —
          <strong>Simon Jodet</strong>
        </v-flex>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  computed: {
    isBackButtonDisplayed() {
      return this.$route.name !== 'home';
    }
  }
};
</script>
