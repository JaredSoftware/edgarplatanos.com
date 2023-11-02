<template>
  <div>
    <div
      class="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
    >
      <button
        data-modal-target="authentication-modal"
        data-modal-toggle="authentication-modal"
        type="button"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Crear
      </button>
      <div
        id="authentication-modal"
        tabindex="-1"
        aria-hidden="true"
        class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div class="relative w-full max-w-md max-h-full">
          <!-- Modal content -->
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="authentication-modal"
            >
              <svg
                class="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
            <div class="px-6 py-6 lg:px-8">
              <h3
                class="mb-4 text-xl font-medium text-gray-900 dark:text-white"
              >
                Crea Viaje
              </h3>
              <form class="space-y-6">
                <div>
                  <label
                    for="date"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Ingrese la fecha del viaje</label
                  >
                  <input
                    type="date"
                    name="date"
                    id="date"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                    v-model="fechaAdd"
                  />
                </div>
              </form>
              <button
                  type="submit"
                  @click="agregarViaje()"
                  class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Crear Viaje
              </button>
            </div>
          </div>
        </div>
      </div>
      <button
        data-modal-target="authentication-modal2"
        data-modal-toggle="authentication-modal2"
        type="button"
        class="focus:outline-none text-white bg-red-400 hover:bg-red-500 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-red-900"
      >
        Eliminar
      </button>
      <div
        id="authentication-modal2"
        tabindex="-1"
        aria-hidden="true"
        class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div class="relative w-full max-w-md max-h-full">
          <!-- Modal content -->
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="authentication-modal2"
            >
              <svg
                class="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
            <div class="px-6 py-6 lg:px-8">
              <h3
                class="mb-4 text-xl font-medium text-gray-900 dark:text-white"
              >
                Eliminar
              </h3>
              <form class="space-y-6">
                <div>
                  <label
                    for="countries"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Eliminar Viaje</label
                  >
                  <select
                    id="countries"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Viaje"
                    v-model="rowForDeleteViaje"
                  >
                    <option
                      v-for="(object, index) in info"
                      v-bind:key="index"
                      :value="object.id"
                    >
                      {{ object.fecha }} {{ object.SheetId }}
                    </option>
                  </select>
                </div>
              </form>
              <br />
              <button
                @click="deleteViaje()"
                class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Eliminar viaje
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <br />
    <div v-for="(object, index) in info" v-bind:key="index">
      <NuxtLink :to="/viaje/ + object.id + linkForredirect" class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5
            class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
          >
            Viaje {{ object.id }} de la fecha {{ object.fecha }}
          </h5>
          <p class="font-normal text-gray-700 dark:text-gray-400">
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order.
          </p>
      </NuxtLink>
      <br />
    </div>
  </div>
</template>
<script>
export default {
  layout: "default",
  data() {
    return {
      fechaAdd: new Date().toISOString().slice(0, 10),
      info: [],
      rowForDeleteViaje: 0,
      access_token: null,
      linkForredirect:""
    };
  },
  methods: {
    async agregarViaje() {
      const response = await this.$sheets(this.access_token, `viajes`, "get");
      const rowsCount = response.values.length + 1;
      await this.$makeSheet(
        this.access_token,
        `viajes!B${rowsCount}:append`,
        "post",
        [this.fechaAdd]
      );
      window.location.reload();
    },
    async deleteViaje() {
      const response = await this.$sheetsDeleteRows(
        this.access_token,
        "0",
        "post",
        this.rowForDeleteViaje
      );
      window.location.reload();
    },
  },
  async mounted() {
    const accessToken = this.$route.hash;
    this.linkForredirect = accessToken
    const toke1Spilt = accessToken.split("&");
    const found = toke1Spilt.find((element) =>
      element.includes("access_token=")
    );
    const toke2Spilt = found.split("=");
    this.access_token = toke2Spilt[1];
    const response = await this.$sheets(toke2Spilt[1], "viajes", "get");
    response.values.map((x, y) => {
      if (y > 0) {
        this.info.push({ id: x[0], fecha: x[1], SheetId: x[2] });
      }
    });
  }
};
</script>
