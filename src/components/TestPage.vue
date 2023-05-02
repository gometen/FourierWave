<template>
    <v-btn color="blue" variant="tonal" v-on:click="startAnalyze">Start Analyzing</v-btn>
    <div>
      <canvas ref="canvas1"></canvas>
    </div>
    <div>
      <canvas ref="canvas2"></canvas>
    </div>
    <v-btn color="blue" variant="tonal" v-on:click="logButton">
      Keep Log</v-btn>Peak: <span ref="freq"></span>Hz
    <div ref="log"></div>
</template>
  
<script>
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const analyser = audioCtx.createAnalyser();
      
  //let stream;

  analyser.fftSize = 32768;
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
    },
    data() {
        return {
          canvas1: null,
          canvasCtx1: null,
          canvas2: null,
          canvasCtx2: null,
          WIDTH: 500,
          HEIGHT: 200,
          log: null,
          freq: null,
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
          this.canvasCtx1.fillStyle = "rgb(200, 200, 200)";
          this.canvasCtx1.fillRect(0, 0, this.WIDTH, this.HEIGHT);
          this.canvasCtx1.lineWidth = 2;
          this.canvasCtx1.strokeStyle = "rgb(0, 0, 0)";
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
          this.canvasCtx2.fillStyle = "rgb(200, 200, 200)";
          this.canvasCtx2.fillRect(0, 0, this.WIDTH, this.HEIGHT);
          this.canvasCtx2.lineWidth = 2;
          this.canvasCtx2.strokeStyle = "rgb(0, 0, 0)";
          this.canvasCtx2.beginPath();
          let sliceWidth = (this.WIDTH * 1.0) / bufferLength;
          let peak = 0;
          let peaki = 0;
          for (let i = 0; i < bufferLength; i++) {
            let v = dataArray[i] / 256.0;
            let x = i * sliceWidth;
            let y = (1 - v) * this.HEIGHT;
            if (i === 0) {
              this.canvasCtx2.moveTo(x, y);
            } else {
              this.canvasCtx2.lineTo(x, y);
            }
            if (peak < v) {
              peak = v;
              peaki = i;
            }
          }
          this.canvasCtx2.lineTo(this.WIDTH, this.HEIGHT);
          this.canvasCtx2.stroke();
          let hz = Math.round(peaki / bufferLength * 24000);
          this.freq.textContent = hz.toString();
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