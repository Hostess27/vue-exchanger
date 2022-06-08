<template>
    <div>
        <form @submit.prevent="onSubmit" novalidate>
            <div class="currency-form">
                <select-field v-model="fromCurrency" :label="`Отдадите`">
                    <option
                        v-for="currency of fromCurrencies"
                        :key="currency.value"
                        :value="currency.value"
                    >
                        {{ currency.name }}
                    </option>
                </select-field>
                <div>
                    <input-field
                        type="number"
                        v-model="inputAmount"
                        :min="0"
                        @input="onChangeInputAmount"
                        :errorMessage="inputAmountErrorMessage"
                        :label="`Сумма в ${fromCurrency}`"
                        :class="{ 'error-color': inputAmountErrorMessage }"
                    />
                </div>

                <button
                    class="currency-form__btn-arrow button"
                    type="button"
                    @click="onClickSwap"
                >
                    <icon
                        :xmlns="`http://www.w3.org/2000/svg`"
                        :viewBox="`0 0 32 32`"
                        :width="20"
                        :height="20"
                    >
                        <circular-arrow
                            iconColor="currency-form__btn-arrow--icon"
                        />
                    </icon>
                </button>

                <select-field v-model="toCurrency" :label="`Получите`">
                    <option
                        v-for="currency of toCurrencies"
                        :key="currency.value"
                        :value="currency.value"
                    >
                        {{ currency.name }}
                    </option>
                </select-field>
                <div>
                    <input-field
                        type="number"
                        v-model="outputAmount"
                        :min="0"
                        @input="onChangeOutputAmount"
                        :errorMessage="outputAmountErrorMessage"
                        :label="`Сумма в ${toCurrency}`"
                        :class="{ 'error-color': outputAmountErrorMessage }"
                    />
                </div>
            </div>
            <div class="currency-form__btn-submit">
                <button
                    class="button"
                    type="submit"
                    :class="{
                        'currency-form__btn-submit--error-color':
                            inputAmountErrorMessage || outputAmountErrorMessage,
                    }"
                    :disabled="!isFormValid"
                >
                    {{ buttonText }}
                </button>
            </div>
        </form>
    </div>
</template>

<script>
import InputField from "@field/InputField.vue";
import SelectField from "@field/SelectField.vue";
import Icon from "@vue/common/Icon.vue";
import CircularArrow from "@/assets/icons/CircularArrow.vue";
import { getRatesFromApi } from "@js/helpers/rate-api.helper";
import { COLD_WALLET_RESERVES } from "@js/const/reserve.const";
import { CURRENCIES } from "@js/const/currency.const";
import { eventBus } from "@js/helpers/event.bus";
import { routes } from "@/router/routes";

export default {
    name: "currency-form",
    components: {
        InputField,
        SelectField,
        Icon,
        CircularArrow,
    },

    data() {
        return {
            currentRate: {},
            rateTextInfo: "",
            reserveTextInfo: "",

            inputAmount: 0,
            outputAmount: 0,
            fromCurrency: CURRENCIES[0].value,
            toCurrency: CURRENCIES[1].value,

            rates: [],
        };
    },

    computed: {
        fromCurrencies() {
            return CURRENCIES.filter(
                (currency) => currency.value !== this.toCurrency
            );
        },
        toCurrencies() {
            return CURRENCIES.filter(
                (currency) => currency.value !== this.fromCurrency
            );
        },
        isFormValid() {
            return (
                +this.inputAmount > 0 &&
                this.fromCurrency !== this.toCurrency &&
                !this.isLowReserve
            );
        },
        isLowReserve() {
            return (
                +this.outputAmount > COLD_WALLET_RESERVES[this.toCurrency] ||
                this.inputAmount > COLD_WALLET_RESERVES[this.fromCurrency]
            );
        },
        buttonText() {
            return this.isLowReserve
                ? "Превышен резерв"
                : this.isFormValid
                ? "Обменять"
                : "Укажите сумму";
        },

        outputAmountErrorMessage: function () {
            return this.outputAmount > COLD_WALLET_RESERVES[this.toCurrency]
                ? "Не достаточно средств в резерве"
                : "";
        },
        inputAmountErrorMessage: function () {
            return this.inputAmount > COLD_WALLET_RESERVES[this.fromCurrency]
                ? "Не достаточно средств в резерве"
                : "";
        },
    },

    watch: {
        fromCurrency(newValue) {
            const rate = this.rates.find((rate) => rate.currency === newValue);

            this.currentRate = rate;
            this.emitTextInfo();
        },
    },

    async created() {
        try {
            this.rates = await getRatesFromApi();
            const rate = this.rates.find(
                (rate) => rate.currency == this.fromCurrency
            );
            this.currentRate = rate;
        } catch (error) {
            console.error(error);
        }
        this.emitTextInfo();
    },

    methods: {
        onChangeInputAmount() {
            this.outputAmount =
                this.inputAmount * this.currentRate[this.toCurrency];
        },

        onChangeOutputAmount() {
            this.inputAmount =
                this.outputAmount / this.currentRate[this.toCurrency];
        },

        onSubmit() {
            if (!this.isFormValid || this.isLowReserve) return;
            const result = {
                inputAmount: this.inputAmount,
                fromCurrency: this.fromCurrency,
                outputAmount: this.outputAmount,
                toCurrency: this.toCurrency,
            };
            this.$router.push({
                name: routes.success.name,
                params: { result },
            });
        },

        emitTextInfo() {
            const rate = this.currentRate[this.toCurrency];
            eventBus.info( {
                rateText: `1 ${this.fromCurrency} = ${rate} ${this.toCurrency}`,
                reserveText: (this.reserveTextInfo = `${
                    COLD_WALLET_RESERVES[this.toCurrency]
                } ${this.toCurrency}`),
            });
        },

        onClickSwap() {
            const fCurrency = this.fromCurrency;
            this.fromCurrency = this.toCurrency;
            this.toCurrency = fCurrency;

            const iAmount = this.inputAmount;
            this.inputAmount = this.outputAmount;
            this.outputAmount = iAmount;
            this.emitTextInfo();
        },
    },
};
</script>

<style lang="scss" scoped>
@import "@/styles/functions.scss";
.currency-form {
    display: flex;
    justify-content: center;
    padding-bottom: toRem(50);
    align-items: stretch;
}
.currency-form__btn-submit {
    display: flex;
    justify-content: center;
    padding-bottom: toRem(50);
}
.currency-form__btn-arrow {
    background-color: inherit;
    border: none;
    fill: var(--primary-color);
    cursor: pointer;
    margin-left: toRem(20);
    margin-right: toRem(20);
}
.currency-form__btn-arrow--icon {
    background-color: inherit;
    border: none;
    fill: var(--primary-color);
    cursor: pointer;
    margin-left: toRem(20);
    margin-right: toRem(20);
}
.currency-form__btn-submit--error-color {
    background-color: var(--error-color);
    color: var(--error-color);
}
</style>
