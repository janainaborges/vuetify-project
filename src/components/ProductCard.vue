<template>
  <v-card @click="goToCheckout(product.id)" class="mx-auto" max-width="344">
    <v-img :src="product.imageUrl" height="200px"></v-img>
    <v-card-title>{{ product.name }}</v-card-title>
    <v-card-text>{{ product.description }}</v-card-text>
    <v-card-actions>
      <v-btn text color="deep-purple accent-4">R$ {{ product.price }}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { useRouter } from "vue-router";

defineProps({
  product: Object,
});

const router = useRouter();

function goToCheckout(offerCode) {
  router.push(`/checkout/${offerCode}`);
}
</script>
