<template>
    <div id="resume">
        <style-editor ref="styleEditor" :code="currentStyle"></style-editor>
        <resume-editor ref="resumeEditor"></resume-editor>
        <Footer ref="footer"></Footer>
    </div>
</template>

<script>
// @ 即 /src 的别名 alias
import Footer from '@/components/resume/Footer';
import ResumeEditor from '@/components/resume/ResumeEditor';
import StyleEditor from '@/components/resume/StyleEditor';

import style from '!raw-loader!@/components/resume/style.css';
// 这里使用 !raw-loader! 而不是 raw-loader!, 否则报错
// let style = require('!raw-loader!@/components/resume/style.css');
// style = style.default.split('/*divide*/');
// debugger;

export default {
    name: 'resume',
    components: {
        Footer,
        StyleEditor,
        ResumeEditor
    },
    data() {
        return {
            style: style.split('/*divide*/'),
            currentStyle: '',
            interval: 40
        };
    },
    created() {
        this.startAnimation();
    },
    methods: {
        /**
         * 
         */
        startAnimation: async function() {
            await this.progressivelyShowStyle(0);
            await this.progressivelyShowResume();
            await this.progressivelyShowStyle(1);
            await this.showHtml();
            await this.progressivelyShowStyle(2);
        },
        progressivelyShowStyle(index) {
            const _this = this;
            return new Promise((resolve, reject) => {
                try {
                    console.log(_this.style);
                    debugger;
                    resolve(index)
                } catch (error) {
                    reject(error)
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
