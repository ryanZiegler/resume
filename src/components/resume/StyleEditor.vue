<template>
    <div class="styleEditor" ref="container">
        <div class="code" v-html="codeInStyleTag"></div>
        <pre class="" v-html="highlightCode"></pre>
    </div>
</template>

<script>
import Prism from 'prismjs';
export default {
    name: 'style-editor',
    props: ['code'],
    computed: {
        codeInStyleTag: function() {
            return `<style>${this.code}</style>`;
        },
        // https://webfem.com/post/highlightjs
        // prismjs API  Prism.highlight(text, grammar)
        highlightCode: function() {
            return Prism.highlight(this.code, Prism.languages.css);
        }
    },
    methods: {
        goBottom() {
            this.$refs.container.scrollTop = 100000;
        }
    }
}
</script>

<style scoped>
  .code {
    display: none;
  }
</style>
