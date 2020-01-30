/**
* description：表格组件
*
* @author ljq
* @date 2019/12/20　10:04
*/
<template>
    <div>
        <el-table :data="tableData" border class="table" ref="multipleTable">
            <el-table-column v-for="(ele,i) in  tableEle" :key="i"
                             :fixed="ele.fixed"
                             :prop="ele.prop"
                             :label="ele.label"
                             :width="ele.width">
            </el-table-column>
            <slot name="btn-operation"></slot>
        </el-table>
        <!--分页-开始-->
        <div class="pagination">
                <el-pagination background layout="total, prev, pager, next" @current-change="handleCurrentChange"
                               :total="this.total" :page-size="this.rowNum" :current-page="currentPage">
                </el-pagination>
        </div>
        <!--分页-结束-->
    </div>
</template>
<script>
    export default {
        data() {
            return {
                // 当前页
                currentPage: 1
            }
        },
        props: ['tableEle', 'tableData', 'rowNum', 'total'],
        mounted() {
        },
        methods: {
            getPageNumber(pageNumber) {
                this.$emit("getPageNumber",pageNumber)
            },
            handleCurrentChange(val) {
                let pageNum = this.rowNum;
                let vm = this;
                this.currentPage = val;
                this.getPageNumber(val);
            }
        }
    }
</script>
<style>
    .table {
        width: 100%;
        font-size: 14px;
    }
</style>

