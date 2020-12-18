import Timer from "@/components/timer";
import "./style.css";

export default {
  title: "Components/Timer",
  component: Timer
};

export const Main = (args, { argTypes }) => {
  return {
    components: { Timer },
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
    <Timer
      :seconds="seconds"
      :active.sync="timerActive"
    >
    <template slot-scope="{currentSeconds}">
      <button
        :disabled="timerActive"
        @click="timerActive = true"
      >
        {{ !timerActive ? "发送验证码" : currentSeconds + "秒后再试" }}
      </button>
    </template>
    </Timer>
  `
  };
};
Main.args = { seconds: 5 };