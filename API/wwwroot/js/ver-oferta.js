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
    methods: {
        customFilter(item,search){
            if (!search) { return item }
            let words = search.toString().toUpperCase().split('&').filter(w => w !== '')
            let all = true
            words.forEach(function(word) {
                if(!item.toUpperCase().includes(word)) {
                    all = false
                }
            })
            if (all) {return item}
            else {return ''}
        }
    },
    template: html`
        <div v-if="$root.secciones === null">
            <h3 class=" text-center">Debe primero seleccionar un trimestre.</h3>
        </div>
        <div v-else>
            <v-text-field
            style="width: 350px;"
            v-model="search"
            append-icon="mdi-magnify"
            label="Buscar"
            single-line
            hide-details
            ></v-text-field>
            <v-data-table
            dense
            :headers="headers"
            :items="this.$root.secciones"
            :search="search"
            :custom-filter="customFilter"
            class="elevation-1"
            :footer-props="{
                itemsPerPageOptions:[15,20,30,40]
              }"
            ></v-data-table>
        </div>
        `
  })

export default VerOferta