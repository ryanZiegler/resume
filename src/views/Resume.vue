<template>
    <div id="resume">
        <style-editor ref="styleEditor" :code="currentStyle"></style-editor>
        <resume-editor ref="resumeEditor" :markdown="currentMarkdown" :isHtml="isHtml"></resume-editor>
        <r-footer ref="rFooter" 
            :isPaused="isPaused" 
            :isSkipped="isSkipped"
            @onPaused="onPaused"
            @onSkipped="onSkipped"
        ></r-footer>
    </div>
</template>

<script>
import Promise from 'bluebird';
// @ 即 /src 的别名 alias
import RFooter from '@/components/resume/Footer';
import ResumeEditor from '@/components/resume/ResumeEditor';
import StyleEditor from '@/components/resume/StyleEditor';

// 这里使用 !raw-loader! 而不是 raw-loader!, 否则报错
// let styleStr = require('!raw-loader!@/components/resume/style.css');
// styleList = styleStr.default.split('/*divide*/');
// debugger;
import styleStr from '!raw-loader!@/components/resume/style.css';
import styleStrMobile from '!raw-loader!@/components/resume/styleMobile.css';
import markdown from '!raw-loader!@/doc/resume.md';

var width = document.documentElement.clientWidth;

export default {
    name: 'resume',
    components: {
        RFooter,
        StyleEditor,
        ResumeEditor
    },
    data() {
        return {
            interval: 40,                                // 定时器时间
            markdown,                                   // 简历 md
            styleList: width > 500 ?                    // css段落数组 通过 /*divide*/ 分隔
                styleStr.split('/*divide*/') :
                styleStrMobile.split('/*divide*/'),
            currentStyle: '',                           // 显示的css段落
            currentMarkdown: '',                        // 显示的md段落
            isHtml: false,                              // md是否显示为html
            isPaused: false,                            // 是否暂停
            isSkipped: false                            // 是否跳过动画
        };
    },
    created() {
        this.startAnimation();
    },
    methods: {
        onPaused: function(bool) {
            this.isPaused = bool;
        },
        onSkipped: function() {
            this.isSkipped = true;
        },
        // 开始简历展示流程
        startAnimation: async function() {
            try {
                await this.progressivelyShowStyle(0);
                await this.progressivelyShowResume();
                await this.progressivelyShowStyle(1);
                await this.showHtml();
                await this.progressivelyShowStyle(2);
                this.$refs.rFooter.end();
            } catch (e) {
                if (e.message === 'SKIP IT') {
                    this.skipAnimation();
                }
            }
        },
        // md 展示为 html
        showHtml: function () {
            return new Promise((resolve, reject) => {
                try {
                    this.isHtml = true;
                    resolve();
                } catch (error) {
                    reject(error);
                }
            })
        },
        // 阶段性展示 css 
        progressivelyShowStyle(n) {
            return new Promise((resolve, reject) => {
                const interval = this.interval;
                const showStyle = (async function() {
                    // 暂停
                    do {
                        await Promise.delay(interval);
                    } while (this.isPaused && !this.isSkipped)

                    // 跳过动画
                    if (this.isSkipped) {
                        return reject(new Error('SKIP IT'));
                    }
                    // 获取当前 css 段落
                    const style = this.styleList[n];
                    if (!style) return;

                    // 计算前 n 个 style 的字符总数
                    // 每个 css 段落模块开始输出前都需要将 l 重新变为 0
                    // 所以要 现长 减去对应 已输出模块的长度
                    const length = this.styleList.filter((_, index) => index <= n).reduce((p, c) => p + c.length, 0);
                    const preLength = length - style.length;

                    if (this.currentStyle.length >= length) return resolve();
             
                    const l = this.currentStyle.length - preLength;
                    const char = style.substring(l, l + 1) || ' ';
                    this.currentStyle += char;
                    if (style.substring(l - 1, l) === '\n' && this.$refs.styleEditor) {
                        this.$nextTick(() => {
                            this.$refs.styleEditor.goBottom();
                        })
                    }
                    // setTimeout(showStyle, interval);
                    requestAnimationFrame(showStyle);
                  
                }).bind(this);
                showStyle();
            });
        },
        // 展示简历 markdown
        progressivelyShowResume() {
            return new Promise((resolve, reject) => {
                try {
                    const length = this.markdown.length;
                    // const interval = this.interval;
                    const showResume = () => {
                        if (this.currentMarkdown.length >= length) return resolve();

                        this.currentMarkdown = this.markdown.substring(0, this.currentMarkdown.length + 1);
                        let prevChar = this.currentMarkdown[this.currentMarkdown.length - 2];
                        if (prevChar === '\n' && this.$refs.resumeEditor) {
                            this.$nextTick(() => this.$refs.resumeEditor.goBottom());
                        }
                        // setTimeout(showResume, interval);
                        requestAnimationFrame(showResume);
                    }
                    showResume();
                } catch (error) {
                    reject(error);
                }
            });
        },
        // 跳过动画
        skipAnimation() {
            this.currentMarkdown = this.markdown.substring();
            this.currentStyle = this.styleList.join('');
            this.showHtml();
            this.$refs.rFooter.end();
            this.$nextTick(() => {
                this.$refs.styleEditor.goBottom();
            });
        }
    }
}
</script>

<style>

</style>
