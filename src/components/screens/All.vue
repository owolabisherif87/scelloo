<template>
  <DataTable :type="'all'" />
</template>

<script>
import DataTable from "../utils/DataTable.vue";
export default {
  name: "All",
  components: {
    DataTable,
  },
};
</script>
