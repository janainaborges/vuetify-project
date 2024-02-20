<template>
  <v-container>
    <ProductSection />
    <PersonalInfoForm />
    <DeliveryAddressForm />
    <PaymentMethodForm />
    <OrderSummary />
    <v-btn @click="finalizePurchase">Finalizar Compra</v-btn>
  </v-container>
</template>

<script>
import ProductSection from "./ProductSection.vue";
import PersonalInfoForm from "./PersonalInfoForm.vue";
import DeliveryAddressForm from "./DeliveryAddressForm.vue";
import PaymentMethodForm from "./PaymentMethodForm.vue";
import OrderSummary from "./OrderSummary.vue";
import axios from "axios";

export default {
  name: "Checkout",
  components: {
    ProductSection,
    PersonalInfoForm,
    DeliveryAddressForm,
    PaymentMethodForm,
    OrderSummary,
  },
  data() {
    return {
      offer: null,
      loading: false,
      error: null,
    };
  },
  created() {
    this.fetchOfferDetails();
  },
  methods: {
    async fetchOfferDetails() {
      const offerCode = this.$route.params.offerCode;
      try {
        this.loading = true;
        const response = await axios.get(
          `http://localhost:3000//offers/${offerCode}`
        );
        this.offer = response.data;
      } catch (error) {
        this.error = "Erro ao buscar detalhes da oferta";
      } finally {
        this.loading = false;
      }
    },
    finalizePurchase() {
      let paymentOutcome;
      if (this.selectedPaymentMethod === "boleto") {
        paymentOutcome = {
          method: "Boleto",
          code: "123456789",
          imageUrl: "https://as1.ftcdn.net/v2/jpg/02/55/97/94/1000_F_255979498_vewTRAL5en9T0VBNQlaDBoXHlCvJzpDl.jpg", 
        };
      } else if (this.selectedPaymentMethod === "pix") {
        paymentOutcome = {
          method: "Pix",
          code: "A1B2C3D4E5F6G7H8I9J0",
          imageUrl: "https://miro.medium.com/v2/resize:fit:1280/format:webp/0*zPG9dqz508rmRR70.", 
        };
      } else {
        paymentOutcome = {
          method: "Cartão",
          status: "Pagamento bem sucedido",
        };
      }

      this.$store.commit("setPaymentOutcome", paymentOutcome);

      this.$router.push({ name: "OrderConfirmation" });
    },
  },
};
</script>
