<template>
  <div>
    <div
      class="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
    >
      <div class="px-6 py-6 lg:px-8">
        <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
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
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="date"
              v-model="fechaAdd"
            />
            <br />
            <a
              type="submit"
              style="cursor: pointer"
              @click="agregarViaje()"
              class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Crear Viaje
            </a>
          </div>
        </form>
      </div>
    </div>
    <br />
    <div
    v-if="info.length > 0"
      class="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
    >
      <div class="px-6 py-6 lg:px-8">
        <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
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
            <br />
          </div>
          <a
            @click="deleteViaje()"
            style="cursor: pointer"
            class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Eliminar viaje
          </a>
        </form>
      </div>
    </div>
    <br />
    <div v-for="(object, index) in info" v-bind:key="index">
      <NuxtLink
        :to="'/viaje' + '?id=' + object.id + linkForredirect"
        class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
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
      linkForredirect: "",
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
    this.linkForredirect = accessToken;
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
  },
};
</script>
