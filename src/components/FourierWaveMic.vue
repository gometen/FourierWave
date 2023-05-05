<template>
    <v-btn color="blue" variant="tonal" v-on:click="start">Start Display</v-btn>
    <v-btn color="blue" variant="tonal" v-on:click="stop">Stop Display</v-btn>
    <div id="waveformmic"></div>
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
                container: '#waveformmic',
                waveColor: 'Black',
                interact      : false,
                barHeight: 5,
                barWidth: 2,
                barRadius: 1,
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
            
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#waveformmic {
  height: 400px;
}
</style>