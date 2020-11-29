import { html } from './tag.js'
const Sidebar = Vue.component('sidebar', {
    props: ['trimestre'],
    data () {
        return {
            items: [
                { title: 'Elegir Oferta', icon: 'mdi-view-list', link: '/elegir' },
                { title: 'Ver Oferta', icon: 'mdi-table-large', link: '/ver' },
                { title: 'Disponibilidad', icon: 'mdi-help-box', link: '/disponibilidad' },
                { title: 'Cargar Oferta', icon: 'mdi-publish', link: '/cargar' },
              ]
        }
    },
    template: html`
        <v-navigation-drawer absolute permanent left style="max-width: 200px">
            <v-list-item>
            <v-list-item-content>
                <v-list-item-title class="title">
                Oferta
                </v-list-item-title>
                <v-list-item-subtitle>
                    <div v-if="trimestre === null">
                        Trimestre: sin seleccionar <br><br><br>
                    </div>
                    <div v-else>
                        Trimestre: <br>
                        {{trimestre.meses}} {{trimestre.año}}<br>(ID:{{trimestre.idOferta}})
                    </div>
                </v-list-item-subtitle>
            </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <v-list dense nav>
            <v-list-item v-for="item in items" :key="item.title" link :to="item.link">
                <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            </v-list>
        </v-navigation-drawer>`
  })

export default Sidebar