<template>
    <div class="main-page">
        <h1 class="main-page__name">Обменник</h1>
        <CurrencyForm />
        <ExchangeInfo />
    </div>
</template>

<script>
import CurrencyForm from "@form/CurrencyForm.vue";
import ExchangeInfo from "@common/ExchangeInfo.vue";
export default {
    name: "main-page",
    components: {
        CurrencyForm,
        ExchangeInfo,
    },
};
</script>
<style lang="scss" scoped>
@import "@/styles/functions.scss";
.main-page {
    display: flex;
    flex-direction: column;
}
.main-page__name {
    color: var(--primary-color);
    text-align: center;
    padding-bottom: toRem(50);
    padding-top: toRem(50);
}
</style>
