<template>
  <div class="list">
    <div class="item" v-for="item in listShow" :key="item.id">
      <span class="item__el">{{ item.date }}</span>
      <span class="item__el">{{ item.category }}</span>
      <span class="item__el">{{ item.value }}</span>
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
    number: {
      type: Number,
    },
    size: {
      type: Number,
      required: false,
      default: 5,
    },
  },
  computed: {
    listShow() {
      const start = (this.number - 1) * this.size;
      const end = start + this.size;
      return this.list.slice(start, end);
    },
  },
};
</script>

<style lang='scss' scoped>
.list {
  display: flex;
  flex-direction: column;
  width: 450px;
}
.item {
  display: flex;
  text-align: start;
  padding: 20px 0;
  position: relative;
  &::before {
    content: "";
    height: 1px;
    width: 100%;
    background-color: rgba(75, 75, 75, 0.527);
    position: absolute;
    top: 0;
    left: 0;
  }
  &__el {
    width: 150px;
    text-transform: capitalize;
  }
}
</style>