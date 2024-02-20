<template>
    <v-card>
      <v-card-title>Resumo do Pedido</v-card-title>
      <v-list>
        <v-list-item v-for="item in items" :key="item.id">
          <v-list-item-content>{{ item.name }}</v-list-item-content>
          <v-list-item-action>{{ item.price }}</v-list-item-action>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <v-list-item-content>Total</v-list-item-content>
          <v-list-item-action>{{ totalPrice }}</v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'OrderSummary',
    data() {
      return {
        items: [],
        totalPrice: 0,
      };
    },
    async created() {
      await this.fetchProducts();
    },
    methods: {
      async fetchProducts() {
        try {
          const response = await axios.get('http://localhost:3000/products');
          this.items = response.data.map(product => ({
            id: product.id,
            name: product.name,
            price: product.price
          }));
          this.calculateTotalPrice();
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      },
      calculateTotalPrice() {
        this.totalPrice = this.items.reduce((total, item) => total + item.price, 0);
      },
    },
  }
  </script>
  
  