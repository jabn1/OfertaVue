import { html } from './tag.js'
const Sidebar = Vue.component('sidebar', {
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
        <v-navigation-drawer permanent fixed left style="max-width: 200px">
            <v-list-item>
            <v-list-item-content>
                <v-list-item-title class="title">
                Oferta
                </v-list-item-title>
                <v-list-item-subtitle>
                    <div v-if="$root.trimestre === null">
                        Trimestre: sin seleccionar <br><br><br>
                    </div>
                    <div v-else>
                        Trimestre: <br>
                        {{this.$root.trimestre.meses}} {{this.$root.trimestre.año}}<br>(ID:{{this.$root.trimestre.idOferta}})
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