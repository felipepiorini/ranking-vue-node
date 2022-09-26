import Vue from "vue";
import App from "./App.vue";
import vuetify from "@/plugins/vuetify.js";
import VueI18n from "vue-i18n";

Vue.config.productionTip = false;
Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: "en",
  messages: {
    pt: {
      fields: {
        texto:
          "Sistema para gameficação das aulas, cada participação gera uma pontuação diferente",
      },
    },
    es: {
      fields: {
        texto:
          "Sistema de gamificación de clases, cada participación genera una puntuación diferente",
      },
    },
    en: {
      fields: {
        texto:
          "System for gamification of classes, each participation generates a different score",
      },
    },
  },
});

new Vue({
  vuetify,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
