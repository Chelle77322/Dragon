<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div id="demo">
      <form id="search">
        Search
        <input v-model="searchQuery" name="query">
      </form>
      <demo-grid :heroes="gridData" :columns="gridColumns" :filter-key="searchQuery"></demo-grid>
    </div>
  </template>
  
  <script>
  import DemoGrid from "./Grid.vue";
  export default {
    name: "DemoGrid",
    components: {
      DemoGrid
    },
    data() {
      return {
        searchQuery: "",
        gridColumns: ["name", "activity"],
        gridData: [
          { name: "Chuck Norris", activity: "Running 10km" },
          { name: "Bruce Lee", activity: "Alpine Skiing" },
          { name: "Jackie Chan", activity: "Triathlon" },
          { name: "Jet Li", activity: "Open Water Swim" }
        ]
      };
    }
  };
  </script>
  