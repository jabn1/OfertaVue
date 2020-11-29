import { html } from './tag.js'
const ElegirOferta = Vue.component('elegir-oferta', {
    props: ['trimestres'],
    data () {
        return {

        }
    },
    template: html`
        <div v-if="trimestres === null">
            Hubo un error cargando esta pagina.
        </div>
        <div v-else style="max-width: 400px">
            <v-simple-table>
                <template v-slot:default>
                <thead>
                    <tr>
                    <th class="text-left">
                        Trimestre
                    </th>
                    <th class="text-left">
                        Año
                    </th>
                    <th class="text-left">
                        ID
                    </th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                    v-for="trimestre in trimestres"
                    :key="trimestre.idOferta"
                    v-on:click="setTrimestre(trimestre)"
                    style="cursor: pointer;"
                    >
                        <td>{{ trimestre.meses }}</td>
                        <td>{{ trimestre.año }}</td>
                        <td>{{ trimestre.idOferta }}</td>
                    </tr>
                </tbody>
                </template>
            </v-simple-table>
        </div>`,
    created: function () {
        if (this.trimestres === null) {
            this.$root.getTrimestres()
        }
    },
    methods: {
        setTrimestre (trimestre) {
            this.$root.trimestre = trimestre
            this.$root.getOferta(trimestre.idOferta)
        }
    }

  })

export default ElegirOferta