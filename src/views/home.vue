<template>
    <div class="home">
        <main>
            <article-item v-for="item in articles" :article="item"></article-item>
        </main>
        <aside>
            <div class="widget">
                <div class="title ink">分类</div>
                <div class="content">
                    <ul>
                        <li v-for="item in cates">
                            <a :href="`/cate/${item.id}`" @click.prevent="router.push(`/cate/${item.id}`)">
                                <span>{{ item.name }}</span>
                                <span class="count">{{item.count}}</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="widget">
                <div class="title ink">标签</div>
                <div class="content">
                    <ul>
                        <template v-for="item, index in tags">
                            <li v-if="index < 5">
                                <a :href="`/cate/${item.id}`" @click.prevent="router.push(`/tag/${item.id}`)">
                                    <span>{{item.name}}</span>
                                    <span class="count">{{ item.count }}</span>
                                </a>
                            </li>
                        </template>
                    </ul>
                </div>
            </div>
            <div class="widget hot">
                <div class="title ink">热门文章</div>
                <div class="content">
                    <ul>
                        <template v-for="item, index in hotArticles">
                            <li v-if="index < 10">
                                <em>{{index + 1}}</em>
                                <a :href="`/view/${item.id}`" @click.prevent="router.push(`/view/${item.id}`)">{{item.title}}</a>
                            </li>
                        </template>
                    </ul>
                </div>
            </div>
        </aside>
    </div>
</template>
<script setup>
import articleItem from '../components/article-item.vue';
import {ref, onMounted} from 'vue';
import {useRouter} from 'vue-router';
const router = useRouter();

const articles = ref([]),
    hotArticles = ref([]),
    cates = ref([]),
    tags = ref([]);

onMounted(() => {
    articles.value = JSON.parse(sessionStorage.getItem('articles'));
    hotArticles.value = articles.value.sort((a, b) => b.readCount - a.readCount);

    cates.value = unique(articles.value.map(({categorys}) => categorys).flat());
    tags.value = unique(articles.value.map(({tags}) => tags).flat());
})

// 数组去重并统计数量
function unique(arr) {
    let res = [], temp = {};
    for(let i=0; i<arr.length; i++) {
        const item = arr[i];
        if (temp[item.id]) {
            temp[item.id] += 1;
            continue;
        } else {
            temp[item.id] = 1;
            res.push(item);
        }
    }
    return res.map(item => Object.assign({count: temp[item.id]}, item)).sort((a, b) => b.count - a.count);
}

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
            transition: background 0.5s;
            &.hot{
                position: sticky;
                top: calc(var(--gap) + var(--header-height));
                left: 0;
            }
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
                        display: flex;
                        gap: var(--gap-small);
                        align-items: center;
                        &:nth-child(1) em{
                            background-color: #f00;
                            color: #fff;
                        }
                        &:nth-child(2) em{
                            background-color: rgb(255, 115, 0);
                            color: #fff;
                        }
                        &:nth-child(3) em{
                            background-color: rgb(255, 196, 0);
                            color: #fff;
                        }
                        em{
                            font-style: normal;
                            width: 18px;
                            height: 18px;
                            display: inline-block;
                            text-align: center;
                            line-height: 18px;
                            font-size: var(--small);
                            border-radius: 50%;
                            background-color: var(--border);
                            transition: background-color 0.5s;
                        }
                        a{
                            font-size: var(--small);
                            display: flex;
                            justify-content: space-between;
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            width: 100%;
                            flex: 1;
                            &:hover{
                                color: var(--primary);
                            }
                            .count{
                                opacity: 0.5;
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