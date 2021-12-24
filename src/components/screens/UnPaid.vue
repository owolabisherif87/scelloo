<template>
  <DataTable :type="'unpaid'" />
</template>

<script>
import DataTable from "../utils/DataTable.vue";
export default {
  name: "Unpaid",
  components: {
    DataTable,
  },
};
</script>
