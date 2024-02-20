<template>
    <v-footer color="primary" app>
      <v-row justify="center" align="center">
        <v-col>
          <v-tooltip bottom>
            <template #activator="{ on }">
              <v-btn icon v-on="on" @click="scrollToTop">
                <v-icon>mdi-arrow-up-bold</v-icon>
              </v-btn>
            </template>
            <span>Voltar para o topo</span>
          </v-tooltip>
        </v-col>
        <v-col>
          <v-row justify="center">
            <span class="white--text">&copy; 2024 DeepSpace Store</span>
          </v-row>
        </v-col>
      </v-row>
    </v-footer>
  </template>
  
  <script>
  export default {
    name: 'Footer',
    methods: {
      scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };
  </script>
  
  <style>
  /* Adicione estilos adicionais conforme necessário */
  </style>
  