<template>
    <div class="wrapper" v-if="settings.content">
        <div class="header">
            {{ settings.title }}
        </div>
        <div class="content">
            <component :is="settings.content" :obj="settings.obj"/>
        </div>
        <div class="footer">
            <button @click="onCloseClick">Close</button>
        </div>
    </div>
</template>

<script>

export default {
    name: "ModalWindowAddPaymentForm",
    components: {
        AddPaymentForm: ()=> import('./AddPaymentForm.vue'),
        MyAuth: ()=> import('./MyAuth.vue'),
    },
    props: {
        settings: Object
    },
    methods: {
        onCloseClick() {
            this.$modal.hide()
        }
    }
}
</script>

<style lang="scss" scoped>

.wrapper {
    padding: 20px;
    box-sizing: border-box;
    position: absolute;
    top: 20%;
    left: 50%;
    background: #efefef;
}

</style>
