export const login = '/v1/login'                                                       //loginIn
export const getUserInfo = 'https://gitee.com/api/v5/user'                             //获取用户信息  参数  access_token
export const uploadCla = '/v1/cla'                                                     //上传Cla post 参数  text,name,language,user
export const getClaInfo = '/v1/cla'                                                    //获取cla get
export const delCla = '/v1/cla'                                                        //删除cla delete
export const uploadMeta = '/v1/cla-metadata'                                           //上传metadata get
export const getMeta = '/v1/cla-metadata'                                              //获取metadata get
export const delMeta = '/v1/cla-metadata'                                              //删除metadata delete
export const getOrgsInfo = 'https://gitee.com/api/v5/user/orgs'                          //获取授权用户的组织信息
// export const getRepositoriesOfOrg = `https://gitee.com/api/v5/orgs/${org}/repos`    //获取仓库信息
export const linkRepository = '/v1/cla-org'                                            //绑定开源项目  post
export const getLinkedRepoList = '/v1/cla-org'                                         //获取已绑定的开源项目list /platform/org_id?repo_id&apply_to
export const unLinkRepository = '/v1/cla-org'                                          //解除绑定开源项目 delete
export const individual_signing = '/v1/individual-signing'                             //个人签署协议 方式post 参数/cla_org_id,  name,email,info
export const corporation_signing = '/v1/corporation-signing'                           //企业签署协议 方式post 参数  cla_org_id,email,info
export const active_corporation = '/v1/corporation-signing'                            //激活企业     方式put 参数  cla_org_id,corporation_name,admin_email,enabled
export const employee_signing = '/v1/employee-signing'                                 //企业个人签署协议 方式post 参数 /cla_org_id,  name,email,info
export const verifyCode = '/v1/verifyCode'                                             //签署协议 参数
export const relogin = '/v1/relogin'                                                   //企业管理员登陆  参数 userName pwd
export const addUser = '/v1/addUser'                                                   //新增企业管理员  参数 userName pwd email
export const deleteCon = '/v1/deleteContributor'                                       //删除企业白名单
export const changeActive = '/v1/changeActive'                                         //修改企业白名单人员状态
export const getSignPage = '/v1/cla-org'                                               //获取已绑定cla的组织   方式get   参数platform、org_id、apply_to
export const corporationManager = '/v1/corporation-manager'                            //激活企业发送root账号   方式post   参数cla_org_id、email
export const corporationManagerAuth = '/v1/corporation-manager/auth'                   //企业管理员登陆      方式post   参数org_id、repo_id,platform,user,password
export const resetPassword = '/v1/corporation-manager'                                 //企业管理员重置密码      方式put   参数cla_org_id、email,old_password,new_password
export const addEmployeeManager = '/v1/employee-manager'                               //添加企业个人签署者管理员   方式post   参数cla_org_id、emails
export const deleteEmployeeManager = '/v1/employee-manager'                            //删除企业个人签署者管理员   方式delete   参数cla_org_id、emails
export const queryEmployeeManager = '/v1/employee-manager'                             //获取企业个人签署者管理员   方式get   参数cla_org_id、email
export const queryEmployee = '/v1/employee-signing'                                    //获取企业个人签署者   方式get   参数platform、org_id,repo_id,corporation_email
export const enableEmployee = '/v1/employee-signing'                                   //激活企业个人签署者   方式put   参数/email,
export const deleteEmployee = '/v1/employee-signing'                                   //激活企业个人签署者   方式delete   参数/email,
export const getAuthCodeUrl = '/v1/auth/authcodeurl'                                   //获取授权登陆的链接   方式get   参数/platform,/purpose
export const getEmail = 'https://gitee.com/api/v5/emails'                              //获取授权用户的邮箱   方式get   参数access_token
export const getAuthEmail = '/v1/email/authcodeurl/gmail'                              //邮箱授权             方式get
export const sendVerifyCode = '/v1/corporation-signing'                                //给邮箱发送验证码        方式put  参数：/cla_org_id,email
export const uploadSignature = '/v1/org-signature'                                     //上传pdf签名页        方式post  参数：/cla_org_id
export const downloadSignature = '/v1/org-signature'                                   //下载pdf签名页        方式get  参数：/cla_org_id
export const getPrivacy = '/v1/getPrivacy'                                             //获取隐私声明          方式get
