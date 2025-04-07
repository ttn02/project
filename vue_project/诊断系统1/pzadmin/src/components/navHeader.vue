<template>
    <div class="header-container">
        <div class="header-left flex-box">
            <el-icon
                class="icon"
                size="25"
                @click="store.commit('collapseMenu')"
            >
                <Fold />
            </el-icon>
            <ul class="flex-box">
                <li
                    v-for="(item, index) in selectMenu"
                    :key="item.path"
                    :class="{ selected: route.path === item.path }"
                    class="tab flex-box"
                >
                    <!-- 便利meta里面的图标，用component标签渲染出来 -->
                    <el-icon size="15">
                        <component :is="item.icon" />

                    </el-icon>
                    <router-link
                        class="text flex-box"
                        :to="{ path: item.path }"
                    >
                        {{ item.name }}
                    </router-link>

                    <!-- 关闭按钮 -->
                    <el-icon
                        class="close"
                        size="15"
                        @click="closeTab(item, index)"
                    >
                        <Close />
                    </el-icon>
                </li>
            </ul>
        </div>
        <div class="header-right">
            <el-dropdown>
                <div class="el-droopdown-link flex-box">
                    <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
                    <p class="user-name">TTN</p>
                </div>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>Action 1</el-dropdown-item>
                        <el-dropdown-item>Action 2</el-dropdown-item>
                        <el-dropdown-item>Action 3</el-dropdown-item>
                        <el-dropdown-item disabled>Action 4</el-dropdown-item>
                        <el-dropdown-item divided>Action 5</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>

    </div>
</template>
<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router'

// 拿到store实例
const store = useStore()

// 通过useRoute获取当前路由
const route = useRoute()
// 通过useRouter获取路由实例
const router = useRouter()

//  通过计算属性
const selectMenu = computed(() => store.state.menu.selectMenu)

// 点击关闭tab标签页
const closeTab = (item, index) => {
    // 删除当前的tab
    // console.log('@@@@@@@@@@@@@', item)
    store.commit('closeMenu', item)
    // 如果删除的是非当前页tab,不做任何处理
    if (route.path !== item.path) {
        return
    }
    // 计算属性返回的是一个ref对象，需要用value获取
    const selectMenuData = selectMenu.value
    // console.log('selectMenuData@@@@@@@@@@@@@@@', selectMenuData)
    // console.log('selectMenuData.length@@@@@@@@@@@@@@@', selectMenuData.length)
    // console.loog('index@@@@@@@@@@@@@@@@', index)
    // 如果删除的是最后一项(当前索引等于selectMenu的长度)
    if (index === selectMenuData.length) {
        // 如果tag只有一个元素（最后一个等于第一个的时候进行删除），则会回到首页
        if (!selectMenuData.length) {
            // 跳转根路径
            router.push('/')
        } else {
            // 如果删除的是最后页tab且不是第一位，则当前索引往前进一位
            router.push({
                path: selectMenuData[index - 1].path
            })
        }
    } else {
        // 如果删除的是中间页tab，则当前索引往后进一位
        router.push({
            path: selectMenuData[index].path
        })
    }
}

</script>
<style scoped>
.flex-box {
    display: flex;
    align-items: center;
    height: 100%;
}

.header-container {
    display: flex;
    /* 第一个子元素靠左对齐。 最后一个子元素靠右对齐。 剩余子元素​​均匀分布​​在两者之间 */
    justify-content: space-between;
    /* 水平方向居中 */
    align-items: center;
    height: 100%;
    background-color: #fff;
    padding-right: 25px;

    .header-left {
        display: flex;
        align-items: center;
        height: 100%;

        .icon {
            width: 45px;
            height: 100%;
        }

        /* 鼠标悬停时，背景颜色变为 #f5f5f5，鼠标指针变为 pointer。 */
        .icon:hover {
            background-color: #f5f5f5;
            cursor: pointer;
        }

        /* 设置il的样式，使其垂直居中。 */
        .tab {
            padding: 0 10px;
            height: 100%;

            .text {
                margin: 0 5px;
            }

            .close {
                visibility: hidden;
            }

            /* 这里&与当前元素tab同级 */
            &.selected {
                a {
                    color: #409eff;
                }

                i {
                    color: #409eff;
                }

                background-color: #f5f5f5;
            }
        }

        .tab:hover {
            background-color: #f5f5f5;

            .close {
                visibility: inherit;
                cursor: pointer;
                color: #333;
            }
        }
    }

    .header-right {
        .user-name {
            margin-left: 10px;
        }
    }


    a {
        height: 100%;
        color: #333;
        font-size: 15px;
    }

}
</style>