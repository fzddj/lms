<template>
  <div class="wrapper">
    <router-view/>
  </div>
</template>

<script>
let modal = weex.requireModule('modal');
import util from './util/util.js'
export default {
  name: 'App',
  data () {
    return {

    }
  },
  created () {
    util.initIconFont();
  },
}
</script>

<style scoped>

</style>
