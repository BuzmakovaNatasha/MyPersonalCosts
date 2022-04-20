<template>  
  <div class="wrapper-menu" v-if="showMenu" :style="styles">
    <span
      class="menu__item"
      v-for="(item, idx) in actions"
      :key="idx"
      @click="onClick(item)"
    >
      {{ item.name }}
    </span>
  </div>
</template>

<script>
export default {
  name: "ContextMenu",
  data() {
    return {
      showMenu: false,
      actions: [],
      xPos: 0,
      yPos: 0,
    };
  },
  computed: {
    styles() {
      return {
        left: `${this.xPos - 110}px`,
        top: `${this.yPos - 30}px`,
      };
    },
  },
  methods: {
    onClick(item) {
      item.action();
      this.$menu.hide();
    },
    onShow({ caller, actions }) {
      this.actions = actions;
      this.setPosition(caller);
      this.showMenu = true;
    },
    onHide() {
      this.actions = [];
      this.showMenu = false;
    },
    setPosition(caller) {
      const pos = caller.getBoundingClientRect();
      this.xPos = pos.left;
      this.yPos = pos.top;
    },
  },
  mounted() {
    this.$menu.EventBus.$on("shown", this.onShow);
    this.$menu.EventBus.$on("hide", this.onHide);
  },
  beforeDestroy() {
    this.$menu.EventBus.$off("shown", this.onShow);
    this.$menu.EventBus.$off("hide", this.onHide);
  },
};
</script>

<style lang="scss" scoped>
.wrapper-menu {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  z-index: 100;
  padding: 15px;
  box-sizing: border-box;
  position: absolute;
  background: #ffffff;
  border: 1px solid #000;
  & .menu__item {
    &:not(:last-child) {
      padding-bottom: 10px;
    }
    &:hover {
      text-decoration: underline;
    }
    &:active {
      text-decoration: none;
    }
  }
}
</style>
