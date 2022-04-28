<template>
  <div class="text-center">
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="d-flex align-start" plain :ripple="false" v-bind="attrs" v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item v-for="(item, index) in actions" :key="index">
          <v-list-item-title class="pointer" @click="item.action()">{{item.name}}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  name: "MenuContext",
  data() {
    return {};
  },
  props: {
    actions: Array,
  },
};
</script>

<style lang="scss" scoped>
.pointer {
    cursor: pointer;
}
</style>
