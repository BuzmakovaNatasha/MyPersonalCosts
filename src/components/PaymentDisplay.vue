<template>
  <div class="list">
    <div class="item" v-for="item in list" :key="item.id">
      <span class="item__el">{{ item.date }}</span>
      <span class="item__el">{{ item.category }}</span>
      <span class="item__el">{{ item.value }}</span>
      <span
        class="item__el context-menu" name="openContextMenu"
        @click="OnClickContextMenu($event, item)"
        >...</span
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "PaymentDisplay",
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    editItem(item) {
      this.$modal.show("AddPaymentForm", {
        content: "AddPaymentForm",
        obj: item,
        title: "Edit payment",
      });
      this.$menu.hide();
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