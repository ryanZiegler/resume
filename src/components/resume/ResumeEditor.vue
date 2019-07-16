<template>
    <div class="resumeEditor" :class="{htmlMode:isHtml}" ref="container">
        <div v-if="isHtml" v-html="result"></div>
        <pre v-else>{{result}}</pre>
    </div>
</template>

<script>
import marked from 'marked';

export default {
    name: 'resume-editor',
    props: ['markdown', 'isHtml'],
    computed: {
        result: function() {
            return this.isHtml ? marked(this.markdown) : this.markdown;
        }
    },
    methods: {
        goBottom() {
            this.$refs.container.scrollTop = 100000;
        }
    }
}
</script>

<style>

</style>
