<template>
  <div>
    <div class="relative overflow-x-auto">
      <div
        class="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
      >
        <form>
          <div class="mb-6">
            <label
              for="user"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Nombre Del Cliente</label
            >
            <input
              type="text"
              id="user"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              v-model="user"
            />
          </div>
          <a
            @click="makeUser()"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Crear
          </a>
        </form>
      </div>
      <br />
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-6 py-3">ID</th>
            <th scope="col" class="px-6 py-3">Cliente</th>
            <th scope="col" class="px-6 py-3">Deuda</th>
            <th scope="col" class="px-6 py-3">Info</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(object, index) in info"
            v-bind:key="index"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          >
            <td class="px-6 py-4">{{ object.id }}</td>
            <td class="px-6 py-4">{{ object.cliente }}</td>
            <td v-if="Number(object.deuda) <= 0" class="px-6 py-4">
              <div class="mb-6">
                <label
                  for="username-success"
                  class="block mb-2 text-sm font-medium text-green-700 dark:text-green-500"
                  >Deuda</label
                >
                <input
                  type="text"
                  id="username-success"
                  :value="object.deuda"
                  class="bg-green-50 border border-green-500 text-green-900 placeholder-green-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-green-100 dark:border-green-400"
                  placeholder="Bonnie Green"
                />
                <p class="mt-2 text-sm text-green-600 dark:text-green-500">
                  <span class="font-medium">Alright!</span> No Hay Deuda!
                </p>
              </div>
            </td>
            <td v-else class="px-6 py-4">
              <div>
                <label
                  for="username-error"
                  class="block mb-2 text-sm font-medium text-red-700 dark:text-red-500"
                  >Deuda</label
                >
                <input
                  type="text"
                  id="username-error"
                  :value="object.deuda"
                  class="bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400"
                  disabled
                />
                <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                  <span class="font-medium">Oops!</span> Hay deuda
                </p>
              </div>
            </td>
            <td>
              <NuxtLink :to="'/user'+ '?id=' + object.id + linkForredirect">
                <button
                  type="button"
                  class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                  desglosar
                </button>
              </NuxtLink>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      info: [],
      access_token: "",
      user: "",
      linkForredirect: "",
    };
  },
  methods: {
    async makeUser() {
      const userExist =
        this.user !== undefined && this.user !== null && this.user !== ""
          ? true
          : false;
      if (userExist) {
        const response = await this.$sheets(
          this.access_token,
          "clientes",
          "get",
          [this.user]
        );
        await this.$makeSheetClient(
          this.access_token,
          `clientes!B${response.values.length + 1}:append`,
          "post",
          [this.user]
        );
        window.location.reload();
      }
    },
  },
  async mounted() {
    const accessToken = this.$route.hash;
    this.linkForredirect = accessToken;
    const toke1Spilt = accessToken.split("&");
    const found = toke1Spilt.find((element) =>
      element.includes("access_token=")
    );
    const toke2Spilt = found.split("=");
    this.access_token = toke2Spilt[1];
    const response = await this.$sheets(toke2Spilt[1], "clientes", "get");
    response.values.map(async (x, y) => {
      if (y > 0) {
        let clienteName = await this.$sheets(
          toke2Spilt[1],
          `Cliente_${x[1]}!I1`,
          "get"
        );
        this.info.push({
          id: x[0],
          cliente: x[1],
          deuda: clienteName.values[0][0],
        });
      }
    });
  },
};
</script>
