<script>
  import {mapState} from "vuex";
  import throttle from "../../../node_modules/lodash/throttle"
  export default {
    name:"TypeNva",
    data(){
      return{
        currentIndex:-1,
        show:false,
      }
    },
    //组件挂载完毕 向服务器获取三级联动数据 并存入仓库
    mounted() {
      if (this.$route.path==='/home') this.show = true
    },
    computed:{
      ...mapState({
        categoryList: state => state.home.categoryList,
      })
    },
    methods:{
      // changeIndex(index){
      //   this.currentIndex = index
      // },
      //throttle 节流
      changeIndex:throttle(function (index){
          this.currentIndex = index
      },50),
      leaveIndex(){
        this.currentIndex = -1
        if (this.$route.name!=='home')  this.show = false
      },
      goSearch(event){
        let {categoryname,category1id,category2id,category3id} = event.target.dataset
        if (categoryname){
          let query = {categoryName:categoryname}
          if (category1id){
            query.category1Id = category1id
          }else if(category2id){
            query.category2Id = category2id
          }else{
            query.category3Id = category3id
          }
          let location={
            name:'search',
            // 可以在配置路由params传参时，在占位的后面加上一个 ？ 号，代表params 参数可传可不传
            params:this.$route.params,
            query:query,
          }
          this.$router.push(location,()=>{},()=>{})
        }
      },
      enterShow(){
        this.show = true
      }
    }
  }
</script>

<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveIndex" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <transition name="sort">
          <div class="sort" v-show="show">
            <div class="all-sort-list2" @click="goSearch">

              <div class="item"
                   v-for="(c1,index) in categoryList"
                   :key="c1.categoryId"
                   :class="{cur:currentIndex===index}">
                <h3 @mouseenter="changeIndex(index)">
                  <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{c1.categoryName}}</a>
                </h3>
                <div class="item-list clearfix"
                     :style="{display:currentIndex===index?'block':'none'}">
                  <div class="subitem"
                       v-for="(c2,index) in c1.categoryChild"
                       :key="c2.categoryId">
                    <dl class="fore">
                      <dt>
                        <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{ c2.categoryName }}</a>
                      </dt>
                      <dd>
                        <em v-for="(c3,index) in c2.categoryChild"
                            :key="c3.categoryId">
                          <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{ c3.categoryName }}</a>
                        </em>

                      </dd>
                    </dl>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </transition>

      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>

    </div>
  </div>
</template>

<style scoped lang="less">
  .type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 495px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

        }
        .cur{
          background-color: skyblue;
        }
      }
    }

    .sort-enter,.sort-leave-to{
      height: 0;
    }
    .sort-enter-to,.sort-leave{
      height: 461px;
    }
    .sort-enter-active,.sort-leave-active{
      transition: all .5s linear;
    }
  }
}
</style>

















