<template>
    <k-header />
    <section id="container">
        <router-view></router-view>
    </section>
    <k-footer />
</template>
<script setup>
import kHeader from '@/components/fr-header.vue';
import kFooter from '@/components/fr-footer.vue';
</script>