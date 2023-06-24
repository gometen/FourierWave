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
                            sinΘの微分を目で見てみよう
                        </v-card-title>
                        <v-card-text>
                          物体がsinΘの波を描くように動きます。
                          sinΘの微分がcosΘ（位置の変化=速度）なので、物体の速度がcosΘの波を描くところを見ることが出来ます。
                          加速度は速度の微分（速度の変化=加速度）で表されますが、cosΘの微分により、
                          加速度はどのような波を描いているか、見てみましょう。
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
        <v-col cols="12" md="3" lg="3" xl="3">
          <v-text-field v-model="inputOmega" 
            hint="角速度を整数で入れてください"
            clearable label="角速度" variant="underlined"
            placeholder="例：2"></v-text-field>
        </v-col>
        <v-col cols="12" md="3" lg="3" xl="3">
          <v-text-field v-model="inputSec" 
            hint="動かす秒数を整数で入れてください"
            clearable label="秒数" variant="underlined"
            placeholder="例：10"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4" lg="4" xl="4">
          <div align="center">
            <canvas ref="canvas2" style="border-style: solid; border-color: white"></canvas>
          </div>
        </v-col>
        <v-col cols="12" md="2" lg="2" xl="2">
          <div align="center">
            <canvas ref="canvas1" style="border-style: solid; border-color: white"></canvas>
          </div>
        </v-col>
        <v-col cols="12" md="6" lg="6" xl="6">
          <div id="graph" align="center"></div>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
    import Plotly from 'plotly.js-basic-dist'
  
    // 物体の初期状態を設定
    var position = 0; // 初期位置
    var amplitude = 150; // 上下の振幅（ピクセル）
  
    var startTime = null;
  
  export default {
    mounted() {
      // 描画領域1
      this.canvas = this.$refs.canvas1;
      this.canvas.width = 100;
      this.canvas.height = 400;
      this.canvasCtx1 = this.canvas.getContext("2d");
  
      // 描画領域2
      this.canvas2 = this.$refs.canvas2;
      this.canvas2.width = 400;
      this.canvas2.height = 400;
      this.canvasCtx2 = this.canvas2.getContext("2d");
  
      // 初期値設定
      position = this.canvas.height / 2; // 初期位置（画面の中央）
  
      // グラフ描画領域1
      Plotly.newPlot("graph", this.graphData, this.graphLayout);
  
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
        canvas2: null,
        canvasCtx2: null,
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
          title: 'sinΘの微分を見てみる',
          xaxis: {
            title: 'Time',
          },
          yaxis: {
            title: 'Value',
          }, 
          margin: {'t':40, 'b':20, 'l':30, 'r':20},
          legend: {x: 0.9, y: 0.1, xanchor:'left', yanchor: 'top',},
        },
        requestId: null,
        inputSec: 10, // グラフの描画を停止する時間（秒）
        inputOmega: 2, // 物体が動くスピード
      };
    },
    methods: {
      // アニメーションの実行
      animate() {
  
  
        if (!startTime) startTime = Date.now(); // 最初のタイムスタンプを保存
        var elapsedTime = (Date.now() - startTime) / 1000; // 経過時間（秒）
  
        // データを更新
        var thetaSpeed = this.inputOmega * elapsedTime
        var theta = thetaSpeed % (2 * Math.PI);
        const cPosition = Math.sin(theta); // 位置の計算（サイン波）
        const velocity = Math.cos(theta); // 速度の計算（コサイン波）
        const acceleration = -Math.sin(theta); // 加速度の計算（マイナスのサイン波）
  
        // 上下の振動を計算
        var y = position - amplitude * cPosition;
        
        // Canvasをクリア
        this.canvasCtx1.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.canvasCtx2.clearRect(0, 0, this.canvas2.width, this.canvas2.height);
        
        // 物体を描画
        this.canvasCtx1.fillStyle = "rgb(0, 0, 0)";
        this.canvasCtx1.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.canvasCtx1.beginPath();
        this.canvasCtx1.lineWidth = 2;
        this.canvasCtx1.strokeStyle = "rgb(200, 50, 50)";
        //this.canvasCtx1.arc(this.canvas.width / 2, this.canvas.height / 2 - position, 10, 0, 2 * Math.PI);
        this.canvasCtx1.arc(this.canvas.width / 2, y, 10, 0, 2 * Math.PI);
        this.canvasCtx1.stroke();

        // 高さを表す線
        this.canvasCtx1.beginPath();
        this.canvasCtx1.lineWidth = 1;
        this.canvasCtx1.strokeStyle = "#D7352B";
        this.canvasCtx1.moveTo(this.canvas.width / 2, this.canvas.height / 2);
        this.canvasCtx1.lineTo(this.canvas.width / 2, y);
        this.canvasCtx1.stroke();

        // つながりを表す横線
        this.canvasCtx1.beginPath();
        this.canvasCtx1.lineWidth = 1;
        this.canvasCtx1.strokeStyle = "#D7352B";
        this.canvasCtx1.moveTo(this.canvas.width / 2, y);
        this.canvasCtx1.lineTo(0, y);
        this.canvasCtx1.stroke();
  
        // 物体の回転を描画
        // 物体の中心
        var centerx = position + amplitude * Math.cos(theta);
        var centery = position - amplitude * Math.sin(theta);
        this.canvasCtx2.fillStyle = "rgb(0, 0, 0)";
        this.canvasCtx2.fillRect(0, 0, this.canvas2.width, this.canvas2.height);
        this.canvasCtx2.beginPath();
        this.canvasCtx2.lineWidth = 2;
        this.canvasCtx2.strokeStyle = "#1F662E";
        this.canvasCtx2.arc(
          centerx,
          centery,
          10,
          0,
          2 * Math.PI);
        this.canvasCtx2.stroke();

        // 中心から円までの線
        this.canvasCtx2.beginPath();
        this.canvasCtx2.lineWidth = 2;
        this.canvasCtx2.strokeStyle = "#1F662E";
        this.canvasCtx2.moveTo(this.canvas2.width / 2, this.canvas2.height / 2);
        this.canvasCtx2.lineTo(
          centerx,
          centery
        );
        this.canvasCtx2.stroke();

        // 高さを表す線
        /*
        this.canvasCtx2.beginPath();
        this.canvasCtx2.lineWidth = 1;
        this.canvasCtx2.strokeStyle = "#D7352B";
        this.canvasCtx2.moveTo(centerx, this.canvas2.height / 2);
        this.canvasCtx2.lineTo(
          centerx,
          centery
        );
        this.canvasCtx2.stroke();
        */

        // つながりを表す横線
        this.canvasCtx2.beginPath();
        this.canvasCtx2.lineWidth = 1;
        this.canvasCtx2.strokeStyle = "#D7352B";
        this.canvasCtx2.moveTo(centerx, centery);
        this.canvasCtx2.lineTo(
          this.canvas2.width,
          centery,
        );
        this.canvasCtx2.stroke();

        // シータを表す弧
        this.canvasCtx2.beginPath();
        this.canvasCtx2.lineWidth = 1;
        this.canvasCtx2.strokeStyle = "#F25A86";
        this.canvasCtx2.arc(
          this.canvas2.width / 2, 
          this.canvas2.height / 2,
          10,
          0,
          -theta, true);
        this.canvasCtx2.stroke();
  
        this.graphData[0].x.push(elapsedTime);
        this.graphData[0].y.push(cPosition);
        this.graphData[1].x.push(elapsedTime);
        this.graphData[1].y.push(velocity);
        this.graphData[2].x.push(elapsedTime);
        this.graphData[2].y.push(acceleration);
        Plotly.redraw("graph", this.graphData, this.graphLayout);
  
        this.requestId = requestAnimationFrame(this.animate);
  
         // 一定時間ごとにデータを更新
        if (elapsedTime > this.inputSec) { 
          cancelAnimationFrame(this.requestId);
        }
  
      },
      start() {
        // 時間初期化
        startTime = null;
  
        this.graphData[0].x = [];
        this.graphData[0].y = [];
        this.graphData[1].x = [];
        this.graphData[1].y = [];
        this.graphData[2].x = [];
        this.graphData[2].y = [];
  
        // アニメーションの開始
        this.animate();
      },
  
    }
  }
  </script>
  
  <style>
  </style>