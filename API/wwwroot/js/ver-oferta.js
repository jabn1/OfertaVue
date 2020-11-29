import { html } from './tag.js'
const VerOferta = Vue.component('ver-oferta', {
    data () {
        return {
            search: '',
            headers: [
                { text: 'Asignatura', value: 'asignatura',align: 'start',
                sortable: false, },
                { text: 'Seccion', value: 'sec',align: 'start',
                sortable: false, filterable: false},
                { text: 'Profesor', value: 'profesor',align: 'start',
                sortable: false, },
                { text: 'Aula', value: 'aula' ,align: 'start',
                sortable: false, },
                { text: 'Lun', value: 'lun' ,align: 'start',
                sortable: false, filterable: false},
                { text: 'Mar', value: 'mar' ,align: 'start',
                sortable: false, filterable: false},
                { text: 'Mier', value: 'mier',align: 'start',
                sortable: false, filterable: false},
                { text: 'Jue', value: 'jue',align: 'start',
                sortable: false, filterable: false},
                { text: 'Vie', value: 'vie',align: 'start',
                sortable: false, filterable: false},
                { text: 'Sab', value: 'sab' ,align: 'start',
                sortable: false, filterable: false},
              ]
        }
    },
    template: html`
        <div v-if="$root.secciones === null">
            <h3 class=" text-center">Debe primero seleccionar un trimestre.</h3>
        </div>
        <div v-else>
            <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
            ></v-text-field>
            <v-data-table
            dense
            :headers="headers"
            :items="$root.secciones"
            :items-per-page="5"
            :search="search"
            class="elevation-1"
            :footer-props="{
                itemsPerPageOptions:[10,20,30,40,-1]
              }"
            ></v-data-table>
        </div>
        `
  })

export default VerOferta