<!--
* @Author: Kevin
* @Date: 2022-04-22 15:04:30
* @Description: 关于我
-->

<template>
    <div class="about" :class="{ loaded }">
        <template v-for="info in infos">
            <h2 class="ani ink"><span>{{ info.title }}</span></h2>
            <div class="content">
                <p class="ani" v-for="item in info.content"><span>{{ item }}</span></p>
            </div>
        </template>
    </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import config from '../config';
const loaded = ref(false);
const infos = [
    {
        title: '个人介绍',
        content: [
            `昵称：${config.NICK_NAME}`,
            `座右铭：${config.MOTTO}`,
            `码云：${config.GITEE}`,
            `Github：${config.GITHUB}`,
            `邮箱：${config.EMAIL}`,
            `籍贯：${config.HOMETOWN}`,
            `现居：${config.CURRENT_ADDRESS}`,
            `职业：${config.JOB}`,
            `职称：${config.TITLE}`,
            '喜欢和热爱撞了个满怀，', '感觉这辈子很幸运的还是选择了这一行，', '不过感觉最喜欢的还是敲着自己的代码，', '听着想听的歌，', '完成了很多想实现的东西，', '真的会感到开心，', '不曾后悔过。', '说一下我自己吧，', '平时会比较喜欢折腾各种各样的东西，', '最近迷上了写博客，', '迷上了折腾自己的服务器，', '由于技术有限，', '只能用宝塔来部署的服务器，', '可能自己懒，', '以前喜欢到处问别人，', '现在会更多的是百度，', '逐渐黑化，', '变成百度工程师，', '我的博客便是这样子，', '不断百度，', '不断更新.在辞职后，', '不断面试，', '然后发现自己的缺点不断改正，', '基础比较薄弱，', '因为不爱学那些个人感觉太枯燥的理论知识，', '虽然知道我的选择是错误的，', '可是还是会长期忍不住不想去看，', '于是又跑来写博客了。', '只能说，', '在不断看底层js代码，', '不断在折腾博客吧。'
        ]
    },
    {
        title: '剑谱',
        content: [
            '剑谱秘籍 剑谱乃忘情之人所写，后人想修炼此剑谱定当谨记。',
            '欲练此剑谱必要忘却红尘，心中再无半点情爱。 否则就会走火入魔，为爱伤心，为情所困。', '谨记！谨记！', '剑谱第一页，忘掉心上人 剑谱第二页，挥剑斩红尘 剑谱第三页，自断痴情魂', '剑谱第四页，刀刀斩爱神 剑谱第五页，情欲不沾身 剑谱第六页，不做感情人', '剑谱第七页，女人伤人魂 剑谱第八页，怒斩旧情人 剑谱第九页，挥剑自斩神', '剑谱第十页，闭关锁心门 剑谱第十一页，怒斩拦路人 剑谱第十二页，抬手灭红尘', '剑谱最终页，无爱即是神'
        ]
    }
];

onMounted(() => {
    setTimeout(() => {
        loaded.value = true;
    }, 0);
});
</script>
<style lang="less">
.about {
    background-color: var(--background);
    padding: var(--gap);
    border-radius: var(--radius);

    h2 {
        font-size: var(--xxlarge);
        margin-bottom: var(--gap);
        display: block;
        overflow: hidden;
        position: relative;
        padding-left: var(--gap-small);
    }

    p {
        margin-bottom: var(--gap);
        display: block;
        overflow: hidden;
    }

    span {
        display: inline-block;
        opacity: 0;
        transform-origin: 0 0;
        transform: translate(0, 20px) rotate(45deg);
        transition: 0.5s ease-out;
    }

    .loopAni(@n, @i: 1) when (@i < @n) {
        .ani {
            &:nth-child(@{i}) {
                span {
                    transition-delay: 0.05s * @i;
                }
            }
        }

        .loopAni(@n, @i + 1);
    }

    .loopAni(30);

    &.loaded {
        .ani span {
            opacity: 1;
            transform: translate(0, 0) rotate(0);
        }
    }
}
</style>