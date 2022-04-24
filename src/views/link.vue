<!--
* @Author: Kevin
* @Date: 2022-04-22 15:01:57
* @Description: 友链
-->

<template>
    <div class="link">
        <div class="item" v-for="link, index in links" @click="jumpHandle(link.friendLink)">
            <div class="logo"><img :src="link.friendAvatar" :alt="link.friendName" @error="errorHandle(index)"></div>
            <div class="infos">
                <div class="cover"><img :src="link.friendAvatar"></div>
                <div class="name">{{link.friendName}}</div>
                <div class="intro">{{link.friendDesc}}</div>
            </div>
        </div>
    </div>
    <div class="link-tips">
        <p>如果您想要互换友链，可以参考以下信息将本站信息添加到您的网站上并发送邮件给我，非常期待你的友链！</p>
        <p>邮件地址：15279279713@163.com或者1797101134@qq.com</p>
        <p>网站名称：{{config.SITE_NAME}}-技术博客</p>
        <p>网站地址：{{config.SITE_URL}}</p>
        <p>网站描述：身为蝼蚁，当有鸿鹄之志</p>
        <p>Logo地址：https://cloud.gujiwuqing.top/i/2022/03/21/vk3n8w.jpeg</p>
    </div>
</template>
<script setup>
import {ref, onMounted} from 'vue';
import axios from '@/axios';
import config from '@/config';
const links = ref([]);
const defaultImg = new URL('../assets/logo.png', import.meta.url).href;
onMounted(() => {
    axios('/_next/data/link.json').then(res => {
        links.value = res.pageProps.linkList;
    });
})

function jumpHandle(url) {
    window.open(url);
}
function errorHandle(index) {
    links.value[index].friendAvatar = defaultImg;
}
</script>
<style lang="less">
.link{
    background: var(--background);
    border-radius: var(--radius);
    padding: var(--gap);
    --logoWidth: 80px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--gap);
    margin-bottom: var(--gap);
    transition: background-color 0.5s;
    .item{
        position: relative;
        height: calc(var(--logoWidth));
        border-radius: var(--radius);
        cursor: pointer;
        &:hover{
            .logo{
                transform: scale(1.2);
                box-shadow: 0 3px 10px 1px rgb(0 0 0 / .2);
            }
            .cover{
                transform: scale(3);
            }
        }
        .logo{
            width: var(--logoWidth);
            height: var(--logoWidth);
            border-radius: 50%;
            overflow: hidden;
            position: absolute;
            top: 0;
            left: 0;
            background-color: #f5f5f5;
            z-index: 5;
            box-shadow: 0 3px 10px 1px rgba(0, 0, 0, .1);
            transition: 0.3s;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .infos{
            position: relative;
            height: 100%;
            margin-left: calc(var(--logoWidth) / 2);
            padding-left: calc(var(--logoWidth) / 2 + var(--gap-small));
            border-radius: var(--radius);
            overflow: hidden;
            border: solid 1px var(--border);
            transition: border-color 0.5s;
            .name{
                padding: var(--gap-small) 0;
            }
            .intro{
                font-size: var(--font-size-s);
                opacity: 0.5;
                font-size: var(--small);
            }
            .cover{
                pointer-events: none;
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                overflow: hidden;
                transition: 0.5s;
                img{
                    display: block;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    filter: blur(50px);
                    opacity: 0.5;
                }
            }
        }
    }
}
.link-tips{
    background-color: var(--background);
    border-radius: var(--radius);
    padding: var(--gap);
    line-height: 2;
    transition: background-color 0.5s;
    p{
        opacity: 0.5;
    }
}
@media screen and (max-width: 720px) {
    .link{
        display: flex;
        flex-wrap: wrap;
        .item{
            width: 100%;
        }
    }
}
</style>