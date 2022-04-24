<!--
* @Author: Kevin
* @Date: 2022-04-22 15:04:39
* @Description: 归档
-->

<template>
    <div class="archive">
        <div class="item" v-for="archive in archives">
            <div class="date">{{archive.date}}</div>
            <div class="list">
                <div class="article" v-for="item in archive.list">
                    <span @click="router.push(`/view/${item.id}`)">{{item.title}} <em>{{item.summary}}</em></span>
                    <span>{{formatTime(item.createdAt, 'yyyy-MM-dd')}}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import {ref, onMounted} from 'vue';
import {useRouter} from 'vue-router';
import {formatTime} from '@/utils';
const router = useRouter();
const archives = ref([]);
onMounted(() => {
    let arr = [];
    JSON.parse(sessionStorage.getItem('articles')).map(item => {
        const d = formatTime(item.createdAt, 'yyyy.MM');
        const index = arr.findIndex(_item => _item.date === d);
        if (index > -1) {
            arr[index].list.push(item);
        } else {
            arr.push({
                date: d,
                list: [item]
            });
        }
    });
    archives.value = arr.sort((a, b) => new Date(b.date) - new Date(a.date));
})
</script>
<style lang="less">
.archive{
    .item{
        margin-bottom: var(--gap);
        position: relative;
        &:nth-last-child(1){
            &:after{
                display: none;
            }
        }
        &:before{
            content: '';
            position: absolute;
            top: var(--gap-small);
            left: 96px;
            width: 10px;
            height: 10px;
            background-color: var(--primary);
            border-radius: 50%;
            z-index: 5;
            transition: background-color 0.5s;
        }
        &:after{
            content: '';
            position: absolute;
            top: var(--gap-small);
            left: calc(95px + 11px / 2);
            width: 1px;
            height: calc(100% + var(--gap));
            background-color: var(--border);
            transition: background-color 0.5s;
        }
        .date{
            color: var(--primary);
            position: absolute;
            top: var(--gap-small);
            width: 80px;
            text-align: right;
            font-size: var(--large);
            font-weight: bold;
        }
        .list{
            margin-left: calc(100px + var(--gap));
            .article{
                background-color: var(--background);
                border-radius: var(--radius);
                padding: var(--gap-small);
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: var(--gap-small);
                transition: background-color 0.5s;
                span{
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    width: calc(100% - 100px);
                    em{
                        font-style: normal;
                        opacity: 0.5;
                        color: var(--front) !important;
                        font-size: var(--small);
                        transition: color 0.5s;
                    }
                    &:nth-child(1){
                        cursor: pointer;
                        &:hover{
                            color: var(--primary);
                        }
                    }
                    &:nth-child(2){
                        opacity: 0.5;
                        display: inline-block;
                        width: 70px;
                        font-size: var(--small);
                    }
                }
            }
        }
    }
}
</style>