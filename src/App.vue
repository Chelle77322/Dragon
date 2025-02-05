<!-- eslint-disable vue/no-unused-components -->
<template>
	<div id="app" class='d-flex flex-column'>
	  <div class="jumbotron">
		<h1> Chuck Norris Translator
		</h1>
		
	  </div>
	  <div class="flex--grow"></div>
	  <div class="container">
		<div class="d-flex justify-content-center">
		  <chuck-norris ></chuck-norris>
		 
		</div>
	  </div>
		<div class="flex--grow"></div>
		
		<div class="d-flex justify-content-center">
			<vue-speech></vue-speech>
		 
		</div>
			
		</div>
	
	</template>
<script>
import ChuckNorris from './Component/Chuck.vue';
import VueSpeech from './Component/Vue_Speech.vue'



export default{
	name: "App",
	components: {
	ChuckNorris,
	// eslint-disable-next-line vue/no-unused-components
	VueSpeech,
}
}
</script>
<style>
#app{
	font-family: "Arial, sans-serif";
	font-style: "bold";
	color: #fff;
	text-align: center;
	margin-top: 68px;
	padding: 10px
}
</style>