<template>
  <v-app>
    <Header />
    <v-container>
      <v-row>
        <v-col
          cols="12"
          sm="6"
          md="4"
          v-for="product in products"
          :key="product.id"
        >
          <ProductCard :product="product" />
        </v-col>
      </v-row>
    </v-container>
    <Footer />
  </v-app>
</template>

<script setup>
import { defineAsyncComponent, onMounted, ref } from "vue";
import ShopService from "@/services/ShopService.js";

const Header = defineAsyncComponent(() => import("../components/Header.vue"));
const Footer = defineAsyncComponent(() => import("../components/Footer.vue"));
const ProductCard = defineAsyncComponent(() =>
  import("../components/ProductCard.vue")
);

const products = ref([]);

onMounted(async () => {
  try {
    const response = await ShopService.getProducts();
    products.value = response.data; // Assuming the API returns the data array directly
  } catch (error) {
    console.error("Error fetching products:", error);
  }
});
</script>
