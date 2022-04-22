<template>
    <footer id="footer">
        <div class="welcome">欢迎来到{{config.SITE_NAME}}的博客</div>
    </footer>
</template>
<script setup>
import {getCurrentInstance} from 'vue';
const {appContext: {app: {config: {globalProperties: {config}}}}} = getCurrentInstance();
</script>