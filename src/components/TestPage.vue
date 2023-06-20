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
        <v-btn prepend-icon="mdi-play-box-outline" block color="indigo" v-on:click="start" class="d-flex align-center">Start</v-btn>
      </v-col>
      <v-col cols="12" md="3" lg="3" xl="3">
        <v-btn prepend-icon="mdi-home-outline" block color="indigo" to="/" class="d-flex align-center">Home</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="3" lg="3" xl="3">
        <div align="center">
          <canvas ref="canvas1"></canvas>
        </div>
      </v-col>
      <v-col cols="12" md="9" lg="9" xl="9">
        <div id="graph" align="center"></div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import Plotly from 'plotly.js-basic-dist'

  // 物体の初期状態を設定
  var position = 0; // 初期位置
  var amplitude = 100; // 上下の振幅（ピクセル）

  var startTime = null;

export default {
  mounted() {
    // 描画領域1
    this.canvas = this.$refs.canvas1;
    this.canvas.width = 200;
    this.canvas.height = 400;
    this.canvasCtx1 = this.canvas.getContext("2d");

    // 初期値設定
    position = this.canvas.height / 2; // 初期位置（画面の中央）

    // グラフ描画領域1
    Plotly.newPlot("graph", this.graphData, this.layout);

  },
  beforeRouteLeave(to, from, next) {
    cancelAnimationFrame(this.requestId);
    next();
  },
  data() {
    return {
      datacollection: null,
      canvas: null,
      canvasCtx1: null,
      svg: null,
      line: null,
      positionData: [], // 位置のデータ配列
      velocityData: [],
      accelerationData: [],
      graphData: [
        {
          x: [],
          y: [],
          mode: 'lines+markers',
          name: 'Position',
          marker: {
            color: '#d7352b',
            size: 1, // マーカーのサイズを設定
          },
        },
        {
          x: [],
          y: [],
          mode: 'lines+markers',
          name: 'Velocity',
          marker: {
            color: '#ffa746',
            size: 1, // マーカーのサイズを設定
          },
        },
        {
          x: [],
          y: [],
          mode: 'lines+markers',
          name: 'Acceleration',
          marker: {
            color: '#5b97ee',
            size: 1, // マーカーのサイズを設定
          },
        },
      ],
      graphLayout: {
        xaxis: {
          title: 'Time',
        },
        yaxis: {
          title: 'Value',
        }, 
      },
      requestId: null,
      maxRunningTime: 10, // グラフの描画を停止する時間（秒）
    };
  },
  methods: {
    // アニメーションの実行
    animate() {
      if (!startTime) startTime = Date.now(); // 最初のタイムスタンプを保存
      var elapsedTime = (Date.now() - startTime) / 1000; // 経過時間（秒）

      // データを更新
      const cPosition = - Math.sin(2 * elapsedTime); // 位置の計算（サイン波）
      const velocity = - Math.cos(2 * elapsedTime); // 速度の計算（コサイン波）
      const acceleration = Math.sin(2 * elapsedTime); // 加速度の計算（マイナスのサイン波）

      // 上下の振動を計算
      var y = position + amplitude * cPosition;
      
      // Canvasをクリア
      this.canvasCtx1.clearRect(0, 0, this.canvas.width, this.canvas.height);
      
      // 物体を描画
      this.canvasCtx1.fillStyle = "rgb(0, 0, 0)";
      this.canvasCtx1.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.canvasCtx1.lineWidth = 2;
      this.canvasCtx1.strokeStyle = "rgb(200, 50, 50)";
      this.canvasCtx1.beginPath();
      //this.canvasCtx1.arc(this.canvas.width / 2, this.canvas.height / 2 - position, 10, 0, 2 * Math.PI);
      this.canvasCtx1.arc(this.canvas.width / 2, y, 10, 0, 2 * Math.PI);
      this.canvasCtx1.stroke();

      this.graphData[0].x.push(elapsedTime);
      this.graphData[0].y.push(cPosition);
      this.graphData[1].x.push(elapsedTime);
      this.graphData[1].y.push(velocity);
      this.graphData[2].x.push(elapsedTime);
      this.graphData[2].y.push(acceleration);
      Plotly.redraw("graph", this.graphData, this.layout);

      this.requestId = requestAnimationFrame(this.animate);

       // 一定時間ごとにデータを更新
      if (elapsedTime > this.maxRunningTime) { 
        cancelAnimationFrame(this.requestId);
      }

    },
    start() {
      // 時間初期化
      startTime = null;

      // アニメーションの開始
      this.animate();
    },

  }
}
</script>

<style>
</style>