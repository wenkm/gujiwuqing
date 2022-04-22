<!--
* @Author: Kevin
* @Date: 2022-04-22 13:17:17
* @Description: 文章列表
-->

<template>
    <div class="article-item">
        <div class="image">
            <img :src="article.cover" :alt="article.title">
        </div>
        <div class="infos">
            <div class="title">{{ article.title }}</div>
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
defineProps(['article']);

function formatDate(date) {
    const d = new Date(date);
    return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`;
}
</script>