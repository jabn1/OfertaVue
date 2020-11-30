import { html } from './tag.js'
import Sidebar from './sidebar.js'
import VerOferta from './ver-oferta.js'
import Disponibilidad from './disponibilidad.js'
import ElegirOferta from './elegir-oferta.js'
import CargarOferta from './cargar-oferta.js'

const routes = [
    { path: '/ver', component: VerOferta},
    { path: '/disponibilidad', component: Disponibilidad},
    { path: '/cargar', component: CargarOferta},
    { path: '/elegir', component: ElegirOferta},
    { path: '*', component: ElegirOferta}
]

export var app = new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    router: new VueRouter({routes}),
    data () {
        return {
            trimestres: null,
            trimestre: null,
            secciones: null,
            disponibilidad: null,
            loading: false,
            errored: false,
            changes: false
        }
    },
    template: html`
        <v-app>
            <v-row>
                <v-col style="max-width: 220px !important;" >
                    <sidebar></sidebar>
                </v-col>
                <v-col class="pr-7">
                    <v-main>
                        <router-view></router-view>
                    </v-main>
                </v-col>
            </v-row>
        </v-app>`,
    methods: {
        getTrimestres () {
            axios
            .get('http://localhost:5000/api/oferta/trimestres')
            .then(response => {
              this.trimestres = response.data
              this.changes = false
            })
            .catch(error => {
              console.log(error)
              this.trimestres = null
              this.errored = true
            })
            .finally(() => {
              this.loading = false
            })
        },
        getOferta (id) {
            axios
            .get('http://localhost:5000/api/oferta/oferta?id=' + id)
            .then(response => {
              this.secciones = response.data.secciones
              this.disponibilidad = response.data.disponibilidad
            })
            .catch(error => {
              console.log(error)
              this.secciones = null
              this.disponibilidad = null
              this.errored = true
            })
            .finally(() => {
              this.loading = false
            })
        },
        createOferta (html, idTrimestre, año) {
            axios
            .post('http://localhost:5000/api/oferta/oferta?idtrimestre='
                + idTrimestre + '&año=' + año,{html: html})
            .then(response => {
              if (response.status === 200) {
                this.trimestres = response.data
              }
            })
            .catch(error => {
              console.log(error)
              this.errored = true
            })
            .finally(() => {
              this.loading = false
            })
        }
    }
})