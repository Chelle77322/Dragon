<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable no-unused-vars -->
<script>
import { ref } from "vue";
import draggable from "vue-draggable";

const Weekly = ref([

				{id: 0, text: "Pick up groceries"},
				{id: 1, text: "Pay the phone bill"},
				{id: 2, text: "Book the car service"}
			]
);

</script>

<template>

<h1> To Do List</h1>
<draggable v-model="Weekly" tag="ul">
	<template #item="{ element: Weekly}">
	<li>{{ Weekly }}</li>
	</template>

</draggable>

</template>
<style>
li{
	font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
	font: size 18px;
	color-scheme: #ec40d2;
}
</style>

