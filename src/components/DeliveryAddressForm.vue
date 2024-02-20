<template>
  <v-form>
    <v-text-field label="CEP" v-model="address.zip" @blur="fetchAddress"></v-text-field>
    <v-text-field label="Endereço" v-model="address.street"></v-text-field>
    <v-text-field label="Cidade" v-model="address.city"></v-text-field>
    <v-text-field label="Estado" v-model="address.state"></v-text-field>
  </v-form>
</template>

<script>
import axios from 'axios';

export default {
  name: 'DeliveryAddressForm',
  data: () => ({
    address: {
      street: '',
      city: '',
      state: '',
      zip: '',
    },
  }),
  methods: {
    async fetchAddress() {
      if (this.address.zip.length === 8) { // Basic validation for Brazilian ZIP code format
        try {
          const response = await axios.get(`https://viacep.com.br/ws/${this.address.zip}/json/`);
          this.address.street = response.data.logradouro;
          this.address.city = response.data.localidade;
          this.address.state = response.data.uf;
          this.$emit('updateAddress', this.address);
        } catch (error) {
          console.error('Error fetching address:', error);
        }
      }
    },
  },
}
</script>
