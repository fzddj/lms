/*global Vue*/
import Router from 'vue-router'
import login from '@/views/login/login';
import home from '@/views/home/home';
import addClue from '@/views/clue/addClue';
//import addCustomer from '@/views/customer/addCustomer';
//import addWill from '@/views/clue/addWill';
import defeat from '@/views/clue/defeat';
import clueDetail from '@/views/clue/clueDetail';
import customerDetail from '@/views/customer/customerDetail';
import addRemark from '@/views/customer/addRemark';
import arrival from '@/views/customer/arrival';
import customerTag from '@/views/customer/customerTag';
import customerDefeatDetail from '@/views/customer/customerDefeatDetail';
import customerBookingCar from '@/views/customer/customerBookingCar';
import customerDeliveryCar from '@/views/customer/customerDeliveryCar';
import customerBookingDetail from '@/views/customer/customerBookingDetail';
import customerDeliveryCarDetail from '@/views/customer/customerDeliveryCarDetail';
//import customerDefeatInfo from '@/views/customer/customerDefeatInfo';
//import editCustomerDetail from '@/views/customer/editCustomerDetail';
import editCustomerBookingDetail from '@/views/customer/editCustomerBookingDetail';
import editCustomerDefeatDetail from '@/views/customer/editCustomerDefeatDetail';

Vue.use(Router);

module.exports = new Router({
  routes: [
    { path: '/', redirect: '/login' },
    // { path: '/', redirect: '/home' },
    // { path: '/', redirect: '/editCustomerDetail' },
    {
      path: '/login',
      name: '登陆',
      component: login
    },
    {
      path: '/home',
      name: '首页',
      component: home
    },
    {
      path: '/addClue',
      name: '添加线索',
      component: addClue
    },
    //{
    //  path: '/addCustomer',
    //  name: '新建客户',
    //  component: addCustomer
    //},
    //{
    //  path: '/addWill',
    //  name: '转化客户',
    //  component: addWill
    //},
    {
      path:'/defeat',
      name:'战败',
      component:defeat
    },
    {
      path:'/clueDetail',
      name:'线索详情',
      component:clueDetail
    },
    {
      path:'/customerDetail',
      name:'意向客户详情',
      component:customerDetail
    },
    {
      path:'/addRemark',
      name:'添加备注',
      component:addRemark
    },
    {
      path:'/arrival',
      name:'添加到店',
      component:arrival
    },
    {
      path:'/customerTag',
      name:'客户标签',
      component:customerTag
    },
    {
      path:'/customerDefeatDetail',
      name:'客户战败',
      component:customerDefeatDetail
    },
    {
      path:'/customerBookingCar',
      name:'客户订车',
      component:customerBookingCar
    },
    {
      path:'/customerDeliveryCar',
      name:'客户交车',
      component:customerDeliveryCar
    },
    {
      path:'/customerBookingDetail',
      name:'订车详情',
      component:customerBookingDetail
    },
    {
      path:'/customerDeliveryCarDetail',
      name:'交车详情',
      component:customerDeliveryCarDetail
    },
    //{
    //  path:'/customerDefeatInfo',
    //  name:'战败详情',
    //  component:customerDefeatInfo
    //},
    //{
    //  path:'/editCustomerDetail',
    //  name:'编辑客户详情',
    //  component:editCustomerDetail
    //},
    {
      path:'/editCustomerBookingDetail',
      name:'编辑订车客户详情',
      component:editCustomerBookingDetail
    },
    {
      path:'/editCustomerDefeatDetail',
      name:'编辑战败客户详情',
      component:editCustomerDefeatDetail
    }
  ]
});