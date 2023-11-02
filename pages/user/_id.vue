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
              >Agregar el Abono
            </label>
            <input
              type="text"
              id="abonoMaker"
              v-model="abono"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
        </form>
        <button
          @click="makeAbono()"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Crear Abono
        </button>
      </div>
      <br />
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-6 py-3">id</th>
            <th scope="col" class="px-6 py-3">Id Del Viaje</th>
            <th scope="col" class="px-6 py-3">fecha</th>
            <th scope="col" class="px-6 py-3">description</th>
            <th scope="col" class="px-6 py-3">valor</th>
            <th scope="col" class="px-6 py-3">abono</th>
            <th scope="col" class="px-6 py-3">Viaje del abono</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(object, index) in info"
            v-bind:key="index"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          >
            <td class="px-6 py-4">{{ object.id }}</td>
            <td class="px-6 py-4">{{ object.idViaje }}</td>
            <td class="px-6 py-4">{{ object.fecha }}</td>
            <td class="px-6 py-4">{{ object.description }}</td>
            <td class="px-6 py-4">
              <div v-if="object.valor">
                <label
                  for="username-error"
                  class="block mb-2 text-sm font-medium text-red-700 dark:text-red-500"
                  >Your name</label
                >
                <input
                  type="text"
                  id="username-error"
                  :value="object.valor"
                  class="bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400"
                  disabled
                />
                <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                  <span class="font-medium">Oops!</span> Username already taken!
                </p>
              </div>
            </td>
            <td class="px-6 py-4">
              <div v-if="object.abono">
                <label
                  for="username-success"
                  class="block mb-2 text-sm font-medium text-green-700 dark:text-green-500"
                  >Your name</label
                >
                <input
                  type="text"
                  id="username-success"
                  :value="object.abono"
                  class="bg-green-50 border border-green-500 text-green-900 placeholder-green-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-green-100 dark:border-green-400"
                  disabled
                />
                <p class="mt-2 text-sm text-green-600 dark:text-green-500">
                  <span class="font-medium">Alright!</span> Username available!
                </p>
              </div>
            </td>
            <td class="px-6 py-4">{{ object.viajeDelAbono }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import SimpleMaskMoney from "simple-mask-money";
export default {
  data() {
    return {
      info: [],
      idUser: this.$route.params.id,
      abono: "",
      access_token: "",
      user: "",
    };
  },
  async mounted() {
    SimpleMaskMoney.setMask("#abonoMaker");
    const accessToken = this.$route.hash;
    this.linkForredirect = accessToken;
    const toke1Spilt = accessToken.split("&");
    const found = toke1Spilt.find((element) =>
      element.includes("access_token=")
    );
    const toke2Spilt = found.split("=");
    this.access_token = toke2Spilt[1];
    const response = await this.$sheets(
      toke2Spilt[1],
      `Clientes!B${Number(this.$route.params.id) + 1}`,
      "get"
    );
    const KnowUser = await this.$sheets(
      toke2Spilt[1],
      `cliente_${response.values[0][0]}`,
      "get"
    );
    this.user = response.values[0][0];
    KnowUser.values.map((x, y) => {
      if (y > 0) {
        let salida =
          x[4] == undefined || x[4] == null || x[4] == ""
            ? 0
            : SimpleMaskMoney.formatToCurrency(Number(x[4]));
        let entrada =
          x[5] == undefined || x[5] == null || x[5] == ""
            ? 0
            : SimpleMaskMoney.formatToCurrency(Number(x[5]));
        console.log(entrada);
        this.info.push({
          id: x[0],
          idViaje: x[1],
          fecha: x[2],
          description: x[3],
          valor: salida,
          abono: entrada,
          viajeDelAbono: x[6],
        });
      }
    });
  },
  methods: {
    async makeAbono() {
      let abonoIsValid =
        SimpleMaskMoney.formatToNumber(this.abono) <= 0 ? false : true;
      if (abonoIsValid) {
        const response = await this.$makeAbono(
          this.access_token,
          `cliente_${this.user}`,
          [new Date().toISOString().slice(0, 10),"","",SimpleMaskMoney.formatToNumber(this.abono)]
        );
        window.location.reload();
      } else {
        alert("No se Agrego el valor del abono");
      }
    },
  },
};
</script>
