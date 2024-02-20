<template>
  <v-card>
    <v-card-title>Resumo do Pedido</v-card-title>
    <v-list>
      <v-list-item v-for="item in items" :key="item.id">
        <v-list-item-content>
          <v-list-item-title>{{ item.name }}</v-list-item-title>
          <v-list-item-subtitle>{{ item.price }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item>
        <v-list-item-content class="justify-space-between">
          <div>Total</div>
          <div>{{ totalPrice }}</div>
        </v-list-item-content>
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
  
  