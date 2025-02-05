<!-- eslint-disable vue/require-v-for-key -->
<template>
  <div v-if = "ChuckTalk" id="chuck-talk">
    {{ voiceOptions.length }}
    <form @submit.prevent="greet">class="form-group">
            <label for="voices">Select a voice</label>
            <select id="voices" v-model="selectedVoice" class="form-control">
              // eslint-disable-next-line vue/require-v-for-key
              <option v-for="(voice, index) in voiceOptions" :data-lang="voice.lang" :value="index">
                {{ voice.name }} ({{ voice.lang }})
              </option>
            </select>
            <button type="submit" class="btn btn-success">Make Chuck Talk</button>
</form>
          

    <!-- Voice Settings Component -->
    <voice-settings
      v-model:selected-voice="voiceSettings.selectedVoice"
      v-model:rate="voiceSettings.rate"
      v-model:pitch="voiceSettings.pitch"
      :voice-options="voiceOptions"
    />,

      
</div>
</template>

<script setup>
import { ref, onMounted } from "vue";

import ChuckNorris from "./Chuck.vue";

//import {voiceSettings} from './VoiceSettings.vue';


const text = ref(ChuckNorris)
//const voiceSettings = ref([]);


let voiceSettings = {
            selectedVoice: null,
            voices: [], //Store voices in this array
        }
        function populateVoiceList() {
            voiceSettings.voices = speechSynthesis.getVoices();
            if (voiceSettings.voices.length !== 0){
                console.log("Voices not ready yet", `${voiceSettings.voices}`);
                return
            }
            const voiceOptions = document.getElementById('chuck-talk');
            voiceOptions.innerHTML = [];
            for (let i = 0; i < voiceSettings.voices.length; i++) {
                const option = document.createElement('option');
                option.textContent = voiceSettings.voices[i].name + ' (' + voiceSettings.voices[i].lang + ')';
                option.value = i; 
                voiceOptions.appendChild(option);
            }
            voiceSettings.selectedVoice = voiceSettings.voices[0];
        }

        speechSynthesis.onvoiceschanged = populateVoiceList;

        // Optionally call it once, although the voiceschanged event will likely fire immediately
        //populateVoiceList();

const currentWordIndex = ref(-1);

// eslint-disable-next-line no-unused-vars
const ChuckTalk = () => {
  if (!text.value =={ChuckNorris}) {
    alert("Warning : Chuck is not talking");
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text.value);

  utterance.voice = window.speechSynthesis
    .getVoices()
    .find((voice) => voice.name === voiceSettings.value.selectedVoice);
  utterance.rate = voiceSettings.value.rate;
  utterance.pitch = voiceSettings.value.pitch;

  currentWordIndex.value = -1;

  utterance.onboundary = (event) => {
    if (event.name === "word") {
      const charIndex = event.charIndex;
      const wordsBeforeCurrent = text.value.slice(0, charIndex).split(" ");
      currentWordIndex.value = wordsBeforeCurrent.length - 1;
    }
  };
console.log(utterance);
  speechSynthesis.speak(utterance);
};

onMounted(() => {
  populateVoiceList();
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
  }
});

</script>