<template>
  <v-form>
    <v-text-field label="Nome" v-model="personalInfo.name"></v-text-field>
    <v-text-field label="Email" v-model="personalInfo.email"></v-text-field>
    <v-text-field label="Telefone" v-model="personalInfo.phone"></v-text-field>
    <v-text-field label="CPF" v-model="formattedCpf"></v-text-field>
  </v-form>
</template>

<script>
export default {
  name: 'PersonalInfoForm',
  data: () => ({
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      cpf: '',
    },
  }),
  computed: {
    formattedCpf: {
      get() {
        const numbers = this.personalInfo.cpf.replace(/\D/g, ''); // Remove non-digits
        let formatted = numbers.substring(0, 3);
        if (numbers.length > 3) formatted += '.' + numbers.substring(3, 6);
        if (numbers.length > 6) formatted += '.' + numbers.substring(6, 9);
        if (numbers.length > 9) formatted += '-' + numbers.substring(9, 11);
        return formatted;
      },
      set(value) {
        this.personalInfo.cpf = value.replace(/\D/g, ''); 
      }
    }
  },
}
</script>
