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
        <v-btn icon @click="OnClickContextMenu($event, item)">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "PaymentDisplay",
  components: {},
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
      this.$emit("itemEdit", item); // в Dashbord улетает объект, который нужно редактировать
    },
    deleteItem(id) {
      this.$store.commit("deleteDataPaymentList", id);
    },
    OnClickContextMenu(event, item) {
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
      this.$menu.show({ event, actions });
    },
  },
};
</script>

<style lang='scss' scoped>
.list {
  display: flex;
  flex-direction: column;
}
.item {
  display: flex;
  text-align: start;
  padding: 20px 0;
  position: relative;
  &::before {
    content: "";
    height: 1px;
    width: 500px;
    background-color: rgba(75, 75, 75, 0.527);
    position: absolute;
    top: 0;
    left: 0;
  }
  &__el {
    width: 150px;
    text-transform: capitalize;
  }
  & .context-menu {
    cursor: pointer;
  }
}
</style>