<template>
    <v-app-bar app color="primary">
      <v-app-bar-nav-icon @click="toggleDrawer" v-if="isMobile"></v-app-bar-nav-icon>
      <v-toolbar-title class="white--text">DeepSpace Store</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn to="/" exact>Loja</v-btn>
      <v-btn to="/checkout" exact>Checkout</v-btn>
      <v-btn icon @click="toggleDarkMode">
        <v-icon>{{ darkMode ? 'mdi-brightness-4' : 'mdi-brightness-7' }}</v-icon>
      </v-btn>
    </v-app-bar>
  </template>
  
  <script>
  export default {
    name: 'Header',
    data() {
      return {
        isMobile: false, // Adicione um estado para rastrear se a visualização é em um dispositivo móvel
        darkMode: false // Adicione um estado para rastrear se o modo escuro está ativado
      };
    },
    mounted() {
      this.isMobile = window.innerWidth <= 600; // Defina o estado 'isMobile' com base na largura da janela
      window.addEventListener('resize', this.handleResize); // Adicione um ouvinte de evento de redimensionamento para atualizar 'isMobile'
    },
    methods: {
      toggleDrawer() {
        // Implemente a lógica para abrir/fechar o drawer (se aplicável)
      },
      toggleDarkMode() {
        this.darkMode = !this.darkMode; // Alterne o estado do modo escuro
        // Implemente a lógica para alterar o tema escuro (se aplicável)
      },
      handleResize() {
        this.isMobile = window.innerWidth <= 600; // Atualize 'isMobile' com base na largura da janela
      }
    },
    beforeUnmount() {
      window.removeEventListener('resize', this.handleResize); // Remova o ouvinte de evento de redimensionamento antes de desmontar o componente
    }
  };
  </script>
  