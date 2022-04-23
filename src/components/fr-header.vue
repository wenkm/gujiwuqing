<template>
    <header id="header">
        <div class="wrapper">
            <div class="logo">{{config.SITE_NAME}}</div>
            <nav>
                <ul>
                    <li><router-link to="/">Home</router-link></li>
                    <li><router-link to="/archive">归档</router-link></li>
                    <li><router-link to="/link">友链</router-link></li>
                    <li><router-link to="/about">关于我</router-link></li>
                </ul>
            </nav>
            <div class="meta">
                <div class="mode" :class="mode" @click="modeHandle">
                    <div class="sun"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" fill="none" viewBox="0 0 25 24"><g stroke-linecap="round" stroke-linejoin="round" stroke-width="2" clip-path="url(#clip0_192_823)"><path d="M12.5 17a5 5 0 100-10 5 5 0 000 10zM12.5 1v2M12.5 21v2M4.72 4.22l1.42 1.42M18.86 18.36l1.42 1.42M1.5 12h2M21.5 12h2M4.72 19.78l1.42-1.42M18.86 5.64l1.42-1.42"></path></g><defs><clipPath id="clip0_192_823"><path d="M0 0H24V24H0z" transform="translate(.5)"></path></clipPath></defs></svg></div>
                    <div class="moon"><svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 21 20"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.5 10.79A9 9 0 119.71 1a7 7 0 009.79 9.79v0z"></path></svg></div>
                </div>
            </div>
        </div>
    </header>    
</template>
<script setup>
import {getCurrentInstance, ref} from 'vue';
const {appContext: {app: {config: {globalProperties: {config}}}}} = getCurrentInstance();
const mode = ref('day');
function modeHandle() {
    mode.value = mode.value === 'day' ? 'night' : 'day';
    document.body.classList.toggle('dark');
}
</script>