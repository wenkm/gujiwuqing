<!--
* @Author: Kevin
* @Date: 2022-04-22 13:17:17
* @Description: 文章列表
-->

<template>
    <div class="article-item">
        <div class="image">
            <img :src="article.cover" :alt="article.title" @error="errorHandle">
        </div>
        <div class="infos">
            <div class="title"><a :href="`/view/${article.id}`" @click.prevent="router.push(`/view/${article.id}`)">{{ article.title }}</a></div>
            <div class="date">{{ formatTime(article.updatedAt, 'yyyy-MM-dd') }}</div>
            <div class="meta">
                <a :href="`/cate/${cate.id}`" @click.prevent="filterHandle('cate', cate)" class="category" v-for="cate in article.categorys">{{ cate.name }}</a>
                <a :href="`/tag/${tag.id}`"  @click.prevent="filterHandle('tag', tag)" class="tags" v-for="tag in article.tags">{{ tag.name }}</a>
            </div>
            <div class="desc">{{ article.summary }}</div>
        </div>
    </div>
</template>
<script setup>
import { useRouter } from 'vue-router';
import {formatTime} from '@/utils';
const router = useRouter();
const props = defineProps(['article']);
const emits = defineEmits(['filter']);
const defaultImg = new URL('../assets/logo.png', import.meta.url).href;

function errorHandle() {
    props.article.cover = defaultImg;
}
function filterHandle(type, item) {
    console.log(type, item);
    emits('filter', type, item);
}
</script>