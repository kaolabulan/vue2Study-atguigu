<script>
  import Swiper from "swiper";

  export default {
    name:"Carousel",
    props:['list'],
    watch:{
      list:{
        immediate:true,
        handler(oldValue,newValue){
          this.$nextTick(()=>{
            var mySwiper = new Swiper (this.$refs.cur, {
              loop: true, // 循环模式选项

              // 如果需要分页器
              pagination: {
                el: '.swiper-pagination',
              },

              // 如果需要前进后退按钮
              navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              },

              // 如果需要滚动条
              scrollbar: {
                el: '.swiper-scrollbar',
              },
            })
          })
        }
      }
    }
  }
</script>

<template>
  <div class="swiper-container" ref="cur">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(carouse,index) in list" :key="carouse.id">
        <img :src="carouse.imgUrl" />
      </div>

    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<style scoped>

</style>