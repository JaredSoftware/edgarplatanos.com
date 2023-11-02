<template>
  <div>
    <div class="relative overflow-x-auto">
      <!-- Modal toggle -->
      <button
        data-modal-target="authentication-modal"
        data-modal-toggle="authentication-modal"
        class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        Agregar Compra
      </button>

      <!-- Main modal -->
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
              <form>
                <div class="mb-6">
                  <label
                    for="countries"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Select an option</label
                  >
                  <select
                    id="countries"
                    v-model="costUser"
                    @change="knowUserHaveTravel()"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option
                      v-for="(object, index) in clientes"
                      v-bind:key="index"
                      :value="object.nombre"
                    >
                      {{ object.nombre }}
                    </option>
                  </select>
                </div>
                <div class="grid gap-6 mb-6 md:grid-cols-2">
                  <div>
                    <label
                      for="grueso"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >Grueso</label
                    >
                    <input
                      type="number"
                      id="grueso"
                      min="0"
                      v-model.number="costGrueso"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label
                      for="gruesoPrecio"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >Precio del Grueso</label
                    >
                    <input
                      type="text"
                      id="gruesoPrecio"
                      min="0"
                      v-model="costGruesoPircing"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                </div>
                <div class="grid gap-6 mb-6 md:grid-cols-2">
                  <div>
                    <label
                      for="segundas"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >Segundas</label
                    >
                    <input
                      type="number"
                      id="segundas"
                      min="0"
                      v-model.number="costSegundas"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <div>
                      <label
                        for="segundaPrecio"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >Precio Segunda</label
                      >
                      <input
                        type="text"
                        id="segundaPrecio"
                        min="0"
                        v-model="costSegundasPircing"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
                <div class="grid gap-6 mb-6 md:grid-cols-2">
                  <div>
                    <label
                      for="picas"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >Picas</label
                    >
                    <input
                      type="number"
                      id="picas"
                      min="0"
                      v-model.number="costPica"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label
                      for="picaPrecio"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >Precio Pica</label
                    >
                    <input
                      type="text"
                      id="picaPrecio"
                      min="0"
                      v-model="costPicaPircing"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                </div>
                <div class="grid gap-6 mb-6 md:grid-cols-2">
                  <div>
                    <label
                      for="maduro"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >Maduro</label
                    >
                    <input
                      type="number"
                      id="maduro"
                      min="0"
                      v-model.number="costMaduro"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label
                      for="maduroPrecio"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >Precio del Mduro</label
                    >
                    <input
                      type="text"
                      id="maduroPrecio"
                      min="0"
                      v-model="costMaduroPircing"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                </div>
                <a
                  @click="makeCost()"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Submit
                </a>
              </form>
            </div>
          </div>
        </div>
      </div>
      <br />
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <!--<th scope="col" class="px-6 py-3">ID</th>-->
            <th scope="col" class="px-6 py-3">Cliente</th>
            <th scope="col" class="px-6 py-3">Grueso</th>
            <th scope="col" class="px-6 py-3">segundas</th>
            <th scope="col" class="px-6 py-3">picas</th>
            <th scope="col" class="px-6 py-3">maduro</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(object, index) in info"
            v-bind:key="index"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          >
            <!--<td class="px-6 py-4">{{ object.id }}</td>-->
            <td class="px-6 py-4">{{ object.cliente }}</td>
            <td class="px-6 py-4">{{ object.grueso }}</td>
            <td class="px-6 py-4">{{ object.segundas }}</td>
            <td class="px-6 py-4">{{ object.pica }}</td>
            <td class="px-6 py-4">{{ object.maduro }}</td>
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
      viaje: this.$route.query.id,
      access_token: "",
      linkForredirect: "",
      clientes: [],
      /*make a New Cost*/
      costUser: "",
      costGrueso: 0,
      costSegundas: 0,
      costPica: 0,
      costMaduro: 0,
      //precios
      costGruesoPircing: "",
      costSegundasPircing: "",
      costPicaPircing: "",
      costMaduroPircing: "",
    };
  },
  async mounted() {
    SimpleMaskMoney.setMask("#gruesoPrecio");
    SimpleMaskMoney.setMask("#segundaPrecio");
    SimpleMaskMoney.setMask("#maduroPrecio");
    SimpleMaskMoney.setMask("#picaPrecio");
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
      `Viaje${this.$route.query.id}`,
      "get"
    );
    response.values.map(async (x, y) => {
      if (y > 0) {
        this.info.push({
          id: x[0],
          cliente: x[1],
          grueso: x[2],
          segundas: x[3],
          pica: x[4],
          maduro: x[5],
        });
      }
    });

    const responseClientes = await this.$sheets(
      toke2Spilt[1],
      `clientes`,
      "get"
    );
    responseClientes.values.map((x, y) => {
      if (y > 0) {
        this.clientes.push({
          id: x[0],
          nombre: x[1],
        });
      }
    });
  },
  methods: {
    async makeCost() {
      async function currency(number) {
        const valorFormateado = number.replace(/\./g, "").replace(",", ".");
        const numeroFloat = parseFloat(valorFormateado).toFixed(2);
        return numeroFloat;
      }
      let costUser =
        this.costUser !== undefined &&
        this.costUser !== null &&
        this.costUser !== ""
          ? true
          : false;

      let anyForPush =
        this.costGrueso !== 0 ||
        this.costSegundas !== 0 ||
        this.costPica !== 0 ||
        this.costMaduro !== 0
          ? true
          : false;

      let PriceIsOkGrueso =
        this.costGrueso > 0 && await currency(this.costGruesoPircing) > 0;
      let PriceIsOkSegundas =
        this.costSegundas > 0 && await currency(this.costSegundasPircing) > 0;
      let PriceIsOKPica =
        this.costPica > 0 && await currency(this.costPicaPircing) > 0;
      let PriceIsOkMaduro =
        this.costMaduro > 0 && await currency(this.costMaduroPircing) > 0;

      if (costUser) {
        if (anyForPush) {
          let conditions = [];

          if (PriceIsOkGrueso) {
            conditions.push("Grueso");
          }

          if (PriceIsOkSegundas) {
            conditions.push("Segundas");
          }

          if (PriceIsOKPica) {
            conditions.push("Pica");
          }

          if (PriceIsOkMaduro) {
            conditions.push("Maduro");
          }
          if (conditions.length > 0) {
            const NewmakeCost = await this.$makeCobro(
              this.access_token,
              `Viaje${this.viaje}!B${this.info.length + 2}:append`,
              "post",
              [
                this.costUser,
                String(this.costGrueso),
                String(this.costSegundas),
                String(this.costPica),
                String(this.costMaduro),
              ],
              this._data
            );
            console.log(NewmakeCost);
            window.location.reload();
          } else {
            alert("Precio no válido para: " + conditions.join(", "));
          }
        } else {
          alert("Agregue la cantidad de platano vendida");
        }
      } else {
        alert("Elija usuario");
      }
    },
    async knowUserHaveTravel() {
      const response = await this.$findColumn(
        this.access_token,
        `Viaje${this.viaje}`,
        this.costUser
      );
      /*
      const response = await this.$findColumn(
        this.access_token,
        `Cliente1`,
        this.viaje
      );
      const knowAbout = await this.$sheets(
        this.access_token,
        `Cliente${this.costUser}!B${response[0].rowIndex}:E${response[0].rowIndex}`,
        "get"
      );
      console.log(knowAbout);*/
    },
  },
};
</script>
