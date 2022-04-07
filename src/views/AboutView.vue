<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="authFormShow = true">Auth</button>
  </div>
</template>

<script>

export default {
  name: "AboutView",
  data() {
    return {
      authFormShow: false,
    };
  },
  mounted() {
    this.$modal.show("Auth form", {
      content: "MyAuth",
      title: "Auth form",
    });
  },
};
</script>
