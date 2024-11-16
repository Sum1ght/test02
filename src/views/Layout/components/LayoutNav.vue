<script setup>
import { useUserStore } from '@/stores/userStore';
import { useCartStore } from '@/stores/cartStore';
import { useRouter } from 'vue-router';

// 获取全局状态
const userStore = useUserStore()
const cartStore = useCartStore()
//退出登录
//!router必须在组件最顶层定义，以保证在组件的整个生命周期都能用，不然会无法跳转并报错Uncaught TypeError: Cannot read properties of undefined (reading 'push')
const router = useRouter()
const logOut = () => {
    // 执行清除用户信息的action
    userStore.clearUser()
    // 执行清除购物车的action
    cartStore.clearCart();
    router.push('/login')
}
</script>

<template>
    <nav class="app-topnav">
        <div class="container">
            <ul>
                <!-- 单if-else控制正反两套模板 -->
                <template v-if="userStore.userData.token">
                    <li><a href="javascript:;"><i class="iconfont icon-user">{{ userStore.userData.account }}</i></a>
                    </li>
                    <li>
                        <!-- 点击后弹出确认提示 防误触 -->
                        <el-popconfirm title="确认退出吗?" confirm-button-text="确认" cancel-button-text="取消"
                            @confirm="logOut">
                            <template #reference>
                                <a href="javascript:;">退出登录</a>
                            </template>
                        </el-popconfirm>
                    </li>
                    <li><a href="javascript:;">我的订单</a></li>
                    <li><RouterLink to="/member">会员中心</RouterLink></li>
                </template>
                <template v-else>
                    <li><a href="javascript:;" @click="$router.push('/login')">请先登录</a></li>
                    <li><a href="javascript:;">帮助中心</a></li>
                    <li><a href="javascript:;">关于我们</a></li>
                </template>
            </ul>
        </div>
    </nav>
</template>


<style scoped lang="scss">
.app-topnav {
    //背景放外层，通过继承传递给子选择器
    background: #333;

    ul {
        display: flex;
        height: 55px;
        //主轴，一般是行
        justify-content: flex-end;
        //副轴，一般是列
        align-items: center;

        li {

            //包括图标在内的链接整体 可以点击的部分 哪怕没有碰到文字说明本身
            a {
                padding: 5px 15px;
                color: #cdcdcd;
                line-height: 1;
                display: inline-block;

                //引入的字体图标
                i {
                    font-size: 14px;
                    margin-right: 2px;
                }

                //鼠标悬浮
                &:hover {
                    color: $xtxColor;
                }
            }

            //这个跟a没关系 两者彼此独立 它实际上从属于父级的li li~li 表示li后面的所有li 
            ~li {
                a {
                    border-left: 2px solid #666;
                }
            }
        }
    }
}
</style>