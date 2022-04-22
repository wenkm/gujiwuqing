<template>
    <div class="home">
        <main>
            <article-item v-for="item in articles" :article="item"></article-item>
        </main>
        <aside>
            <div class="widget">
                <div class="title ink">热门文章</div>
                <div class="content">
                    <ul>
                        <template v-for="item, index in latestArticles">
                            <li @click="router.push(`/article/${item.id}`)" v-if="index < 5">
                                <a :href="`/article/${item.id}`">{{ item.title }}</a>
                            </li>
                        </template>
                    </ul>
                </div>
            </div>
            <div class="widget">
                <div class="title ink">分类</div>
                <div class="content">
                    <ul>
                        <li v-for="item in cates" @click="router.push(`/cate/${item.id}`)">
                            <a :href="`/tag/${item.id}`">{{ item.name }}</a>
                        </li>
                    </ul>
                </div>
            </div>
        </aside>
    </div>
</template>
<script setup>
import articleItem from '../components/article-item.vue';
import axios from '@/axios';
import {ref, onMounted} from 'vue';
import {useRouter} from 'vue-router';
const router = useRouter();

const articles = ref([]),
    latestArticles = ref([]),
    cates = ref([]);

onMounted(() => {
    
    axios(`/article?pageNo=1&pageSize=100`).then(res => {
        articles.value = res.data.list;
    }).catch(() => {
        axios(`/_next/data/article.json`).then(res => {
            articles.value = res.data.list;
        });
    })
    axios(`/_next/data/archive.json`).then(res => {
        latestArticles.value = res.pageProps.list.sort((a, b) => b.readCount - a.readCount);
    });
    axios(`/_next/data/category.json`).then(res => {
        cates.value = res.pageProps.categoryList;
    });
})

</script>
<style lang="less">
.home{
    display: grid;
    grid-template-columns: 1fr 250px;
    gap: var(--gap);
    aside{
        .widget{
            margin-bottom: var(--gap);
            background-color: var(--background);
            border-radius: var(--radius);
            position: sticky;
            top: calc(var(--gap) + var(--header-height));
            left: 0;
            .title{
                font-size: var(--font-size-m);
                font-weight: var(--font-weight-bold);
                padding: var(--gap) 0 var(--gap) var(--gap-small);
                margin-left: var(--gap);
            }
            .content{
                padding: 0 var(--gap) var(--gap);
                ul{
                    li{
                        margin-bottom: var(--gap-small);
                        a{
                            font-size: var(--small);
                            &:hover{
                                color: var(--primary);
                            }
                        }
                    }
                }
            }
        }
    }
}
@media screen and (max-width: 720px) {
    .home{
        display: block;
    }
}
</style>