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
        isMobile: false, 
        darkMode: false 
      };
    },
    mounted() {
      this.isMobile = window.innerWidth <= 600; 
      window.addEventListener('resize', this.handleResize); 
    },
    methods: {
      toggleDrawer() {
      
      },
      toggleDarkMode() {
        this.darkMode = !this.darkMode;
      },
      handleResize() {
        this.isMobile = window.innerWidth <= 600; 
      }
    },
    beforeUnmount() {
      window.removeEventListener('resize', this.handleResize); 
    }
  };
  </script>
  