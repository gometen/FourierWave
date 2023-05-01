<template>
  <v-app>
    <v-main>
      <FourierWave/>
    </v-main>
  </v-app>
</template>

<script>
import FourierWave from './components/FourierWave.vue'

export default {
  name: 'App',

  components: {
    FourierWave,
  },

  data: () => ({
    //
  }),
}
</script>
