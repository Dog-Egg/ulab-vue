<script>
export default {
  name: "Chunk",
  props: {
    height: {
      type: String,
      default: "200px"
    },
    lazy: {
      type: Boolean,
      default: false
    },
    lazyOption: {
      type: Object
    },
    width: {
      type: String
    }
  },
  data() {
    return {
      loading: true,
      error: false
    };
  },
  mounted() {
    if (this.lazy) {
      const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          this.loadComp();
          observer.disconnect();
        }
      });
      observer.observe(this.$el);
    } else {
      this.loadComp();
    }
  },
  methods: {
    loadComp() {
      this.loading = true;

      this.$emit("load", this.done);

      if (!("load" in this.$listeners)) {
        this.done();
      }
    },
    done({ error = false } = {}) {
      this.loading = false;
      this.error = error;
      this.$emit("loaded", { error });
    },
    clickError() {
      this.error = false;
      this.loadComp();
    }
  },
  render(createElement) {
    if (this.loading || this.error) {
      return createElement(
        "div",
        {
          class: "chunk",
          style: {
            width: this.width,
            height: this.height
          }
        },
        [
          createElement(
            "div",
            this.error
              ? { class: "chunk__error", on: { click: this.clickError } }
              : { class: "chunk__loading" },
            this.error
              ? this.$slots.error || "加载失败，点击重试"
              : this.$slots.loading || "加载中..."
          )
        ]
      );
    }

    const children = this.$slots.default;
    if (children && children.length > 1) {
      return createElement("div", children);
    }
    return children;
  }
};
</script>

<style lang="scss" scoped>
.chunk {
  @at-root %placeholder {
    width: 100%;
    height: 100%;
    color: #999;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__loading {
    @extend %placeholder;
  }
  &__error {
    @extend %placeholder;
    cursor: pointer;
  }
}
</style>
