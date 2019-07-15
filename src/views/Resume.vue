<template>
    <div id="resume">
        <style-editor ref="styleEditor"></style-editor>
        <resume-editor ref="resumeEditor"></resume-editor>
        <Footer ref="footer"></Footer>
    </div>
</template>

<script>
// @ 即 /src 的别名 alias
import Footer from '@/components/resume/Footer';
import ResumeEditor from '@/components/resume/ResumeEditor';
import StyleEditor from '@/components/resume/StyleEditor';

export default {
    name: 'resume',
    components: {
        Footer,
        StyleEditor,
        ResumeEditor
    },
    data() {
        return {

        };
    }
}
</script>

<style lang="scss" scoped>
#resume {
    position: absolute;
}
</style>
