<template>
  <div class="home">
    <DesignTest/>
  </div>
</template>

<script>
// このファイルがトップページ
// @ is an alias to /src
import DesignTest from '@/components/DesignTest.vue'

export default {
  name: 'HomeView',

  // ここに各ページのコンポーネント入れる
  components: {
    DesignTest
  }
}
</script>
