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
      color="#E8EAF6"
    >
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title grey--text text--darken-2 text-h6">
              Menu
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
      <v-list>
        <v-list-item-group
          v-model="group"
          :ripple="{ class: 'grey--text' }"
        >
          <router-link class="routerLink" to="/">
            <v-list-item rounded prepend-icon="mdi-home-circle" 
              title="ホーム" value="home"></v-list-item>
          </router-link>
          <router-link class="routerLink" to="/fourierwavemic">
            <v-list-item rounded prepend-icon="mdi-waveform" 
            title="マイクの音を波にしてみよう" value="fourierwavemic"></v-list-item>
          </router-link>
          <router-link class="routerLink" to="/fourierwaverecord">
            <v-list-item rounded prepend-icon="mdi-waves" 
              title="録音した音の波を見てみよう" value="fourierwaverecord"></v-list-item>
          </router-link>
          <router-link class="routerLink" to="/analyzespectrum">
            <v-list-item rounded prepend-icon="mdi-sine-wave" 
              title="スペクトルをみてみよう" value="analyzespectrum"></v-list-item>
          </router-link>
          <router-link class="routerLink" to="/testpage">
            <v-list-item rounded prepend-icon="mdi-test-tube" 
              title="TestPage" value="testpage"></v-list-item>
          </router-link>
        </v-list-item-group>
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
     color: #212121;
  }

</style>
