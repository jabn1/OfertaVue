import { html } from './tag.js'
const CargarOferta = Vue.component('cargar-oferta', {
    data () {
        return {
            selectTrimestre: null,
            itemsTrimestres: [
                {text: 'Febrero - Abril', id: '1'},
                {text: 'Mayo - Julio', id: '2'},
                {text: 'Agosto - Octubre', id: '3'},
                {text: 'Noviembre - Enero', id: '4'}
            ],
            selectAño: null,
            itemsAño: [
                2019,2020,2021
            ],
            dialog: false
        }
    },
    template: html`
        <div style="max-width:300px">
        <v-select
            v-model="selectTrimestre"
            :items="itemsTrimestres"
            item-text="text"
            item-value="id"
            label="Trimestre"
            outlined
            dense
        ></v-select>
        <v-select
            v-model="selectAño"
            :items="itemsAño"
            label="Año"
            outlined
            dense
        ></v-select>
        <v-file-input 
            v-model="$root.file"
            truncate-length="100"
            accept="text/html"
            label="Archivo de oferta"
        ></v-file-input>
        <v-btn
        v-on:click="loadOferta()"
        elevation="2"
        :loading="$root.loading"
        >Cargar Oferta</v-btn>

        <v-dialog
      v-model="$root.errored"
      persistent
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">
          Ocurrio un error cargando la oferta.
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="darken-1"
            text
            @click="$root.errored = false"
          >
            Cerrar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

        </div>
        `,
    methods: {
        loadOferta () {
            if(this.$root.file.length != 1){
                this.$root.createOferta(this.selectTrimestre, this.selectAño)
            }
                
        }
    }
  })

export default CargarOferta