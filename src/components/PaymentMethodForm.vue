<template>
    <v-form>
      <v-radio-group v-model="payment.method">
        <v-radio label="Cartão de Crédito" value="credit"></v-radio>
        <v-radio label="Débito" value="debit"></v-radio>
        <v-radio label="PayPal" value="paypal"></v-radio>
      </v-radio-group>
    </v-form>
  </template>
  
  <script>
  export default {
    name: 'PaymentMethodForm',
    data: () => ({
      payment: {
        method: '',
      },
    }),
  }
  </script>
  