<!--Created by Spades<spadesge@gmail.com> on 18/07/13-->
<template>
    <footer>
        <div>{{struct[lang].name}}</div>
        <div>{{struct[lang].phone}}：010-88888888</div>
        <div>Copyright &copy; {{struct[lang].name}} </div>
    </footer>
</template>
<script>
    import { mapState } from 'vuex'

    export default {
        name: 'Footer',
        computed: {
            ...mapState({
                lang: state => state.Lang.lang,
                struct: state => state.struct
            })
        }
    }
</script>
<style lang="scss" scoped>
    footer {
        padding: 0.5rem 0;
        margin-top: 5rem;
        font-size: 0.75rem;
        line-height: 30px;
        text-align: center;
        background: #565e6e;
        color: #efefef;
    }
</style>