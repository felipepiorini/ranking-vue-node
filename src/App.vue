<template>
  <v-app id="inspire">
    <v-main>
      <v-app-bar color="deep-purple accent-4" dense dark>
        <v-toolbar-title>Ranking</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon @click="changeLocate('pt')"> PT </v-btn>
        <v-btn icon @click="changeLocate('es')"> ES </v-btn>
        <v-btn icon @click="changeLocate('en')"> EN </v-btn>

        <v-btn icon>
          <v-icon>mdi-information-outline</v-icon>
        </v-btn>
      </v-app-bar>

      <v-container>
        <br />

        <v-alert color="blue" type="success">
          {{ $t("fields.texto") }}
        </v-alert>

        <v-select
          :items="items"
          v-model="selectedEscola"
          item-text="text"
          item-value="value"
          label="Escolas"
          solo
          @change="getPontos()"
        ></v-select>

        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Alunos</th>
                <th class="text-left">Pontos</th>
                <th class="text-left">Quantidade</th>
                <th class="text-left">Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in alunos" :key="item.nome">
                <td>{{ item.nome }}</td>
                <td>{{ item.pontos }}</td>
                <td>{{ item.quantidade }}</td>
                <td>
                  <v-btn icon color="primary" @click="showModalAdd(item.id)">
                    <v-icon>mdi-sticker-plus</v-icon>
                  </v-btn>
                  <v-btn icon color="pink" @click="onButtonClick(item.id)">
                    <v-icon> mdi-sticker-minus</v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-container>
    </v-main>

    <v-dialog
      transition="dialog-bottom-transition"
      max-width="600"
      v-model="openModalAdd"
    >
      <template v-slot:default="dialog">
        <v-card>
          <v-toolbar color="primary" dark>Adicionar ponto</v-toolbar>
          <v-card-text>
            <br />
            <v-row align="center" justify="space-around">
              <v-col md="8" align="center" justify="space-around">
                <v-btn
                  depressed
                  outlined
                  color="primary"
                  class="btn-add"
                  @click="addPonto('1')"
                >
                  + 1
                </v-btn>
                <v-btn
                  depressed
                  outlined
                  color="primary"
                  class="btn-add"
                  @click="addPonto('5')"
                >
                  + 5
                </v-btn>
                <v-btn
                  depressed
                  outlined
                  color="primary"
                  class="btn-add"
                  @click="addPonto('10')"
                >
                  + 10
                </v-btn>
              </v-col>
              <v-col md="4">
                <v-text-field
                  label="Personalizado"
                  hide-details="auto"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn text @click="dialog.value = false">Fechar</v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </v-app>
</template>

<script>
const axios = require("axios");

export default {
  name: "app",

  data() {
    return {
      items: [
        { text: "ETEC João Gomes de Araújo", value: "1" },
        { text: "EE Pinto Pestana", value: "2" },
        { text: "EE Urbano", value: "3" },
      ],
      alunos: null,
      openModalAdd: false,
      idAluno: null,
      selectedEscola: [],
    };
  },

  created() {
    this.getPontos();
  },

  methods: {
    showModalAdd(id) {
      this.openModalAdd = true;
      this.idAluno = id;
    },
    addPonto(ponto) {
      axios
        .post("http://127.0.0.1:3000/add", {
          ponto: ponto,
          id_aluno: this.idAluno,
        })
        .then(function (response) {
          console.log(response.data);
          return response.data;
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    async getPontos() {
      console.log(this.selectedEscola);
      this.alunos = await axios
        .get("http://127.0.0.1:3000/ranking/" + this.selectedEscola, {
          crossDomain: true,
        })
        .then(function (response) {
          console.log(response.data);
          return response.data;
        })
        .catch(function (error) {
          console.error(error);
        });
    },

    changeLocate(locate) {
      console.log(locate);
      this.$i18n.locale = locate;
    },
  },
};
</script>
<style scoped>
#inspire {
  background-color: #f6f6f6;
}
.btn-add {
  margin: 15px;
}
</style>
