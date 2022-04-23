<!--
* @Author: Kevin
* @Date: 2022-04-23 12:15:47
* @Description: 查看页
-->

<template>
    <div class="view">
        <h1 class="title"><span>{{article.title}}</span></h1>
        <div class="meta">
            <span>时间：{{formatTime(article.createdAt)}}</span>
            <span>查看：{{article.readCount}}</span>
        </div>
        <div class="intro">{{article.summary}}</div>
        <div class="content markdown" v-html="markdown()"></div>
    </div>
</template>
<script setup>
import {formatTime} from '@/utils';
import markdownIt from 'markdown-it';
import hljs from 'highlight.js';
import '@/style/markdown.less';
import 'highlight.js/styles/monokai-sublime.css';
const props = defineProps(['id']);
const articles = JSON.parse(sessionStorage.getItem('articles'));
const article = articles.find(item => item.id === props.id);
function markdown() {
    const md = markdownIt({
        html: true,
        linkify: true,
        typographer: true,
        highlight: function (str, lang) {
            if (lang && hljs.getLanguage(lang)) {
                try {
                    return `<pre class="hljs"><code>${hljs.highlight(lang, str, true).value}</code></pre>`;
                } catch (__) {}
            }
            return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
        }
    });
    return md.render(article.content);
}
</script>
<style lang="less">
.view{
    background-color: var(--background);
    border-radius: var(--radius);
    h1.title{
        text-align: center;
        font-size: var(--xxxlarge);
        position: sticky;
        top: var(--header-height);
        left: 0;
        z-index: 5;
        backdrop-filter: blur(10px) saturate(300%);
        padding: var(--gap) 0;
        &:after{
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: var(--background);
            opacity: 0.75;
        }
        span{
            position: relative;
            z-index: 10;
        }
    }
    .meta{
        padding: 0 0 var(--gap);
        display: flex;
        gap: var(--gap);
        opacity: 0.5;
        justify-content: center;
        font-size: var(--small);
    }
    .intro{
        margin: 0 var(--gap) var(--gap);
        padding: var(--gap);
        background-color: var(--body);
        border-radius: var(--radius);
        font-style: italic;
    }
    .markdown{
        margin: var(--gap);
        padding-bottom: var(--gap);
    }
    .hljs,
    .hljs code{
        font-family: 'Fira Code', '幼圆', 'Microsoft Yahei', 'Helvetica Neue', 'Hiragino Sans GB', 'WenQuanYi Micro Hei', sans-serif;
    }
    .hljs{
        border-radius: var(--radius);
        line-height: 1.8;
        position: relative;
        padding-top: 40px;
        &:before, &:after{
            content: '';
            position: absolute;
            top: 10px;
            width: 15px;
            height: 15px;
            border-radius: 50%;
        }
        &:before{
            left: 10px;
            background-color: #f30;
        }
        &:after{
            left: 35px;
            background-color: rgb(255, 208, 0);
        }
        code{
            &:before{
                content: '';
                position: absolute;
                top: 10px;
                left: 60px;
                width: 15px;
                height: 15px;
                border-radius: 50%;
                background-color: #0f0;
            }
        }
    }
}
</style>