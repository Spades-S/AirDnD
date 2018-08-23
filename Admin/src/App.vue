<!-- Created by Spades<spadesge@gmail.com> on 18/05/23-->

<template>
    <div id="app">
        <div class="main">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'App'
    }
</script>

<style lang="scss">
    * {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }
    html, body {
        margin: 0;
        padding: 0;
        height: 100%;
        font-size: 20px;
    }
    #app {
        height: 100%;
        padding-top: 85px;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    .main {
        height:100%;
    }
</style>

