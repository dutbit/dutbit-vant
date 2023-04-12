<template>
  <van-cell-group inset style="margin-top: 20px">
    <van-field v-model="wishData.name" label="姓名" placeholder="请在此输入姓名~"></van-field>
    <van-field is-link read-only name="titlePicker" label="选择标题" placeholder="在这里选择贺卡标题"
      @click="showTitlePicker = true"></van-field>
    <van-field v-model="wishData.title" label="贺卡标题" placeholder="请选择或填写贺卡标题~" maxlength="6"
      show-word-limit></van-field>
    <van-field is-link read-only name="wishTextPicker" label="选择祝福语" placeholder="在这里选择祝福语"
      @click="showWishTextPicker = true"></van-field>
    <van-field v-model="wishData.wishTexts" label="祝福语" type="textarea" rows="3" autosize maxlength="50"
      placeholder="请选择或者填写祝福语~" show-word-limit></van-field>
    <div class="card-select-text">选择喜欢的贺卡吧！</div>
    <van-swipe style="margin-top: 10px" @change="imageOnChange">
      <van-swipe-item v-for="image in images" :key="image">
        <van-image :src="image"></van-image>
      </van-swipe-item>
    </van-swipe>
  </van-cell-group>
  <van-popup v-model:show="showWishTextPicker" position="bottom">
    <van-picker :columns="wishColumns" @confirm="onWishTextConfirm" @cancel="showWishTextPicker = false" />
  </van-popup>
  <van-popup v-model:show="showTitlePicker" position="bottom">
    <van-picker :columns="titleColumns" @confirm="onTitleConfirm" @cancel="showTitlePicker = false"></van-picker>
  </van-popup>
  <van-row style="margin-top: 10px" align="center" justify="center">
    <van-col :span="8"><van-button type="success" class="gen-button" @click="genMediaCard">生成视频贺卡</van-button></van-col>
  </van-row>
  <van-overlay :show="showMakingOverlay">
    <div class="wrapper">
      <div :class="{ 'block': canDownload, 'loading-block': !canDownload }">
        <van-loading v-show="!canDownload" type="spinner"
          style="display: flex; align-items: center; flex-direction: column; margin-top: 40px;" vertical>
          <span>正在制作,请耐心等待~</span>
          <br />
          <span>预计需要20~60秒</span>
        </van-loading>
        <video class="preview" ref="preview" controls v-show="canDownload" :src="downloadMediaUrl">
        </video>
        <van-row justify="center" style="margin-top: 20px; width: 100%" v-show="canDownload">
          <van-col :span="12" style="display: flex; flex-direction: column; align-items: center;">
            <a style="font-size:larger; width: 100%; text-align: center;" v-show="canDownload"
              :href="downloadMediaUrl">点我下载动态视频</a>
          </van-col>
          <van-col :span="12" style="display: flex; flex-direction: column; align-items: center;">
            <a style="font-size:larger; width: 100%; text-align: center;" v-show="canDownload"
              :href="downloadImageUrl">点我下载静态贺卡</a>
          </van-col>
        </van-row>
        <van-row justify="center" style="margin-top: 10px; width: 100%" v-show="canDownload">
          <van-col :span="12">
            <van-button type="success" class="gen-button"
              @click="showMakingOverlay = false; canDownload = false;">继续制作</van-button>
          </van-col>
        </van-row>
      </div>
    </div>
  </van-overlay>
  <p style="text-align: center; font-size: smaller">
    &copy; 大连理工大学团委
  </p>
</template>

<script>
import axios from 'axios'
import { nanoid } from 'nanoid'
import { ref, reactive, computed, onMounted } from 'vue'
import { showToast, showSuccessToast, showFailToast } from 'vant'
export default {
  name: 'Postcard',
  setup() {
    const baseUrl = axios.defaults.baseURL
    const preview = ref(null)
    let images = ref(['1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png'])
    let canDownload = ref(false)
    let mediaId = ref('')
    let wishData = reactive({
      title: '',
      name: '',
      imgName: '1.png',
      wishTexts: ''
    })
    let showMakingOverlay = ref(false)
    let showTitlePicker = ref(false)
    let showWishTextPicker = ref(false)
    const wishColumns = [
      { text: '旧事翻过往，新春迎新光', value: '旧事翻过往，新春迎新光' },
      { text: '世上的鲜花一定会盛开', value: '世上的鲜花一定会盛开' },
      { text: '美好的事物也一定会接踵而来', value: '美好的事物也一定会接踵而来' },
      { text: '目之所及，万千欢喜', value: '目之所及，万千欢喜' },
      { text: '家人闲坐，灯火可亲', value: '家人闲坐，灯火可亲' },
      { text: '让一路花香满径，让日子安暖自若', value: '让一路花香满径，让日子安暖自若' },
      { text: '山月知我心底事，一岁一礼望顺遂', value: '山月知我心底事，一岁一礼望顺遂' },
    ]
    const titleColumns = [
      { text: '新年快乐', value: '新年快乐' },
      { text: '新年胜旧年', value: '新年胜旧年' },

    ]

    let downloadMediaUrl = computed(() => {
      return `${baseUrl}/media-img/download-media?mediaId=${mediaId.value}`
    })

    let downloadImageUrl = computed(() => {
      return `${baseUrl}/media-img/download-img?mediaId=${mediaId.value}`
    })

    const imageOnChange = (index) => {
      console.log('所选页面', index)
      showToast(`你选择了第 ${index + 1} 张贺卡~`)
      wishData.imgName = `${index + 1}.png`
    }

    const onWishTextConfirm = ({ selectedOptions }) => {
      showWishTextPicker.value = false
      wishData.wishTexts += selectedOptions[0].text
      wishData.wishTexts += '\n'
    }

    const onTitleConfirm = ({ selectedOptions }) => {
      showTitlePicker.value = false
      wishData.title = selectedOptions[0].text
    }

    const genMediaCard = () => {
      showMakingOverlay.value = true
      console.log('尝试启动下载')
      if (wishData.name == '' || wishData.title == '' || wishData.wishTexts == '') {
        console.log(wishData)
        showFailToast('贺卡内容不全,请填写完整~')
        showMakingOverlay.value = false
        return
      }
      if (wishData.imgName == '') {
        wishData.imgName = '1.png'
      }

      axios.post('/media-img/gen-media', {
        title: wishData.title,
        name: wishData.name,
        imgName: wishData.imgName,
        wishTexts: wishData.wishTexts,
        uuid: nanoid(12)
      }).then((res) => {
        console.log('回复', res)
        if (res.data.success) {
          canDownload.value = true
          mediaId.value = res.data.mediaId
          showSuccessToast('制作成功!')
        } else {
          canDownload.value = false
          showFailToast('服务太过火爆，请稍后再试~')
          showMakingOverlay.value = false
        }
      }).catch((e) => {
        showFailToast('服务太过火爆，请稍后再试~')
        showMakingOverlay.value = false
        canDownload.value = false
      })
    }

    onMounted(() => {
      console.log(preview.value)
    })

    return {
      showMakingOverlay,
      showTitlePicker,
      showWishTextPicker,
      titleColumns,
      wishColumns,
      wishData,
      images,
      preview,
      canDownload,
      downloadMediaUrl,
      downloadImageUrl,
      imageOnChange,
      onTitleConfirm,
      onWishTextConfirm,
      genMediaCard
    }
  },
}
</script>

<style scoped>
.card-select-text {
  text-align: center;
  margin-top: 10px;
  font-size: larger;
  font-style: italic;
  font-weight: bold;
  color: rgb(240, 50, 63)
}

.gen-button {
  font-weight: bold;
  font-size: 15px;
  width: 100%;
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 80vw;
  height: 80vw;
  border-radius: 15px;
  background-color: #fff;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.loading-block {
  width: 35vw;
  height: 35vw;
  border-radius: 15px;
  background-color: #fff;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.preview {
  width: 100%;
  margin-top: 10px;
}
</style>