<template>
  <div>
    <app-header />
    <router-view></router-view>
  </div>
</template>

<script>
import AppHeader from "./vue/common/AppHeader.vue";

export default {
  name: "app",
  components: { AppHeader },
};
</script>
