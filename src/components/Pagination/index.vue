<template>
  <div class="pagination">
    <button :disabled="pageNo===1" @click="getPageNoClick(pageNo-1)">上一页</button>
    <button v-if="startNumAndEndNum.start>1" @click="getPageNoClick(1)" :class="{active:pageNo===1}">1</button>
    <button v-if="startNumAndEndNum.start>2">···</button>

    <button v-for="(page,index) in startNumAndEndNum.end"
            :key="index"
            v-if="page>=startNumAndEndNum.start"
            @click="getPageNoClick(page)" :class="{active:pageNo===page}">{{ page }}
    </button>

    <button v-if="startNumAndEndNum.end<totalPage-1">···</button>
    <button v-if="startNumAndEndNum.end<totalPage" @click="getPageNoClick(totalPage)"
            :class="{active:pageNo===totalPage}">{{ totalPage }}
    </button>
    <button :disabled="pageNo===totalPage" @click="getPageNoClick(pageNo+1)">下一页</button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ['pageNo', 'pageSize', 'total', 'continues',],
  computed: {
    totalPage() {
      // Math.ceil向上取整 Math.floor向下取整
      return Math.ceil(this.total / this.pageSize);
    },
    startNumAndEndNum() {
      const {pageNo, continues, totalPage} = this
      let start = 0, end = 0
      if (continues > totalPage) {
        end = totalPage
        start = 1
      } else {
        start = pageNo - Math.floor(continues / 2)
        end = pageNo + Math.floor(continues / 2)
        if (start < 1) {
          start = 1
          end = continues
        }
        if (end > totalPage) {
          end = totalPage
          start = totalPage - continues + 1
        }
      }
      return {start, end}
    }
  },
  methods: {
    getPageNoClick(pageNo) {
      this.$emit('getPageNo', pageNo)
    }
  }

}
</script>

<style lang="less" scoped>
.active {
  background-color: skyblue;
}

.pagination {
  text-align: center;

  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
