<template>
  <div id="app" v-text="test">
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  data () {
    return {
      test: '脚手架启动成功！！！'
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
