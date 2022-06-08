<template>
    <div class="app-header">
        <header class="app-header__header">
            <div class="app-header__header-flex">
                <app-logo />
                <div class="app-header__header-check">Check ID</div>
            </div>
        </header>
    </div>
</template>

<script>
import AppLogo from "./AppLogo.vue";
export default {
    name: "app-header",
    components: {
        AppLogo,
    },
};
</script>

<style lang="scss" scoped>
@import "@/styles/functions.scss";
.app-header {
    padding-bottom: toRem(30);
}
.app-header__header {
    background-color: var(--primary-color);
    border-radius: toRem(4);
    padding: toRem(20);
}

.app-header__header-flex {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.app-header__header-check {
    color: var(--white);
}
</style>
