<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <div>
          <el-input placeholder="输入手机号/会员编号" v-model="memberCode">
            <template slot="prepend">会员查询</template>
          </el-input>
        </div>
      </el-col>
      <el-col :span="4">
        <div>
          <el-button type="primary" @click="searchMemberInfo" round>查询</el-button>
          <el-button type="info" @click="reset" round>重置</el-button>
        </div>
      </el-col>
      <el-col :span="4" :offset="8">
        <el-button @click="showRegisterDailog">注册会员</el-button>
      </el-col>
      <register-dailog
        :dialogFormVisible="dialogFormVisible"
        @unShow="unShow"
        @unShowMobile="unShowMobile"
      ></register-dailog>
    </el-row>
    <el-container style="height:400px">
      <el-header>会员信息</el-header>
      <el-main class="member-info">
        <el-row type="flex" justify="space-between">
          <el-col :span="6">
            <el-input placeholder v-model="realMemberCode" readonly>
              <template slot="prepend">卡号</template>
            </el-input>
          </el-col>
          <el-col :span="6">
            <el-input placeholder v-model="memberLevel" readonly>
              <template slot="prepend">会员类型</template>
            </el-input>
          </el-col>
          <el-col :span="7">
            <el-input placeholder v-model="lastOneYearAmount" readonly>
              <template slot="prepend">近一年消费总额</template>
            </el-input>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-between">
          <el-col :span="6">
            <el-input placeholder v-model="memberName" :disabled="false" @change="memberNameChange">
              <template slot="prepend">姓名</template>
            </el-input>
          </el-col>
          <el-col v-if="isMemberNameModified" :span="1" style="margin-left:-20px;width:40px;text-align:left">
            <i
              @click="updateMemberName"
              class="el-icon-circle-check"
              style="margin-left:-20px;height:32px;line-height:32px;font-size:20px"
            ></i>
          </el-col>
          <el-col :span="6">
            <el-input placeholder v-model="registerTime" readonly>
              <template slot="prepend">注册日期</template>
            </el-input>
          </el-col>
          <el-col :span="7">
            <el-input placeholder v-model="buyTotalAmount" readonly>
              <template slot="prepend">历史消费总金额</template>
            </el-input>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-between">
          <el-col :span="6">
            <el-input placeholder v-model="memberMobile" readonly>
              <template slot="prepend">手机</template>
            </el-input>
          </el-col>
          <el-col :span="6">
            <el-input placeholder v-model="registerCounter" readonly>
              <template slot="prepend">门店</template>
            </el-input>
          </el-col>
          <el-col :span="7" style="text-align:left">
            是否绑定微信：
            <span v-text="isBandWechat"></span>
          </el-col>
        </el-row>
        <el-row>
          <el-col style="width:50px">
            <span
              class="el-input-group__prepend"
              style="height:32px;border:1px solid #DCDFE6;border-radius:4px;font-size:12px"
            >
              <span
                v-if="isMemberSexReadonly"
                class="el-icon-info"
                style="color:red;font-size:15px;margin: 0 5px 0 -10px"
              ></span>性别
            </span>
            <!-- <el-input placeholder v-model="memberName" readonly>
              <template slot="prepend">性别</template>
            </el-input>-->
          </el-col>
          <el-col :span="4" style="margin-left:-20;width:200px">
            <el-radio-group
              v-model="memberSex"
              @change="memberSexChange"
              :disabled="!isMemberSexReadonly"
            >
              <el-radio label="1" style="height:32px;line-height:32px">男</el-radio>
              <el-radio label="2" style="height:32px;line-height:32px">女</el-radio>
            </el-radio-group>
          </el-col>
          <el-col :span="1" style="margin-left:-20px;width:40px;text-align:left">
            <i
              @click="updateMemberSex"
              class="el-icon-circle-check"
              v-if="isMemberSexModifyied"
              style="margin-left:-20px;height:32px;line-height:32px;font-size:20px"
            ></i>
          </el-col>
          <el-col :span="6" :offset="1" style="margin-left:-20px;width:220px">
            <el-input placeholder v-model="memberLevel" readonly>
              <template slot="prepend">会员等级</template>
            </el-input>
          </el-col>
          <!-- <el-col :span="4" style="text-align:left" :offset="2">
            <el-input placeholder v-model="memberType" readonly>
              <template slot="prepend">宝贝1</template>
            </el-input>
          </el-col>-->
          <el-col :span="2" style="margin-left:30px;width:75px">
            <span
              class="el-input-group__prepend"
              style="margin-left:50px;height:30px;border:1px solid #DCDFE6;border-radius:4px;font-size:12px;"
            >宝贝1</span>
          </el-col>
          <!-- <el-col :span="2" style="width:50px"><el-input  v-model="babybirth1"></el-input></el-col> -->
          <el-col :span="3" style="margin-left:-5px;width:100px">
            <el-select v-model="babyYear1" placeholder="出生年份" @change="baby1AgeChange">
              <el-option
                v-for="item in babyYearOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="2" style="width:50px">
            <el-input v-model="babybirth1" readonly></el-input>
          </el-col>
          <el-col :span="3" class="body-sex" style="margin-left:10px;width:115px">
            <el-radio-group v-model="baby1Sex" @change="baby1SexChange">
              <el-radio v-model="babyradio1" label="1" style="height:32px;line-height:32px">男</el-radio>
              <el-radio v-model="babyradio1" label="2" style="height:32px;line-height:32px">女</el-radio>
            </el-radio-group>
          </el-col>
          <el-col v-if="isBaby1Modified" :span="1">
            <i
              @click="updateBaby1Info"
              class="el-icon-circle-check"
              style="margin-left:-11px;height:32px;line-height:32px;font-size:20px;width:44px"
            ></i>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4" style="width:175px">
            <el-input
              placeholder
              v-model="memberBirth"
              @change="memberBirthChange"
              style="width:200px"
              :readonly="!isMemberBirthReadonly"
            >
              <template slot="prepend">
                <span
                  v-if="isMemberBirthReadonly"
                  class="el-icon-info"
                  style="color:red;font-size:15px;margin: 0 5px 0 -10px"
                ></span>生日
              </template>
            </el-input>
            <span style="color:red;font-size:14px;margin-left:-30px">※格式1900-01-01</span>
          </el-col>
          <el-col :span="1" style="width:20px">
            <i
              @click="updateMemberBirth"
              class="el-icon-circle-check"
              v-if="isMemberBirthModified"
              style="margin-left:35px;font-size:20px;height:32px;line-height:32px"
            ></i>
          </el-col>
          <el-col :span="6" style="margin-left:55px;width:220px">
            <el-input placeholder v-model="levelEndDate" readonly>
              <template slot="prepend">会员到期日</template>
            </el-input>
          </el-col>
          <el-col :span="2" style="text-align:left;margin-left:30px;width:85px">
            <span
              class="el-input-group__prepend"
              style="margin-left:50px;height:30px;border:1px solid #DCDFE6;border-radius:4px;font-size:12px;"
            >宝贝2</span>
          </el-col>
          <!-- <el-col :span="2" style="width:50px">
            <el-input v-model="babybirth1"></el-input>
          </el-col>-->
          <el-col :span="3" style="margin-left:-13px;width:100px">
            <el-select v-model="babyYear2" placeholder="出生年份" @change="baby2AgeChange">
              <el-option
                v-for="item in babyYearOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="2" style="width:50px">
            <el-input v-model="babybirth2" readonly></el-input>
          </el-col>
          <el-col :span="3" class="body-sex" style="margin-left:10px;width:115px">
            <el-radio-group v-model="baby2Sex" @change="baby2SexChange">
              <el-radio label="1" style="height:32px;line-height:32px">男</el-radio>
              <el-radio label="2" style="height:32px;line-height:32px">女</el-radio>
            </el-radio-group>
          </el-col>
          <el-col v-if="isBaby2Modified" :span="1">
            <i
              @click="updateBaby2Info"
              class="el-icon-circle-check"
              style="margin-left:-11px;height:32px;line-height:32px;font-size:20px;width:44px"
            ></i>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
    <el-main class="trade-area">
      <div class="trade-bind">
        <el-col class="trade-bind-control" :span="8">
          <el-input placeholder="扫描或输入小票号" v-model="ticketNo">
            <template slot="prepend">交易绑定</template>
          </el-input>
        </el-col>
        <el-col :span="8" :offset="1">
          <div class="block">
            <span class="demonstration"></span>
            <el-date-picker
              v-model="tradeDate"
              align="right"
              type="date"
              placeholder="选择交易日期"
              :picker-options="pickerOptions"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </div>
        </el-col>
        <el-col :span="1">
          <el-button type="primary" @click="bindTick" round>绑定</el-button>
        </el-col>
      </div>
      <div class="coupon-area">
        <!-- <div class="order-badge">12</div> -->
        <el-tabs v-model="activeName" @tab-click="searchOrderList">
          <el-tab-pane label="可用优惠券" name="first">
            <ul>
              <li
                class="coupon-info"
                v-for="(couponInfo) in couponAvailableList"
                :key="couponInfo.couponCode"
                @click="checkCoupon($event, couponInfo)"
              >
                <span class="coupon-icon el-icon-present"></span>
                <span class="coupon-detail">
                  <p>{{couponInfo.couponName}}</p>
                  <p>{{couponInfo.couponDesc}}</p>
                  <p>使用期限：{{couponInfo.termOfvalidity}}</p>
                  <p style="display:none">{{couponInfo.rule}}</p>
                  <p style="display:none">{{couponInfo.categoryName}}</p>
                  <p style="display:none">{{couponInfo.couponCode}}</p>
                </span>
              </li>
              <coupon-dailog
                :dialogCouponVisible="dialogCouponVisible"
                :couponInfo="selectedCouponCode"
                :memberCode="realMemberCode"
                @unCouponShow="unCouponShow"
              ></coupon-dailog>
            </ul>
          </el-tab-pane>

          <el-tab-pane label="购买明细" name="second">
            <el-table :data="orderList" stripe style="width: 100%">
              <el-table-column prop="orderDate" label="交易日期" width="180"></el-table-column>
              <el-table-column prop="shopName" label="门店名称" width="180"></el-table-column>
              <el-table-column prop="tickNo" label="小票号"></el-table-column>
              <el-table-column prop="sku" label="SKU"></el-table-column>
              <el-table-column prop="qty" label="数量"></el-table-column>
              <el-table-column prop="orderPrice" label="交易金额"></el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="小票绑定明细" name="third">
            <el-table :data="tickList" stripe style="width: 100%">
              <el-table-column prop="orderDate" label="交易时间" width="180"></el-table-column>
              <el-table-column prop="tickNo" label="小票号" width="180"></el-table-column>
              <el-table-column prop="bindDate" label="绑定时间"></el-table-column>
              <el-table-column prop="state" label="状态"></el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="不可用优惠券" name="fourth">
            <ul>
              <li
                class="coupon-info"
                v-for="(couponInfo) in couponUnavailableList"
                :key="couponInfo.couponCode"
                @click="checkUnavailableCoupon($event, couponInfo)"
              >
                <span class="coupon-icon el-icon-present"></span>
                <span class="coupon-detail">
                  <p>{{couponInfo.couponName}}</p>
                  <p>{{couponInfo.couponDesc}}</p>
                  <p>使用期限：{{couponInfo.termOfvalidity}}</p>
                  <p style="display:none">{{couponInfo.rule}}</p>
                  <p style="display:none">{{couponInfo.categoryName}}</p>
                  <p style="display:none">{{couponInfo.couponCode}}</p>
                </span>
              </li>
              <coupon-dailog
                :dialogCouponVisible="dialogUnavailableCouponVisible"
                :memberCode="realMemberCode"
                :couponInfo="selectedCouponCode"
                @unCouponShow="unCouponShow"
              ></coupon-dailog>
            </ul>
          </el-tab-pane>
        </el-tabs>
      </div>
      <!-- <hr/> -->
    </el-main>
    <el-main></el-main>
    <el-footer></el-footer>
  </div>
</template>

<script>
import RegisterDailog from "../component/RegisterDailog.vue";
import CouponDailog from "../component/CouponDailog.vue";
import {
  searchMemberInfo,
  searchOrderList,
  searchTradeBindList,
  searchAvalibleCouponList,
  searchUnAvalibleCouponList,
  bindTicket,
  updateMemberName,
  updateMemberSex,
  updateMemberBirthday,
  addMemberBabyInfo,
  insertMemberBabyInfo,
  updateMemberBabyInfo
} from "../../api/index.js";
export default {
  name: "upload",
  data: function() {
    return {
      dialogFormVisible: false,
      dialogCouponVisible: false,
      dialogUnavailableCouponVisible: false,
      babyYearOptions: [],
      isBandWechat: "",
      memberCode: "",
      memberSex: "",
      memberBirth: "",
      memberLevel: "",
      memberMobile: "",
      memberName: "",
      registerTime: "",
      registerCounter: "",
      lastOneYearAmount: "",
      buyTotalAmount: "",
      isMemberBirthReadonly: false,
      isMemberBirthModified: false,
      levelEndDate: "",
      baby1Sex: "",
      baby2Sex: "",
      baby1Id: "",
      baby2Id: "",
      isMemberSexModifyied: false,
      isMemberSexReadonly: false,
      isMemberNameModified: false,
      isBaby1Modified: false,
      isBaby2Modified: false,
      activeName: "first",
      ticketNo: "",
      tradeDate: "",
      babybirth1: "",
      babybirth2: "",
      babyYear1: "",
      babyYear2: "",
      babyradio1: "",
      babyradio2: "",
      totalCount: 1000,
      selectedCouponCode: {},
      realMemberCode: "",
      realMemberId: "",
      itemUnavailableList: [],
      orderList: [],
      tickList: [],
      couponAvailableList: [],
      couponUnavailableList: [],
      pickerOptions: {
        disabledDate(time) {
          var d = new Date();
          d.setMonth(d.getMonth() - 1);
          return time.getTime() <= d || time.getTime() > new Date();
        }
      }
    };
  },
  created() {
    // 设置年份下拉表值
    for (let year = 1989; year <= 2022; year++) {
      this.babyYearOptions.push({ value: year + "", label: year + "" });
    }
    // 获取店铺id
    console.log("用户名：" + localStorage.getItem("ms_username"));
    this.counter = localStorage.getItem("ms_username");
  },
  methods: {
    reset() {
      // 设置页面标签值
      this.memberCode = "";
      this.realMemberCode = "";
      this.realMemberId = "";
      this.memberLevel = "";
      this.memberName = "";
      this.memberMobile = "";
      this.registerTime = "";
      this.registerCounter = "";
      this.lastOneYearAmount = "";
      this.buyTotalAmount = "";
      this.levelEndDate = "";
      this.isBandWechat = "";
      this.memberSex = "";
      this.memberBirth = "";
      this.isMemberBirthReadonly = false;
      this.isMemberBirthModified = false;
      this.isMemberSexModifyied = false;
      this.isMemberSexReadonly = false;
      this.isMemberNameModified = false;
      this.isMemberBirthModifyied = false;
      this.isBaby1Modified = false;
      this.isBaby2Modified = false;
      this.memberSex = "";
      this.baby1Sex = "";
      this.baby2Sex = "";
      this.baby1Id = "";
      this.baby2Id = "";
      this.babybirth1 = "";
      this.babybirth2 = "";
      this.babyYear1 = "";
      this.babyYear2 = "";
      this.couponAvailableList = [];
    },
    updateMemberSex() {
      console.log("性别更新");
      console.log(this.memberSex);
      console.log(this.realMemberId);
      console.log(this.memberSex);
      console.log(this.memberBirth);
      console.log(this.memberName);

      updateMemberSex({
        memberId: this.realMemberId,
        sex: this.memberSex,
        name: this.memberName
      }).then(res => {
        console.log(res);
        if (res.code == "100") {
          this.$message({
            message: "会员性别更新失败，原因：" + res.msg,
            type: "warning"
          });
        } else if (res.code == "0") {
          this.$message({
            message: "会员性别更新成功",
            type: "success"
          });
          this.searchMemberInfo();
        }
      });
    },
    updateMemberName() {
      console.log("姓名更新");
      console.log(this.memberSex);
      console.log(this.realMemberId);
      console.log(this.memberSex);
      console.log(this.memberBirth);
      console.log(this.memberName);

      // 更新生日
      updateMemberName({
        memberId: this.realMemberId,
        name: this.memberName
      }).then(res => {
        console.log(res);
        if (res.code == "100") {
          this.$message({
            message: "会员名称更新失败，原因：" + res.msg,
            type: "warning"
          });
        } else if (res.code == "0") {
          this.$message({
            message: "会员名称更新成功",
            type: "success"
          });
          this.searchMemberInfo();
        }
      });

    },
    updateMemberBirth() {
      console.log("生日更新");
      console.log(this.memberSex);
      console.log(this.realMemberId);
      console.log(this.memberSex);
      console.log(this.memberBirth);
      console.log(this.memberName);

      let dateFormat = /^(\d{4})-(\d{2})-(\d{2})$/;
      if (!dateFormat.test(this.memberBirth)) {
        this.$message({
          message: "生日日期格式有误",
          type: "warning"
        });
      }

      // 更新生日
      updateMemberBirthday({
        memberId: this.realMemberId,
        birthday: this.memberBirth
      }).then(res => {
        console.log(res);
        if (res.code == "100") {
          this.$message({
            message: "会员生日更新失败，原因：" + res.msg,
            type: "warning"
          });
        } else if (res.code == "0") {
          this.$message({
            message: "会员生日更新成功",
            type: "success"
          });
          this.searchMemberInfo();
        }
      });
    },
    updateBaby1Info() {
      console.log("更新baby1信息");
      if (
        this.baby1Id == "" ||
        this.baby1Id == undefined ||
        this.baby1Id == null
      ) {
        // 如果没有babyid则判定为更新
        insertMemberBabyInfo({
          memberId: this.realMemberId,
          babySex: this.baby1Sex,
          babyBirthday: this.babyYear1
        }).then(res => {
          console.log(res);
          if (res.code == "100") {
            this.$message({
              message: "baby信息插入失败，原因：" + res.msg,
              type: "warning"
            });
          } else if (res.code == "0") {
            this.$message({
              message: "baby信息插入成功",
              type: "success"
            });
          }
        });
      } else {
        updateMemberBabyInfo({
          babyId: this.baby1Id,
          babySex: this.baby1Sex,
          babyBirthday: this.babyYear1
        }).then(res => {
          console.log(res);
          if (res.code == "100") {
            this.$message({
              message: "baby信息更新失败，原因：" + res.msg,
              type: "warning"
            });
          } else if (res.code == "0") {
            this.$message({
              message: "baby信息更新成功",
              type: "success"
            });
          }
        });
      }
      this.searchMemberInfo();
    },
    updateBaby2Info() {
      console.log("更新baby2信息");
      if (
        this.baby2Id == "" ||
        this.baby2Id == undefined ||
        this.baby2Id == null
      ) {
        // 如果没有babyid则判定为更新
        insertMemberBabyInfo({
          memberId: this.realMemberId,
          babySex: this.baby2Sex,
          babyBirthday: this.babyYear2
        }).then(res => {
          console.log(res);
          if (res.code == "100") {
            this.$message({
              message: "baby信息插入失败，原因：" + res.msg,
              type: "warning"
            });
          } else if (res.code == "0") {
            this.$message({
              message: "baby信息插入成功",
              type: "success"
            });
          }
        });
      } else {
        updateMemberBabyInfo({
          babyId: this.baby2Id,
          babySex: this.baby2Sex,
          babyBirthday: this.babyYear2
        }).then(res => {
          console.log(res);
          if (res.code == "100") {
            this.$message({
              message: "baby信息更新失败，原因：" + res.msg,
              type: "warning"
            });
          } else if (res.code == "0") {
            this.$message({
              message: "baby信息更新成功",
              type: "success"
            });
          }
        });
      }
      this.searchMemberInfo();
    },
    memberBirthChange() {
      this.isMemberBirthModified = true;
    },
    memberNameChange() {
      this.isMemberNameModified = true;
    },
    memberSexChange() {
      console.log(this.memberSex);
      this.isMemberSexModifyied = true;
    },
    baby1AgeChange() {
      this.isBaby1Modified = true;
      console.log(new Date().getFullYear());
      this.babybirth1 = new Date().getFullYear() - this.babyYear1 + 1;
    },
    baby1SexChange() {
      this.isBaby1Modified = true;
    },
    baby2AgeChange() {
      this.isBaby2Modified = true;
      console.log(new Date().getFullYear());
      this.babybirth2 = new Date().getFullYear() - this.babyYear2 + 1;
    },
    baby2SexChange() {
      this.isBaby2Modified = true;
    },
    searchMemberInfo() {
      console.log("执行会员查询");

      let _this = this;
      searchMemberInfo({ memberCode: this.memberCode }).then(res => {
        if (res.code == "100") {
          _this.$message({
            message: "系统错误，原因：" + res.msg,
            type: "warning"
          });
        } else if (res.code == "2") {
          this.$confirm("此手机号未注册会员, 是否需要注册会员？", "新会员", {
            confirmButtonText: "是",
            cancelButtonText: "否",
            type: "info "
          })
            .then(() => {
              this.dialogFormVisible = true;
            })
            .catch(() => {});
        } else if (res.code == "0") {
          // 检索会员成功
          // 设置页面标签值
          _this.realMemberCode = res.data.memberCode;
          _this.realMemberId = res.data.id;
          _this.memberLevel = res.data.levelName;
          _this.memberName = res.data.name;
          _this.memberMobile = res.data.mobile;
          _this.registerTime = res.data.registerTime.slice(0, 10);
          _this.registerCounter = res.data.registerCounter;
          _this.lastOneYearAmount = res.data.buyTotal;
          _this.buyTotalAmount = res.data.buyTotalAmount;
          _this.levelEndDate = res.data.levelEndDate;
          _this.isBandWechat = res.data.bindWechat;
          _this.memberSex = res.data.sex + "";
          _this.memberBirth = res.data.birthday;
          _this.isMemberBirthReadonly = true;
          _this.isMemberBirthModified = false;
          _this.isMemberSexReadonly = true;
          _this.isMemberSexModifyied = false;
          _this.isMemberNameModified = false;
          _this.isBaby1Modified = false;
          _this.isBaby2Modified = false;
          _this.baby1Sex = "";
          _this.baby2Sex = "";
          _this.baby1Id = "";
          _this.baby2Id = "";
          _this.babybirth1 = "";
          _this.babybirth2 = "";
          _this.babyYear1 = "";
          _this.babyYear2 = "";
          // 控制性别是否只读
          if (
            res.data.sex == "" ||
            res.data.sex == undefined ||
            res.data.sex == null
          ) {
            _this.isMemberSexReadonly = true;
          } else {
            _this.isMemberSexReadonly = false;
          }
          // 控制生日是否只读
          if (
            res.data.birthday == "" ||
            res.data.birthday == undefined ||
            res.data.birthday == null
          ) {
            _this.isMemberBirthReadonly = true;
          } else {
            _this.isMemberBirthReadonly = false;
          }
          // 宝贝信息1
          if (
            !(
              res.data.portalMemberBabyResponseList[0] == "" ||
              res.data.portalMemberBabyResponseList[0] == undefined ||
              res.data.portalMemberBabyResponseList[0] == null
            )
          ) {
            _this.babyYear1 =
              res.data.portalMemberBabyResponseList[0].babyBirthday;
            _this.babybirth1 = res.data.portalMemberBabyResponseList[0].babyAge;
            _this.baby1Sex =
              res.data.portalMemberBabyResponseList[0].babySex + "";
            _this.baby1Id = res.data.portalMemberBabyResponseList[0].id + "";
          }
          // 宝贝信息2
          if (
            !(
              res.data.portalMemberBabyResponseList[1] == "" ||
              res.data.portalMemberBabyResponseList[1] == undefined ||
              res.data.portalMemberBabyResponseList[1] == null
            )
          ) {
            _this.babyYear2 =
              res.data.portalMemberBabyResponseList[1].babyBirthday;
            _this.babybirth2 = res.data.portalMemberBabyResponseList[1].babyAge;
            _this.baby2Sex =
              res.data.portalMemberBabyResponseList[1].babySex + "";
            _this.baby2Id = res.data.portalMemberBabyResponseList[1].id + "";
          }
          this.isMemberSexModifyied = false;
          this.isMemberNameModified = false;
          this.isBaby1Modified = false;
          this.isBaby2Modified = false;

          // 查询可用优惠券列表
          searchAvalibleCouponList({
            memberId: this.realMemberId,
            counter: "14001"
          }).then(res => {
            if (res.code == "100") {
              _this.$message({
                message: "不可用优惠券查询错误",
                type: "warning"
              });
            }
            // 输出优惠券
            console.log(res);
            _this.couponAvailableList = [];
            for (let index in res.data) {
              console.log(index);
              // console.log(res.data[0]);
              _this.couponAvailableList.push({
                couponName: res.data[index].couponName,
                couponDesc: res.data[index].couponDesc,
                termOfvalidity: res.data[index].termOfvalidity,
                rule: res.data[index].rule,
                categoryName: res.data[index].categoryName,
                couponCode: res.data[index].couponCode,
                isAvailable: true
              });
            }
          });
        }
      });
    },
    unShow(dialogFormVisible) {
      this.dialogFormVisible = dialogFormVisible;
    },
    unShowMobile(mobile) {
      console.log("从注册pop返回的mobile：" + mobile);
      this.memberCode = mobile;
      this.searchMemberInfo();
    },
    unCouponShow(dialogCouponVisible) {
      this.dialogCouponVisible = dialogCouponVisible;
      this.dialogUnavailableCouponVisible = dialogCouponVisible;
      this.searchMemberInfo();
    },
    showRegisterDailog() {
      this.dialogFormVisible = true;
    },
    checkCoupon(el, couponInfo) {
      console.log(couponInfo);
      this.dialogCouponVisible = true;
      this.selectedCouponCode = couponInfo;
    },
    checkUnavailableCoupon(el, couponInfo) {
      console.log(couponInfo);
      this.dialogUnavailableCouponVisible = true;
      this.selectedCouponCode = couponInfo;
    },
    bindTick() {
      let _this = this;

      if (this.realMemberId == "" || this.realMemberId == undefined || this.ticketNo == null) {
        this.$message({
          message: "请先查询会员信息",
          type: "warning"
        });
        return;
      }

      if (
        this.ticketNo == "" ||
        this.ticketNo == undefined ||
        this.ticketNo == null
      ) {
        this.$message({
          message: "小票号不能为空",
          type: "warning"
        });
        return;
      }

      var reg = /^\d{12}$/;
      if (!reg.test(this.ticketNo)) {
        this.$message({
          message: "小票号格式错误",
          type: "warning"
        });
        return;
      }

      if (this.tradeDate == "" ||
        this.tradeDate == undefined ||
        this.tradeDate == null) {
        this.$message({
          message: "交易日期不能为空",
          type: "warning"
        });
        return;
      }

      bindTicket({
        tradeTime: this.tradeDate,
        ticketNo: this.ticketNo,
        counter: this.counter,
        memberCode: this.realMemberCode
      }).then(res => {
        console.log(res.code);
        if (res.code == "100") {
          _this.$message({
            message: "绑定失败，原因：" + res.msg,
            type: "warning"
          });
        } else if (res.code == "0") {
          _this.$message({
            message: "订单绑定成功",
            type: "success"
          });
        }
      });
    },
    searchOrderList(tab, event) {
      this.dialogUnavailableCouponVisible = false;
      console.log("切换tab");
      if ("可用优惠券" == tab.$options.propsData.label) {
        console.log("这是可用优惠券");
        let _this = this;
        searchAvalibleCouponList({
          memberId: this.realMemberId,
          counter: "14001"
        }).then(res => {
          if (res.code == "100") {
            _this.$message({
              message: "不可用优惠券查询错误",
              type: "warning"
            });
          }

          console.log(res);
          _this.couponAvailableList = [];
          for (let index in res.data) {
            // console.log(res.data[0]);
            _this.couponAvailableList.push({
              couponName: res.data[index].couponName,
              couponDesc: res.data[index].couponDesc,
              termOfvalidity: res.data[index].termOfvalidity,
              rule: res.data[index].rule,
              categoryName: res.data[index].categoryName,
              couponCode: res.data[index].couponCode,
              isAvailable: true
            });
          }
        });
      }
      if ("购买明细" == tab.$options.propsData.label) {
        console.log("这是购买明细tab");
        //20170912662761
        console.log(this.realMemberCode);
        searchOrderList({ memberCode: this.realMemberCode }).then(res => {
          if (res.code == "100") {
            this.$message({
              message: "购买明细查询错误",
              type: "warning"
            });
          }
          for (let index in res.data.rows) {
            this.orderList.push({
              orderDate: res.data.rows[index].tradeTime,
              shopName: res.data.rows[index].store,
              tickNo: res.data.rows[index].tradeNo,
              sku: res.data.rows[index].skuCode,
              qty: res.data.rows[index].amount,
              orderPrice: res.data.rows[index].amount
            });
          }
        });
      }
      if ("小票绑定明细" == tab.$options.propsData.label) {
        console.log("这是小票绑定明细tab");
        searchTradeBindList({ memberCode: this.realMemberCode }).then(res => {
          if (res.code == "100") {
            this.$message({
              message: "小票绑定明细查询错误",
              type: "warning"
            });
          }
          this.tickList = [];
          console.log(res);
          for (let index in res.data.rows) {
            this.tickList.push({
              orderDate: res.data.rows[index].tradeTime,
              bindDate: res.data.rows[index].bindTime.slice(0, 10),
              state: res.data.rows[index].status,
              tickNo: res.data.rows[index].ticketNo
            });
          }
        });
      }
      if ("不可用优惠券" == tab.$options.propsData.label) {
        let _this = this;
        console.log("这是不可用优惠券tab");
        searchUnAvalibleCouponList({
          memberId: this.realMemberId,
          counter: "14001"
        }).then(res => {
          if (res.code == "100") {
            _this.$message({
              message: "不可用优惠券查询错误",
              type: "warning"
            });
          }

          console.log(res);
          _this.couponUnavailableList = [];
          for (let index in res.data) {
            // console.log(res.data[0]);
            _this.couponUnavailableList.push({
              couponName: res.data[index].couponName,
              couponDesc: res.data[index].couponDesc,
              termOfvalidity: res.data[index].termOfvalidity,
              rule: res.data[index].rule,
              categoryName: res.data[index].categoryName,
              isAvailable: false
            });
          }
        });
      }
    }
  },
  components: {
    RegisterDailog,
    CouponDailog
  }
};
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.member-info {
  background-color: #fff;
  margin-bottom: 6px;
  text-align: center;
  height: 320px;
  border: 1px solid #ccc;
  overflow: hidden;
}
.trade-area {
  background-color: #fff;
  margin-bottom: 20px;
  height: 290px;
  border: 1px solid #ccc;
}
.trade-bind {
  background-color: #fff;
  margin-bottom: 25px;
  text-align: left;
  /* line-height: 160px; */
  height: 35px;
  /* border-bottom: 1px solid #CCC */
}
.trade-bind-control {
  height: 60px;
}

.el-header {
  /* background-color: #f5f5f5; */
  color: #333;
  text-align: left;
  /* font-weight: 700; */
  line-height: 60px;
  height: 50px;
}
.body-sex {
  /* margin-left: -100px; */
  display: flex;
  /* align-items: center; */
  vertical-align: text-bottom;
}
.coupon-info {
  display: inline-block;
  margin-right: 12px;
  margin-top: 2px;
  margin-bottom: 3px;
  height: 100px;
  width: 270px;
  background-color: #a8b8d0;
  word-wrap: break-word;
  vertical-align: middle;
}
.coupon-icon {
  display: inline-block;
  width: 60px;
  height: 100px;
  line-height: 100px;
  background-color: #bcc9e1;
  color: #fff;
  font-size: 20px;
  text-align: center;
  padding: 20px auto;
}
/* .coupon-detail {
  display: inline-block;
  width: 210px;
  height: 100px;
  font-size: 11px;
  vertical-align: middle;
  color: #FFF;
} */
.coupon-detail {
  display: flex;
  width: 260px;
  height: 90px;
  font-size: 11px;
  vertical-align: middle;
  color: #fff;
  flex-flow: column;
  justify-content: space-between;
  margin-top: -95px;
  margin-left: 5px;
}
.coupon-detail p {
  margin-left: 60px;
  margin-top: 4px;
}
.order-badge {
  position: relative;
  top: 20px;
  left: 285px;
  color: #fff;
  font-weight: 500;
  font-size: 13px;
  line-height: 18px;
  background-color: red;
  width: 18px;
  height: 18px;
  border-radius: 9px;
  margin: -30x 10px 10px 10px;
  z-index: 100;
  text-align: center;
}

</style>