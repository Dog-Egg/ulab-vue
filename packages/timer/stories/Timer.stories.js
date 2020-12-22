import UTimer from "../src";

export default {
  title: "Components/Timer",
  component: UTimer
};

export const Main = (args, { argTypes }) => {
  return {
    components: { UTimer },
    props: Object.keys(argTypes),
    data() {
      return {
        timerActive: null
      };
    },
    watch: {
      active: {
        handler(val) {
          this.timerActive = val;
        },
        immediate: true
      }
    },
    template: `
    <u-timer
      :seconds="seconds"
      :active.sync="timerActive"
    >
    <template slot-scope="{currentSeconds}">
      <button
        class="story-button"
        :disabled="timerActive"
        @click="timerActive = true"
      >
        {{ !timerActive ? "发送验证码" : currentSeconds + "秒后再试" }}
      </button>
    </template>
    </u-timer>
  `
  };
};
Main.args = { seconds: 5 };
