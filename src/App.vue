<template>
  <div id="app">
    <div class="wrapper">
      <header>
        <div class="title">My personal costs</div>
      </header>
      <main>
        <button v-if="showForm" class="btn" @click="showForm = !showForm">
          Close form
        </button>
        <button v-else class="btn" @click="showForm = !showForm">
          Add new cost +
        </button>
        <AddPaymentForm @addNewPayment="addData" v-show="showForm" />
        <div class="colum-name">
          <strong class="colum-name__el">Date</strong>
          <strong class="colum-name__el">Category</strong>
          <strong class="colum-name__el">Value</strong>
        </div>
        <PaymentDisplay
          :list="this.paymentsList"
          :number="this.pageNumberMain"
          :size="this.size"
        />
        <PaginationComp
          @showPageNumber="showPaymentsListPage"
          :paymentListLength="this.paymentsList.length"
          :size="this.size"
        />
      </main>
    </div>
  </div>
</template>

<script>
import PaymentDisplay from "./components/PaymentDisplay.vue";
import AddPaymentForm from "./components/AddPaymentForm.vue";
import PaginationComp from "./components/PaginationComp.vue";

export default {
  name: "App",
  components: {
    PaymentDisplay,
    AddPaymentForm,
    PaginationComp,
  },
  data() {
    return {
      showForm: false,
      paymentsList: [],
      size: 5,
      pageNumberMain: 1,
    };
  },
  computed: {},
  methods: {
    fetchData() {
      return [
        {
          date: "28.03.2020",
          category: "Food",
          value: 169,
        },
        {
          date: "24.03.2020",
          category: "Transport",
          value: 360,
        },
        {
          date: "24.03.2020",
          category: "Food",
          value: 532,
        },
      ];
    },
    addData(data) {
      this.paymentsList.push(data);
    },
    showPaymentsListPage(n) {
      this.pageNumberMain = n;
    },
  },
  created() {
    this.paymentsList = this.fetchData();
  },
};
</script>

<style lang='scss' scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 30px;
  margin-left: 30px;
}

.wrapper {
  font-size: 18px;
}

.title {
  font-size: 34px;
}

.btn {
  padding: 7px;
  box-sizing: border-box;
  color: #fff;
  text-transform: uppercase;
  background-color: #25a79a;
  border: none;
  border-radius: 3px;
  margin: 15px 0;
}

.colum-name {
  display: flex;
  padding: 15px 0;
  box-sizing: border-box;

  &__el {
    width: 150px;
  }
}
</style>
