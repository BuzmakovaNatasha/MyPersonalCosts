<template>
  <div id="app">
    <div class="wrapper">
      <header>
        <div class="title">My personal costs</div>
      </header>
      <main>
        <button class="btn" @click="openForm">
          Add new cost +
        </button>
        <div class="colum-name">
          <strong class="colum-name__el">Date</strong>
          <strong class="colum-name__el">Category</strong>
          <strong class="colum-name__el">Value</strong>
        </div>
        <PaymentDisplay :list="listShow" />
        <PaginationComp
          @showPageNumber="showPaymentsListPage"
          :pageCount="pageCount"
          :numberPageMain="this.pageNumberMain"
        />
      </main>
    </div>
  </div>
</template>

<script>
import PaymentDisplay from "../components/PaymentDisplay.vue";
import PaginationComp from "../components/PaginationComp.vue";

export default {
  name: "App",
  components: {
    PaymentDisplay,
    PaginationComp,
  },
  data() {
    return {
      size: 5,
      pageNumberMain: 1,
    };
  },
  computed: {
    getFPV() {
      return this.$store.getters.getFullPaymentValue;
    },
    paymentsList() {
      return this.$store.getters.getPaymentList;
    },
    listShow() {
      const start = (this.pageNumberMain - 1) * this.size;
      const end = start + this.size;
      return this.paymentsList.slice(start, end);
    },
    pageCount() {
      return Math.ceil(this.paymentsList.length / this.size);
    },
  },
  methods: {
    // fetchData() {
    //   return [
    //     {
    //       date: "28.03.2020",
    //       category: "Food",
    //       value: 169,
    //     },
    //     {
    //       date: "24.03.2020",
    //       category: "Transport",
    //       value: 360,
    //     },
    //     {
    //       date: "24.03.2020",
    //       category: "Food",
    //       value: 532,
    //     },
    //   ];
    // },
    addData(data) {
      this.$store.commit("addDataPaymentList", data);
    },
    showPaymentsListPage(n) {
      this.pageNumberMain = n;
    },
    openForm() {
        this.$modal.show('AddPaymentForm', {
          content: 'AddPaymentForm',
          title: 'Add new payment'
      })
    }
  },
  async mounted() {
    if (!this.paymentsList.length) {
      await this.$store.dispatch("fetchData");
      this.pageNumberMain = Number(this.$route.params.page);
    }
    if (this.$route.params?.category) {
        this.openForm();
    }
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
