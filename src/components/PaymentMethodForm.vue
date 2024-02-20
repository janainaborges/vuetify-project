<template>
  <v-form>
    <v-radio-group v-model="payment.method" @change="emitPaymentMethod">
      <v-radio label="Cartão de Crédito" value="credit"></v-radio>
      <v-radio label="Boleto" value="boleto"></v-radio>
      <v-radio label="Pix" value="pix"></v-radio>
    </v-radio-group>
  </v-form>
</template>

<script>
export default {
  name: "PaymentMethodForm",
  data: () => ({
    payment: {
      method: "",
    },
  }),
  methods: {
    emitPaymentMethod() {
      this.$emit('updatePaymentMethod', this.payment.method);
    },
  },
};
</script>

