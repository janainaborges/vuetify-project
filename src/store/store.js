// store.js
import { createStore } from 'vuex';

export default createStore({
  state: {
    paymentOutcome: {},
  },
  mutations: {
    setPaymentOutcome(state, payload) {
      state.paymentOutcome = payload;
    }
  }
});
