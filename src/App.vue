<template>
  <v-app>
    <AppHeader/>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import AppHeader from './views/AppHeader.vue'

export default {
  name: 'App',
  components: {
    AppHeader,
  },
  data: () => ({
    //
  }),
}
</script>
