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
            <v-col cols="12">
                <div id="waveform"></div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import WaveSurfer from 'wavesurfer.js';
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
                barWidth: 2,
                barRadius: 1,
                height: 400
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