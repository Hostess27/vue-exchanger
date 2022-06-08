<template>
  <ul class="exchange-info">
    <li>
      <p>Курс</p>
      <p>{{ rateText }}</p>
    </li>
    <li>
      <p>Резерв</p>
      <p>{{ reserveText }}</p>
    </li>
  </ul>
</template>

<script>
import { eventBus } from "@js/helpers/event.bus";
const EVENT = { info: "info" };
export default {
  name: "exchange-info",
  data() {
    return {
      rateText: "",
      reserveText: "",
    };
  },
  created() {
    eventBus.on(EVENT.info, ({ rateText, reserveText }) => {
      this.rateText = rateText;
      this.reserveText = reserveText;
    });
  },
  destroyed(){
    eventBus.off(EVENT.info,) 
  }
};
</script>
<style scoped>
.exchange-info {
  display: flex;
  justify-content: space-evenly;
}
</style>
