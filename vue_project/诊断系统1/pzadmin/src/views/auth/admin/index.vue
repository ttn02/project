<template>
    <panel-head :route="route" />
    <el-table
        :data="tableData.list"
        type="width: 100%"
    >
        <el-table-column
            prop="id"
            label="id"
        />
        <el-table-column
            prop="name"
            label="昵称"
        />
        <el-table-column
            prop="permissions_id"
            label="所属组别"
        >
            <!-- 通过插槽获取当前行数据 -->
            <template #default="scope">
                {{ permissionName(scope.row.permissions_id) }}
            </template>
        </el-table-column>
        <el-table-column
            prop="mobile"
            label="手机号"
        />
        <el-table-column
            prop="active"
            label="状态"
        >
            <!-- 通过插槽获取当前行数据 -->
            <template #default="scope">
                <!-- 通过element组件显示状态,如果状态存在则显示正常，否则显示异常 -->
                <el-tag
                    class="ml-2"
                    :type="scope.row.active ? 'success' : 'danger'"
                >{{ scope.row.active ? '正常' : '异常' }}</el-tag>

            </template>
        </el-table-column>
        <el-table-column label="创建时间">
            <!-- 通过插槽获取当前行数据 -->
            <template #default="scope">
                <div class="flex-box">
                    <el-icon>
                        <Clock />
                    </el-icon>
                    <span style="margin-left: 10px">{{ scope.row.create_time }}</span>
                </div>
            </template>
        </el-table-column>
        <el-table-column label="操作">
            <!-- 通过插槽的方式，自定义列里面的内容 -->
            <template #default="scope">
                <el-button
                    type="primary"
                    @click="open(scope.row)"
                >操作</el-button>
            </template>
        </el-table-column>
    </el-table>
    <!-- 底部分页逻辑 -->
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
    <!-- 弹窗设置，对应group.vue里面设置 -->
    <el-dialog
        v-model="dialogFormVisible"
        :before-close="beforeClose"
        title="添加权限"
        width="500"
    >
        <el-form
            ref="formRef"
            label-width="100px"
            label-position="left"
            :model="form"
            :rules="rules"
        >
            <el-form-item
                label="手机号"
                prop='mobile'
            >
                <el-input
                    v-model="form.mobile"
                    disabled
                />
            </el-form-item>
            <el-form-item
                label="昵称"
                prop='name'
            >
                <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item
                label="菜单权限"
                prop='permissions_id'
            >
                <el-select
                    v-model="form.permissions_id"
                    placeholder="请选择菜单权限列表"
                    style="width: 240px"
                >
                    <el-option
                        v-for="item in options"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                    />
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button
                    type="primary"
                    @click="confirm(formRef)"
                >
                    确认
                </el-button>
            </div>
        </template>
    </el-dialog>

</template>

<script setup>
// 该接口需要传入pageNum和pageSize参数,同时需要携带token
import { authAdmin, menuSelectList, updateUser } from '../../../api'
import { ref, reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'
// 引入处理时间戳的插件
import dayjs from 'dayjs'


// 变量的定义----------------------------------------------
// 用于存储分页数据
const paginationData = reactive({
    // 当前的页码
    pageNum: 1,
    // 每页显示的数量
    pageSize: 10,
})

// 用于动态存储下拉列表传递过来的数据
const options = ref([

])

// 列表数据
const tableData = reactive({
    list: [],
    total: 0
})

// 弹窗的状态
const dialogFormVisible = ref(false)

// 弹窗的表单数据
const form = reactive({
    name: '',
    permissions_id: '',
})

// 拿到表单的方法
const formRef = ref()

// 表单校验规则
const rules = reactive({
    name: [{ required: true, message: '请填写昵称', trigger: 'blur' }],
    permissions_id: [{ required: true, message: '请选择菜单权限', trigger: 'blur' }]
})

// 拿到当前路由实例
const route = useRoute()

// 方法和函数----------------------------------------------------
onMounted(() => {
    getListData()
    menuSelectList().then(({ data }) => {
        // 从后端请求数据
        console.log('@@@@@@@@@@@menuSelectList', data)
        // 将后端传来的数据，动态的添加到下拉列表中
        options.value = data.data
    })
})

// 通过permissionName，传入一个id,根据id匹配权限名称
const permissionName = (id) => {
    // 通过find方法，在options数组中找到id对应的权限名称，通过当前的id（el.id）和传入的id进行比较
    const data = options.value.find(el => el.id === id)
    // 判断如果存在则返回内容，如果不存在（如刚开始定义没有数据）返回超级管理员，不存在默认显示超级管理员
    return data ? data.name : '超级管理员'
}

// 点击操作事件
const open = (rowData) => {
    dialogFormVisible.value = true
    Object.assign(form, { mobile: rowData.mobile, name: rowData.name, permissions_id: rowData.permissions_id })
}

// 点击页码的一个回调
const handleSizeChange = (val) => {
    paginationData.pageSize = val
    // 调用列表的接口
    getListData()
}

// 当前页的回调
const handleCurrentChange = (val) => {
    paginationData.pageNum = val
    getListData()

}

// 关闭弹窗的方法
const beforeClose = () => {
    dialogFormVisible.value = false
}

// 请求列表的封装
const getListData = () => {
    authAdmin(paginationData).then(({ data }) => {
        // 传递参数到后端
        // console.log('@@@@@@@@@@@authAdmin', data)
        const { list, total } = data.data
        // 格式化时间戳
        list.forEach(item => {
            item.create_time = dayjs(item.create_time).format('YYYY-MM-DD')
        })
        tableData.list = list
        tableData.total = total
    })
}

// 表单提交,会有一个校验的逻辑，用异步的方法实现
const confirm = async (formRef) => {
    // 表单元素存在且校验通过则提交表单,不通过打印错误信息
    if (!formRef) return
    await formRef.validate((valid, fields) => {
        if (valid) {
            const { name, permissions_id } = form
            updateUser({ name, permissions_id }).then(({ data }) => {
                if (data.code === 10000) {
                    dialogFormVisible.value = false
                    // 提交完成后调用请求列表的接口
                    getListData()
                }
            })
        } else {
            console.log('error submit!!', fields)
        }
    })

}
</script>

<style lang="less" scoped>
.flex-box {
    display: flex;
    align-items: center;

}
</style>
