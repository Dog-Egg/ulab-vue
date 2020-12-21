import Chunk from "@/components/chunk";

export default {
  title: "Components/Chunk",
  component: Chunk
};

export const Main = () => {
  return {
    components: { Chunk },
    data() {
      return {
        key: 0
      };
    },
    template: `
      <div>
        <Chunk @load="onLoad" :key="key">
          <div>黑夜给我黑色的眼睛，我却用它寻找bug。</div>
        </Chunk>
        <button @click="key++" style="margin-top: 20px">重置</button>
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
    components: { Chunk },
    template: `<Chunk @load="onLoad" />`,
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
    components: { Chunk },
    template: `
      <div style="height: 200px; overflow: auto; text-align: center;">
        <div style="margin-bottom: 200px;">Scroll down</div>
        <Chunk height="auto" @load="onLoad" lazy>
          <div>黑夜给我黑色的眼睛，我却用它寻找bug。</div>
        </Chunk>
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
    components: { Chunk },
    template: `
      <div>
        <Chunk @load="onLoad">
          <template #loading>
            <div class="loading"></div>Loading...
          </template>
          <template #error>
            <div class="error">Fuck!</div>
          </template>
        </Chunk>
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
