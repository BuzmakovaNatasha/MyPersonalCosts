<template>
  <v-container>
    <v-row>
      <v-col :cols="4">#</v-col>
      <v-col :cols="3">Date</v-col>
      <v-col :cols="3">Category</v-col>
      <v-col :cols="2">Value</v-col>
    </v-row>
    <v-row v-for="item in list" :key="item.id">
      <v-col :cols="4">{{ item.id }}</v-col>
      <v-col :cols="3">{{ item.date }}</v-col>
      <v-col :cols="3">{{ item.category }}</v-col>
      <v-col :cols="1">{{ item.value }}</v-col>
      <v-col :cols="1">        
        <MenuContext :actions="transferActions(item)"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MenuContext from "./MenuContext.vue";
export default {
  name: "PaymentDisplay",
  components: {
    MenuContext,
  },
  data() {
    return {};
  },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    editItem(item) {
      // в Dashbord улетает объект, который нужно редактировать
      this.$emit("itemEdit", item);
    },
    deleteItem(id) {
      const index = this.$store.state.paymentList.findIndex(
        (el) => el.id == id
      );
      const lastIndex = this.$store.state.paymentList.length - 1;
      if (index == lastIndex) {
        // если удаляется последний платеж, на последней странице
        this.$store.commit("deleteDataPaymentList", id);
        this.$emit("openLastPage");
      } else {
        this.$store.commit("deleteDataPaymentList", id);
      }
    },
    // OnClickContextMenu(event, item) {
    //   const actions = [
    //     {
    //       name: "Редактировать",
    //       action: () => {
    //         this.editItem(item);
    //       },
    //     },
    //     {
    //       name: "Удалить",
    //       action: () => {
    //         this.deleteItem(item.id);
    //       },
    //     },
    //   ];
    //   this.$menu.show({ event, actions });
    // },
    transferActions(item) {
      const actions = [
        {
          name: "Редактировать",
          action: () => {
            this.editItem(item);
          },
        },
        {
          name: "Удалить",
          action: () => {
            this.deleteItem(item.id);
          },
        },
      ];
      return actions;
    },
  },
};
</script>

<style lang='scss' scoped>
</style>