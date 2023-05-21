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
                            音声の波を見てみよう
                        </v-card-title>
                        <v-card-text>
                            STARTボタンを押すとマイクの音を波にしてくれます。
                        </v-card-text>
                        <v-card-text>
                            STOPボタンを押すと止まります。
                        </v-card-text>
                    </v-card>
                </div>
            </v-col>
            <v-divider></v-divider>
        </v-row>
        <v-row>
            <v-col cols="12" md="3" lg="3" xl="3">
                <v-btn prepend-icon="mdi-play-circle-outline" block color="indigo" v-on:click="start" class="d-flex align-center">Start Display</v-btn>
            </v-col>
            <v-col cols="12" md="3" lg="3" xl="3">
                <v-btn prepend-icon="mdi-stop-circle-outline" block color="indigo" v-on:click="stop" class="d-flex align-center">Stop Display</v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <div id="waveformmic"></div>
                <div id="waveformtimeline"></div>
            </v-col>
        </v-row>
    </v-container>
    
  </template>
  
  <script>
    import WaveSurfer from 'wavesurfer.js';
    import MicrophonePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.microphone.min.js';
    import TimelinePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.min.js';
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
            };
        },
        mounted() {
        },
        methods: {
            start() {
            const options = {
                container: '#waveformmic',
                backgroundColor: "black",
                waveColor: "#FFACFC",
                interact      : false,
                barHeight: 1,
                barWidth: 1,
                barRadius: 2,
                height: 400,
                plugins: [
                  MicrophonePlugin.create(),
                  TimelinePlugin.create({
                        container: "#waveformtimeline",
                        formatTimeCallback: this.formatTimeCallback,
                        primaryLabelInterval: 1,
                        timeInterval: 0.1,
                        primaryColor: 'blue',
                        secondaryColor: 'red',
                        primaryFontColor: 'blue',
                        secondaryFontColor: 'red'
                    })
                ]
            };
            this.wavesurfer = WaveSurfer.create(options);
            this.wavesurfer.microphone.on('deviceReady', function(stream) {
                console.log('Device ready!', stream);
            });
            this.wavesurfer.microphone.on('deviceError', function(code) {
                console.warn('Device error: ' + code);
            });
            // start the microphone
            this.wavesurfer.microphone.start();
            },
            stop() {
                //this.wavesurfer.microphone.stopDevice();
                this.wavesurfer.destroy();
            },
            formatTimeCallback(time) {
                    // timeを分、秒、ミリ秒に変換する
                    const minutes = Math.floor(time / 60);
                    const seconds = Math.floor(time % 60);
                    const milliseconds = Math.floor((time % 1) * 1000);
  
                    // フォーマットを指定して時間を表示する
                    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
                /*
                seconds = Number(seconds);
                var minutes = Math.floor(seconds / 60);
                seconds = seconds % 60;
  
                // fill up seconds with zeroes
                var secondsStr = Math.round(seconds).toString();
                if (pxPerSec >= 25 * 10) {
                    secondsStr = seconds.toFixed(2);
                } else if (pxPerSec >= 25 * 1) {
                    secondsStr = seconds.toFixed(1);
                }
  
                if (minutes > 0) {
                    if (seconds < 10) {
                        secondsStr = '0' + secondsStr;
                    }
                    return `${minutes}:${secondsStr}`;
                }
                return secondsStr;
                */
            },
            timeInterval(pxPerSec) {
                var retval = 1;
                if (pxPerSec >= 25 * 100) {
                    retval = 0.01;
                } else if (pxPerSec >= 25 * 40) {
                    retval = 0.025;
                } else if (pxPerSec >= 25 * 10) {
                    retval = 0.1;
                } else if (pxPerSec >= 25 * 4) {
                    retval = 0.25;
                } else if (pxPerSec >= 25) {
                    retval = 1;
                } else if (pxPerSec * 5 >= 25) {
                    retval = 5;
                } else if (pxPerSec * 15 >= 25) {
                    retval = 15;
                } else {
                    retval = Math.ceil(0.5 / pxPerSec) * 60;
                }
                return retval;
            },
            primaryLabelInterval(pxPerSec) {
                var retval = 1;
                if (pxPerSec >= 25 * 100) {
                    retval = 10;
                } else if (pxPerSec >= 25 * 40) {
                    retval = 4;
                } else if (pxPerSec >= 25 * 10) {
                    retval = 10;
                } else if (pxPerSec >= 25 * 4) {
                    retval = 4;
                } else if (pxPerSec >= 25) {
                    retval = 1;
                } else if (pxPerSec * 5 >= 25) {
                    retval = 5;
                } else if (pxPerSec * 15 >= 25) {
                    retval = 15;
                } else {
                    retval = Math.ceil(0.5 / pxPerSec) * 60;
                }
                return retval;
            },
            secondaryLabelInterval(pxPerSec) {
                // draw one every 10s as an example
                return Math.floor(10 / this.timeInterval(pxPerSec));
            }            
        }
    }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  #waveformmic {
  height: 400px;
  }
  </style>