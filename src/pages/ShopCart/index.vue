<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="(cart,index) in cartList" :key="cart.id">
          <li class="cart-list-con1">
            <input type="checkbox"
                   name="chk_list"
                   :checked="cart.isChecked"
                   @click="checkCart(cart.skuId,cart.isChecked)">
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl">
            <div class="item-msg">{{cart.skuName}}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cart.skuPrice }}.00</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="handler('decrease',-1,cart)">-</a>
            <input autocomplete="off" type="text" minnum="1" class="itxt" :value="cart.skuNum" @change="handler('change',$event.target.value*1,cart)">
            <a href="javascript:void(0)" class="plus" @click="handler('increase',1,cart)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{cart.skuPrice*cart.skuNum}}</span>
          </li>
          <li class="cart-list-con7">
            <a href="javascript:" class="sindelet" @click="deleteCart(cart)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>

      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll"
               type="checkbox"
               @click="checkAllCart($event)"
               :checked="isAllChecked&&cartList.length>0">
        <span>全选</span>
      </div>
      <div class="option">
        <a href="javascript:" @click="deleteAllCheckCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">0</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
import throttle from 'lodash/throttle'

export default {
    name: 'ShopCart',
    mounted() {
      this.getData()
    },
    methods:{
      async checkCart(skuID,isChecked){
        try {
          let checked = isChecked?0:1
          await this.$store.dispatch('checkCart',{skuID,isChecked:checked})
          this.getData()
        }catch (e) {
          console.log(e.message)
        }
      },
      async deleteCart(cart){
        try {
          await this.$store.dispatch('deleteCart',cart.skuId)
          this.getData()
        }catch (e) {
          console.log(e.message)
        }
      },
      checkAllCart(event){
        this.cartList.forEach(async(cart)=>{
          try {
            cart.isChecked=event.target.checked?1:0
            await this.$store.dispatch('checkCart',{skuID:cart.skuId,isChecked:cart.isChecked})
          }catch (e) {
            e.message
          }
          this.getData()
        })
      },
      deleteAllCheckCart(){
        // let isCheckedArr = this.cartList.filter(cart=>cart.isChecked)
        // isCheckedArr.forEach(cart=>this.deleteCart(cart))
        this.cartList.forEach(cart=>cart.isChecked?this.deleteCart(cart):'')
      },
      //throttle(function(),500)节流 0.5s执行一次
      handler:throttle(async function (type,disNum,cart){
        //disNum变化量
        switch (type){
          case 'decrease':
            cart.skuNum>1?disNum=-1:disNum=0
            break
          case 'increase':
            disNum = 1
            break
          case 'change':
            if (isNaN(disNum)||disNum<1){
              disNum = 0
            }else {
              disNum = parseInt(disNum) - cart.skuNum
            }
            break
        }
        try {
          await this.$store.dispatch('addOrUpdateShopCart',{
            skuId:cart.skuId,
            //skuNum变化量
            skuNum:disNum,
          })
          this.getData()
        }catch (error){
          alert(error.message)
        }
      },1000),
      getData(){
        this.$store.dispatch('getCartLIst')
      },
    },
    computed:{
      ...mapState({
        cartList:state => state.shopCart.cartList,
      }),
      isAllChecked(){
        return this.cartList.every(item=>item.isChecked===1)
      },
  }
  }
</script>

<style lang="less" scoped>
  .cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }

    .cart-main {
      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;

        &>div {
          float: left;
        }

        .cart-th1 {
          width: 25%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 25%;
        }

        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6 {
          width: 12.5%;

        }
      }

      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;

        .cart-list {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;

          &>li {
            float: left;
          }

          .cart-list-con1 {
            width: 15%;
          }

          .cart-list-con2 {
            width: 35%;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 150px;
              margin: 0 10px;
              line-height: 18px;
            }
          }

          .cart-list-con4 {
            width: 10%;

          }

          .cart-list-con5 {
            width: 17%;

            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 33px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }
          }

          .cart-list-con6 {
            width: 10%;

            .sum {
              font-size: 16px;
            }
          }

          .cart-list-con7 {
            width: 13%;

            a {
              color: #666;
            }
          }
        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;

      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        padding: 10px;
        overflow: hidden;
        float: left;

        a {
          float: left;
          padding: 0 10px;
          color: #666;
        }
      }

      .money-box {
        float: right;

        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;
        }

        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>







