<template>
  <v-app>
    <v-navigation-drawer :clipped="clipped" v-model="drawer" enable-resize-watcher app dark
                         v-if="isAuth">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            Home automation
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider />

      <v-list dense nav>
        <v-list-item v-for="item in menuItems" :key="item.title" :to="item.link">
          <v-list-item-content>
            <v-list-item-title v-html="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app :clipped-left="clipped">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" v-if="isAuth" />
      <v-toolbar-title v-html="title" />
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-main :clipped-left="clipped">
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer app v-if="isAuth"  :clipped-left="clipped">
      Home automation | {{year}}
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  components: {},
  data() {
    return {
      clipped: false,
      drawer: false,
      menuItems: [
        {title: 'Dashboard', link: '/'},
        {title: 'Devices', link: '/devices'},
        {title: 'Workspaces', link: '/workspaces'},
        {title: 'Users', link: '/users'},
        {title: 'Logout', link: '/login'},
      ]
    }
  },
  computed: {
    title() {
      return this.$store.getters.title
    },
    isAuth() {
      return this.$store.state.isAuthenticated
    },
    year() {
      const d = new Date();
      return d.getFullYear()
    }
  }
};
</script>
