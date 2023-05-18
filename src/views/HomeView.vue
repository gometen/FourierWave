<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <div class="d-flex justify-center">
          <v-card
            class="mx-auto align-end"
            max-width="800"
          >
            <v-img
              class="align-end"
              height="200"
              src="https://github.com/gometen/FourierWave/blob/main/public/images/engineering.jpg?raw=true"
              cover
            >
            </v-img>
            <v-card-title>このページについて</v-card-title>
            <v-card-text>
              マイクから入力した音声の波形やスペクトルを見ることが出来ます。
            </v-card-text>
            <v-card-actions>
              <v-btn prepend-icon="mdi-waveform" block variant="outlined" to="/fourierwavemic" class="d-flex align-center">Let's get started!</v-btn>
            </v-card-actions>
          </v-card>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <div class="d-flex justify-center">
          <v-card
            class="mx-auto"
            max-width="600"
          >
            <v-img
              class="align-end"
              height="200"
              src="https://github.com/gometen/FourierWave/blob/main/public/images/construction-site.jpg?raw=true"
              cover
            >
            </v-img>
            <v-card-title>
              <v-row align="center" no-gutters>
                <v-col cols="1" class="text-center">
                  <v-icon
                    color="error"
                    icon="mdi-alert-circle-outline"
                  ></v-icon>
                </v-col>
                <v-col
                  cols="7"
                  class="text-left"
                >
                  このページについての注意
                </v-col>
              </v-row>
            </v-card-title>
            <v-card-text>
              このページは開発中のため、不備があるかもしれませんが、ご了承ください。また、急に機能が変更になることがあります。
            </v-card-text>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {
      };
    }
  }
  
</script>

<style scoped>
  .text-color{
     color: #FCE4EC;
  }
</style>
