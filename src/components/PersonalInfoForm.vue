<template>
  <v-form>
    <v-text-field label="Nome" v-model="personalInfo.name" @input="emitPersonalInfo"></v-text-field>
    <v-text-field label="Email" v-model="personalInfo.email" @input="emitPersonalInfo"></v-text-field>
    <v-text-field label="Telefone" v-model="personalInfo.phone" @input="emitPersonalInfo"></v-text-field>
    <!-- Utilize v-model.lazy para evitar atualizações excessivas durante a digitação -->
    <v-text-field label="CPF" v-model.lazy="formattedCpf" @blur="emitPersonalInfo"></v-text-field>
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
  methods: {
    emitPersonalInfo() {
      // Emite as informações pessoais atualizadas para o componente pai
      this.$emit('updatePersonalInfo', this.personalInfo);
    },
  },
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
        // Chama emitPersonalInfo aqui para garantir que mudanças no CPF sejam emitidas
        this.emitPersonalInfo();
      }
    }
  },
}
</script>
