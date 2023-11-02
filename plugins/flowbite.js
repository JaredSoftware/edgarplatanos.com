// plugins/flowbite.js

import Vue from 'vue';
import 'flowbite/dist/flowbite.js'; // Importa el JavaScript de Flowbite

// Si Flowbite requiere alguna configuración específica, configúrala aquí
// Por ejemplo, si necesitas registrar componentes globales de Flowbite
// Vue.component('FlowButton', FlowButton);

export default (context, inject) => {
  // Inyecta Flowbite en la aplicación Vue
  inject('flowbite', Vue);
};
