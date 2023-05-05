<template>
  <header>
      <v-app-bar color="primary" light>
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
        <router-link class="routerLink" to="/">
          <v-list-item color="indigo-darken-4" prepend-icon="mdi-home-circle" 
            title="Home" value="home"></v-list-item>
        </router-link>
        <router-link class="routerLink" to="/fourierwavemic">
          <v-list-item color="indigo-darken-4" prepend-icon="mdi-waveform" 
          title="FourierWaveMic" value="fourierwavemic"></v-list-item>
        </router-link>
        <router-link class="routerLink" to="/fourierwaverecord">
          <v-list-item color="indigo-darken-4" prepend-icon="mdi-waves" 
            title="FourierWaveRecord" value="fourierwaverecord"></v-list-item>
        </router-link>
        <router-link class="routerLink" to="/about">
          <v-list-item color="indigo-darken-4" prepend-icon="mdi-information-outline"
            title="About" value="about"></v-list-item>
        </router-link>
        <router-link class="routerLink" to="/analyzespectrum">
          <v-list-item color="indigo-darken-4" prepend-icon="mdi-sine-wave" 
            title="AnalyzeSpectrum" value="analyzespectrum"></v-list-item>
        </router-link>
        <router-link class="routerLink" to="/testpage">
          <v-list-item color="indigo-darken-4" prepend-icon="mdi-test-tube" 
            title="TestPage" value="testpage"></v-list-item>
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

<style scoped>
  .routerLink{
     text-decoration: none;
 }
</style>
