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
                          音を構成する要素を見てみよう。
                      </v-card-title>
                      <v-card-text>
                          どの周波数がどのくらいの強さで含まれているか分かります。
                          STARTボタンを押すとマイクの音から波と周波数を表示してくれます。
                          COPYボタンを押すと押した瞬間の画像をボタンの下にコピーしてくれます。
                      </v-card-text>
                  </v-card>
              </div>
          </v-col>
          <v-divider></v-divider>
      </v-row>
    <v-row>
      <v-col cols="12" md="3" lg="3" xl="3">
        <v-btn prepend-icon="mdi-play-box-outline" block color="indigo" v-on:click="startAnalyze" class="d-flex align-center">Start</v-btn>
      </v-col>
      <v-col cols="12" md="3" lg="3" xl="3">
        <v-btn prepend-icon="mdi-home-outline" block color="indigo" to="/" class="d-flex align-center">Home</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <div>
        <canvas ref="canvas1"></canvas>
      </div>
    </v-row>
    <v-row>
      <div>
        <canvas ref="canvas2"></canvas>
      </div>
      <div>
        <canvas ref="canvas3"></canvas>
      </div>
    </v-row>
    <v-row>
      <v-col cols="4">
        <v-btn prepend-icon="mdi-pin-outline" block color="indigo" v-on:click="logButton" class="d-flex align-center">
        Keep Log</v-btn>
      </v-col>
      <v-col cols="6">
        Peak: <span ref="freq"></span>Hz
      <div ref="log"></div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4">
        <v-btn prepend-icon="mdi-content-copy" block color="indigo" v-on:click="copyCanvas" class="d-flex align-center">
        Copy</v-btn>
      </v-col>
      <v-col cols="6">
        Peak: <span ref="cpfreq"></span>Hz
      <div ref="cplog"></div>
      </v-col>
    </v-row>
    <v-row>
      <div>
        <canvas ref="copycanvas1"></canvas>
      </div>
    </v-row>
    <v-row>
      <div>
        <canvas ref="copycanvas2"></canvas>
      </div>
      <div>
        <canvas ref="copycanvas3"></canvas>
      </div>
    </v-row>
  </v-container>
</template>

<script>
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const analyser = audioCtx.createAnalyser();
// 横軸の目盛りの設定
// サンプリング周波数48kHzの半分、24kHzのうち、8000Hzまでを表示する（バーの太さを6倍にしたため）
const tickValues = [0, 1000, 2000, 3000, 4000];
    
//analyser.fftSize = 32768;
analyser.fftSize = 4096;
var bufferLength = analyser.frequencyBinCount;
var dataArray = new Uint8Array(bufferLength);
export default {
  mounted() {
    // 描画領域1
    this.canvas1 = this.$refs.canvas1;
    this.canvasCtx1 = this.canvas1.getContext("2d");
    this.canvas1.width = this.WIDTH;
    this.canvas1.height = this.HEIGHT;
    // 描画領域2
    this.canvas2 = this.$refs.canvas2;
    this.canvasCtx2 = this.canvas2.getContext("2d");
    this.canvas2.width = this.WIDTH;
    this.canvas2.height = this.HEIGHT;
    this.log = this.$refs.log;
    this.freq = this.$refs.freq; 
    this.fdfreq = this.$refs.fdfreq; 
    // 描画領域3 目盛り領域
    this.canvas3 = this.$refs.canvas3;
    this.canvasCtx3 = this.canvas3.getContext("2d");
    this.canvas3.width = this.WIDTH;
    this.canvas3.height = this.HEIGHT2;

    // Copy先
    this.cpfreq = this.$refs.cpfreq; 
  },
  data() {
      return {
        canvas1: null,
        canvasCtx1: null,
        canvas2: null,
        canvasCtx2: null,
        WIDTH: 800,
        HEIGHT: 200,
        HEIGHT2: 40,
        log: null,
        freq: null,
        fdfreq: null,
        stream: null
      };
  },
  beforeRouteLeave(to, from, next) {
    this.canvasCtx1.clearRect(0, 0, this.WIDTH, this.HEIGHT);
    if (this.stream) this.stream=null;
    next();
  },
  methods: {
      // 分析ボタン
      startAnalyze:async function() {
        if (this.stream) return;
          try {
            await audioCtx.resume();
            this.stream = await navigator.mediaDevices.getUserMedia({
              audio: true
            });
            audioCtx.createMediaStreamSource(this.stream).connect(analyser);
            this.draw();
          } catch (err) {
            console.log(err.toString());
          }
      },
      draw() {
        if (this.stream) requestAnimationFrame(this.draw);
        this.draw1();
        this.draw2();
      },
      draw1() {
        analyser.getByteTimeDomainData(dataArray);
        this.canvasCtx1.fillStyle = "rgb(0, 0, 0)";
        this.canvasCtx1.fillRect(0, 0, this.WIDTH, this.HEIGHT);
        this.canvasCtx1.lineWidth = 2;
        this.canvasCtx1.strokeStyle = "rgb(200, 50, 50)";
        this.canvasCtx1.beginPath();
        let sliceWidth = (this.WIDTH * 1.0) / bufferLength;
        for (let i = 0; i < bufferLength; i++) {
          let v = dataArray[i] / 128.0;
          let x = i * sliceWidth;
          let y = v * this.HEIGHT / 2;
          if (i === 0) {
            this.canvasCtx1.moveTo(x, y);
          } else {
            this.canvasCtx1.lineTo(x, y);
          }
        }
        this.canvasCtx1.lineTo(this.WIDTH, this.HEIGHT / 2);
        this.canvasCtx1.stroke();
      },
      draw2() {
        analyser.getByteFrequencyData(dataArray);
        //this.canvasCtx2.fillStyle = "rgb(200, 200, 200)";
        this.canvasCtx2.fillStyle = "rgb(0, 0, 0)";
        this.canvasCtx2.fillRect(0, 0, this.WIDTH, this.HEIGHT);
        this.canvasCtx2.lineWidth = 2;
        this.canvasCtx2.strokeStyle = "rgb(0, 0, 0)";
        this.canvasCtx2.beginPath();
        //let sliceWidth = (this.WIDTH * 1.0) / bufferLength;
        let peak = 0;
        let peaki = 0;

        // 目盛りを描画する
        const tickWidth = this.WIDTH / (tickValues.length - 1);
        this.canvasCtx3.fillStyle = 'black';
        this.canvasCtx3.textAlign = 'center';
        this.canvasCtx3.font = '10px Arial';
        for (let i = 0; i < tickValues.length; i++) {
          const tickX = i * tickWidth;
          this.canvasCtx3.beginPath();
          this.canvasCtx3.moveTo(tickX, this.HEIGHT2 - 5);
          this.canvasCtx3.lineTo(tickX, this.HEIGHT2 - 15);
          this.canvasCtx3.stroke();
          this.canvasCtx3.fillText(`${tickValues[i]} Hz`, tickX, this.HEIGHT2);
        }

        const barWidth =  this.WIDTH / dataArray.length * 6; // 6分の1だけ表示する
        let barHeight;
        let x = 0;

        for (let i = 0; i < dataArray.length; i++) {
          barHeight = dataArray[i] / 2;
          //this.canvasCtx2.fillStyle = `rgb(${barHeight + 100}, 50, 50)`;
          const hue = i / dataArray.length * 360 * 6; // 色相を計算
          this.canvasCtx2.fillStyle = `hsl(${hue}, 50%, 80%)`; // パステルカラーにする
          //this.canvasCtx2.fillStyle = `rgb(200, 50, 50)`;
          let v = dataArray[i] / 256.0;
          this.canvasCtx2.fillRect(x, this.HEIGHT - barHeight, barWidth, barHeight);

          x += barWidth + 1;

          if (peak < v) {
            peak = v;
            peaki = i;
          }
        }

        // ピーク周波数
        console.log(dataArray.length);
        let hz = Math.round(peaki * audioCtx.sampleRate / dataArray.length); // 48000Hz
        this.freq.textContent = hz.toString();

      },
      logButton() {
          this.log.textContent += " " + this.freq.textContent;
      },
      copyCanvas() {
        const copyCanvas1 = this.$refs.copycanvas1;
        const copyCanvas2 = this.$refs.copycanvas2;
        const copyCanvas3 = this.$refs.copycanvas3;
        copyCanvas1.width = this.WIDTH;
        copyCanvas1.height = this.HEIGHT;
        copyCanvas2.width = this.WIDTH;
        copyCanvas2.height = this.HEIGHT;
        copyCanvas3.width = this.WIDTH;
        copyCanvas3.height = this.HEIGHT2;

        const context1 = copyCanvas1.getContext("2d");
        const context2 = copyCanvas2.getContext("2d");
        const context3 = copyCanvas3.getContext("2d");

        // キャンバスからスナップショットを取得して、コピー先のキャンバスに描画する
        context1.drawImage(this.canvas1, 0, 0);
        context2.drawImage(this.canvas2, 0, 0);
        context3.drawImage(this.canvas3, 0, 0);
        this.cpfreq.textContent = this.freq.textContent; // Peak周波数のコピー
      },
    },

  }
</script>