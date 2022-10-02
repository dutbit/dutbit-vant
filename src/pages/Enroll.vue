<template>
    <van-notice-bar scrollable :text="noticeText" left-icon="volume-o"></van-notice-bar>
    <van-form @submit="onSubmit">
        <van-cell-group inset>
            <van-field v-model="signupForm.name" name="name" label="姓名" placeholder="请输入姓名"
                :rules="[{ required: true, message: '请输入姓名' }]" />
            <van-field v-model="signupForm.stuId" name="stuId" label="学号" type="digit" placeholder="请输入学号"
                :rules="[{ pattern: stuIdPattern, message: '请输入正确的学号' }]" />
            <van-field name="sex" label="性别">
                <template #input>
                    <van-radio-group v-model="signupForm.sex" direction="horizontal">
                        <van-radio name="男">男</van-radio>
                        <van-radio name="女">女</van-radio>
                    </van-radio-group>
                </template>
            </van-field>
            <van-field v-model="signupForm.faculty" is-link readonly name="faculty" label="学院" placeholder="点击以选择学院"
                @click="showFacultyPicker = true" />
            <van-popup v-model:show="showFacultyPicker" position="bottom">
                <van-picker :columns="faculties" @confirm="onConfirmFaculty" @cancel="showFacultyPicker = false" />
            </van-popup>
            <van-field v-model="signupForm.tel" name="tel" label="手机号" type="tel" placeholder="请输入手机号"
                :rules="[{ pattern: telPattern, message: '请输入正确的手机号' }]" />
            <van-field v-model="signupForm.firstChoice" is-link readonly name="firstChoice" label="第一志愿"
                placeholder="请选择第一个申报部门" @click="firstChoiceHandler" />
            <van-popup v-model:show="showFirstChoicePicker" position="bottom">
                <van-picker :columns="depts.data" @confirm="onConfirmFirstChoice"
                    @cancel="showFirstChoicePicker = false" />
            </van-popup>
            <van-field v-model="signupForm.secondChoice" is-link readonly name="secondChoice" label="第二志愿"
                placeholder="请选择第二个申报部门" @click="secondChoiceHandler" />
            <van-popup v-model:show="showSecondChoicePicker" position="bottom">
                <van-picker :columns="depts.data" @confirm="onConfirmSecondChoice"
                    @cancel="showSecondChoicePicker = false" />
            </van-popup>
            <van-field v-model="signupForm.thirdChoice" is-link readonly name="thirdChoice" label="第三志愿"
                placeholder="请选择第三个申报部门" @click="thirdChoiceHandler" />
            <van-popup v-model:show="showThirdChoicePicker" position="bottom">
                <van-picker :columns="depts.data" @confirm="onConfirmThirdChoice"
                    @cancel="showThirdChoicePicker = false" />
            </van-popup>
            <van-field name="allowAdjust" label="服从调剂">
                <template #input>
                    <van-checkbox v-model="signupForm.allowAdjust" shape="square" />
                </template>
            </van-field>
            <van-field v-model="signupForm.info" rows="1" autosize label="个人简历" type="textarea"
                placeholder="特长、社会工作经历等" />
        </van-cell-group>
        <div style="margin: 16px">
            <van-button round block type="primary" native-type="submit">
                提交
            </van-button>
        </div>
    </van-form>
    <p style="text-align: center; font-size: smaller">
        &copy; 大连理工大学团委
    </p>
</template>
  
<script>
import { Dialog, Notify } from 'vant'
import 'vant/es/dialog/style'
import 'vant/es/notify/style'
import axios from 'axios'
import { reactive, ref } from 'vue'

export default {
    name: 'Enroll',
    setup() {
        let signupForm = reactive({
            name: '',
            stuId: '',
            sex: '',
            faculty: '',
            tel: '',
            firstChoice: '',
            secondChoice: '',
            thirdChoice: '',
            allowAdjust: true,
            info: '',
        })
        let noticeText = ref('')
        let currentTurn = reactive({ id: null, turnName: null, activated: null }) //当前报名批次的id和名称
        let faculties = reactive([
            '电子信息与电气工程学部',
            '建设工程学部',
            '人文与社会科学学部',
            '运载工程与力学学部',
            '材料科学与工程学院',
            '光电工程与仪器科学学院',
            '化工学院',
            '环境学院',
            '机械工程学院',
            '建筑与艺术学院',
            '经济管理学院',
            '能源与动力学院',
            '生物工程学院',
            '数学科学学院',
            '外国语学院',
            '物理学院',
            '张大煜学院',
            '大连理工大学白俄罗斯国立大学联合学院',
        ])
        let depts = reactive({ data: [] })
        axios
            .get('/enroll/getTurns')
            .then((response) => {
                const turns = response.data.turns.filter((p) => {
                    if (p.activated) {
                        return p
                    }
                })
                if (turns.length == 0) {
                    noticeText.value = '很遗憾，现在并不在报名时间内'
                    Notify({ type: 'danger', message: '不在报名时间内' })
                } else {
                    let turn = turns[0]
                    currentTurn.id = turn.id
                    currentTurn.activated = turn.activated
                    currentTurn.turnName = turn.turnName
                    noticeText.value =
                        '欢迎报名连理young媒体融合中心! 当前报名批次:' +
                        currentTurn.turnName
                }
            })
            .catch(() => {
                Notify({ type: 'danger', message: '无法获取报名批次，请联系管理员' })
            })
        axios
            .get('/enroll/getDepts')
            .then((response) => {
                depts.data = response.data.depts.map((p) => {
                    return p.deptName
                })
            })
            .catch(() => {
                Notify({ type: 'danger', message: '无法获取部门名单，请联系管理员' })
            })

        let showFacultyPicker = ref(false)
        let showFirstChoicePicker = ref(false)
        let showSecondChoicePicker = ref(false)
        let showThirdChoicePicker = ref(false)

        const stuIdPattern = /^\d{8,11}$/
        // 注意！正则表达式中不要加入空格！！
        const telPattern =
            /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/

        const onSubmit = () => {
            if (!currentTurn.activated) {
                Notify({ type: 'danger', message: '不在报名时间内' })
                return
            }
            if (!signupForm.firstChoice) {
                Notify({ type: 'danger', message: '请选择至少一个志愿！' })
                return
            }
            // 注意，提交的数据与后端保持统一
            const signupData = {
                name: signupForm.name,
                stu_id: signupForm.stuId,
                sex: signupForm.sex,
                faculty: signupForm.faculty,
                tel: signupForm.tel,
                first_choice: signupForm.firstChoice,
                second_choice: signupForm.secondChoice,
                third_choice: signupForm.thirdChoice,
                allow_adjust: signupForm.allowAdjust,
                info: signupForm.info,
                turn_id: currentTurn.id,
            }
            const verifyInfo = {
                info: {
                    name: signupForm.name,
                    stuId: signupForm.stuId,
                    turnId: currentTurn.id
                },
            }
            const submitForm = () => {
                axios
                    .post('/enroll/submit', signupData)
                    .then((response) => {
                        if (response.data.success) {
                            Notify({ type: 'success', message: '已提交报名表！' })
                        }
                    })
                    .catch(() => {
                        Notify({
                            type: 'danger',
                            message: '无法提交报名表，请联系管理员',
                        })
                    })
            }
            axios.post('/enroll/verifyUnique', verifyInfo).then((response) => {
                console.log(response.data)
                if (!response.data.unique) {
                    const time = response.data.time
                    Dialog.confirm({
                        title: '重要提示',
                        message: `在${time},你已经提交了一份姓名或学号相同的报名表，再次提交将覆盖原有的报名表，是否继续？`,
                    })
                        .then(() => {
                            // on confirm
                            submitForm()
                        })
                        .catch(() => {
                            Notify({
                                type: 'primary',
                                message: '已放弃提交~',
                            })
                        })
                } else {
                    submitForm()
                }
            })
        }
        const onConfirmFaculty = (value) => {
            signupForm.faculty = value
            showFacultyPicker.value = false
        }
        const firstChoiceHandler = () => {
            showFirstChoicePicker.value = true
        }
        const secondChoiceHandler = () => {
            if (signupForm.firstChoice) {
                showSecondChoicePicker.value = true
            } else {
                Notify({ type: 'danger', message: '请先选择第一志愿' })
            }
        }
        const thirdChoiceHandler = () => {
            if (signupForm.firstChoice && signupForm.secondChoice) {
                showThirdChoicePicker.value = true
            } else {
                Notify({ type: 'danger', message: '请先选择第一或第二志愿' })
            }
        }
        const onConfirmFirstChoice = (value) => {
            signupForm.firstChoice = value
            showFirstChoicePicker.value = false
        }
        const onConfirmSecondChoice = (value) => {
            signupForm.secondChoice = value
            showSecondChoicePicker.value = false
        }
        const onConfirmThirdChoice = (value) => {
            signupForm.thirdChoice = value
            showThirdChoicePicker.value = false
        }
        return {
            noticeText,
            signupForm,
            faculties,
            depts,
            showFacultyPicker,
            showFirstChoicePicker,
            showSecondChoicePicker,
            showThirdChoicePicker,
            stuIdPattern,
            telPattern,
            onSubmit,
            onConfirmFaculty,
            onConfirmFirstChoice,
            onConfirmSecondChoice,
            onConfirmThirdChoice,
            firstChoiceHandler,
            secondChoiceHandler,
            thirdChoiceHandler,
        }
    },
}
</script>
  
<style>

</style>
  