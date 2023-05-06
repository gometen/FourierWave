<template>
    <v-container>
      <v-row>
        <v-col cols="2">
          <v-btn color="indigo" v-on:click="startAnalyze" class="d-flex align-center">Start Analyzing</v-btn>
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
      </v-row>
      <v-row>
        <v-col cols="2">
          <v-btn color="indigo" v-on:click="logButton" class="d-flex align-center">
          Keep Log</v-btn>
        </v-col>
        <v-col cols="6">
          Peak: <span ref="freq"></span>Hz
        <div ref="log"></div>
        </v-col>
      </v-row>
      <v-row>
        <div>基本周波数: <span ref="fdfreq"></span>Hz</div>
      </v-row>
    </v-container>
</template>
  
<script>
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const analyser = audioCtx.createAnalyser();
      
  //analyser.fftSize = 32768;
  analyser.fftSize = 2048;
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
    },
    data() {
        return {
          canvas1: null,
          canvasCtx1: null,
          canvas2: null,
          canvasCtx2: null,
          WIDTH: 600,
          HEIGHT: 200,
          log: null,
          freq: null,
          fdfreq: null,
          stream: null
        };
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

          const barWidth =  this.WIDTH / dataArray.length * 2.5;
          let barHeight;
          let x = 0;

          for (let i = 0; i < dataArray.length; i++) {
            barHeight = dataArray[i] / 2;
            this.canvasCtx2.fillStyle = `rgb(${barHeight + 100}, 50, 50)`;
            let v = dataArray[i] / 256.0;
            this.canvasCtx2.fillRect(x, this.HEIGHT - barHeight, barWidth, barHeight);

            x += barWidth + 1;

            if (peak < v) {
              peak = v;
              peaki = i;
            }
          }

          // ピーク周波数
          let hz = Math.round(peaki / bufferLength * 24000);
          this.freq.textContent = hz.toString();

          // 100msごとに基本周波数を推定
          setInterval(this.estimatePitch, 100, dataArray); 
        },
        // 基本周波数を推定する関数
        estimatePitch(dataArray) {
            // YINアルゴリズムを適用して基本周波数を推定
            const tauEstimate = this.yin(dataArray);
            
            const pitch = audioCtx.sampleRate / tauEstimate;
            if(Infinity != pitch) {
              this.fdfreq.textContent = pitch.toString();
            }
        },
        // YINアルゴリズムの実装
        yin(dataArray) {
          const threshold = 0.1;
          const bufferSize = dataArray.length;
          const deltaYin = new Float32Array(bufferSize);

          for (let tau = 0; tau < bufferSize; tau++) {
            let diff = 0;
            for (let i = 0; i < bufferSize - tau; i++) {
              const delta = dataArray[i] - dataArray[i + tau];
              diff += delta * delta;
            }
            deltaYin[tau] = diff / (bufferSize - tau);
          }

          let tauEstimate = 0;
          let minDiff = Infinity;
          let maxDiff = 0; // 追加
          for (let tau = 1; tau < bufferSize; tau++) {
            if (deltaYin[tau] < threshold) {
              if (minDiff > deltaYin[tau]) {
                minDiff = deltaYin[tau];
                tauEstimate = tau;
              }
            }
            if (maxDiff < deltaYin[tau]) {
              maxDiff = deltaYin[tau];
              tauEstimate = tau;
            }
          }

          return tauEstimate;
        },
        logButton() {
            this.log.textContent += " " + this.freq.textContent;
          }
        },
        beforeRouteLeave(to, from, next) {
          if (this.stream) this.stream=null;
          next();
        }
    }
 </script>