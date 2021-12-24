<template>
  <div>
    <h1 class="uppercase font-bold text-gray-500 mb-3">Table Heading</h1>
    <TabView ref="tab" class="bg-transparent">
      <TabPanel header="All">
        <All />
      </TabPanel>
      <TabPanel header="Paid">
        <Paid />
      </TabPanel>
      <TabPanel header="Unpaid">
        <UnPaid />
      </TabPanel>
      <TabPanel header="Overdue">
        <Overdue />
      </TabPanel>
    </TabView>
  </div>
</template>

<script>
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import All from "./screens/All.vue";
import Paid from "./screens/Paid.vue";
import UnPaid from "./screens/UnPaid.vue";
import Overdue from "./screens/Overdue.vue";

export default {
  name: "Header",
  components: {
    TabView,
    TabPanel,
    All,
    Paid,
    UnPaid,
    Overdue,
  },
};
</script>

<style scoped>
.tabview-custom i,
span {
  vertical-align: middle;
}

.tabview-custom span {
  margin: 0 0.5rem;
}

.p-tabview p {
  line-height: 1.5;
  margin: 0;
}
</style>
