<template>
    <footer>
        <button v-show="!isEnd" @click.prevent="togglePause">{{ text }}</button>
        <button v-show="!isEnd" @click.prevent="skip">跳过动画</button>
    </footer>
</template>

<script>
export default {
    name: 'r-footer',
    data() {
        return {
            status: false,              // 是否暂停
            isEnd: false
        }
    },
    computed: {
      text() {
        return this.status ? '继续' : '暂停';
      }
    },
    methods: {
        togglePause() {
            this.status = !this.status;
            this.$emit('onPaused', this.status);
        },
        skip() {
            this.$emit('onSkipped');
        },
        end() {
            this.isEnd = true;
        }
    }
}
</script>

<style lang='scss' scoped>
footer {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translate3d(-50%, 0, 0);
    button {
        background: none;
        border: 2px solid #a972cb;
        color: #a972cb;
        font: inherit;
        line-height: 1;
        margin: 0.5em;
        padding: .8em 2em;
        -webkit-transition: 0.25s;
        transition: 0.25s;
        --color: #a972cb;
        --hover: #cb72aa;
        &:hover, &.focus {
            border-color: var(--coler);
            color: #fff;
            box-shadow: inset 0 0 0 2em var(--hover);
        }
    }

}
</style>
