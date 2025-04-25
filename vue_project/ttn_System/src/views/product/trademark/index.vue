<template>
  <el-card class="box-card">
    <!-- 添加品牌 -->
    <el-button
      type="primary"
      size="default"
      icon="Plus"
      @click="addTradeMark"
      v-has="`btn.Trademark.add`"
    >
      添加品牌
    </el-button>
    <!-- 品牌列表 -->
    <el-table
      style="margin: 10px 0"
      border
      :data="tradeMarkArr"
    >
      <!-- type="" 这里的值为index为该行索引 selection为复选框 expand为展开行 -->
      <el-table-column
        label="序号"
        width="80px"
        align="center"
        type="index"
      ></el-table-column>
      <el-table-column
        label="品牌名称"
        prop="tmName"
      ></el-table-column>
      <el-table-column label="品牌LOGO">
        <!-- row回传的是一个当前行的数据对象，插槽里面默认是div可以用自定义插槽改为img -->
        <template #="{ row, $index }">
          <img
            :src="row.logoUrl"
            alt="图片丢失了~"
            style="width: 100px; height: 100px"
          />
        </template>
      </el-table-column>
      <el-table-column label="品牌操作">
        <!-- 修改按钮 -->
        <template #="{ row, $index }">
          <el-button
            type="primary"
            size="small"
            icon="Edit"
            @click="updateTradeMark(row)"
          ></el-button>
          <!-- 删除按钮 -->
          <el-popconfirm
            :title="`您确定删除${row.tmName}`"
            width="250px"
            icon="delete"
            @confirm="removeTradeMark(row.id)"
          >
            <template #reference>
              <el-button
                type="danger"
                size="small"
                icon="Delete"
              ></el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页器组件 -->
    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="limit"
      :page-sizes="[3, 5, 7, 9]"
      :background="true"
      layout="prev, pager, next, jumper, ->, sizes, total"
      :total="total"
      @current-change="getHasTradeMark"
      @size-change="sizeChange"
    />
  </el-card>

  <!-- 弹窗组件 -->
  <el-dialog
    v-model="dialogFormVisible"
    :title="trademarkParams.id ? '修改品牌' : '添加品牌'"
  >
    <el-form
      style="width: 90%"
      :model="trademarkParams"
      :rules="rules"
      ref="formRef"
    >
      <el-form-item
        label="品牌名称"
        label-width="100px"
        prop="tmName"
      >
        <el-input
          placeholder="请您输入品牌名称"
          v-model="trademarkParams.tmName"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="品牌Logo"
        label-width="100px"
        prop="logoUrl"
      >
        <el-upload
          class="avatar-uploader"
          action="/api/admin/product/fileUpload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img
            v-if="trademarkParams.logoUrl"
            :src="trademarkParams.logoUrl"
            class="avatar"
          />
          <el-icon
            v-else
            class="avatar-uploader-icon"
          >
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button
        type="primary"
        size="default"
        @click="cancel"
      >取消</el-button>
      <el-button
        type="primary"
        size="default"
        @click="confirm"
      >确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, nextTick } from 'vue'
import {
  reqHasTradeMark,
  reqAddOrUpdateTrademark,
  reqDeleteTrademark,
} from '@/api/product/trademark'
import type {
  Records,
  TradeMark,
  TradeMarkResponseData,
} from '@/api/product/trademark/type'
import { UploadProps } from 'element-plus/es/components/upload/src/upload'

// 当前页
let pageNo = ref<number>(1)
// 每页显示的条数
let limit = ref<number>(3)
// 数据总条数
let total = ref<number>(0)
// 控制对话框显示和隐藏
let dialogFormVisible = ref<boolean>(false)
// 已有品牌的数组
let tradeMarkArr = ref<Records>([])
// 品牌名字和图片地址
let trademarkParams = reactive<TradeMark>({
  tmName: '',
  logoUrl: '',
})
let formRef = ref()

// 获取已有品牌的接口封装为一个函数
const getHasTradeMark = async (pager = 1) => {
  // 没有传参数，默认页码为1
  // 页码发生变化时，回到第一页
  pageNo.value = pager
  let res: TradeMarkResponseData = await reqHasTradeMark(
    pageNo.value,
    limit.value,
  )
  if (res.code === 200) {
    total.value = res.data.total
    tradeMarkArr.value = res.data.records
  }
}

onMounted(() => {
  // 组件挂载发一次请求 获取第一页三个已有品牌的数据数据
  getHasTradeMark()
})

const sizeChange = () => {
  // 点击 最大页数尺寸发生变化时，重新获取数据
  getHasTradeMark()
}

// 添加品牌，弹出对话框
const addTradeMark = () => {
  dialogFormVisible.value = true
  trademarkParams.id = 0
  trademarkParams.tmName = ''
  trademarkParams.logoUrl = ''

  nextTick(() => {
    formRef.value.clearValidate('tmName')
    formRef.value.clearValidate('logoUrl')
  })
}
// 修改品牌，弹出对话框
const updateTradeMark = (row: TradeMark) => {
  nextTick(() => {
    formRef.value.clearValidate('tmName')
    formRef.value.clearValidate('logoUrl')
  })
  dialogFormVisible.value = true
  Object.assign(trademarkParams, row)
}

// 关闭按钮
const cancel = () => {
  dialogFormVisible.value = false
}
// 确定按钮
const confirm = async () => {
  await formRef.value.validate()

  let res = await reqAddOrUpdateTrademark(trademarkParams)
  if (res.code === 200) {
    dialogFormVisible.value = false
    ElMessage({
      type: 'success',
      message: trademarkParams.id ? '修改品牌成功' : '添加品牌成功',
    })
    getHasTradeMark(trademarkParams.id ? pageNo.value : 1)
  } else {
    ElMessage({
      type: 'error',
      message: trademarkParams.id ? '修改品牌失败' : '添加品牌失败',
    })
  }
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (
    rawFile.type === 'image/png' ||
    rawFile.type === 'image/jpeg' ||
    rawFile.type === 'image/gif'
  ) {
    if (rawFile.size / 1024 / 1024 < 4) {
      return true
    } else {
      ElMessage({
        type: 'error',
        message: '上传的文件大小应小于4M',
      })
    }
  } else {
    ElMessage({
      type: 'error',
      message: '上传的文件类型必须是PNG|JPG|GIF',
    })
    return false
  }
}

const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile,
) => {
  trademarkParams.logoUrl = response.data
  formRef.value.clearValidate('logoUrl')
}

const validatorTmName = (rule: any, value: any, callBack: any) => {
  if (value.trim().length >= 2) {
    callBack()
  } else {
    callBack(new Error('品牌名称位数大于等于两位'))
  }
}

const validatorLogoUrl = (rule: any, value: any, callBack: any) => {
  if (value) {
    callBack()
  } else {
    callBack(new Error('Logo的图片务必上传'))
  }
}

const rules = {
  tmName: [
    {
      required: true,
      trigger: 'blur',
      validator: validatorTmName,
    },
  ],
  logoUrl: [
    {
      required: true,
      trigger: 'change',
      validator: validatorLogoUrl,
    },
  ],
}

// 删除品牌
const removeTradeMark = async (id: number) => {
  let res = await reqDeleteTrademark(id)

  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除品牌成功',
    })
    //再次获取已有的品牌数据
    getHasTradeMark(
      tradeMarkArr.value.length > 1 ? pageNo.value : pageNo.value - 1,
    )
  } else {
    ElMessage({
      type: 'error',
      message: '删除品牌失败',
    })
  }
}
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
