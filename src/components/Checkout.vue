<template>
  <v-container>
    <ProductSection />
    <PersonalInfoForm @updatePersonalInfo="updatePersonalInfo" />
    <DeliveryAddressForm @updateAddress="updateAddress" />
    <PaymentMethodForm @updatePaymentMethod="updatePaymentMethod" />

    <OrderSummary />
    <v-btn @click="finalizePurchase">Finalizar Compra</v-btn>

    <!-- Modal para detalhes da forma de pagamento -->
    <v-dialog v-model="showPaymentModal" persistent max-width="600px">
      <v-card>
        <v-card-title class="text-h5">{{ paymentModalTitle }}</v-card-title>
        <v-card-text>{{ paymentModalContent }}</v-card-text>
        <v-card-text v-html="paymentModalImage"></v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="closePaymentModal"
            >OK</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import ProductSection from "./ProductSection.vue";
import PersonalInfoForm from "./PersonalInfoForm.vue";
import DeliveryAddressForm from "./DeliveryAddressForm.vue";
import PaymentMethodForm from "./PaymentMethodForm.vue";
import OrderSummary from "./OrderSummary.vue";
import axios from "axios";
import qrcode from "@/assets/qrcode.png";
import barcode from "@/assets/barcode.avif";
export default {
  components: {
    ProductSection,
    PersonalInfoForm,
    DeliveryAddressForm,
    PaymentMethodForm,
    OrderSummary,
  },
  data() {
    return {
      personalInfo: {},
      address: {},
      paymentMethod: "",
      offerCode: "",
      orderDetails: null,
      showPaymentModal: false,
      paymentModalTitle: "",
      paymentModalContent: "",
      paymentModalImage: "",
    };
  },
  methods: {
    updatePersonalInfo(info) {
      this.personalInfo = info;
    },
    updateAddress(address) {
      this.address = address;
    },
    updatePaymentMethod(method) {
      this.paymentMethod = method;
    },

    isValidForm() {
      const isPersonalInfoValid =
        this.personalInfo.name &&
        this.personalInfo.email &&
        this.personalInfo.phone &&
        this.personalInfo.cpf;
      const isAddressValid =
        this.address.street &&
        this.address.city &&
        this.address.state &&
        this.address.zip;
      const isPaymentMethodSelected = this.paymentMethod !== "";

      const isValid =
        isPersonalInfoValid && isAddressValid && isPaymentMethodSelected;
      console.log("Formulário é válido?", isValid);
      return isValid;
    },
    async finalizePurchase() {
      console.log("Iniciando finalização da compra...");

      if (!this.isValidForm()) {
        console.log("Formulário inválido. Abortando a finalização da compra.");
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
      }

      const postData = {
        personalInfo: this.personalInfo,
        address: this.address,
        paymentMethod: this.paymentMethod,
        offerCode: this.offerCode,
      };

      console.log("Dados do pedido:", postData);

      try {
        const cpf = this.personalInfo.cpf.replace(/\D/g, ""); // Remove caracteres não numéricos do CPF

        if (cpf === "00000000000") {
          // Exibir modal de falha se o CPF for inválido
          this.paymentModalTitle = "Falha no Pagamento";
          this.paymentModalContent =
            "CPF inválido. Por favor, verifique e tente novamente.";
          this.showPaymentModal = true;
        } else {
          const response = await axios.post(
            "http://localhost:3000/offers/",
            postData
          );
          this.orderDetails = response.data;

          if (this.paymentMethod === "boleto") {
            this.paymentModalTitle = `Pagamento via ${this.paymentMethod.toUpperCase()}`;

            this.paymentModalContent = `Seu código é: ${response.data.id}. `;
            this.paymentModalImage = `<img src="${barcode}" style="width: 100px; height: 100px;" />`;
          } else if (this.paymentMethod === "pix") {
            this.paymentModalTitle = `Pagamento via ${this.paymentMethod.toUpperCase()}`;
            this.paymentModalContent = `Seu código é: ${response.data.id}.`;
            this.paymentModalImage = `<img src="${qrcode}" style="width: 100px; height: 100px;" />`;
          } else {
            this.paymentModalTitle = "Pagamento Bem Sucedido";
            this.paymentModalContent =
              "Seu pagamento foi realizado com sucesso!";
          }

          this.showPaymentModal = true;
        }
      } catch (error) {
        console.error("Erro ao finalizar o pedido:", error);
        alert("Erro ao finalizar a compra. Por favor, tente novamente.");
      }
    },

    closePaymentModal() {
      this.showPaymentModal = false;
      this.$router.push({ name: "OrderConfirmation" });
    },
  },
};
</script>
