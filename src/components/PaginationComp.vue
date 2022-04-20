<template>
  <div class="text-center">
    <v-pagination
      plain
      v-model="pageNumber"
      :length="pageCount"
      @input="onPageNumber()"
    ></v-pagination>
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
    pageNumberMain: {
        type: Number,
    },    
  },
  methods: {
    onPageNumber() {
      this.$emit("showPageNumber", this.pageNumber);
    },
  },
  watch: {
      pageNumberMain() {
          this.pageNumber = this.pageNumberMain
      }
  }
};
</script>

<style lang='scss' scoped>
</style>