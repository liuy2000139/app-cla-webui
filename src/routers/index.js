import { createRouter, createWebHistory } from 'vue-router';

import { useCommonStore } from '../stores/common';

export const routes = [
  {
    path: '/',
    name: 'Index',
    redirect: '/index',
    meta: {
      title: 'index',
      pageType: 'notLogin',
    },
  },

  {
    path: '/index',
    component: () => import('../views/Index.vue'),
    meta: {
      title: 'index',
      pageType: 'notLogin',
    },
    children: [
      {
        path: '',
        name: 'PlatformSelect',
        component: () => import('../views/PlatformSelect.vue'),
        meta: {
          title: 'platform select',
          pageType: 'notLogin',
        },
      },
      {
        path: '/corporationManagerLogin/:linkId',
        name: 'CorporationManagerLogin',
        component: () => import('../views/CorporationManagerLogin.vue'),
        meta: {
          title: 'corporation manager login',
          pageType: 'notLogin',
        },
      },
      {
        path: '/orgSelect',
        name: 'OrgSelect',
        meta: {
          title: 'org select',
          pageType: 'notLogin',
        },
        component: () => import('../views/OrgSelect.vue'),
      },
    ],
  },
  {
    path: '/home',
    component: () => import('../views/Home.vue'),
    meta: {
      title: 'home',
      pageType: 'org',
    },
    children: [
      {
        path: '',
        meta: {
          title: 'linked repo',
          pageType: 'org',
        },
        redirect: '/linkedRepo',
      },
      {
        path: '/linkedRepo',
        name: 'LinkedRepo',
        meta: {
          title: 'linked repo',
          pageType: 'org',
        },
        component: () => import('../views/LinkedRepo.vue'),
      },
      {
        path: '/corporationList/:linkId',
        name: 'CorporationList',
        meta: {
          title: 'corporation list',
          pageType: 'org',
        },
        component: () => import('../views/CorporationList.vue'),
      },
      {
        path: '/bind-cla',
        component: () => import('../views/ConfigCla.vue'),
        meta: {
          title: 'bind cla',
          pageType: 'org',
        },
        children: [
          {
            path: '',
            redirect: '/config-org',
            meta: {
              title: 'config org',
              pageType: 'org',
            },
          },
          {
            path: '/config-org',
            name: 'ConfigOrg',
            meta: {
              title: 'config org',
              pageType: 'org',
            },
            component: () => import('../views/ConfigOrg.vue'),
          },
          {
            path: '/config-cla-link',
            name: 'ConfigClaLink',
            meta: {
              title: 'config cla link',
              pageType: 'org',
            },
            component: () => import('../views/ConfigClaLink.vue'),
          },
          {
            path: '/config-fields',
            name: 'ConfigFields',
            meta: {
              title: 'config fields',
              pageType: 'org',
            },
            component: () => import('../views/ConfigFields.vue'),
          },
          {
            path: '/config-email',
            name: 'ConfigEmail',
            meta: {
              title: 'config email',
              pageType: 'org',
            },
            component: () => import('../views/ConfigEmail.vue'),
          },
          {
            path: '/config-check',
            name: 'ConfigCheck',
            meta: {
              title: 'config check',
              pageType: 'org',
            },
            component: () => import('../views/ConfigCheck.vue'),
          },
        ],
      },
      {
        path: '/addIndividualCla',
        component: () => import('../views/AddIndividualCla.vue'),
        children: [
          {
            path: '',
            redirect: '/addIndividualUrl',
          },
          {
            path: '/addIndividualUrl',
            name: 'AddIndividualUrl',
            meta: {
              title: 'addIndividual cla',
              pageType: 'org',
            },
            component: () => import('../views/AddIndividualUrl.vue'),
          },
        ],
      },
      {
        path: '/addCorpCla',
        component: () => import('../views/AddCorpCla.vue'),
        children: [
          {
            path: '',
            redirect: '/addCorpUrl',
          },
          {
            path: '/addCorpUrl',
            name: 'AddCorpUrl',
            meta: {
              title: 'add corp cla',
              pageType: 'org',
            },
            component: () => import('../views/AddCorpUrl.vue'),
          },
        ],
      },
    ],
  },
  {
    path: '/corp/:linkId',
    component: () => import('../views/Corp.vue'),
    children: [
      {
        path: 'employeeList',
        name: 'EmployeeList',
        meta: {
          title: 'employee list',
          pageType: 'corp',
        },
        component: () => import('../views/EmployeeList.vue'),
      },
      {
        path: 'managerList',
        name: 'ManagerList',
        meta: {
          title: 'manager list',
          pageType: 'corp',
        },
        component: () => import('../views/ManagerList.vue'),
      },
      {
        path: 'subemail',
        name: 'Subemail',
        meta: {
          title: 'subemail',
          pageType: 'corp',
        },
        component: () => import('../views/Subemail.vue'),
      },
      {
        path: 'add-subemail',
        name: 'AddSubemail',
        meta: {
          title: 'add-subemail',
          pageType: 'corp',
        },
        component: () => import('../views/AddSubemail.vue'),
      },
      {
        path: 'createManager',
        name: 'CreateManager',
        meta: {
          title: 'create manager',
          pageType: 'corp',
        },
        component: () => import('../views/CreateManager.vue'),
      },
      {
        path: 'resetPassword',
        name: 'resetPassword',
        meta: {
          title: 'reset password',
          pageType: 'corp',
        },
        component: () => import('../views/ResetPassword.vue'),
      },
      {
        path: 'reset-password',
        name: 'FindResetPassword',
        meta: {
          title: 'reset password',
          pageType: 'notLogin',
        },
        component: () => import('../views/FindResetPassword.vue'),
      },
      {
        path: 'retrieve-password',
        name: 'ForgetAndResetPwd',
        meta: {
          title: 'retrieve password',
          pageType: 'notLogin',
        },
        component: () => import('../views/ForgetAndSendEmail.vue'),
      },
    ]
  },
  {
    path: '/sign/:params',
    name: 'SignType',
    meta: {
      title: 'sign',
      pageType: 'notLogin',
    },
    component: () => import('../views/SignType.vue'),
  },
  {
    path: '/sign/:params/:orgAddress',
    name: 'SignType_back',
    meta: {
      title: 'sign',
      pageType: 'notLogin',
    },
    component: () => import('../views/SignType.vue'),
  },

  {
    path: '/sign-page',
    meta: {
      title: 'sign-page',
      pageType: 'notLogin',
    },
    component: () => import('../views/SignPage.vue'),
    children: [
      {
        path: '',
        redirect: '/sign-cla',
      },
      {
        path: '/sign-cla/:linkId/:loginType',
        name: 'SignCla',
        meta: {
          title: 'sign-cla',
          pageType: 'notLogin',
        },
        component: () => import('../views/SignCla.vue'),
      },
      {
        path: '/privacy/:type?/:linkId?',
        name: 'Privacy',
        meta: {
          title: 'privacy',
          pageType: 'notLogin',
        },
        component: () => import('../views/Privacy.vue'),
      },
    ],
  },
  {
    path: '/cla-pdf',
    name: 'ClaPdf',
    meta: {
      title: 'cla-pdf',
      pageType: 'notLogin',
    },
    component: () => import('../views/ClaPdf.vue'),
  },
  {
    path: '/password/:link_id',
    meta: {
      title: 'password',
      pageType: 'notLogin',
    },
    component: () => import('../views/ForgetPassword.vue'),
    children: [
      {
        path: '',
        redirect: (to) => {
          // 'to' 是一个路由位置对象，包含了很多有用的信息，比如 params, query, name, path 等
          // 但对于动态段，我们需要从 parent 中获取
          return { path: `/retrieve-password/${to.params.link_id}` };
          // 注意：在某些情况下，你可能需要使用 to.match.params 而不是 to.params
          // 这取决于你的路由配置和 Vue Router 的版本
        },
      },
    ],
  },
  {
    path: '/:catchAll(.*)',
    name: 'ErrorPath',
    meta: {
      title: 'ErrorPath',
    },
    component: () => import('../views/ErrorPath.vue'),
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

router.beforeEach((to, from, next) => {
  const commonStore = useCommonStore();
  if (to.meta?.title) {
    document.title = to.meta.title;
  }
  if (from.path === '/resetPassword') {
    if (to.name === 'CorporationManagerLogin') {
      next();
    } else {
      if (commonStore.pwdIsChanged === true) {
        next();
      } else {
      }
    }
  } else {
    next();
  }
  if (
    ['SignType', 'SignType_back', 'SignCla', 'CorporationManagerLogin'].includes(to.name) ||
    ['/index', '/orgSelect', '/verify-email', '/reset-password'].includes(to.path)
  ) {
    commonStore.setShowHeaderMenu('false');
  } else if (
    ['CorporationList'].includes(to.name) ||
    ['/home', '/linkedRepo', '/bind-cla', '/config-org', '/config-cla-link', '/config-fields', '/config-email', '/config-check', '/addIndividualUrl', '/addCorpUrl'].includes(to.path)
  ) {
    commonStore.setShowHeaderMenu('org');
  } else {
    commonStore.setShowHeaderMenu('corp');
  }
});


