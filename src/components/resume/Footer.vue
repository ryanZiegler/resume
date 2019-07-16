<template>
    <footer>
        <a href="#" v-show="!isEnd" @click.prevent="togglePause">{{ text }}</a>
        <a href="#" v-show="!isEnd" @click.prevent="skip">跳过动画 --></a>
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
        return this.status ? '继续 >>' : '暂停 ||';
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
    bottom: 0;
    left: 50%;
    transform: translate3d(-50%, 50%, 0);
}
</style>
