import request from '../utils/request';

export const fetchData = (query) => {
    return request({
        url: '/ms/table/list',
        method: 'post',
        data: query
    })
}

export const registMember = (memberInfo) => {
    return request({
        url: '/'
    })
}

export const test = (query) => {
    return request({
        url: '/member/findOrderList?memberCode=20170912662761&offset=0&limit=10',
        method: 'get',
        data: query
    })
}

export const searchMemberInfo = (query) => {
    return request({
        url: '/member/findMemberInfo/' + query.memberCode,
        method: 'get',
        data: query
    })
}

export const isMember = (query) => {
    return request({
        url: '/member/isMobileReg/?mobile=' + query.mobile,
        method: 'get',
        data: query
    })
}

export const addMember = (form) => {
    return request({
        url: '/member/addMember',
        method: 'post',
        data: form
    })
}

export const searchOrderList = (query) => {
    return request({
        url: '/member/findOrderList?memberCode=' + query.memberCode + '&offset=0&limit=1000',
        method: 'get'
    })
}

export const searchTradeBindList = (query) => {
    return request({
        url: 'member/findTradeBindList?memberCode=' + query.memberCode + '&offset=0&limit=1000',
        method: 'get'
    })
}

export const searchAvalibleCouponList = (query) => {
    return request({
        url: 'member/findMemberCouponList?memberId=' + query.memberId + '&counter=' + query.counter + '&status=1',
        method: 'get'
    })
}

export const searchUnAvalibleCouponList = (query) => {
    return request({
        url: 'member/findMemberCouponList?memberId=' + query.memberId + '&counter=' + query.counter + '&status=2',
        method: 'get'
    })
}

export const bindTicket = (query) => {
    return request({
        url: 'member/bindTradeBing?memberCode=' + query.memberCode + '&counter=' + query.counter + '&ticketNo=' + query.ticketNo + '&tradeTime=' + query.tradeTime,
        method: 'get'
    })
}

export const consumeCoupon = (query) => {
    return request({
        url: 'member/couponWriteOff?memberCode=' + query.memberCode + '&counter=' + query.counter + '&ticketNo=' + query.ticketNo + '&tradeTime=' + query.tradeTime + "&couponCode=" + query.couponCode,
        method: 'get'
    })
}

export const updateMemberSex = (query) => {
    return request({
        url: 'member/updateMemberInfo?memberId=' + query.memberId + '&sex=' + query.sex,
        method: 'get'
    });
}

export const updateMemberName = (query) => {
    return request({
        url: 'member/updateMemberInfo?memberId=' + query.memberId + '&name=' + query.name,
        method: 'get'
    });
}

export const updateMemberBirthday = (query) => {
    return request({
        url: 'member/updateMemberInfo?memberId=' + query.memberId + '&birthday=' + query.birthday,
        method: 'get'
    });
}

export const insertMemberBabyInfo = (data) => {
    return request({
        url: 'member/addMemberBabyInfo?sex=' + data.babySex + '&birthday=' + data.babyBirthday + '&memberId=' + data.memberId,
        method: 'get'
    });
}

export const updateMemberBabyInfo = (data) => {
    return request({
        url: 'member/updateMemberBabyInfo?sex=' + data.babySex + '&birthday=' + data.babyBirthday + '&babyId=' + data.babyId,
        method: 'get'
    });
}

export const login = (query) => {
    return request({
        url: 'user/login/' + query.userName + '/' + query.password,
        method: 'get'
    });
}