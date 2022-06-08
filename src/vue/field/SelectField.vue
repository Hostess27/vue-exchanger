<template>
    <div class="select-field">
        <label :for="id">{{ label }}</label>
        <select
            :id="id"
            :value="value"
            @change="updateValue"
            class="select-field__select"
        >
            <slot />
        </select>
    </div>
</template>

<script>
const EVENTS = { input: "input" };

export default {
    name: "select-field",
    data() {
        return {
            id: null,
        };
    },
    props: {
        value: {
            type: [String, Number],
            required: true,
            default: "",
        },
        label: {
            type: String,
        },
    },
    methods: {
        updateValue: function (value) {
            this.$emit(EVENTS.input, value.target.value);
        },
    },
    mounted() {
        this.id = this._uid;
    },
};
</script>
<style lang="scss" scoped>
@import "@/styles/functions.scss";
.select-field {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-right: toRem(20);
}
.select-field__select {
    background-color: inherit;
    border-bottom: solid toRem(1) var(--primary-color);
    outline: none;
    border: none;
}
</style>
