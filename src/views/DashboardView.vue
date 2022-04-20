<template>
  <v-container>
    <v-row>
      <v-col>
        <div class="text-h5 text-sm-h3 mb-3">My personal costs</div>

        <v-dialog v-model="dialog">
          <template #activator="{ on }">
            <v-btn color="teal lighten-1" dark v-on="on">
              Add new cost <v-icon>mdi-plus</v-icon>
            </v-btn>
          </template>
          <v-card>
            <AddPaymentForm
              @addNewPayment="addData"
              :obj="itemEdit"
              :categoryList="categoryList"
              @close="close"
              :dialog="dialog"
            />
          </v-card>
        </v-dialog>

        <PaymentDisplay :list="listShow" @itemEdit="editItem" />

        <ContextMenu />

        <PaginationComp
          @showPageNumber="showPaymentsListPage"
          :pageCount="pageCount"
          :pageNumberMain="pageNumberMain"
        />
      </v-col>
      <v-col>
        <DiagramComp
          :categories="categoryList"
          :list="paymentsList"
          :dialog="dialog"
        />
      </v-col>
    </v-row>
    <!-- <div id="app">
      <div class="wrapper">
        <header>
          <div class="title">My personal costs</div>
        </header>
        <main>
          <button class="btn" @click="openForm">Add new cost +</button>
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
    </div> -->
  </v-container>
</template>

<script>
import PaymentDisplay from "../components/PaymentDisplay.vue";
import AddPaymentForm from "../components/AddPaymentForm.vue";
import PaginationComp from "../components/PaginationComp.vue";
import DiagramComp from "../components/DiagramComp.vue";
import ContextMenu from "../components/ContextMenu.vue";

export default {
  name: "App",
  components: {
    PaymentDisplay,
    AddPaymentForm,
    PaginationComp,
    DiagramComp,
    ContextMenu,
  },
  data() {
    return {
      dialog: false,
      itemEdit: null,
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
    categoryList() {
      return this.$store.getters.getCategoryList;
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
      this.close();
    },
    showPaymentsListPage(n) {
      this.pageNumberMain = n;
    },
    editItem(item) {
      this.dialog = true;
      this.itemEdit = item;
    },
    close() {
      this.itemEdit = null;
      this.dialog = false;
    },
  },
  async mounted() {
    if (!this.paymentsList.length) {
      await this.$store.dispatch("fetchData");
      this.pageNumberMain = Number(this.$route.params.page);
    }
    if (!this.categoryList.length) {
      await this.$store.dispatch("fetchCategoryList");
    }
    if (this.$route.params?.category) {
      this.dialog = true;
    }
    if (this.$route.params.page) {
      this.pageNumberMain = Number(this.$route.params.page);
    } else {
      this.pageNumberMain = 1;
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
</style>
