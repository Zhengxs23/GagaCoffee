const BottomChildrens = [{
    path: '/home',
    alias: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/menu',
    name: 'Menu',
    component: () => import('../views/Menu.vue')
  },
  {
    path: '/shop',
    name: 'Shop',
    component: () => import('../views/Shop.vue')
  },
  {
    path: '/my',
    name: 'My',
    component: () => import('../views/My.vue')
  },
];

export const routes = [{
    path: '/',
    name: 'Bottom',
    component: () => import('../views/Bottom.vue'),
    children: BottomChildrens
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
  {
    path:'/detail',
    name:'Detail',
    component:()=>import('../views/Details.vue')
  },
  {
    path:'/addressList',
    name:'AddressList',
    component:()=>import('../views/AddressList.vue')
  },
  {
    //?表示可传递也可不传递
    path:'/address:aid?',
    name:'Address',
    component:()=>import('../views/Address.vue')
  },
  {
    path:'/pay',
    name:'Pay',
    component:()=>import('../views/Pay.vue')
  },
  {
    path:'/order',
    name:'Order',
    component:()=>import('../views/Order.vue')
  },
  {
    path:'/collect',
    name:'Collect',
    component:()=>import('../views/Collect.vue')
  },
  {
    path:'/myself',
    name:'Myself',
    component:()=>import('../views/Myself.vue')
  },
  {
    path:'/safe',
    name:'Safe',
    component:()=>import('../views/Safe.vue')
  }
]