/**
 * description：公共地区下拉选择框
 *
 * @author ljq
 * @date 2019/12/26　10:11
 */
<template>
    <div>
        <el-cascader
                v-model="value"
                :options="options"
                @expand-change="hand"
                @change="handChange"
        ></el-cascader>
    </div>
</template>
<script>
    import {getLocations} from '../../api/sysApi'
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
                getLocations(0).then(res => {
                    let data = res.data;
                    data.forEach(d => {
                        let temp = {};
                        temp["value"] = d.locationCode;
                        temp["label"] = d.locationName;
                        temp["children"] =  [];
                        this.options.push(temp);
                    })
                })
            },
            hand(value) {
                value = value.pop();
                //获取二级地区
                getLocations(value).then(res => {
                    let data = res.data;
                    this.options.forEach(a =>{
                        //如果当前子级未赋值
                        if (a.value == value && a.children.length == 0) {
                            data.forEach(d => {
                                let temp = {};
                                temp["value"] = d.locationCode;
                                temp["label"] = d.locationName;
                                temp["children"] =  [];
                                // a.children.length = 0;
                                a.children.push(temp);
                            });
                        }
                        //如果当前子级已赋值，但第三级未赋值
                        if (a.children.length != 0) {
                            a.children.forEach(b => {
                                if (b.value == value && b.children.length == 0) {
                                    data.forEach(d => {
                                        let temp = {};
                                        temp["value"] = d.locationCode;
                                        temp["label"] = d.locationName;
                                        b.children.push(temp);
                                    });
                                }
                            })
                        }
                        //都已赋值，将参数传给父组件
                    });
                });
            }
        }
    }
</script>
