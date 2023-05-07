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
            <v-col cols="2">
                <v-btn color="indigo" v-on:click="start" class="d-flex align-center">Start Display</v-btn>
            </v-col>
            <v-col cols="2">
                <v-btn color="indigo" v-on:click="stop" class="d-flex align-center">Stop Display</v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <div id="waveformmic"></div>
            </v-col>
        </v-row>
    </v-container>
    
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