<template>
  <DataTable :type="'overdue'" />
</template>

<script>
import DataTable from "./utils/DataTable.vue";
export default {
  name: "Overdue",
  components: {
    DataTable,
  },
};
</script>
