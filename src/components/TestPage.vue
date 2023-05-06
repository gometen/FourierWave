<template>
  <v-container>
    <v-row>
      <v-col cols="2">
        <v-btn color="indigo" v-on:click="fwrecord" class="d-flex align-center">Start Recording</v-btn>
      </v-col>
      <v-col cols="2">
        <v-btn color="indigo" v-on:click="fwdeldata" class="d-flex align-center">Delete Recording</v-btn>
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
  const analyzer = audioCtx.createAnalyser();

  analyzer.fftSize = 256;
  var bufferLength = analyzer.frequencyBinCount;
  var dataArray = new Uint8Array(bufferLength);
  const dataHistory = [];

  export default {
  name: 'FourierWave',
  props: {
      msg: String,
      url: {
      type: String,
      required: true
      }
  },
  data() {
      return {
        isRecording: false,
        mediaRecorder: null,
        wavesurfer: null,
        chunks: [],
        canvas1: null,
        canvasCtx1: null,
        canvas2: null,
        canvasCtx2: null,
        WIDTH: 800,
        HEIGHT: 300
      };
  },
  mounted() {
        // 描画領域1
        this.canvas1 = this.$refs.canvas1;
        this.canvasCtx1 = this.canvas1.getContext("2d");
        this.canvas1.width = this.WIDTH;
        this.canvas1.height = this.HEIGHT;

  },
  methods: {
      // 録音ボタン
      fwrecord:async function() {
        await audioCtx.resume();
        navigator.mediaDevices.getUserMedia({ audio: true })
          .then(stream => {
          this.mediaRecorder = new MediaRecorder(stream);
          this.mediaRecorder.start();
          this.chunks = [];
          this.mediaRecorder.addEventListener('dataavailable', event => {
              this.chunks.push(event.data);
              console.log("Push Event completed"); 
          });
          this.mediaRecorder.addEventListener('stop', () => {
              const blob = new Blob(this.chunks, { type: 'audio/ogg; codecs=opus' });
              this.createWaveform(blob);
              //this.waveSurfer.loadBlob(blob); 
          });
          this.isRecording = true;
          })
          .catch(error => {
          console.error(error);
          });
          // 2秒後に録音を停止する
          setTimeout(() => {
              this.stopRecording();
          }, 2000);
          },
          // 録音の停止
          async stopRecording() {
          this.isRecording = false;
          await this.mediaRecorder.stop();
          },
          // 録音データの波形表示
          createWaveform:async function(blob) {
            const audioData = await blob.arrayBuffer();
            // 音声データをデコードする
            console.log(audioData);
            const audioBuffer = await audioCtx.decodeAudioData(audioData); 
            // Analyzerにデコードした音声データを設定する
            const bufferSource = audioCtx.createBufferSource();
            bufferSource.buffer = audioBuffer;
            bufferSource.connect(analyzer);
            bufferSource.start(0);
            
            this.draw();
      },
      draw() {
          requestAnimationFrame(this.draw);
          this.draw1();
      //    this.draw2();
      },
      draw1() {
        analyzer.getByteFrequencyData(dataArray);

        // 過去のデータを配列に保存する
        dataHistory.push(dataArray);

        // 過去のデータから平均値を計算する
        let smoothedValue = 0;
        for (let i = 0; i < dataHistory.length; i++) {
            const historyData = dataHistory[i];
            for (let j = 0; j < historyData.length; j++) {
              smoothedValue += historyData[j];
            }
        }
        smoothedValue /= (dataArray.length * dataHistory.length);
        // 過去のデータを削除する
        if (dataHistory.length > 10) {
          dataHistory.shift();
        }
        // データを保持する
        dataArray = dataArray.map(value => value - smoothedValue);
        
        // Canvasに描画する
        this.canvasCtx1.clearRect(0, 0,  this.WIDTH, this.HEIGHT);
        this.canvasCtx1.fillStyle = "rgb(0, 0, 0)";
        this.canvasCtx1.fillRect(0, 0, this.WIDTH, this.HEIGHT);
        this.canvasCtx1.lineWidth = 2;
        this.canvasCtx1.strokeStyle = "rgb(0, 0, 0)";
        this.canvasCtx1.beginPath();

        const barWidth =  this.WIDTH / dataArray.length * 2.5;
        let barHeight;
        let x = 0;

        for (let i = 0; i < dataArray.length; i++) {
          barHeight = dataArray[i] / 2;
          this.canvasCtx1.fillStyle = `rgb(${barHeight + 100}, 50, 50)`;
          this.canvasCtx1.fillRect(x, this.HEIGHT - barHeight / 2, barWidth, barHeight);

          x += barWidth + 1;
        }
      },
      // 削除ボタン
      fwdeldata(){
      }
  }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#waveform {
    height: 250px;
}
</style>