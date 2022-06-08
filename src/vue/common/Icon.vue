<template>
    <svg
        :xmlns="xmlns"
        :width="width"
        :height="height"
        :viewBox="viewBox"
        :aria-labelledby="iconName"
    >
        <title lang="en">{{ iconName }}</title>
        <g :fill="iconColor">
            <slot />
        </g>
    </svg>
</template>

<script>
const ICON_NAMES = {
    circularArrow: "circularArrow",
};
export default {
    props: {
        iconName: {
            type: String,
            default: ICON_NAMES.circularArrow,
        },
        width: {
            type: [Number, String],
        },
        height: {
            type: [Number, String],
        },
        iconColor: {
            type: String,
        },
        xmlns: {
            type: String,
        },
        viewBox: {
            type: [String, Number],
        },
    },
};
</script>
