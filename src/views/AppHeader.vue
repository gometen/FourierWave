<template>
  <header>
    <v-app-bar color="primary">
  
      <v-app-bar-nav-icon 
        variant="text"
        @click.stop="drawer = !drawer">
      </v-app-bar-nav-icon>
  
      <v-app-bar-title>
        Explore Sound Waves!
      </v-app-bar-title>
    </v-app-bar>
  
    <v-navigation-drawer
      v-model="drawer"
    >
      <v-list>
        <router-link to="/">
          <v-list-item prepend-icon="mdi-home-circle" title="Home" value="home"></v-list-item>
        </router-link>
        <router-link to="/fourierwave">
          <v-list-item prepend-icon="mdi-waveform" title="FourierWave" value="fourierwave"></v-list-item>
        </router-link>
        <router-link to="/about">
          <v-list-item prepend-icon="mdi-waves" title="About" value="about"></v-list-item>
        </router-link>
      </v-list>
    </v-navigation-drawer>
  </header>
</template>

  <script>
  export default {
    data: () => ({
      drawer: null,
    }),
  }
  </script>
