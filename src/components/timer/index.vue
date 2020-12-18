<template>
  <div>
    <slot v-bind:currentSeconds="currentSeconds" />
  </div>
</template>

<script>
export default {
  name: "Timer",
  props: {
    active: {
      type: Boolean,
      default: false
    },
    seconds: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      currentSeconds: null,
      intervalTimer: null
    };
  },
  mounted() {
    if (this.active) {
      this.start();
    }
  },
  watch: {
    active(val) {
      if (val) {
        this.start();
      } else {
        this.stop();
      }
    },
    currentSeconds(val) {
      if (val <= 0) {
        this.stop();
      }
    }
  },
  methods: {
    start() {
      this.currentSeconds = this.seconds;
      this.intervalTimer = setInterval(() => {
        this.currentSeconds--;
      }, 1000);
    },
    stop() {
      clearInterval(this.intervalTimer);
      this.intervalTimer = null;
      this.$emit("update:active", false);
    }
  },
  beforeDestroy() {
    if (this.intervalTimer === null) {
      this.stop();
    }
  }
};
</script>
