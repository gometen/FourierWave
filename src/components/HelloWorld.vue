<template>
    <div id="waveform"></div>
    <button v-on:click="start">Start Recording</button>
    <button v-on:click="stop">Stop Recording</button>
</template>

<script>
import WaveSurfer from 'wavesurfer.js';
import MicrophonePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.microphone.min.js';

export default {
  name: 'HelloWorld',
  props: {
    msg: String,
    url: {
      type: String,
      required: true
    }
  },
  mounted() {
    const options = {
      container: '#waveform',
      waveColor: 'Black',
      interact      : false,
      cursorWidth   : 0,
      barHeight: 5,
      barWidth: 4,
      barRadius: 2,
      plugins: [
        MicrophonePlugin.create()
      ]
    };
    this.wavesurfer = WaveSurfer.create(options);
    this.mediaStreamSource = null;
  },
  methods: {
    start() {
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
      this.wavesurfer.microphone.stopDevice();
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
