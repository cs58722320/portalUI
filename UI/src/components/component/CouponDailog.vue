<!-- 子组件 -->
<template>
  <el-dialog width="70%" title="优惠券核销" :visible.sync="dialogCouponVisible" @close="unCouponShow">
    <div class="row">
      <div class="coupon-name">券名称</div>
      <div class="coupon-name-edit" v-text="couponInfo.couponName"></div>
      <div class="coupon-name mg-l">券类型</div>
      <div class="coupon-name-edit" v-text="couponInfo.categoryName"></div>
    </div>
    <div class="row mg-t">
      <div class="coupon-name">短描述</div>
      <div class="coupon-name-edit" v-text="couponInfo.couponDesc"></div>
      <div class="coupon-name mg-l">有效期</div>
      <div class="coupon-name-edit" v-text="couponInfo.termOfvalidity"></div>
    </div>
    <div class="row mg-t">
      <div class="coupon-rule">券使用规则</div>
      <div class="coupon-rule-content" v-html="couponInfo.rule"></div>
    </div>
    <div class="row mg-t" v-if="couponInfo.isAvailable">
      <div class="coupon-name">绑定</div>
      <div class="coupon-tick-edit">
        <input type="text" v-model="tickNo" class="coupon-tick-txt" />
      </div>
      <div class="block mg-l">
        <span class="demonstration"></span>
        <el-date-picker
          v-model="tickBindDate"
          align="right"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择小票交易日期"
          :picker-options="pickerOptions"
        ></el-date-picker>
      </div>
    </div>
    <div class="row mg-t" v-if="!couponInfo.isAvailable" style="text-align:center;margin-top:30px;margin-left:-250px">
      <el-button>门店不可使用</el-button>
    </div>
    <div v-if="couponInfo.isAvailable">
      <div class="row" style="font-size:12px;color:red;margin-left:270px;">※您仅可绑定30天以内的小票交易</div>
      <div class="row mt-t">
        <el-button type="primary" @click="consumeCoupon" style="width:120px">核销</el-button>
        <el-button type="info" @click="unCouponShow" style="width:120px">取消</el-button>
      </div>
    </div>
    <div slot="footer" class="dialog-footer"></div>
  </el-dialog>
</template>

<script>
import {
  consumeCoupon
} from "../../api/index.js";
export default {
  data() {
    return {
      couponName: "",
      isClose: false,
      dialogCouponVisible: false,
      isUnconsume: false,
      isConsume: true,
      tickNo: "",
      tickBindDate: "",
      couponCode:"",
      form: {
        name: "",
        region: "",
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
        shop: "",
        couponName: ""
      },
      formLabelWidth: "120px"
    };
  },
  created() {

  },
  props: {
    dialogCouponVisible: {
      type: Boolean,
      default: "false"
      // require: true // 必填
    },
    memberCode: {
      type: String,
      default: "false"
      // require: true // 必填
    },
    couponInfo: {
      type: Object,
      default: ""
      // require: true // 必填
    }
  },
  methods: {
    unCouponShow() {
      this.dialogCouponVisible = false;
      this.tickBindDate = "";
      this.tickNo = "";
      this.$emit("unCouponShow", this.dialogCouponVisible);
    },
    consumeCoupon() {
      console.log(this.memberCode);
      console.log(this.couponInfo.couponName);
      console.log(this.couponInfo.categoryName);
      console.log(this.tickBindDate)
      console.log(this.tickNo);
      console.log(this.couponInfo.couponCode);
      let counter = localStorage.getItem("ms_username");
      console.log(counter)

      if (
        this.tickNo == "" ||
        this.tickNo == undefined ||
        this.tickNo == null
      ) {
        this.$message({
          message: "小票号不能为空",
          type: "warning"
        });
        return;
      }

      var reg = /^\d{12}$/;
      if (!reg.test(this.tickNo)) {
        this.$message({
          message: "小票号格式错误",
          type: "warning"
        });
        return;
      }

      if (this.tickBindDate== "" ||
        this.tickBindDate == undefined ||
        this.tickBindDate == null) {
        this.$message({
          message: "交易日期不能为空",
          type: "warning"
        });
        return;
      }


      let _this = this;
      consumeCoupon({memberCode: this.memberCode, counter: counter, ticketNo: this.tickNo, tradeTime: this.tickBindDate, couponCode: this.couponInfo.couponCode}).then(res => {
        console.log(res);

        if (res.code == "100") {
            _this.$message({
              message: "优惠券核销失败，原因：" + res.msg,
              type: "warning"
            });
        } else if (res.code == "0") {
            _this.$message({
              message: "优惠券绑定成功",
              type: "success"
            });
            
        }
        unCouponShow();
      });

    },
    test() {
      console.log(this.couponInfo.rule);
    }
  }
};
</script>
<style scoped>
.coupon-name {
  background-color: #eee;
  width: 70px;
  height: 30px;
  font-size: 12px;
  /* display: inline-block; */
  float: left;
  border: 1px solid #ccc;
  vertical-align: middle;
  text-align: center;
  line-height: 30px;
}
.coupon-rule {
  background-color: #eee;
  width: 70px;
  height: 200px;
  font-size: 12px;
  /* display: inline-block; */
  float: left;
  border: 1px solid #ccc;
  vertical-align: middle;
  text-align: center;
  line-height: 200px;
}
.coupon-name-edit {
  /* display: inline-block; */
  float: left;
  border: 1px solid #ccc;
  width: 220px;
  height: 30px;
  vertical-align: middle;
  line-height: 30px;
  padding: 0 10px;
  font-size: 10px;
  overflow: hidden;
}

.coupon-tick-edit {
  /* display: inline-block; */
  float: left;
}

.coupon-tick-txt {
  /* display: inline-block; */
  float: left;
  border: 1px solid #ccc;
  width: 170px;
  height: 30px;
  vertical-align: middle;
  line-height: 30px;
  padding: 0 10px;
}

.coupon-rule-content {
  /* display: inline-block; */
  float: left;
  border: 1px solid #ccc;
  width: 500px;
  height: 200px;
  vertical-align: middle;
  line-height: 25px;
  padding: 0 10px;
  font-size: 12px;
  overflow-y: scroll;
}

.row::after {
  clear: both;
  content: "";
  display: block;
  width: 0;
  height: 0;
  visibility: hidden;
}
.mg-l {
  margin-left: 30px;
}

.mg-t {
  margin-top: 5px;
}

.inb {
  display: inline;
}
</style>