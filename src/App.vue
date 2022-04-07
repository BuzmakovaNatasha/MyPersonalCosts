<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/dashboard">Dashboard</router-link> |
      <router-link to="/about">About</router-link>
      <div @click="goToPageAbout">Go About</div>
    </nav>
    <main>
      <router-view />
    </main>
    <transition name="fade">
      <ModalWindowAddPaymentForm v-if="modalShow" :settings="settings"/>      
    </transition>
    <transition name="fade">
      <ContextMenu/>
    </transition>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {
    ModalWindowAddPaymentForm: () =>
      import(
        /* webpackChunkName: "ModalWindow" */ "./components/ModalWindowAddPaymentForm.vue"
      ),
    ContextMenu: () =>
      import(
        /* webpackChunkName: "ContextMenu" */ "./components/ContextMenu.vue"
      ),
  },
  data() {
    return {
      modalShow: false,
      settings: {},
    };
  },
  methods: {
    goToPageAbout() {
      this.$router.push({
        name: "about",
        params: {
          isTrial: 0,
        },
        query: {
          isTrial: 1,
        },
      });
    },
    onShow(settings) {
      console.log("onshow");
      this.modalShow = true;
      this.settings = settings;
    },
    onHide() {
      console.log("onhide");
      this.modalShow = false;
      this.settings = {};
    },
  },
  mounted() {
    this.$modal.EventBus.$on("shown", this.onShow);
    this.$modal.EventBus.$on("hide", this.onHide);
  },
  beforeDestroy() {
    this.$modal.EventBus.$off("shown", this.onShow);
    this.$modal.EventBus.$off("hide", this.onHide);
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
