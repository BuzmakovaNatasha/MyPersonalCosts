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
        
        <PaymentDisplay
          :list="listShow"
          @itemEdit="editItem"
          @openLastPage="openLastPage"
        />
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
  </v-container>
</template>

<script>
import PaymentDisplay from "../components/PaymentDisplay.vue";
import AddPaymentForm from "../components/AddPaymentForm.vue";
import PaginationComp from "../components/PaginationComp.vue";
import DiagramComp from "../components/DiagramComp.vue";
// import ContextMenu from "../components/ContextMenu.vue";

export default {
  name: "App",
  components: {
    PaymentDisplay,
    AddPaymentForm,
    PaginationComp,
    DiagramComp,
    // ContextMenu,
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
    addData(data) {
      this.$store.commit("addDataPaymentList", data);
      this.close();
      this.openLastPage();
    },
    openLastPage() {
      this.pageNumberMain = this.pageCount;
    },
    showPaymentsListPage(n) {
      this.pageNumberMain = n;
    },
    editItem(item) {
      this.dialog = true;
      this.itemEdit = item;
    },
    close() {
      if (this.$route.params?.category) {
        this.$router.push({ name: `dashboard` });
      }
      if (this.itemEdit != null) {
        this.itemEdit = null;
      }
      this.dialog = false;
    },
  },
//   watch: {
//     $route() {
//       console.log("Совершён переход по ссылке");
//     },
//   },
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
