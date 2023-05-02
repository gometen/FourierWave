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
        <router-link to="/fourierwavemic">
          <v-list-item prepend-icon="mdi-waveform" title="FourierWaveMic" value="fourierwavemic"></v-list-item>
        </router-link>
        <router-link to="/fourierwaverecord">
          <v-list-item prepend-icon="mdi-waves" title="FourierWaveRecord" value="fourierwaverecord"></v-list-item>
        </router-link>
        <router-link to="/about">
          <v-list-item prepend-icon="mdi-information-outline" title="About" value="about"></v-list-item>
        </router-link>
        <router-link to="/testpage">
          <v-list-item prepend-icon="mdi-test-tube" title="TestPage" value="testpage"></v-list-item>
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
