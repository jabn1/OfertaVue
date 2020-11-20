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
    { path: '*', component: VerOferta}
]

export var app = new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    router: new VueRouter({routes}),
    data () {
        return {

        }
    }
})