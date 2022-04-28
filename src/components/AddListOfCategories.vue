<template>
  <v-card class="text-left pa-8">
    <v-text-field v-model="category" label="Category" />
    <v-btn color="teal lighten-1" dark @click="onAdd">Add Category</v-btn>
  </v-card>
</template>

<script>
export default {
  name: "AddListOfCategories",
  data() {
    return {
      category: "",
    };
  },
  props: {
    dialog: {
      type: Boolean,
    },
  },
  methods: {
    onAdd() {
      this.$emit("addNewCategory", this.category);
    },
  },
  watch: {
    dialog() {
      // обнуление категории, если закрылось диалоговое окно с формой добавления платежа
      if (this.dialog == false) {
        this.category = "";
      }
    },
  },
};
</script>

<style lang='scss' scoped>
</style>