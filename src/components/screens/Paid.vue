<template>
  <DataTable :type="'paid'" />
</template>

<script>
import DataTable from "../utils/DataTable.vue";
export default {
  name: "Paid",
  components: {
    DataTable,
  },
};
</script>
