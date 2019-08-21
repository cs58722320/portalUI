<!-- 子组件 -->
<template>
  <el-dialog title="会员注册" :visible.sync="dialogFormVisible" @close="unShow">
    <el-form ref="form" :model="form" label-width="80px">
      <div class="step">第一步 会员信息收集</div>
      <div class="comment">
        <span class="el-icon-info"></span>请店员确保提供纸质版的隐私条款给到消费者签字确认
      </div>
      <div class="comment">（必填项：手机号+同意隐私条款+消费者签名）</div>
      <div class="step">第二步 录入会员信息</div>
      <el-form-item label="会员手机" class="form-input">
        <el-input v-model="form.mobile" @blur="isMember">
          <i class="el-icon-circle-check is-check-icon" v-show="isCheckIconShow" slot="suffix"></i>
        </el-input>
      </el-form-item>
      <el-form-item label="姓名" class="form-input">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="性别" class="form-input">
        <el-radio-group v-model="form.sex">
          <el-radio label="2">女</el-radio>
          <el-radio label="1">男</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="生日" class="form-input">
        <el-col :span="5">
          <el-date-picker
            value-format="yyyy"
            style="width:90px;display:inline-block;"
            v-model="form.year"
            type="year"
            placeholder="年(选填)"
          ></el-date-picker>
        </el-col>
        <el-col :span="3" :offset="5">
          <el-date-picker
            style="width:90px;display:inline-block;"
            value-format="MM"
            v-model="form.month"
            type="month"
            format="MM"
            placeholder="月"
          ></el-date-picker>
        </el-col>
        <el-col :span="3" :offset="7">
          <el-date-picker
            style="width:90px;display:inline-block;"
            value-format="dd"
            v-model="form.day"
            type="date"
            format="dd"
            placeholder="日"
          ></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="注册日期" class="form-input">
        <el-input :readonly="true" :placeholder="form.registerDate"></el-input>
      </el-form-item>
      <el-form-item label="注册门店" class="form-input">
        <el-input :readonly="true" :placeholder="form.shop"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="unShow">取 消</el-button>
      <el-button type="primary" @click="registMember">注册</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { isMember, addMember } from "../../api/index.js";
export default {
  data() {
    return {
      isClose: false,
      dialogFormVisible: false,
      isCheckIconShow: false,
      form: {
        mobile: "",
        name: "",
        sex: "2",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
        year: "",
        month: "",
        day: "",
        registerDate: "",
        shop: "14001"
      },
      formLabelWidth: "120px"
    };
  },
  created() {
    var date = new Date();
    var year = date.getFullYear();
    var month = (date.getMonth() + 1).toString();
    var day = date.getDate().toString();
    if (month.length == 1) {
      month = "0" + month;
    }
    if (day.length == 1) {
      day = "0" + day;
    }
    var dateTime = year + "-" + month + "-" + day;
    console.log(dateTime);
    this.form.registerDate = dateTime + "(当前日期无法修改)";
  },
  props: {
    dialogFormVisible: {
      type: Boolean,
      default: "false"
      // require: true // 必填
    }
  },
  methods: {
    isMember() {
      let mobile = this.form.mobile;
      let _this = this;
      console.log("检测手机：" + mobile);
      // 检测是否为手机号
      if (mobile == "" || mobile == undefined || mobile == null) {
        _this.isCheckIconShow = false;
        return;
      }
      var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (!myreg.test(mobile)) {
        _this.isCheckIconShow = false;
        this.$message({
          message: "填写的手机格式不正确",
          type: "warning"
        });
        return;
      }
      // 检测是否为会员
      isMember({ mobile: mobile }).then(res => {
        console.log(res);
        if (res.code == "0") {
          _this.isCheckIconShow = true;
        } else if ((res.code = "100")) {
          this.$message({
            message: "该手机号已被注册",
            type: "warning"
          });
          _this.isCheckIconShow = false;
        }
      });
    },
    unShow() {
      this.dialogFormVisible = false;
      this.$emit("unShow", this.dialogFormVisible);
      this.clear();
    },
    clear() {
      this.form.mobile = '';
      this.form.name = '';
      this.form.sex = '2';
      this.form.year = '';
      this.form.month = '';
      this.form.day = '';
      this.isCheckIconShow = false;
    },
    registMember() {
      // 注册时验证
      //  验证手机号
      let mobile = this.form.mobile;
      let _this = this;
      console.log("检测手机：" + mobile);
      // 检测是否为手机号
      if (mobile == "" || mobile == undefined || mobile == null) {
        _this.isCheckIconShow = false;
        return;
      }
      var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (!myreg.test(mobile)) {
        _this.isCheckIconShow = false;
        this.$message({
          message: "填写的手机格式不正确",
          type: "warning"
        });
        return;
      }
      //  验证姓名
      if (
        this.form.name == "" ||
        this.form.name == undefined ||
        this.form.name == null
      ) {
        this.$message({
          message: "请填写姓名",
          type: "warning"
        });
        return;
      }
      //  验证生日
      if (
        this.form.month == "" ||
        this.form.month == undefined ||
        this.form.month == null
      ) {
        this.$message({
          message: "请填写月份",
          type: "warning"
        });
        return;
      }
      if (
        this.form.day == "" ||
        this.form.day == undefined ||
        this.form.day == null
      ) {
        this.$message({
          message: "请填写日期",
          type: "warning"
        });
        return;
      }
      if (
        this.form.year == "" ||
        this.form.year == undefined ||
        this.form.year == null
      ) {
        this.form.year = "1900";
      }

      let birthday =
        this.form.year + "-" + this.form.month + "-" + this.form.day;
      addMember({
        mobile: this.form.mobile,
        name: this.form.name,
        sex: this.form.sex,
        birthday: birthday
      }).then(result => {
        console.log("注册进来了吗")
        if (result.code == "0") {
          this.$message({
            message: "恭喜你，注册成功",
            type: "success"
          });
          _this.clear();
          _this.dialogFormVisible = false;
          _this.$emit("unShow", this.dialogFormVisible);
          _this.$emit("unShowMobile", this.form.mobile);
        } else if (result.code == "100") {
          this.$message.error("注册失败，原因：" + result.msg);
        } else {
          this.$message.error("注册失败，原因未知");
        }
      });
    }
  }
};
</script>
<style scoped>
.step {
  margin-left: 30px;
  margin-bottom: 10px;
  height: 20px;
  font-weight: 700;
}
.comment {
  margin-left: 50px;
  margin-bottom: 10px;
}
.form-input {
  width: 320px;
  margin-left: 30px;
}
.is-check-icon {
  font-size: 25px;
  line-height: 32px;
}
</style>
