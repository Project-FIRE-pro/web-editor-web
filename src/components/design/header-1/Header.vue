<template>
    <section>
        <div class="header">
            <div class="brand">
                <div class="img-box">
                    <img
                        :src="(findByKey(props.data, ['LogoBlock', 'LogoImg']) as string)"
                        alt=""
                    >
                </div>
            </div>
            <div
                class="toggle-btn"
                @click="openMenu = !openMenu"
                :class="{ show: openMenu }"
            >
                <div class="line top-line"></div>
                <div class="line center-line"></div>
                <div class="line bottom-line"></div>
            </div>
            <div
                class="nav"
                :class="{ show: openMenu }"
            >
                <div class="nav-menu">
                    <template v-for="item in (findByKey(props.data, ['navbarBlock']) as any) ">
                        <a
                            class="item"
                            :href="(findByKey(item, ['LinkBtn']) as string)"
                        >{{ (findByKey(item, ['LinkText']) as string) }}</a>

                    </template>

                </div>
            </div>
            <div class="social">
                <div
                    class="item"
                    v-for="(item, index) in social"
                ></div>
            </div>
        </div>
    </section>
    <!-- 資料預覽從這邊開始(解開註解就可以看) -->
    <!-- <div>
        {{ props.data }}
    </div> -->
    <!-- 資料預覽從這邊結束 -->

</template>
<script  lang="ts">
const componentId = '9FzVmgXO8iBqzQqEEvLR'
export default { componentId }
import { cloneDeep, find, isArray, isString } from 'lodash';
import { ref } from 'vue';
</script>

<script setup lang="ts">
type DatumType = {
    isLoop?: boolean,
    key: string,
    value: string | Array<DatumType> | Array<Array<DatumType>>
}
interface Props {
    data?: Array<DatumType>
}
const props = withDefaults(defineProps<Props>(), {
    data: () =>
        // 將Data匯入這裡 - 開始
        [
            {
                "isLoop": false,
                "key": "LogoBlock",
                "value": [
                    {
                        "key": "LogoImg",
                        "value": ""
                    }
                ]
            },
            {
                "isLoop": true,
                "key": "navbarBlock",
                "value": [
                    [
                        {
                            "key": "LinkBtn",
                            "value": ""
                        },
                        {
                            "key": "LinkText",
                            "value": ""
                        }
                    ]
                ]
            }
        ]
    // 將Data匯入這裡 - 結束
})
const findByKey = (data: Array<DatumType> | string, keys: Array<string>) => {
    if (isString(data)) return data;
    let _data = cloneDeep(data)
    let lastdata = cloneDeep(data)
    while (keys.length > 0 && _data != void 0) {
        lastdata = cloneDeep(_data)
        const key = keys.shift()
        _data = find(_data, ['key', key])?.value as any
        console.log(_data);
    }
    if (_data != void 0) {
        lastdata = _data
    }
    if (isArray(lastdata)) {
        return lastdata as unknown as Array<Array<DatumType>>
    } else {
        return lastdata as string
    }

}
// 元件script - 開始
const openMenu = ref(false)
const logoUrl = ""
const navItems = [
    {
        name: 'Home',
        link: ''
    },
    {
        name: 'About',
        link: ''
    },
    {
        name: 'News',
        link: ''
    },
    {
        name: 'Product',
        link: ''
    },
    {
        name: 'Blog',
        link: ''
    }
]
const social = [
    {
        name: 'facebook',
        url: '',
        link: ''
    },
    {
        name: 'instagram',
        url: '',
        link: ''
    },
    {
        name: 'twitter',
        url: '',
        link: ''
    },
]

</script>

<style scoped lang="sass">
.header
  background-color: #000
  display: flex
  align-items: center
  justify-content: space-between
  position: sticky
  width: 100%
  z-index: 9999
  padding: 15px
  box-shadow: 0px 2px 6px 1px rgba(0,0,0,0.5)
  .brand
    width: 105px
    display: flex
    .img-box
      height: 30px
      width: 30px
      background-color: #fff
      border-radius: 2px
  .toggle-btn
    height: 34px
    width: 28px
    border-radius: 3px
    justify-content: space-between
    align-items: center
    flex-direction: column
    padding: 7px 6px
    display: none
    position: relative
    .line
      border-top: solid 3px #fff
      width: 100%
      position: absolute
      transform-origin: center
      transition-duration: .5s
      opacity: 1
  .toggle-btn.show
    .top-line
      top: 15px
      transform: rotate(45deg)
    .center-line
      opacity: 0
    .bottom-line
      top: 15px
      transform: rotate(-45deg)
  .toggle-btn:not(.show)
    .top-line
      top: 6px
    .center-line
      top: 15px
    .bottom-line
      top: 24px
  .nav
    .nav-menu
      display: flex
      color: #fff
      font-weight: 900
      justify-content: center
      align-items: center
      .item
        margin: 0px 20px 
        font-size: 20px
  .social
    display: flex
    .item
      border: solid 2px #fff
      width: 25px
      height: 25px
      color: #fff
      margin: 0px 5px
      border-radius: 30px

@media (max-width: 992px)
  .header
    flex-wrap: wrap
    justify-content: space-between
    .toggle-btn
      display: flex
    .nav
      width: 100%
      overflow: hidden
      transition-duration: .5s
      display: flex
      justify-content: center
      align-items: center
      height: calc(100vh - 60px)
      .nav-menu
        flex-direction: column
        .item
          margin: 20px
    .nav:not(.show)
      height: 0
    .social
      display: none
    
</style>