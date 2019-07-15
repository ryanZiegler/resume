<template>
    <div class="styleEditor" ref="container">
        <div class="code" v-html="codeInStyleTag"></div>
        <pre class="" v-html="highlightedCode"></pre>
    </div>
</template>

<script>
export default {
    name: 'style-editor',
    props: ['code'],
    computed: {
        codeInStyleTag: function () {
            return `<style>${this.code}</style>`;
        }
    }
}
</script>

<style>

</style>
