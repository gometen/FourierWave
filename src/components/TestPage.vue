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
      <div>
        <canvas ref="canvas1"></canvas>
      </div>
    </v-row>

  </v-container>
</template>

<script>
  // 物体の初期状態を設定
  var position = 0; // 初期位置
  var velocity = 0; // 初期速度
  var acceleration = 0; // 初期加速度
  var amplitude = 100; // 上下の振幅（ピクセル）

  var timeData = []; // 時間データの配列
  var velocityData = []; // 速度データの配列
  var accelerationData = []; // 加速度データの配列

  // アニメーションの設定
  var simulationTime = 10; // シミュレーションの継続時間（秒）
  var timeStep = 0.1; // 時間ステップ（秒）
  var startTime = null;
  var currentTime = 0;

export default {
  mounted() {
    // 描画領域1
    this.canvas = this.$refs.canvas1;
    this.canvas.width = 400;
    this.canvas.height = 400;
    this.canvasCtx1 = this.canvas.getContext("2d");

    // 初期値設定
    position = this.canvas.height / 2; // 初期位置（画面の中央）
  },
  data() {
    return {
      datacollection: null,
      canvas: null,
      canvasCtx1: null,
    };
  },
  methods: {
    // アニメーションの実行
    animate() {
      if (!startTime) startTime = Date.now(); // 最初のタイムスタンプを保存
      var elapsedTime = (Date.now() - startTime) / 1000; // 経過時間（秒）
      
      // 速度を更新
      velocity = this.calculateVelocity(elapsedTime);
      acceleration = this.calculateAcceleration(elapsedTime);

      // データポイントの追加
      timeData.push(currentTime);
      velocityData.push(velocity);
      accelerationData.push(acceleration);

      currentTime += timeStep;

      // 上下の振動を計算
      var y = position + amplitude * this.calculatePosition(elapsedTime);
      
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
   
      // アニメーションの再帰呼び出し
      if (elapsedTime <= simulationTime) {
        requestAnimationFrame(this.animate);
      }
    },
    start() {
      // アニメーションの開始
      this.animate();
    },
    // 位置の計算
    calculatePosition(time) {
      return Math.sin(2*time);
    },

    // 速度の計算
    calculateVelocity(time) {
      return Math.cos(2*time);
    },

    // 加速度の計算
    calculateAcceleration(time) {
      return Math.sin(2*time);
    },
    
    fillData () {

    }
  }
}
</script>

<style scoped>
  .small {
    max-width: 600px;
    margin:  150px auto;
  }
</style>