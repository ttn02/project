<template>
    <panel-head :route="route" />
    <div class="btns">
        <el-button
            :icon="Plus"
            type="primary"
            @click="open(null)"
            size="small"
        >新增</el-button>
        <el-popconfirm
            confirm-button-text="是"
            cancel-button-text="否"
            :icon="InfoFilled"
            icon-color="#626AEF"
            title="是否确认删除？"
            @confirm="confirmEvent"
        >
            <template #reference>
                <el-button
                    :icon="Delete"
                    type="danger"
                    size="small"
                >删除</el-button>
            </template>

        </el-popconfirm>
    </div>

    <el-table
        :data="tableData.list"
        type="width: 100%"
    >
        <!-- 选中列表 -->
        <el-table-column
            type="selection"
            width="55"
            @seleced-change="handleSelectionChange"
        />
        <el-table-column
            prop="id"
            label="id"
        />
        <el-table-column
            prop="name"
            label="昵称"
        />
        <el-table-column
            prop="permissionns_id"
            label="所属组别"
        >
            <template #default="scope">
                <el-image
                    style="width: 50px; height:50px;"
                    :src="scope.row.avatar"
                />
            </template>
        </el-table-column>
        <el-table-column
            prop="sex"
            label="性别"
        >
            <template #default="scope">
                <!-- scope.row 拿到当前行的信息 -->
                {{ scope.row.sex === 1 ? '男' : '女' }}
            </template>
        </el-table-column>
        <el-table-column
            prop="mobile"
            label="手机号"
        />
        <el-table-column
            prop="permissionns_id"
            label="所属组别"
        >
            <template #default="scope">
                <el-tag :type="scope.row.active ? 'success' : 'danger'">
                    {{ scope.row.active ? '生效' : '失效' }}
                </el-tag>
            </template>
        </el-table-column>
        <el-table-column label="创建时间">
            <template #default="scope">
                <el-icon>
                    <Clock />
                </el-icon>
                <span style="margin-left:10px">{{ scope.row.create_time }}</span>
            </template>
        </el-table-column>
        <el-table-column label="操作">
            <template #default="scope">
                <el-button
                    type="primary"
                    @click="open(scope.row)"
                >编辑</el-button>
            </template>
        </el-table-column>
    </el-table>
    <div class="pagination-info">
        <el-pagination
            v-model:current-page="paginationData.pageNum"
            :page-size="paginationData.pageSize"
            :background="false"
            size="small"
            layout="total, prev, pager, next"
            :total="tableData.total"
            @size-change="handleSizeChange()"
            @current-change="handleCurrentChange()"
        />
    </div>

    <!-- 陪护师添加弹窗 -->
    <el-dialog
        v-model="dialogFormVisible"
        :before-close="beforeClose"
        title="陪护师添加"
        width="500px"
    >
        <el-form
            ref="formRef"
            label-width="100px"
            label-position="left"
            :model="form"
            :rules="rules"
        >
            <el-form-item
                v-show="false"
                prop="id"
            >
                <el-input v-model="form.id" />
            </el-form-item>
            <el-form-item
                label="昵称"
                prop="name"
            >
                <el-input
                    v-model="form.name"
                    placeholder="请输入昵称"
                />
            </el-form-item>
            <el-form-item
                label="头像"
                prop="avatar"
            >
                <!-- 如果当前头像为空（没有设置有头像），这跳出弹窗选择头像 -->
                <el-button
                    v-if="!form.avatar"
                    type="primary"
                    @click="dialogImgVisible = true"
                >设置头像</el-button>
                <!-- 如果头像存在，显示当前头像地址 -->
                <el-image
                    v-else
                    :src="form.avatar"
                    style="width:100px;height:100px;"
                />
                <!-- 点击重新选择头像 -->
            </el-form-item>
            <el-form-item
                label="性别"
                prop="sex"
            >
                <el-select
                    v-model="form.sex"
                    placeholder="请选择性别"
                >
                    <!-- 性别选择，通过后端请求，男是1，女是2 -->
                    <el-option
                        label="男"
                        value="1"
                    />
                    <el-option
                        label="女"
                        value="2"
                    />
                </el-select>
            </el-form-item>
            <el-form-item
                label="年龄"
                prop="age"
            >
                <el-input-number
                    v-model="form.age"
                    :min="18"
                    :max="50"
                />
            </el-form-item>
            <el-form-item
                label="手机号"
                prop="mobile"
            >
                <el-input
                    v-model="form.mobile"
                    placeholder="请输入手机号"
                />
            </el-form-item>
            <el-form-item
                label="是否生效"
                prop="active"
            >
                <el-radio-group v-model="form.active">
                    <el-radio :value="0">
                        失效
                    </el-radio>
                    <el-radio :value="1">
                        生效
                    </el-radio>
                </el-radio-group>
            </el-form-item>
        </el-form>
        <!-- 弹窗的提交按钮 -->
        <template #footer>
            <div class="dialog-footer">
                <el-button
                    type="primary"
                    @click="confirm(formRef)"
                >确认</el-button>
            </div>
        </template>
    </el-dialog>

    <!-- 头像选择弹窗 -->
    <el-dialog
        v-model="dialogImgVisible"
        :before-close="beforeClose"
        title="选择头像"
        width="680px"
    >
        <div class="image-list">
            <div
                v-for="(item, index) in fileList"
                :key="item.name"
                class="img-box"
                @click="selectItem = index"
            >
                <!-- 判断图片索引是否一样，一样的话添加选中效果 -->
                <div
                    v-if="selectItem === index"
                    class="select"
                >
                    <!-- 勾选的颜色通过color设置为白色 -->
                    <el-icon color="#fff">
                        <Check />
                    </el-icon>
                </div>
                <el-image
                    style="width:148px;height:148px;"
                    :src="item.url"
                />
            </div>
        </div>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogImgVisible = false">
                    取消
                </el-button>
                <el-button
                    type="primary"
                    @click="confirmImg"
                >
                    确认
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { Clock, Delete, Plus } from '@element-plus/icons-vue'
import { photoList, companion, companionList, deleteCompanion } from '../../../api'
import { ElMessage } from 'element-plus'

// 处理弹窗开关的逻辑
const dialogFormVisible = ref(false)

// 处理图片弹窗的逻辑
const dialogImgVisible = ref(false)

const formRef = ref()

const form = reactive({
    id: '',
    // 手机号
    mobile: '',
    // 0:未生效状态 1:生效状态
    active: 1,
    // 年龄默认28岁
    age: 28,
    // 头像
    avatar: '',
    name: '',
    sex: '',
})

// 表单验证规则
const rules = reactive({
    name: [{ required: true, trigger: 'blur', message: '请填写昵称' }],
    avatar: [{ required: true, message: '请选择头像' }],
    age: [{ required: true, trigger: 'change', message: '请选择性别' }],
    // 这里可以参考登录时的正则表达式手机号校验规则
    mobile: [{ required: true, trigger: 'blur', message: '请填写手机号' }],
})

const route = useRoute()

// 接收后端传来的图片
const fileList = ref([])

// 选中的图片上面有个绿色小勾
const selectItem = ref(0)

// 用于存储分页数据
const paginationData = reactive({
    // 当前的页码
    pageNum: 1,
    // 每页显示的数量
    pageSize: 10,
})

// 列表数据
const tableData = reactive({
    list: [],
    total: 0
})

// 存储删除后的陪诊师数据
const selectTableData = ref([])


// ------------------------------------------------------------------

// 挂载完成后，请求图片列表
onMounted(() => {
    photoList().then(({ data }) => {
        // console.log('@@@@@@@@@@@@@@@photoList', data)
        fileList.value = data.data
    })
    getListData()
})

// 点击关闭弹窗
const beforeClose = () => {
    dialogFormVisible.value = false
    formRef.value.resetFields()
}


// 点击确认按钮,同时触发表单校验（异步的方法）
const confirm = async (formRef) => {
    if (!formRef) return
    await formRef.validate((valid, fields) => {
        if (valid) {
            // 调用接口拿到数据
            companion(form).then(({ data }) => {
                if (data.code === 10000) {
                    ElMessage.success('提交成功');
                    // 关闭弹窗,清空表单
                    beforeClose()
                    // 刷新列表
                    getListData()
                } else {
                    ElMessage.error(data.message);
                }
            })
        } else {
            console.log('error submit!!', fields)
        }
    })
}

const open = (rowData = {}) => {
    dialogFormVisible.value = true
    // form表单生成和编辑属于一个异步的过程,当数据回显的时候，需要等待数据回来后，再渲染表单
    nextTick(() => {
        // 如果是编辑，进行数据回显
        if (rowData) {
            Object.assign(form, rowData)
        }

    })
}

// 确认选择头像按钮
const confirmImg = () => {
    // 通过索引得到图片路径
    form.avatar = fileList.value[selectItem.value].url
    // 关闭弹窗
    dialogImgVisible.value = false
}

const getListData = () => {
    companionList(paginationData).then(({ data }) => {
        // 传递参数到后端
        console.log('@@@@@@@@@@@companionList', data)
        const { list, total } = data.data
        tableData.list = list
        tableData.total = total
    })
}

// 选中列表的回调
const handleSelectionChange = () => {

}

// 点击页码的一个回调
const handleSizeChange = (val) => {
    paginationData.pageSize = val
    // 调用列表的接口
    getListData()
}

// 当前页的回调
const handleCurrentChange = (val) => {
    paginationData.pageNum = val.map(item => ({ id: item.id }))
    getListData()

}

// 点击删除按钮的回调
const confirmEvent = () => {
    // 如果说当前选择的数据不存在的话，或者没有选择数据，提示用户选择至少一项
    if (selectTableData.value.length === 0) {
        return ElMessage.error('请选择至少一项数据')
    }
    deleteCompanion({ id: selectTableData.value }).then(({ data }) => {
        // 如果请求成功
        if (data.code === 10000) {
            ElMessage.success('删除成功')
            // 更新列表数据
            getListData()
        }
    })
}

// 点击把删除后的数据传到selectTableData进行存储
const heandleSelectioChange = (val) => {
    selectTableData.value = val
}

</script>

<style lang="less" scoped>
.btns {
    padding: 10px 0 10px 10px;
    background-color: #fff;
}

.image-list {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    .img-box {
        position: relative;

        .select {
            position: absolute;
            left: 0px;
            top: 0px;
            width: 24px;
            height: 24px;
            background-color: #67c23a;
            z-index: 999;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }

    .el-image {
        margin-right: 10px;
        margin-bottom: 10px;
    }
}
</style>
