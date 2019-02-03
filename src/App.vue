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
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-text-field
        hide-details
        prepend-icon="search"
        single-line
        clearable
        @change="onSearch"
        @click:clear="onClearSearch"
      ></v-text-field>
    </v-toolbar>

    <v-content>
      <router-view :search="search"></router-view>
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
  data() {
    return {
      search: ''
    };
  },
  computed: {
    isBackButtonDisplayed() {
      return this.$route.name !== 'home';
    }
  },
  methods: {
    onSearch(input) {
      this.search = input;
    },
    onClearSearch() {
      this.search = '';
    }
  }
};
</script>
