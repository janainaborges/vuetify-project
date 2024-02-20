<template>
    <v-container>
      <h1>Confirmação do Pedido</h1>
      <div v-if="paymentOutcome.method === 'Boleto' || paymentOutcome.method === 'Pix'">
        <p>{{ paymentOutcome.method }} Code: {{ paymentOutcome.code }}</p>
        <img :src="paymentOutcome.imageUrl" alt="Payment Code" />
      </div>
      <div v-else>
        <p>{{ paymentOutcome.status }}</p>
      </div>
    </v-container>
  </template>
  
  <script>
  export default {
    computed: {
      paymentOutcome() {
        return this.$store.state.paymentOutcome;
      }
    }
  }
  </script>
  