<template>
    <div id="resume">
        <style-editor ref="styleEditor" :code="currentStyle"></style-editor>
        <resume-editor ref="resumeEditor" :markdown="currentMarkdown" :isHtml="isHtml"></resume-editor>
        <r-footer ref="footer"></r-footer>
    </div>
</template>

<script>
// @ 即 /src 的别名 alias
import RFooter from '@/components/resume/Footer';
import ResumeEditor from '@/components/resume/ResumeEditor';
import StyleEditor from '@/components/resume/StyleEditor';

// 这里使用 !raw-loader! 而不是 raw-loader!, 否则报错
// let styleStr = require('!raw-loader!@/components/resume/style.css');
// styleList = styleStr.default.split('/*divide*/');
// debugger;
import styleStr from '!raw-loader!@/components/resume/style.css';
import markdown from '!raw-loader!@/components/resume/resume.md';

export default {
    name: 'resume',
    components: {
        RFooter,
        StyleEditor,
        ResumeEditor
    },
    data() {
        return {
            markdown,                                   // 简历 md
            styleList: styleStr.split('/*divide*/'),    // css段落数组 通过 /*divide*/ 分隔
            currentStyle: '',                           // 显示的css段落
            currentMarkdown: '',                        // 显示的md段落
            isHtml: false,                              // md是否显示为html
            interval: 40                                // 定时器时间
        };
    },
    created() {
        this.startAnimation();
    },
    methods: {
        /**
         * 开始简历展示流程
         */
        startAnimation: async function() {
            await this.progressivelyShowStyle(0);
            await this.progressivelyShowResume();
            await this.progressivelyShowStyle(1);
            await this.showHtml();
            debugger;
            await this.progressivelyShowStyle(2);
        },
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
                try {
                    const interval = this.interval;
                    const showStyle = (async function() {
                        // 获取当前 css 段落
                        const style = this.styleList[n];
                        if (!style) return;
                        // 计算前 n 个 style 的字符总数
                        const length = this.styleList.filter((_, index) => index <= n).reduce((p, c) => p + c.length, 0);
                        // 每个 css 段落模块开始输出前都需要将 l 重新变为 0
                        // 所以要 现长 减去对应 已输出模块的长度
                        const preLength = length - style.length;
                        if (this.currentStyle.length < length) {
                            const l = this.currentStyle.length - preLength;
                            const char = style.substring(l, l + 1) || ' ';
                            this.currentStyle += char;
                            if (style.substring(l - 1, l) === '\n' && this.$refs.styleEditor) {
                                this.$nextTick(() => {
                                    this.$refs.styleEditor.goBottom();
                                })
                            }
                            setTimeout(showStyle, interval);
                        } else {
                            resolve()
                        }
                    }).bind(this);
                    showStyle();
                } catch (error) {
                    reject(error);
                }
            });
        },
        // 展示简历 markdown
        progressivelyShowResume() {
            return new Promise((resolve, reject) => {
                try {
                    const length = this.markdown.length;
                    const interval = this.interval;
                    const showResume = () => {
                        if (this.currentMarkdown.length < length) {
                            this.currentMarkdown = this.markdown.substring(0, this.currentMarkdown.length + 1);
                            let prevChar = this.currentMarkdown[this.currentMarkdown.length - 2];
                            if (prevChar === '\n' && this.$refs.resumeEditor) {
                                this.$nextTick(() => this.$refs.resumeEditor.goBottom());
                            }
                            setTimeout(showResume, interval);
                        } else {
                            resolve();
                        }
                    }
                    showResume();
                } catch (error) {
                    reject(error);
                }
            });
        }
    }
}
</script>

<style lang="scss" scoped>
#resume {
    position: absolute;
}
</style>