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
            <div class="date">{{ formatDate(article.updatedAt) }}</div>
            <div class="meta">
                <span class="category" v-for="cate in article.categorys"
                    @click="router.push(`/cate/${cate.id}`)">{{ cate.name }}</span>
                <span class="tags" v-for="tag in article.tags">{{ tag.name }}</span>
            </div>
            <div class="desc">{{ article.summary }}</div>
        </div>
    </div>
</template>
<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
const props = defineProps(['article']);

const defaultImg = new URL('../assets/logo.png', import.meta.url).href;

function formatDate(date) {
    const d = new Date(date);
    return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`;
}
function errorHandle() {
    props.article.cover = defaultImg;
}
</script>