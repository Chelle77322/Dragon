<template>
    <table>
      <thead>
        <tr>
          <th
            v-for="(key, index) in columns"
            :key="index"
            :class="{ active: sortKey == key }"
            @click="sortBy(key)"
          >
            {{ key }}
            <span class="arrow" :class="sortOrders[key] > 0 ? 'asc' : 'dsc'"></span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
v-for="(entry, index) in filteredHeroes" 
        :key="index">

          <td
v-for="(key) in columns"
           :key="key in index">{{ entry[key] }}</td>
        </tr>
      </tbody>
    </table>
  </template>
  
  <script>
  export default {
    name: "DemoGrid",
    props: {
      heroes: { type: Array,
    required: true},
      columns: {type: Array,
        required: true},
      filterKey: {type: String,
        default: ""
    },

    data: 
    { type: Array,
    required:true,
    function() {
      const sortOrders = {};
      this.columns.forEach(function(key) {
        sortOrders[key] = 1;
      });
      return {
        sortKey: "",
        sortOrders: sortOrders
      };
    }
},
    computed: {
        type:Array,
        required: true,
      filteredHeroes() {
        const sortKey = this.sortKey;
        const filterKey = this.filterKey && this.filterKey.toLowerCase();
        const order = this.sortOrders[sortKey] || 1;
        let heroes = this.heroes;
        if (filterKey) {
          heroes = heroes.filter(function(row) {
            return Object.keys(row).some(function(key) {
              return (
                String(row[key])
                  .toLowerCase()
                  .indexOf(filterKey) > -1
              );
            });
          });
        }
        if (sortKey) {
          heroes = heroes.slice().sort(function(a, b) {
            a = a[sortKey];
            b = b[sortKey];
            return (a === b ? 0 : a > b ? 1 : -1) * order;
          });
        }
        return heroes;
      }
    },
    filters: {
        type: String,
        required: true,
      capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
      }
    },
    methods: {
        type:String,
        required: true,
      sortBy(key) {
        this.sortKey = key;
        this.sortOrders[key] = this.sortOrders[key] * -1;
      }
    }

}
};
  </script>
  <style>
    table{
        border: 3px groove #292a29;
        border-radius: 3px;
        background-color: #bfe2bf;
    }
    th {
        background-color: #cee3f6;
        color: #292a29;
        cursor: help;
        user-select: none;
    }
    td{
        background-color: #f1f6ce;  
    }
    th,
    td{
        min-width: 150px;
        padding: 5px 10px;
    }
    th.active{
        color: #ec40d2;

    }
    th.active .arrow{
opacity: 2;
    }
    .arrow {
    display: inline-block;
    vertical-align: middle;
    width: 0;
    height: 0;
    margin-left: 5px;
    opacity: 0.66;
  }
  
  .arrow.asc {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-bottom: 4px solid #fff;
  }
  
  .arrow.dsc {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 4px solid #fff;
  }
</style>