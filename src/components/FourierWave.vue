<template>
    <v-alert text="これはv-alertのコンポーネント"></v-alert>
    <button v-on:click="start">Start Display</button>
    <button v-on:click="stop">Stop Display</button>
    <button v-on:click="record">Start Recording</button>
    <button v-on:click="deldata">Delete Recording</button>
    <div id="waveform"></div>
</template>

<script>
    import WaveSurfer from 'wavesurfer.js';
    import MicrophonePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.microphone.min.js';
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
            container: '#waveform',
            waveColor: 'Black',
            interact      : false,
            barHeight: 5,
            barWidth: 4,
            barRadius: 2,
            plugins: [
            MicrophonePlugin.create()
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
        // 録音ボタン
        record:async function() {
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
            waveColor: "Blue",
            progressColor: "purple",
            cursorColor: "navy",
            barHeight: 5,
            barWidth: 4,
            barRadius: 2,
            height: 200
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
        deldata(){
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