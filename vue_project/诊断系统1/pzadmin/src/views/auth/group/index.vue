<template>
    <!-- 使用在main.js中全局配置的PanelHead组件(写成小驼峰和单标签) -->
    <panel-head />
    <div class="btns">
        <el-button
            :icon="Plus"
            type="primary"
            @click="open(null)"
            size="small"
        >新增</el-button>
    </div>
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
            prop="permissionName"
            label="菜单权限"
            width="500px"
        />
        <el-table-column label="操作">
            <!-- 通过插槽的方式，自定义列里面的内容 -->
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
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        />
    </div>

    <el-dialog
        v-model="dialogFormvisible"
        :before-close="beforeClose"
        title="添加权限"
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
                label="名称"
                prop='name'
            >
                <el-input
                    v-model="form.name"
                    placeholder="请填写权限名称"
                />
            </el-form-item>
            <el-form-item
                label="权限"
                prop='permissions'
            >
                <el-tree
                    ref="treeRef"
                    :data="permissionData"
                    style="max-width:600px"
                    node-key="id"
                    show-checkbox
                    :default-checked-keys="defaultKeys"
                    :default-expanded-keys="[2]"
                />
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
import { ref, reactive, onMounted, nextTick } from 'vue'
import { userGetMenu, userSetMenu, menuList } from '../../../api'
import { Plus } from '@element-plus/icons-vue'

// 树形菜单权限数据
const permissionData = ref([])
// 挂起时调用后端接口，获取树形菜单权限数据
onMounted(() => {
    userGetMenu().then(({ data }) => {
        console.log('@@@@@@@@@@userGetMenu', data)
        // 拿到数据后直接通过:data="permissionData"绑定到tree上
        permissionData.value = data.data
    })
    // 打印获取数据
    getListData()
})


// 请求列表数据，属于复用的一个流程包装起来,哪里需要哪里搬
const getListData = () => {
    menuList(paginationData).then(({ data }) => {
        // console.log('@@@@@@@@@@@menuList', data)
        const { list, total } = data.data
        tableData.list = list
        tableData.total = total
    })
}

// 初始弹窗状态为关闭
const dialogFormvisible = ref(false)

// 表单数据
const form = reactive({
    name: '',
    permissions: '',
    // 新增数据可以不传id
    id: ''
})

// 获取当前form表单组件的实例
const formRef = ref()

// 默认选中权限,这里的4对应账号管理，5对应菜单管理
const defaultKeys = [4, 5]

// 获取当前tree组件的实例
const treeRef = ref()

// 点击关闭弹窗的回调
const beforeClose = () => {
    dialogFormvisible.value = false
    // 关闭弹窗需要重置表单的数据
    formRef.value.resetFields()
    // 重置默认选中权限
    treeRef.value.setCheckedKeys(defaultKeys)
}

// 表单校验配合:rules="rules"在el-form组件上使用
const rules = reactive({
    name: [{ required: true, trigger: 'blur', message: '请输入权限名称' }]
})

// 确认按钮点击事件(表单提交事件和表单校验)，新增项和编辑项
const confirm = async (formRef) => {
    console.log('@@@@@@@@@@@@formRef', formRef)
    // 设计流程和登录时的表单校验一致
    if (!formRef) return
    await formRef.validate((valid, fields) => {
        if (valid) {
            // 使用treeRef的组件实例，获取到选择的checkbox数据
            const permissions = JSON.stringify(treeRef.value.getCheckedKeys())
            userSetMenu({ name: form.name, permissions, id: form.id }).then(({ data }) => {
                // console.log('@@@@@@@@@@@@@userSetMenu', data)
                // 提交数据之后关闭弹窗
                beforeClose()
                // 同时刷新列表，显示新添的数据
                getListData()
            })
        } else {
            console.log('error submit!!', fields)
        }
    })

}

// 打开弹窗,如果是新增则不需要传递数据
// 给一个形参，默认没传的话给一个空对象
const open = (rowData = {}) => {
    // 打开弹窗
    dialogFormvisible.value = true
    // 如果rowData有数据，则给当前form表单进行赋值，但是弹窗打开form生成是异步的，不能直接进行赋值
    nextTick(() => {
        if (rowData) {
            Object.assign(form, { id: rowData.id, name: rowData.name })
            treeRef.value.setCheckedKeys(rowData.permission)
        }
    })
}

// 列表数据
const tableData = reactive({
    list: [],
    total: 0
})

// 分页数据，主要用于el-pagination组件的分页功能
const paginationData = reactive({
    // 当前的页码
    pageNum: 1,
    // 每页显示的数量
    pageSize: 10,
})

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

</script>

<style lang="less" scoped>
.btns {
    padding: 10px;
    background-color: #fff;
}
</style>
