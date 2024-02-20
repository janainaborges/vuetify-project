<script setup>
import { ref } from 'vue';
import axios from 'axios';

const product = ref({});
const offerCode = ref('');

const fetchProduct = async () => {
  const response = await axios.get('http://localhost:3000/products/1');
  product.value = response.data;
};

fetchProduct();

const applyOffer = () => {
};
</script>

<template>
  <v-card>
    <v-img :src="product.imageUrl" aspect-ratio="1.7"></v-img>
    <v-card-title>{{ product.name }}</v-card-title>
    <v-card-text>{{ product.description }}</v-card-text>
    <v-card-actions>
      <v-text-field v-model="offerCode" label="Código de Oferta"></v-text-field>
      <v-btn @click="applyOffer">Aplicar</v-btn>
    </v-card-actions>
  </v-card>
</template>
