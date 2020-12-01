import { html } from './tag.js'
const Disponibilidad = Vue.component('disponibilidad', {
    data () {
        return {
            search: '',
            dia: null,
            headers: [
                { text: 'Aula', value: 'aula',align: 'start',
                sortable: false, },
                { text: '7', value: 'horario[0]',align: 'start',
                sortable: false, filterable: false},
                { text: '8', value: 'horario[1]',align: 'start',
                sortable: false, filterable: false},
                { text: '9', value: 'horario[2]',align: 'start',
                sortable: false, filterable: false},
                { text: '10', value: 'horario[3]',align: 'start',
                sortable: false, filterable: false},
                { text: '11', value: 'horario[4]',align: 'start',
                sortable: false, filterable: false},
                { text: '12', value: 'horario[5]',align: 'start',
                sortable: false, filterable: false},
                { text: '13', value: 'horario[6]',align: 'start',
                sortable: false, filterable: false},
                { text: '14', value: 'horario[7]',align: 'start',
                sortable: false, filterable: false},
                { text: '15', value: 'horario[8]',align: 'start',
                sortable: false, filterable: false},
                { text: '16', value: 'horario[9]',align: 'start',
                sortable: false, filterable: false},
                { text: '17', value: 'horario[10]',align: 'start',
                sortable: false, filterable: false},
                { text: '18', value: 'horario[11]',align: 'start',
                sortable: false, filterable: false},
                { text: '19', value: 'horario[12]',align: 'start',
                sortable: false, filterable: false},
                { text: '20', value: 'horario[13]',align: 'start',
                sortable: false, filterable: false},
                { text: '21', value: 'horario[14]',align: 'start',
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
        },
        selectDia(dia) {
            this.dia = dia
        }
    },
    computed:{
        selectedDisponibilidad () {
            if(this.dia === null) {return []}
            let disponibilidad = []
            this.dia.horariosDia.forEach(function(horarioDia) {
                let horario = []
                horarioDia.horario.forEach(function(hora) {
                    if(hora) {horario.push('X')}
                    else {horario.push(' ')}
                })
                disponibilidad.push({aula: horarioDia.aula, horario: horario})
            })
            return disponibilidad
        },
        dias () {
            const d = this.$root.disponibilidad
            return [
                {horariosDia: d["Lunes"], title: "Lunes"},
                {horariosDia: d["Martes"], title: "Martes"},
                {horariosDia: d["Miercoles"], title: "Miercoles"},
                {horariosDia: d["Jueves"], title: "Jueves"},
                {horariosDia: d["Viernes"], title: "Viernes"},
                {horariosDia: d["Sabado"], title: "Sabado"},
            ]
        }
    },
    template: html`
        <div>
            <v-menu
            top
            >
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                    color="primary"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    >
                        <div v-if="dia === null">
                            Elegir Dia
                        </div>
                        <div v-else>
                            {{dia.title}}
                        </div>
                    </v-btn>
                </template>

                <v-list>
                    <v-list-item
                    v-for="(dia, index) in dias"
                    :key="index"
                    v-on:click="selectDia(dia)"
                    >
                    <v-list-item-title>{{ dia.title }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
            <v-text-field
            style="width: 350px;"
            v-model="search"
            append-icon="mdi-magnify"
            label="Buscar"
            single-line
            hide-details
            ></v-text-field>
            <v-data-table
            style="max-width:850px;"
            dense
            :headers="headers"
            :items="selectedDisponibilidad"
            :search="search"
            :custom-filter="customFilter"
            class="elevation-1"
            :footer-props="{
                itemsPerPageOptions:[15,20,30,40]
              }"
            ></v-data-table>
        </div>`
  })

export default Disponibilidad