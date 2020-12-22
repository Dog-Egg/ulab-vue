import UChunk from "../src";

export default {
  title: "Components/Chunk",
  component: UChunk
};

export const Main = () => {
  return {
    components: { UChunk },
    data() {
      return {
        key: 0
      };
    },
    template: `
      <div>
        <u-chunk @load="onLoad" :key="key">
          <div>黑夜给我黑色的眼睛，我却用它寻找bug。</div>
        </u-chunk>
        <button class="story-button" @click="key++" style="margin-top: 20px">重置</button>
      </div>
    `,
    methods: {
      onLoad(cb) {
        setTimeout(() => {
          cb();
        }, 1500);
      }
    }
  };
};

export const Error = () => {
  return {
    components: { UChunk },
    template: `<u-chunk @load="onLoad" />`,
    methods: {
      onLoad(cb) {
        setTimeout(() => {
          cb({ error: true });
        }, 1500);
      }
    }
  };
};

export const Lazy = () => {
  return {
    components: { UChunk },
    template: `
      <div style="height: 200px; overflow: auto; text-align: center;">
        <div style="margin-bottom: 200px;">Scroll down</div>
        <u-chunk height="auto" @load="onLoad" lazy>
          <div>黑夜给我黑色的眼睛，我却用它寻找bug。</div>
        </u-chunk>
      </div>
    `,
    methods: {
      onLoad(cb) {
        setTimeout(() => {
          cb();
        }, 1500);
      }
    }
  };
};

export const Custom = () => {
  return {
    components: { UChunk },
    template: `
      <div>
        <u-chunk @load="onLoad">
          <template #loading>
            <div class="story-loading"></div>Loading...
          </template>
          <template #error>
            <div class="error">Fuck!</div>
          </template>
        </u-chunk>
      </div>
    `,
    methods: {
      onLoad(cb) {
        setTimeout(() => {
          cb({ error: true });
        }, 1500);
      }
    }
  };
};
