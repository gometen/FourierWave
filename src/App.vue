<template>
  <v-app>
    <v-main>
      <FourierWave/>
      <HelloWorld/>
    </v-main>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import FourierWave from './components/FourierWave.vue'

export default {
  name: 'App',

  components: {
    HelloWorld,
    FourierWave,
  },

  data: () => ({
    //
  }),
}
</script>
