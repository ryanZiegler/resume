<template>
    <div class="scroll" ref="wrapper">
        <slot></slot>
    </div>
</template>

<script>
import BScroll from 'better-scroll';
const DIRECTION_H = 'horizontal';
const DIRECTION_V = 'vertical';
export default {
    props: {
        probeType: {
            type: Number,
            default: 1
        },
        click: {
            type: Boolean,
            default: false
        },
        listenScroll: {
            type: Boolean,
            default: false
        },
        data: {
            type: Array,
            default: null
        },
        startY: {
            type: Number,
            default: 0
        },
        pullup: {
            type: Boolean,
            default: false
        },
        pulldown: {
            type: Boolean,
            default: false
        },
        beforeScroll: {
            type: Boolean,
            default: false
        },
        refreshDelay: {
            type: Number,
            default: 20
        },
        direction: {
            type: String,
            default: DIRECTION_V
        },
        touchPullDownOffet: {
            type: Number,
            default: 0
        },
        stopPullDownOffset: {
            type: Number,
            default: 0
        },
        touchPullUpOffet: {
            type: Number,
            default: 0
        }
    },
    mounted () {
        setTimeout(() => {
            this.$nextTick(() => {
                this.$emit('calculateHeight');
                this._initScroll();
            });
        }, 20);
    },
    methods: {
        _initScroll () {
            if (!this.$refs.wrapper) {
                return;
            }
            let pullDownRefresh = {};
            if (this.pulldown) {
                pullDownRefresh = {
                    threshold: this.touchPullDownOffet,
                    stop: this.stopPullDownOffset
                };
            } else {
                pullDownRefresh = false;
            }
            let pullUpLoad = {};
            if (this.pullup) {
                pullUpLoad = {
                    threshold: this.touchPullUpOffet
                };
            } else {
                pullUpLoad = false;
            }
            this.scroll = new BScroll(this.$refs.wrapper, {
                probeType: this.probeType,
                click: this.click,
                startY: this.startY,
                pullDownRefresh,
                pullUpLoad,
                eventPassthrough: this.direction === DIRECTION_V ? DIRECTION_H : DIRECTION_V
            });
            console.log(this.scroll);
            if (this.listenScroll) {
                this.scroll.on('scroll', (pos) => {
                    this.$emit('scroll', pos);
                });
            }

            if (this.pullup) {
                this.scroll.on('pullingUp', () => {
                    this.$emit('scrollToEnd');
                });
            }

            if (this.pulldown) {
                this.scroll.on('pullingDown', () => {
                    this.$emit('pulldown');
                });
                console.log(this.scroll);
            }

            if (this.beforeScroll) {
                this.scroll.on('beforeScrollStart', () => {
                    this.$emit('beforeScroll');
                });
            }
        },
        disable () {
            this.scroll && this.scroll.disable();
        },
        enable () {
            this.scroll && this.scroll.enable();
        },
        refresh () {
            this.scroll && this.scroll.refresh();
            console.log(this.scroll);
        },
        scrollTo () {
            this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
        },
        scrollToElement () {
            this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
        },
        finishRefresh () {
            this.scroll && this.scroll.finishPullDown();
        },
        finishLoadmore () {
            this.scroll && this.scroll.finishPullUp();
        },
        refreshAll () {
            this._initScroll();
        }
    },
    watch: {
        data() {
            setTimeout(() => {
                this.refresh();
            }, this.refreshDelay);
        }
    }
};
</script>

<style scoped lang="scss">
</style>
