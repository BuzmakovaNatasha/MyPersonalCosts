<template>
  <v-container>
    <apexChart
      :key="testKey"
      ref="diagram"
      :width="500"
      :options="options"
      :series="series"
    ></apexChart>
  </v-container>
</template>

<script>
export default {
  name: "DiagramComp",
  data() {
    return {
      options: {
        chart: {
          type: "donut",
        },
        labels: this.categories,
      },
      series: this.categories.map((c) => {
        return this.list.reduce((total, el) => {
          if (el.category == c) {
            total += +el.value;
          }
          return total;
        }, 0);
      }),
      testKey: 1, // буду обновлять ключ, чтобы диаграмма отрисовывалась сразу нормально
    };
  },
  props: {
    categories: {
      type: Array,
      default: null,
    },
    list: {
      type: Array,
      default: null,
    },
    dialog: {
      type: Boolean,
    },
  },
  watch: {
    categories() {
      this.options.labels = this.categories;
      this.series = this.categories.map((c) => {
        return this.list.reduce((total, el) => {
          if (el.category == c) {
            total += +el.value;
          }
          return total;
        }, 0);
      });
      this.testKey++;
    },
    list() {
      this.series = this.categories.map((c) => {
        return this.list.reduce((total, el) => {
          if (el.category == c) {
            total += +el.value;
          }
          return total;
        }, 0);
      });
    },
    dialog() {
      // чтобы обновлялся график при редактировании платежа
      if (this.dialog == false) {
        this.series = this.categories.map((c) => {
          return this.list.reduce((total, el) => {
            if (el.category == c) {
              total += +el.value;
            }
            return total;
          }, 0);
        });
      }
    },
  },
};
</script>