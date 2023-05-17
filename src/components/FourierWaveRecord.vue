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
                            録音した音声の波を見てみよう
                        </v-card-title>
                        <v-card-text>
                            STARTボタンを押すと2秒間音声を録音します。押すたびに波形が増えていきます。
                        </v-card-text>
                        <v-card-text>
                            DELETEボタンを押すと最後に録音した波形を削除します。全部削除したい場合はページを開きなおしてみてください。
                        </v-card-text>
                    </v-card>
                </div>
            </v-col>
            <v-divider></v-divider>
        </v-row>
        <v-row>
            <v-col cols="12" md="3" lg="3" xl="3">
                <v-btn prepend-icon="mdi-record-circle-outline" block color="indigo" v-on:click="fwrecord" class="d-flex align-center">Start Recording</v-btn>
            </v-col>
            <v-col cols="12" md="3" lg="3" xl="3">
                <v-btn prepend-icon="mdi-delete-circle-outline" block color="indigo" v-on:click="fwdeldata" class="d-flex align-center">Delete Recording</v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <div id="waveform"></div>
                <div id="waveformtimeline"></div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import WaveSurfer from 'wavesurfer.js';
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
        // 録音ボタン
        fwrecord:async function() {
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
            createWaveform(blob) {
            const options = {
                container: '#waveform',
                backgroundColor: "black",
                waveColor: "#F44336",
                progressColor: "purple",
                cursorColor: "#F44336",
                barHeight: 5,
                barWidth: 1,
                barRadius: 1,
                height: 400,
                plugins: [
                    TimelinePlugin.create({
                        container: "#waveformtimeline",
                        formatTimeCallback: this.formatTimeCallback,
                        primaryLabelInterval: 1,
                        primaryColor: 'blue',
                        secondaryColor: 'red',
                        primaryFontColor: 'blue',
                        secondaryFontColor: 'red'
                    })
                ]
            };
            this.wavesurfer = WaveSurfer.create(options);
            this.wavesurfer.loadBlob(blob);

            // 音声データをWaveSurferに渡して、波形を表示する
            // this.wavesurfer.drawBuffer();
            // 波形の描画が完了するまで待ってから表示する
            //this.wavesurfer.on('ready', function () {
            console.log(this.wavesurfer.backend.buffer); // Blobの中身が表示される
            //  this.wavesurfer.play();
            //});
        },
        // 削除ボタン
        fwdeldata(){
            this.wavesurfer.destroy();
        },
        formatTimeCallback(time) {
                    // timeを分、秒、ミリ秒に変換する
                    const minutes = Math.floor(time / 60);
                    const seconds = Math.floor(time % 60);
                    const milliseconds = Math.floor((time % 1) * 1000);

                    // フォーマットを指定して時間を表示する
                    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
        }
    }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#waveform {
  height: 400px;
}
</style>