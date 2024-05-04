<script>
import ListContainer from "@/pages/Home/ListContainer.vue";
import Recommend from "@/pages/Home/Recommend.vue";
import Rank from "@/pages/Home/Rank.vue";
import Like from "@/pages/Home/Like.vue";
import Floor from "@/pages/Home/Floor.vue";
import Brand from "@/pages/Home/Brand.vue";
import {mapState} from "vuex";

export default {
  name:'',
  components:{ListContainer,Recommend,Rank,Like,Floor,Brand},
  mounted() {
    this.$store.dispatch('getFloorList')
  },
  computed:{
    ...mapState(
        {floorList:state => state.home.floorList}
    )
  },
}
</script>

<template>
  <div>
    <TypeNva></TypeNva>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <Floor v-for="(floor,index) in floorList" :key="floor.id" :list="floor"/>
    <Brand></Brand>
  </div>
</template>

<style scoped lang="less">

</style>