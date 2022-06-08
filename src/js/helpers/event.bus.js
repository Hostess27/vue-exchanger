import Vue from "vue";

export class EventBus extends Vue {
    on(eventName, handlerFn) {
        this.$on(eventName, handlerFn);
    }

    emit(eventName, payload) {
        this.$emit(eventName, payload);
    }

    off(eventName) {
        this.$off(eventName);
    }

    info(payload) {
        this.emit(this.eventList.info, payload);
    }

    get eventList() {
        return {
            info: "info",
        };
    }
}

export const eventBus = new EventBus();
