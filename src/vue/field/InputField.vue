<template>
    <div class="input-field">
        <label :for="id">{{ label }}</label>
        <input
            :id="id"
            class="input-field__field"
            :type="type"
            :min="min"
            v-bind:value="value"
            @input="updateValue"
        />
        <small class="input-field__error-messge">{{ errorMessage }}</small>
    </div>
</template>

<script>
const EVENTS = { input: "input" };
const typeDefault = String
export default {
    name: "input-field",
    data() {
        return {
            id: null,
        };
    },
    props: {
        type: { type: typeDefault, required: true },
        value: {
            require: true,
        },
        min: { type: [String, Number] },
        errorMessage: { type: String },
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
.input-field {
    display: flex;
    flex-direction: column;
    position: relative;
}
.input-field__field {
    outline: none;
    border: none;
    border-bottom: solid toRem(1) var(--primary-color);
}
.input-field__error-messge {
    position: absolute;
    top: toRem(50);
    right: 0;
    white-space: nowrap;
}
.error-color {
    background-color: var(--error-color);
    color: var(--error-color);
}
</style>
