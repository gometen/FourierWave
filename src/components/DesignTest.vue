<template>
    <v-app>
      <!-- サイドメニュー -->
      <v-navigation-drawer app clipped v-model="drawer" dark color="info">
      </v-navigation-drawer>
  
      <!-- ヘッダー -->
      <v-app-bar app clippedLeft flat dark color="indigo darken-3">
        <v-app-bar-nav-icon @click.stop="drawer=!drawer"></v-app-bar-nav-icon>
      </v-app-bar>
  
      <!-- メイン -->
      <v-main>
        <v-container fluid>
        </v-container>
      </v-main>
  
      <!-- フッター -->
      <v-footer app color="primary">
      </v-footer>
    </v-app>
  </template>
  <script>
    export default {
      name: 'app',
      data() {
        return {
          drawer: true
        }
      }
    }
  </script>