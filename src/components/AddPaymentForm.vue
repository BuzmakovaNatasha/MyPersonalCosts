<template>
  <v-card class="text-left pa-8">
    <v-text-field v-model="date" label="Date" />
    <v-select v-model="category" :items="categoryList" label="Category" />
    <AddListOfCategories @addNewCategory="addCategory" :dialog="dialog" />
    <v-text-field v-model.number="value" label="Value" />
    <v-btn v-if="obj != null" color="teal lighten-1" dark @click="onSave"
      >Save</v-btn
    >
    <v-btn v-else color="teal lighten-1" dark @click="onAdd">Add</v-btn>
  </v-card>
</template>

<script>
import AddListOfCategories from "./AddListOfCategories.vue";

export default {
  name: "AddPaymentForm",
  components: {
    AddListOfCategories,
  },
  data() {
    return {
      date: "",
      category: "",
      value: "",
      num: 5,
    };
  },
  props: {
    obj: {
      type: Object,
    },
    categoryList: {
      type: Array,
    },
    dialog: {
      type: Boolean,
    },
  },
  computed: {
    getCurrentDate() {
      const today = new Date();
      let d = today.getDate();
      if (d <= 9) {
        d = `0${d}`;
      }
      let m = today.getMonth() + 1;
      if (m <= 9) {
        m = `0${m}`;
      }
      const y = today.getFullYear();

      return `${d}.${m}.${y}`;
    },
  },
  methods: {
    onAdd() {
      const data = {
        date: this.date || this.getCurrentDate,
        category: this.category,
        value: this.value,
      };
      if (this.category == "") {
        alert("Нужно выбрать категорию");
      } else {
        this.$emit("addNewPayment", data);
      }
      console.log("Add");
    },
    addCategory(category) {
      this.$store.commit("addNewCategory", category);
    },
    onSave() {
      console.log("Save");
      const data = {
        date: this.date || this.getCurrentDate,
        category: this.category,
        value: this.value,
        id: this.obj.id,
      };
      this.$store.commit("editDataPaymentList", data);
      this.$emit("close");
    },
  },
  watch: {
    obj() {
      // если прилетает новый объект, который надо редактировать, форма заполняется данными нового объекта
      if (this.obj != null) {
        this.date = this.obj.date;
        this.category = this.obj.category;
        this.value = this.obj.value;
      }
    },
    dialog() {
      // обнуление данных формы, если закрылось диалоговое окно
      if (this.dialog == false) {
        this.date = "";
        this.category = "";
        this.value = "";
      }
    },
  },
  mounted() {
    console.log("hi");
    // если прилетает объект, который надо редактировать, форма заполняется данными этого объекта
    if (this.obj != null) {
      this.date = this.obj.date;
      this.category = this.obj.category;
      this.value = this.obj.value;
    }
    if (this.$route.params?.category) {
      this.category = this.$route.params.category;
      if (this.$route.query?.value) {
        this.value = this.$route.query.value;
        this.onAdd();
      }
    }
  },
};
</script>

<style lang='scss' scoped>
</style>