<template>
  <div class="rounded-xl mt-1 shadow-md overflow-hidden">
    <div
      class="w-full h-13 p-3 bg-white flex flex-row justify-between items-center"
    >
      <div class="flex relative">
        <button
          class="border border-gray-200 rounded-lg mr-3 font-semibold focus:outline-none"
          @click="showFilter = !showFilter"
        >
          <i class="pi pi-filter inline-block mr-3"></i>Filter
        </button>

        <div
          class="w-56 h-auto bg-white z-20 absolute top-12 shadow-lg border border-gray-100 rounded-lg p-3"
          v-if="showFilter && users.length"
        >
          <div class="mb-0.5 text-gray-300 pl-2">SORT BY:</div>
          <ul class="mb-2 border-b border-gray-200">
            <li
              v-for="(item, index) in sorts"
              :key="index"
              class="flex justify-between items-center mb-1 py-1 px-2 hover:bg-gray-100 cursor-pointer rounded-md ml-0"
            >
              <p>{{ item.text }}</p>
              <input
                type="radio"
                :value="item.slug"
                v-model="sort"
                class="cursor-pointer"
              />
            </li>
          </ul>
          <div class="mb-0.5 pl-2 text-gray-300">USERS:</div>
          <ul>
            <li
              v-for="(item, index) in statuses"
              :key="index"
              class="flex justify-between items-center mb-1 py-1 px-2 hover:bg-gray-100 cursor-pointer rounded-md"
            >
              <p>{{ item.text }}</p>
              <input
                type="radio"
                :value="item.slug"
                v-model="status"
                class="cursor-pointer"
              />
            </li>
          </ul>
        </div>
        <input
          type="text"
          class="bg-gray-100 text-gray-300 border-0 w-96 p-2 rounded-lg focus:outline-none"
          placeholder="Search Users by Name, Email or Date"
          v-model="searchTerm"
        />
      </div>
      <button
        class="bg-purple-800 text-white font-semibold text-lg rounded-lg focus:outline-none disabled:opacity-70"
        @click="payDue"
        :disabled="loading"
      >
        PAY DUES
      </button>
    </div>
    <OverlayPanel
      ref="op"
      :showCloseIcon="true"
      :dismissable="true"
      :breakpoints="{
        '960px': '75vw',
        '640px': '100vw',
      }"
      :style="{ width: '200px' }"
    >
      <div class="flex flex-col items-start pb-1">
        <button
          v-for="(more, index) in mores"
          :key="index"
          class="text-md hover:bg-gray-100 py-1 px-2 rounded-lg text-gray-400"
          @click="trigger(index)"
        >
          {{ more }}
        </button>
        <button
          @click="activate"
          class="hover:bg-gray-100 py-1 px-2 rounded-lg text-green-400"
        >
          {{ statusText }}
        </button>
      </div>
      <div class="border-t border-gray-200 text-red-600 pt-1">
        <button @click="del" class="hover:bg-gray-100 py-1 px-2 rounded-lg">
          Delete
        </button>
      </div>
    </OverlayPanel>
    <OverlayPanel
      ref="op2"
      :showCloseIcon="false"
      :dismissable="true"
      :breakpoints="{
        '960px': '75vw',
        '640px': '100vw',
      }"
      :style="{ width: '200px' }"
    >
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente,
        tempora?
      </p>
    </OverlayPanel>
    <table class="table-auto w-full" v-if="users.length">
      <thead>
        <tr>
          <th class="text-left">
            <input type="checkbox" class="w-5 h-5" v-model="checkAll" />
          </th>
          <th class="text-left">NAME</th>
          <th class="text-left">USER STATUS</th>
          <th class="text-left">PAYMENT STATUS</th>
          <th class="text-right">AMOUNT</th>
          <th class="text-left"></th>
          <th class="text-left">
            <button
              @click="toggle"
              aria:haspopup="true"
              aria-controls="overlay_panel"
              :disabled="true"
            >
              <i class="pi pi-ellipsis-v text-gray-300"></i>
            </button>
          </th>
        </tr>
      </thead>
      <tbody v-for="(user, index) in filteredUsers" :key="index">
        <tr>
          <td class="" style="vertical-align: middle">
            <div class="flex items-center">
              <input
                type="checkbox"
                class="mr-3 p-10 w-5 h-5"
                v-model="checked"
                :value="user.id"
              />
              <button @click="toggleShow(user.id)">
                <i
                  class="text-gray-400 pi"
                  :class="
                    show ? 'pi-chevron-circle-up' : 'pi-chevron-circle-down'
                  "
                ></i>
              </button>
            </div>
          </td>
          <td class="truncate">
            <p class="font-semibold">
              {{ `${user.firstName} ${user.lastName}` }}
            </p>
            <p class="text-gray-400">{{ user.email }}</p>
          </td>
          <td>
            <p
              class="capitalize font-semibold px-1 rounded-full bg-gray-200 inline-block text-sm"
              :class="
                user.userStatus === 'active' ? 'text-blue-600' : 'text-gray-400'
              "
            >
              • {{ user.userStatus }}
            </p>
            <p>Last login: {{ user.lastLogin }}</p>
          </td>
          <td>
            <p
              class="capitalize font-semibold px-1 rounded-full inline-block text-sm"
              :class="
                user.paymentStatus === 'paid'
                  ? 'bg-green-100 text-green-800'
                  : user.paymentStatus === 'unpaid'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
              "
            >
              • {{ user.paymentStatus }}
            </p>
            <p class="font-semibold">
              Paid on: {{ user.paidOn || "0000-00-00" }}
            </p>
          </td>
          <td class="text-right">
            <p class="font-semibold">${{ user.amountInCents }}</p>
            <p class="text-sm text-gray-400">USD</p>
          </td>
          <td class="text-center text-gray-400">
            <button
              @click="toggle2"
              aria:haspopup="true"
              aria-controls="overlay_panel2"
            >
              View more
            </button>
          </td>
          <td>
            <p>
              <button
                @click="toggle(user.id, $event)"
                aria:haspopup="true"
                aria-controls="overlay_panel2"
              >
                <i class="pi pi-ellipsis-v text-gray-300"></i>
              </button>
            </p>
          </td>
        </tr>
        <template v-if="show == user.id">
          <tr>
            <th class="text-left text-gray-400"></th>
            <th class="text-left text-gray-400">DATE</th>
            <th class="text-left text-gray-400" colspan="2">USER ACTIVITY</th>
            <th class="text-left text-gray-400 flex items-center" colspan="2">
              <p class="pr-2">DETAILS</p>
              <i class="pi pi-info-circle"></i>
            </th>
          </tr>
          <template v-if="user.activities.length">
            <tr
              class="bg-transparent"
              v-for="(activity, i) in user.activities"
              :key="i"
            >
              <td></td>
              <td>{{ activity.date }}</td>
              <td colspan="2">
                {{ activity.userActivity }}
              </td>
              <td colspan="2">
                {{ activity.details }}
              </td>
            </tr>
          </template>
          <template v-else>
            <tr class="bg-gray-50">
              <td></td>
              <td
                colspan="6"
                class="text-center text-md font-bold text-gray-400"
              >
                NO RECORDS FOUND
              </td>
            </tr>
          </template>
        </template>
      </tbody>
    </table>
    <div v-else-if="loading" class="text-center">
      <ProgressSpinner
        style="width: 50px; height: 50px"
        strokeWidth="8"
        animationDuration=".5s"
        class="mr-3"
      />
      <div class="text-md text-gray-500">...Loading users</div>
    </div>
    <div v-else class="flex flex-col items-center justify-center">
      <div class="text-lg font-bold text-gray-600">Ooops!</div>
      <div class="text-md text-gray-400">
        No users to load or check your internet connection!
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "@vue/reactivity";
import ProgressSpinner from "primevue/progressspinner";
import api from "../../composables/api";
import { watch } from "@vue/runtime-core";
import OverlayPanel from "primevue/overlaypanel";

export default {
  name: "All",
  components: {
    ProgressSpinner,
    OverlayPanel,
  },
  props: ["type"],

  setup({ type }) {
    const tab = ref("");
    const show = ref(null);
    const users = ref([]);
    const loading = ref(false);
    const searchTerm = ref("");
    const checked = ref([]);
    const checkAll = ref(false);
    const showFilter = ref(false);
    const userIds = ref([]);
    const sort = ref("default");
    const status = ref("all");
    const op = ref();
    const op2 = ref();
    const selectedItem = ref();
    const sorts = ref([
      {
        slug: "default",
        text: "Default",
      },
      {
        slug: "first-name",
        text: "First Name",
      },
      {
        slug: "last-name",
        text: "Last Name",
      },
      {
        slug: "due-date",
        text: "Due Date",
      },
      {
        slug: "last-login",
        text: "Last Login",
      },
    ]);

    const statuses = ref([
      {
        slug: "all",
        text: "All",
      },
      {
        slug: "active",
        text: "Active",
      },
      {
        slug: "inactive",
        text: "Inactive",
      },
    ]);

    const mores = ref(["Edit", "View Profile"]);

    watch(checkAll, () => {
      if (checkAll.value) checked.value = userIds.value;
      else checked.value = [];
    });

    watch(sort, async () => {
      switch (sort.value) {
        case "first-name":
          users.value = users.value.sort((a, b) =>
            a.firstName > b.firstName ? 1 : b.firstName > a.firstName ? -1 : 0
          );
          break;
        case "last-name":
          users.value = users.value.sort((a, b) =>
            a.lastName > b.lastName ? 1 : b.lastName > a.lastName ? -1 : 0
          );
          break;
        case "due-date":
          users.value = users.value.sort((a, b) =>
            a.paidOn > b.paidOn ? 1 : b.paidOn > a.paidOn ? -1 : 0
          );
          break;
        case "last-login":
          users.value = users.value.sort((a, b) =>
            a.lastLogin > b.lastLogin ? 1 : b.lastLogin > a.lastLogin ? -1 : 0
          );
          break;
        default:
          await fetchUsers();
      }
    });

    watch(status, async () => {
      switch (status.value) {
        case "active":
          await fetchUsers();
          users.value = users.value.filter(
            (item) => item.userStatus === "active"
          );
          break;
        case "inactive":
          await fetchUsers();
          users.value = users.value.filter(
            (item) => item.userStatus === "inactive"
          );
          break;
        default:
          fetchUsers();
      }
    });

    const filteredUsers = computed(() =>
      users.value.filter((item) => {
        let paid = item.paidOn
          ? item.paidOn.toLowerCase().includes(searchTerm.value.toLowerCase())
          : "";

        return (
          item.firstName
            .toLowerCase()
            .includes(searchTerm.value.toLowerCase()) ||
          item.lastName
            .toLowerCase()
            .includes(searchTerm.value.toLowerCase()) ||
          item.email.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
          item.lastLogin
            .toLowerCase()
            .includes(searchTerm.value.toLowerCase()) ||
          paid
        );
      })
    );

    const statusText = computed(() => {
      if (!selectedItem.value || !users.value.length) return "Activate User";
      const status = users.value.find(
        (item) => +item.id === +selectedItem.value
      ).userStatus;

      if (status === "active") return "Deactivate User";
      else return "Activate User";
    });

    const fetchUsers = async () => {
      users.value = [];
      loading.value = true;

      let res = await api.getUsers();

      switch (type) {
        case "paid":
          users.value = res.data.filter(
            (item) => item.paymentStatus === "paid"
          );
          break;
        case "unpaid":
          users.value = res.data.filter(
            (item) => item.paymentStatus === "unpaid"
          );
          break;
        case "overdue":
          users.value = res.data.filter(
            (item) => item.paymentStatus === "overdue"
          );
          break;
        default:
          users.value = res.data;
      }

      storeUserIds();

      loading.value = false;
    };

    const storeUserIds = () => {
      userIds.value = [];

      if (users.value.length) {
        users.value.forEach((item) => {
          userIds.value.push(item.id);
        });
      }
    };

    const toggleShow = (id) => {
      if (show.value == id) {
        show.value = null;
        return;
      }

      show.value = id;
    };

    const payDue = async () => {
      if (checked.value.length) {
        for (let id of checked.value) {
          await api.markPaid(id);

          await fetchUsers();
          checked.value = [];
        }
      }
    };

    const toggle = (id, e) => {
      if (!id) return;
      selectedItem.value = id;

      op.value.toggle(e);
    };

    const toggle2 = (e) => {
      op2.value.toggle(e);
    };

    const trigger = (index) => {
      switch (index) {
        case 0:
          edit();
          break;
        default:
          view();
      }
    };

    const edit = () => {
      if (!selectedItem.value) return;
      console.log("edit");
    };

    const view = () => {
      if (!selectedItem.value) return;
      console.log("view");
    };

    const activate = async () => {
      if (!selectedItem.value) return;
      const status = users.value.find(
        (item) => +item.id === +selectedItem.value
      ).userStatus;

      op.value.hide();

      if (status === "active") {
        await api.deactivate(selectedItem.value);

        await fetchUsers();
      } else {
        await api.activate(selectedItem.value);

        await fetchUsers();
      }
    };

    const del = async () => {
      if (!selectedItem.value) return;
      op.value.hide();
      await api.del(selectedItem.value);

      await fetchUsers();
    };

    fetchUsers();

    return {
      filteredUsers,
      users,
      show,
      loading,
      searchTerm,
      checked,
      checkAll,
      showFilter,
      sorts,
      statuses,
      sort,
      status,
      op,
      op2,
      mores,
      statusText,
      payDue,
      toggle,
      toggle2,
      toggleShow,
      trigger,
      del,
      activate,
      trigger,
    };
  },
};
</script>
