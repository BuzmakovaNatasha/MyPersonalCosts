<template>
  <div class="pagination">
    <button @click="prevPage" :disabled="pageNumber == 1">
      <font-awesome-icon icon="fa-solid fa-angle-left" />
    </button>
    <button
      v-for="n in pageCount"
      :key="n"
      @click="onPageNumber(n)"
      :class="{ active: isPageActive(n) }"
    >
      {{ n }}
    </button>
    <button @click="nextPage" :disabled="pageNumber >= pageCount">
      <font-awesome-icon icon="fa-solid fa-angle-right" />
    </button>
  </div>
</template>

<script>
export default {
  name: "PaginationComp",
  data() {
    return {
      pageNumber: 1,
    };
  },
  props: {
    pageCount: {
      type: Number,
    },
    numberPageMain: {
      type: Number,
    },
  },
  methods: {
    nextPage() {
      this.pageNumber++;
      this.$emit("showPageNumber", this.pageNumber);
    },
    prevPage() {
      this.pageNumber--;
      this.$emit("showPageNumber", this.pageNumber);
    },
    onPageNumber(n) {
      this.pageNumber = n;
      this.$emit("showPageNumber", this.pageNumber);
    },
    isPageActive(n) {
      return this.numberPageMain === n;
    },
  },
};
</script>

<style lang='scss' scoped>
.pagination {
  display: flex;
  width: 450px;
  justify-content: center;
  border: 1px solid #000;
  padding: 10px;
  box-sizing: border-box;
  & button {
    border: none;
    background-color: transparent;
    margin: 0 5px;
  }
  .active {
    color: #00aaff;
  }
}
</style>