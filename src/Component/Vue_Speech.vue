<!-- eslint-disable vue/no-unused-components -->
<!-- eslint-disable vue/require-v-for-key -->
<template>

  <div class="chuck-talk">
  <div v-if="voiceList.length" >
    <form class="form-group" @submit.prevent="chuck">
            <label for="voices">Select a voice</label>
            <select id="voices" v-model="selectedVoice" class="form-control">
             
              <option v-for="(voice, index) in voiceList" :data-lang="voice.lang" :value="index">
                {{ voice.name }} ({{ voice.lang }})
              </option>
            </select>
            <button type="submit" class="btn btn-success">Make Chuck Talk</button>
</form>
          </div>
        </div>
</template>

<script>
import {VueSpinner,} from 'vue3-spinners';
import {default as PulseLoader} from 'vue-spinner/src/PulseLoader.vue';
import {default as currentJoke} from './Chuck.vue';

export default {name: 'VueSpeech',

  
    // eslint-disable-next-line vue/no-unused-components
    components: {PulseLoader, currentJoke, VueSpinner},
data (){ 
    return {isLoading: true,
    name: '',
    selectedVoice: 0,
    synth: window.speechSynthesis,
    voiceList: [],
    currentJoke: new window.SpeechSynthesisUtterance()
    }
    
  },

    mounted () {
this.voiceList = this.synth.getVoices()
if (this.voiceList.length) {this.isLoading = false}

this.synth.onvoiceschanged = () => {this.voiceList = this.synth.getVoices()
}
      
    setTimeout(() => {this.isLoading = false}, 800)
    this.listenForSpeechEvents()
    this.listenForSpeechEvents()

},
    methods: {

      listenForSpeechEvents() {
        this.currentJoke.onstart = () => {
        this.isLoading = true;
      } 

    this.currentJoke.onend = () => {this.isLoading = false}
    },
chuck () {
     this.currentJoke.text = `${this.currentJoke.value}`

    this.currentJoke.voice = this.voiceList[this.selectedVoice]

    this.synth.speak(this.currentJoke)
  },
}

}
  </script>
  <style scoped>
      .quiz-container {min-width :100vw;
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      }

      form {padding: 30px;
      max-width: 600px;
      margin: 0 auto;
      background: #fb0078;
      border-radius: 3px;
      box-shadow: 0 10px 30px 10px rgba(0, 0, 0, 0.1);
      }

      .v-spinner {position: fixed;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.8);
      -webkit-backdrop-filter: blur(4px);
      backdrop-filter: blur(4px);
      }

      .fade-enter-active, .fade-leave-active {transition: opacity ease .5s;
      }

      .fade-enter, .fade-leave-to {opacity: 0;
      }

      .btn-success {background: #43C6AC;
      border-color: #43C6AC;
      cursor: pointer;
      }

      h1 {margin-bottom: 25px;
      }
    </style>
