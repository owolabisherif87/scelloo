<template>
  <div class="min-h-screen w-full max-w-7xl my-5 mx-auto relative">
    <div
      class="absolute right-0 top-12 z-20 mr-3 font-normal text-md text-gray-400"
    >
      Total payment amount:
      <span class="text-purple-800 font-bold text-lg"
        >${{ new Intl.NumberFormat().format(totalPayable) }}.00</span
      >
      USD
    </div>
    <Tab />
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import Tab from "./components/Tab.vue";
import api from "./composables/api";

export default {
  name: "App",
  components: {
    Tab,
  },
  setup() {
    const totalPayable = ref(0);
    const getPayableAmount = async () => {
      let res = await api.getUsers();

      if (res.data.length) {
        let payable = res.data.filter((item) => item.paymentStatus !== "paid");

        totalPayable.value = payable.reduce(
          (acc, item) => (acc += +item.amountInCents),
          0
        );
      }
    };

    getPayableAmount();

    return { totalPayable };
  },
};
</script>
