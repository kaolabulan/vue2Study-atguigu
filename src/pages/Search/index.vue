<template>
  <div>
    <TypeNva/>
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!--  分类的面包屑    -->
            <li class="with-x" v-if="searchParams.categoryName">{{searchParams.categoryName}}
              <i @click="delCategoryName">×</i>
            </li>
            <!--  关键字的面包屑    -->
            <li class="with-x" v-if="searchParams.keyword">{{searchParams.keyword}}
              <i @click="delKeyword">×</i>
            </li>
            <!--  品牌的面包屑    -->
            <li class="with-x" v-if="searchParams.trademark">{{searchParams.trademark.split(':')[1]}}
              <i @click="delTrademark">×</i>
            </li>
            <!--  品牌的面包屑    -->
            <li class="with-x" v-for="(prop,index) in searchParams.props" :key="index">{{prop.split(':')[1]}}
              <i @click="delProp(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <!--自定义组件 子给父传数据 -->
        <SearchSelector @goTrademark="goTrademark" @goAttrs="goAttrs"/>

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{active:isOne}" @click="changeOrder('1')">
                  <a>综合
                    <span v-show="isOne" class="iconfont"
                          :class="{'icon-UP':isAsc,'icon-DOWN':isDesc}"></span>
                  </a>
                </li>
                <li :class="{active:isTwo}" @click="changeOrder('2')">
                  <a>价格
                    <span v-show="isTwo" class="iconfont"
                          :class="{'icon-UP':isAsc,'icon-DOWN':isDesc}"></span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="(good,index) in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <a style="cursor: pointer" @click="goDetail(good.id)">
<!--                    <router-link :to="`/detail/${good.id}`">-->
                      <img :src="good.defaultImg" />
<!--                    </router-link>-->
                    </a>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i> {{good.price}}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank"
                       href="item.html"
                       :title="good.title">
                      {{good.title}}
                    </a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!--  分页器  -->
          <Pagination :pageNo="searchParams.pageNo"
                      :pageSize="searchParams.pageSize"
                      :total="total"
                      :continues="5"
                      @getPageNo="getPageNo"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import SearchSelector from './SearchSelector/SearchSelector'
  import {mapGetters,mapState} from "vuex";
  import Pagination from "@/components/Pagination/index.vue";

  export default {
    name: 'Search',
    data(){
      return{
        searchParams:{
          category1Id: "",
          category2Id: "",
          category3Id: "",
          categoryName: "",
          keyword: "",
          order: "2:desc",
          pageNo: 1,
          pageSize: 3,
          props: [],
          trademark: ""
        }
      }
    },
    components: {
      Pagination,
      SearchSelector
    },
    computed:{
      ...mapGetters(['goodsList']),
      ...mapState({
        total:state => state.search.searchList.total
      }),
      isOne(){
        return this.searchParams.order.indexOf('1') !== -1
      },
      isTwo(){
        return this.searchParams.order.indexOf('2') !== -1
      },
      isAsc(){
        return this.searchParams.order.indexOf('asc') !== -1
      },
      isDesc(){
        return this.searchParams.order.indexOf('desc') !== -1
      },
    },

    beforeMount() {
      Object.assign(this.searchParams,this.$route.query,this.$route.params)
    },
    mounted() {
      this.getData()
    },
    methods:{
      goDetail(id){
        let location={
          name:'detail',
          params:{"skuId":id},
        }
        this.$router.push(location,()=>{},()=>{})
      },
      getData(){
        this.$store.dispatch('getSearchList',this.searchParams)

      },
      goTrademark(trademark){
        this.searchParams.trademark=`${trademark.tmId}:${trademark.tmName}`
        console.log(this.searchParams.trademark)
        //获取数据进行展示
        this.getData()
      },
      goAttrs(attr,attrValue){
        let arr = `${attr.attrId}:${attrValue}:${attr.attrName}`
        //数组的添加.push()   数组的查重.indexOf() 返回-1代表没有重复项
        if (this.searchParams.props.indexOf(arr)===-1)  this.searchParams.props.push(arr)
        //获取数据进行展示
        this.getData()
      },
      delCategoryName(){
        this.searchParams.categoryName=undefined
        this.$router.push({
          name:'search',
          params:this.$route.params
        })
      },
      delKeyword(){
        this.searchParams.keyword=undefined
        this.$bus.$emit('clear')
        this.$router.push({
          name:'search',
          query:this.$route.query
        })
      },
      delTrademark(){
        this.searchParams.trademark=undefined
        this.getData()
      },
      delProp(index){
        //数组的删除splice() 找到index索引 删除n个元素
        // 传递三个参数时 splice(从下这个标开始删除,从自己开始往后删几个,删除的位置放的内容)
        this.searchParams.props.splice(index,1)
        this.getData()
      },
      changeOrder(flag){
        let originFlag = this.searchParams.order.split(":")[0]
        let originSort = this.searchParams.order.split(":")[1]
        let newOrder = ""
        if (flag===originFlag){
          newOrder = `${flag}:${originSort==='desc'?'asc':'desc'}`
        }else {
          newOrder = `${flag}:desc`
        }
        this.searchParams.order = newOrder
        this.getData()
      },
      getPageNo(pageNo){
        this.searchParams.pageNo = pageNo
        this.getData()
      }
    },
    watch:{
      $route(newV,oldV){
        Object.assign(this.searchParams,this.$route.query,this.$route.params)
        this.getData()
        this.searchParams.category1Id=undefined
        this.searchParams.category2Id=undefined
        this.searchParams.category3Id=undefined
      }
    }
  }
</script>

<style lang="less" scoped>
  .main {
    margin: 10px 0;

    .py-container {
      width: 1200px;
      margin: 0 auto;

      .bread {
        margin-bottom: 5px;
        overflow: hidden;

        .sui-breadcrumb {
          padding: 3px 15px;
          margin: 0;
          font-weight: 400;
          border-radius: 3px;
          float: left;

          li {
            display: inline-block;
            line-height: 18px;

            a {
              color: #666;
              text-decoration: none;

              &:hover {
                color: #4cb9fc;
              }
            }
          }
        }

        .sui-tag {
          margin-top: -5px;
          list-style: none;
          font-size: 0;
          line-height: 0;
          padding: 5px 0 0;
          margin-bottom: 18px;
          float: left;

          .with-x {
            font-size: 12px;
            margin: 0 5px 5px 0;
            display: inline-block;
            overflow: hidden;
            color: #000;
            background: #f7f7f7;
            padding: 0 7px;
            height: 20px;
            line-height: 20px;
            border: 1px solid #dedede;
            white-space: nowrap;
            transition: color 400ms;
            cursor: pointer;

            i {
              margin-left: 10px;
              cursor: pointer;
              font: 400 14px tahoma;
              display: inline-block;
              height: 100%;
              vertical-align: middle;
            }

            &:hover {
              color: #28a3ef;
            }
          }
        }
      }

      .details {
        margin-bottom: 5px;

        .sui-navbar {
          overflow: visible;
          margin-bottom: 0;

          .filter {
            min-height: 40px;
            padding-right: 20px;
            background: #fbfbfb;
            border: 1px solid #e2e2e2;
            padding-left: 0;
            border-radius: 0;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

            .sui-nav {
              position: relative;
              left: 0;
              display: block;
              float: left;
              margin: 0 10px 0 0;

              li {
                float: left;
                line-height: 18px;

                a {
                  display: block;
                  cursor: pointer;
                  padding: 11px 15px;
                  color: #777;
                  text-decoration: none;
                }

                &.active {
                  a {
                    background: #e1251b;
                    color: #fff;
                  }
                }
              }
            }
          }
        }

        .goods-list {
          margin: 20px 0;

          ul {
            display: flex;
            flex-wrap: wrap;

            li {
              height: 100%;
              width: 20%;
              margin-top: 10px;
              line-height: 28px;

              .list-wrap {
                .p-img {
                  padding-left: 15px;
                  width: 215px;
                  height: 255px;

                  a {
                    color: #666;

                    img {
                      max-width: 100%;
                      height: auto;
                      vertical-align: middle;
                    }
                  }
                }

                .price {
                  padding-left: 15px;
                  font-size: 18px;
                  color: #c81623;

                  strong {
                    font-weight: 700;

                    i {
                      margin-left: -5px;
                    }
                  }
                }

                .attr {
                  padding-left: 15px;
                  width: 85%;
                  overflow: hidden;
                  margin-bottom: 8px;
                  min-height: 38px;
                  cursor: pointer;
                  line-height: 1.8;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;

                  a {
                    color: #333;
                    text-decoration: none;
                  }
                }

                .commit {
                  padding-left: 15px;
                  height: 22px;
                  font-size: 13px;
                  color: #a7a7a7;

                  span {
                    font-weight: 700;
                    color: #646fb0;
                  }
                }

                .operate {
                  padding: 12px 15px;

                  .sui-btn {
                    display: inline-block;
                    padding: 2px 14px;
                    box-sizing: border-box;
                    margin-bottom: 0;
                    font-size: 12px;
                    line-height: 18px;
                    text-align: center;
                    vertical-align: middle;
                    cursor: pointer;
                    border-radius: 0;
                    background-color: transparent;
                    margin-right: 15px;
                  }

                  .btn-bordered {
                    min-width: 85px;
                    background-color: transparent;
                    border: 1px solid #8c8c8c;
                    color: #8c8c8c;

                    &:hover {
                      border: 1px solid #666;
                      color: #fff !important;
                      background-color: #666;
                      text-decoration: none;
                    }
                  }

                  .btn-danger {
                    border: 1px solid #e1251b;
                    color: #e1251b;

                    &:hover {
                      border: 1px solid #e1251b;
                      background-color: #e1251b;
                      color: white !important;
                      text-decoration: none;
                    }
                  }
                }
              }
            }
          }
        }

        .page {
          width: 733px;
          height: 66px;
          overflow: hidden;
          float: right;

          .sui-pagination {
            margin: 18px 0;

            ul {
              margin-left: 0;
              margin-bottom: 0;
              vertical-align: middle;
              width: 490px;
              float: left;

              li {
                line-height: 18px;
                display: inline-block;

                a {
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  border: 1px solid #e0e9ee;
                  margin-left: -1px;
                  font-size: 14px;
                  padding: 9px 18px;
                  color: #333;
                }

                &.active {
                  a {
                    background-color: #fff;
                    color: #e1251b;
                    border-color: #fff;
                    cursor: default;
                  }
                }

                &.prev {
                  a {
                    background-color: #fafafa;
                  }
                }

                &.disabled {
                  a {
                    color: #999;
                    cursor: default;
                  }
                }

                &.dotted {
                  span {
                    margin-left: -1px;
                    position: relative;
                    float: left;
                    line-height: 18px;
                    text-decoration: none;
                    background-color: #fff;
                    font-size: 14px;
                    border: 0;
                    padding: 9px 18px;
                    color: #333;
                  }
                }

                &.next {
                  a {
                    background-color: #fafafa;
                  }
                }
              }
            }

            div {
              color: #333;
              font-size: 14px;
              float: right;
              width: 241px;
            }
          }
        }
      }
    }
  }
</style>






