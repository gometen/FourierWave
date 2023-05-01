<template>
    <v-app>
      <v-app-bar color="primary">
    
        <v-app-bar-nav-icon 
          variant="text"
          @click.stop="drawer = !drawer">
        </v-app-bar-nav-icon>
    
        <v-app-bar-title>
          Application
        </v-app-bar-title>
      </v-app-bar>
    
      <v-navigation-drawer
        v-model="drawer"
      >
        <v-list>
          <router-link to="/fourierwave">
            <v-list-item prepend-icon="mdi-view-dashboard" title="FourierWave" value="fourierwave"></v-list-item>
          </router-link>
          <v-list-item prepend-icon="mdi-forum" title="About" value="about"></v-list-item>
        </v-list>
      </v-navigation-drawer>
    
      <v-main>
        <v-container>
          Main Contents
        </v-container>
      </v-main>
    </v-app>
    </template>

    <script>
    export default {
      data: () => ({
        drawer: null,
      }),
    }
    </script>