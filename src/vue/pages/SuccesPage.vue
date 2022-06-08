<template>
    <div>
        <p>
            Вы успешно обменяли {{ result.inputAmount }}
            {{ result.fromCurrency }} на
            {{ result.outputAmount }}
            {{ result.toCurrency }}
        </p>
    </div>
</template>

<script>
import InfoRecordCurrency from "@js/record/info.record";

export default {
    name: "succes-page",
    props: {
        result: { type: InfoRecordCurrency, required: true },
    },
};
</script>
