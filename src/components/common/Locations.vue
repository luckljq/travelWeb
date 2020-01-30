/**
* description：公共地区下拉选择框2
*
* @author ljq
* @date 2019/12/26　10:11
*/
<template>
    <div>
        <el-cascader
                v-model="value"
                :options="options"
                @change="handChange"
        ></el-cascader>
    </div>
</template>
<script>
    import {getLocationsList} from '../../api/sysApi'
    export default {
        data() {
            return {
                value: [],
                options: []
            }
        },
        created() {
            this.getFirst()
        },
        methods: {
            handChange(value) {
                this.$emit("getValue",value)
            },
            //向父组件传值
            getValue(locationCode) {
                this.$emit("getValue",locationCode)
            },
            //获取一级地区
            getFirst() {
                getLocationsList().then(res =>{
                    let data = res.data;
                    this.options = data;
                })
            },
        }
    }
</script>
