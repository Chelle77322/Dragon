<template>
    <div id="chuck-norris">
        <img id="chuck-norris__image" src="../assett/chuck_norris.png" @click="fetchRandomJoke()">,
{{currentJoke}}
 </div>    
</template>
<script>
// eslint-disable-next-line no-unused-vars

import axios from 'axios'
const API_RANDOM_JOKE_ENDPOINT = 'https://api.chucknorris.io/jokes/random'
export default {
    name: 'ChuckNorris',
    data: function() {
        return {
        currentJoke:null,
        }
    },
    mounted() {
        this.fetchRandomJoke()
    },
 methods: {
        fetchRandomJoke() {
            axios.get(API_RANDOM_JOKE_ENDPOINT)
                .then(({data}) => this.currentJoke = data.value)
         }
    },
}   
 </script>
<style scoped>
#chuck-norris {
    position: absolute;
    left:600px;
    right: -500px;
    margin-top: 5cqi; 
    width: 150px;
    background-color: #000000
    
}
#chuck-norris__image {
     width: 85%; 
  transition: all 0.5s ease-in;
}
#chuck-norris__joke__container{
    position: relative;
    top: 300px;
    left: -200px;
    right: 300px;
    background-color: aqua;
}
#chuck-norris__image:hover{
    transform: scale(1.1);
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity 1s
}
.fade-enter,
.fade-leave-to
 .fade-leave-active 
{
    opacity: 0
}
</style>
