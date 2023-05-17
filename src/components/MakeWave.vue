<template>
  <v-container>
    <v-row>
            <v-col cols="12">
                <div class="d-flex justify-center">
                    <v-card
                        class="mx-auto"
                        max-width="600"
                    >
                        <v-card-title>
                            波を作ってみよう
                        </v-card-title>
                        <v-card-text>
                            周波数のテキストボックスに整数を入力してSTARTを押すとサイン波が見られます。
                        </v-card-text>
                        <v-card-text>
                            注】音が出るのでご注意ください！
                        </v-card-text>
                    </v-card>
                </div>
            </v-col>
            <v-divider></v-divider>
    </v-row>
    <v-row>
      <v-col cols="12" md="3" lg="3" xl="3">
        <v-btn prepend-icon="mdi-television-play" block color="indigo" v-on:click="startDisplay" class="d-flex align-center">Start</v-btn>
      </v-col>
      <v-col cols="12" md="3" lg="3" xl="3">
        <v-text-field v-model="inputFreq" 
          hint="周波数を整数で入れてください"
          clearable label="周波数" variant="underlined"
          placeholder="例：440"></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <div>
          <canvas ref="canvas1"></canvas>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  let oscillator = null;

  let analyser = audioCtx.createAnalyser();
  analyser.fftSize = 2048; // FFTサイズを設定
  let bufferLength = analyser.frequencyBinCount;
  let dataArray = new Float32Array(bufferLength);

  export default {
    mounted() {
      if(false == this.isStop){
          oscillator.stop();
          this.isStop = true;
      }

      oscillator = audioCtx.createOscillator();

      // キャンバスの取得
      this.canvas1 = this.$refs.canvas1;
      this.canvasCtx1 = this.canvas1.getContext('2d');
      this.canvas1.width = this.WIDTH;
      this.canvas1.height = this.HEIGHT;

      this.freq = 440;

    },
    data() {
        return {
          canvas1: null,
          canvasCtx1: null,
          WIDTH: 800,
          HEIGHT: 200,
          isStop: true,
          freq: 0
        };
    },
    methods: {
      startDisplay() {
        // フィールドからの値取得
        if(typeof this.inputFreq != "undefined")
        {
          this.freq = Number(this.inputFreq);
        }
        
        oscillator.type = 'sine'; // サイン波を指定
        oscillator.frequency.setValueAtTime(this.freq, audioCtx.currentTime); // 周波数を設定（440HzはA4音）

        oscillator.connect(analyser);
        analyser.connect(audioCtx.destination);
        if(true == this.isStop){
          oscillator.start();
          this.isStop = false;
        }
        
        this.draw();
      },
      data() {
        return {
          canvas1: null,
          canvasCtx1: null,
        };
      },
      beforeRouteLeave(to, from, next) {
        if(false == this.isStop){
          oscillator.stop();
          this.isStop = true;
        }
        
        this.canvasCtx1.clearRect(0, 0, this.WIDTH, this.HEIGHT);
        next();
      },
      draw() {
          requestAnimationFrame(this.draw);
          this.draw1();
      },
      draw1() {
        analyser.getFloatTimeDomainData(dataArray);


        this.canvasCtx1.clearRect(0, 0, this.WIDTH, this.HEIGHT);
        this.canvasCtx1.fillStyle = "rgb(0, 0, 0)";
        this.canvasCtx1.fillRect(0, 0, this.WIDTH, this.HEIGHT);
        this.canvasCtx1.lineWidth = 2;
        this.canvasCtx1.strokeStyle = 'rgb(200, 50, 50)';
        this.canvasCtx1.beginPath();
        let sliceWidth = this.WIDTH / bufferLength;
        let x = 0;
        for (let i = 0; i < bufferLength; i++) {
          let y = (dataArray[i] + 1) * this.HEIGHT / 2;
          if (i === 0) {
            this.canvasCtx1.moveTo(x, y);
          } else {
            this.canvasCtx1.lineTo(x, y);
          }
          x += sliceWidth;
        }
        this.canvasCtx1.lineTo(this.WIDTH, this.HEIGHT / 2);
        this.canvasCtx1.stroke();

      },

    },

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>