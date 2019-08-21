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
          <el-button type="info" round>重置</el-button>
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
    <el-container>
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
            <el-input placeholder v-model="memberName" readonly>
              <template slot="prepend">姓名</template>
            </el-input>
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
              <span v-if="isMemberSexReadonly" class="el-icon-info" style="color:red;font-size:15px;margin: 0 5px 0 -10px"></span>性别
            </span>
            <!-- <el-input placeholder v-model="memberName" readonly>
              <template slot="prepend">性别</template>
            </el-input>-->
          </el-col>
          <el-col :span="4" style="margin-left:-20">
            <el-radio-group
              v-model="memberSex"
              @change="memberSexChange"
              :disabled="!isMemberSexReadonly"
            >
              <el-radio label="1" style="height:32px;line-height:32px">男</el-radio>
              <el-radio label="2" style="height:32px;line-height:32px">女</el-radio>
            </el-radio-group>
          </el-col>
          <el-col :span="1">
            <i
              class="el-icon-circle-check"
              v-if="isMemberSexModifyied"
              style="margin-left:-20px;height:32px;line-height:32px;font-size:20px"
            ></i>
          </el-col>
          <el-col :span="6" :offset="1" style="margin-left:-1px">
            <el-input placeholder v-model="memberLevel" readonly>
              <template slot="prepend">会员等级</template>
            </el-input>
          </el-col>
          <!-- <el-col :span="4" style="text-align:left" :offset="2">
            <el-input placeholder v-model="memberType" readonly>
              <template slot="prepend">宝贝1</template>
            </el-input>
          </el-col>-->
          <el-col :span="2" style="margin-left:30px">
            <span
              class="el-input-group__prepend"
              style="margin-left:50px;height:30px;border:1px solid #DCDFE6;border-radius:4px;font-size:12px;"
            >宝贝1</span>
          </el-col>
          <!-- <el-col :span="2" style="width:50px"><el-input  v-model="babybirth1"></el-input></el-col> -->
          <el-col :span="3" style="margin-left:-5px">
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
          <el-col :span="3" class="body-sex" style="margin-left:10px">
            <el-radio-group v-model="baby1Sex" @change="baby1SexChange">
              <el-radio v-model="babyradio1" label="1" style="height:32px;line-height:32px">男</el-radio>
              <el-radio v-model="babyradio1" label="2" style="height:32px;line-height:32px">女</el-radio>
            </el-radio-group>
          </el-col>
          <el-col
            v-if="isBaby1Modified"
            :span="1"
            class="el-icon-circle-check"
            style="margin-left:0;height:32px;line-height:32px;font-size:20px"
          ></el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <el-input
              placeholder
              v-model="memberBirth"
              @change="memberNameChange"
              style="width:200px"
              :readonly="!isMemberBirthReadonly"
            >
              <template slot="prepend">
                <span v-if="isMemberBirthReadonly" class="el-icon-info" style="color:red;font-size:15px;margin: 0 5px 0 -10px"></span>生日
              </template>
            </el-input>
            <span style="color:red;font-size:14px;margin-left:-30px">※格式1900-01-01</span>
          </el-col>
          <el-col :span="1">
            <i
              class="el-icon-circle-check"
              v-if="isMemberNameModified"
              style="margin-left:83px;font-size:20px;height:32px;line-height:32px"
            ></i>
          </el-col>
          <el-col :span="6" style="margin-left:75px">
            <el-input placeholder v-model="levelEndDate" readonly>
              <template slot="prepend">会员到期日</template>
            </el-input>
          </el-col>
          <el-col :span="2" style="text-align:left;margin-left:30px;">
            <span
              class="el-input-group__prepend"
              style="margin-left:50px;height:30px;border:1px solid #DCDFE6;border-radius:4px;font-size:12px;"
            >宝贝2</span>
          </el-col>
          <!-- <el-col :span="2" style="width:50px">
            <el-input v-model="babybirth1"></el-input>
          </el-col>-->
          <el-col :span="3" style="margin-left:-5px">
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
          <el-col :span="3" class="body-sex" style="margin-left:10px">
            <el-radio-group v-model="baby2Sex" @change="baby2SexChange">
              <el-radio label="1" style="height:32px;line-height:32px">男</el-radio>
              <el-radio label="2" style="height:32px;line-height:32px">女</el-radio>
            </el-radio-group>
          </el-col>
          <el-col
            :span="1"
            v-if="isBaby2Modified"
            class="el-icon-circle-check"
            style="margin-left:0;height:32px;line-height:32px;font-size:20px"
          ></el-col>
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
        <div class="order-badge">12</div>
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
                </span>
              </li>
              <coupon-dailog
                :dialogCouponVisible="dialogCouponVisible"
                :couponInfo="selectedCouponCode"
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
                  <p style="display:none">{{couponInfo.categoryName}}</p>
                </span>
              </li>
              <coupon-dailog
                :dialogCouponVisible="dialogUnavailableCouponVisible"
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
  bindTicket
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
      registerTime: "",
      registerCounter: "",
      lastOneYearAmount: "",
      buyTotalAmount: "",
      isMemberBirthReadonly: false,
      levelEndDate:"",
      baby1Sex: "",
      baby2Sex: "",
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
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      }
    };
  },
  created() {
    // this.orderList = [
    //   {orderDate: '2019/07/01'},
    //   {orderDate: '2019/07/02'}
    // ]
    console.log("123");
    this.babyYearOptions.push({ value: "2019", label: "2019" });
    this.babyYearOptions.push({ value: "2018", label: "2018" });
    this.babyYearOptions.push({ value: "2017", label: "2017" });
    this.babyYearOptions.push({ value: "2016", label: "2016" });
    this.babyYearOptions.push({ value: "2015", label: "2015" });
    this.babyYearOptions.push({ value: "2014", label: "2014" });
    this.babyYearOptions.push({ value: "2013", label: "2013" });
    this.babyYearOptions.push({ value: "2012", label: "2012" });
    this.babyYearOptions.push({ value: "2011", label: "2011" });
    this.babyYearOptions.push({ value: "2010", label: "2010" });
    this.babyYearOptions.push({ value: "2009", label: "2009" });
    this.babyYearOptions.push({ value: "2008", label: "2008" });
    this.babyYearOptions.push({ value: "2007", label: "2007" });
    this.babyYearOptions.push({ value: "2006", label: "2006" });
    this.babyYearOptions.push({ value: "2005", label: "2005" });
    this.babyYearOptions.push({ value: "2004", label: "2004" });
    this.babyYearOptions.push({ value: "2003", label: "2003" });
    this.babyYearOptions.push({ value: "2002", label: "2002" });
    this.babyYearOptions.push({ value: "2001", label: "2001" });
    this.babyYearOptions.push({ value: "2000", label: "2000" });
    this.babyYearOptions.push({ value: "1999", label: "1999" });
    this.babyYearOptions.push({ value: "1998", label: "1998" });
    this.babyYearOptions.push({ value: "1997", label: "1997" });
    this.babyYearOptions.push({ value: "1996", label: "1996" });
    this.babyYearOptions.push({ value: "1995", label: "1995" });
    this.babyYearOptions.push({ value: "1994", label: "1994" });
    this.babyYearOptions.push({ value: "1993", label: "1993" });
    this.babyYearOptions.push({ value: "1992", label: "1992" });
    this.babyYearOptions.push({ value: "1991", label: "1991" });
    this.babyYearOptions.push({ value: "1990", label: "1990" });
    this.babyYearOptions.push({ value: "1989", label: "1989" });
    console.log(this.babyYearOptions);

    console.log("用户名：" + localStorage.getItem("ms_username"));
    this.counter = localStorage.getItem("ms_username");
    // this.orderList.push({
    //   orderDate: "2019/07/01",
    //   shopName: "沈阳恒隆店",
    //   tickNo: "1092029",
    //   sku: "1122333",
    //   qty: "333",
    //   orderPrice: "123.00"
    // });
    // this.orderList.push({ orderDate: "2019/07/01" });
    // this.orderList.push({ orderDate: "2019/07/01" });
    // this.orderList.push({ orderDate: "2019/07/01" });
    // this.orderList.push({ orderDate: "2019/07/01" });
    // this.orderList.push({ orderDate: "2019/07/01" });
  },
  methods: {
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
      this.babybirth1 = new Date().getFullYear() - this.babyYear1;
    },
    baby1SexChange() {
      this.isBaby1Modified = true;
    },
    baby2AgeChange() {
      this.isBaby2Modified = true;
      console.log(new Date().getFullYear());
      this.babybirth2 = new Date().getFullYear() - this.babyYear2;
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
            type: "warn"
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
        } else if (res.code == "0") { // 检索会员成功
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
          if(res.data.sex == "" || res.data.sex == undefined || res.data.sex == null){
            _this.isMemberSexReadonly = true;
          } else {
            _this.isMemberSexReadonly = false;
            _this.memberSex = res.data.sex + "";
          }
          if(res.data.birthday == "" || res.data.birthday == undefined || res.data.birthday == null){
            _this.isMemberBirthReadonly = true;
          } else {
            _this.isMemberBirthReadonly = false;
            _this.memberBirth = res.data.birthday;
          }
          if(!(res.data.portalMemberBabyResponseList[0] == "" || res.data.portalMemberBabyResponseList[0] == undefined || res.data.portalMemberBabyResponseList[0] == null)){
            _this.babyYear1 = res.data.portalMemberBabyResponseList[0].babyBirthday;
            _this.babybirth1 = res.data.portalMemberBabyResponseList[0].babyAge;
            _this.baby1Sex = res.data.portalMemberBabyResponseList[0].babySex + "";
          }
          if(!(res.data.portalMemberBabyResponseList[1] == "" || res.data.portalMemberBabyResponseList[1] == undefined || res.data.portalMemberBabyResponseList[1] == null)){
            _this.babyYear2 = res.data.portalMemberBabyResponseList[1].babyBirthday;
            _this.babybirth2 = res.data.portalMemberBabyResponseList[1].babyAge;
            _this.baby2Sex = res.data.portalMemberBabyResponseList[1].babySex + "";
          }

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
                isAvailable: true
              });
            }
          });
        }
        // _this.realMembercode = res.data.memberCode;
        // _this.realMemberCode = _this.memberCode;
        // _this.realMemberId = "602511";
      });
      // _this.realMemberCode = _this.memberCode;
      // _this.realMemberId = "602511";
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
      bindTicket({
        tradeTime: this.tradeDate,
        ticketNo: this.ticketNo,
        counter: this.counter,
        memberCode: this.memberCode
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
        searchTradeBindList({ memberCode: "20170912662761" }).then(res => {
          if (res.code == "100") {
            this.$message({
              message: "小票绑定明细查询错误",
              type: "warning"
            });
          }

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
}
.trade-area {
  background-color: #fff;
  margin-bottom: 20px;
  height: 250px;
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