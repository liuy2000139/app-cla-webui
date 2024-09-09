export default {
  failedTitle: '失败',
  successTitle: '成功',
  warningTitle: '警告',
  dialogBt: '确定',
  no_cla_binding_corp: '该组织没有可用的企业贡献者许可协议',
  no_cla_binding_emp: '该组织没有可用的员工贡献者许可协议',
  no_cla_binding_individual: '该组织没有可用的个人贡献者许可协议',
  has_signed: '您已签署过这份贡献者许可协议',
  corp_has_signed: '该企业已经签署过这份贡献者许可协议',
  invalid_parameter: '参数无效，无法签署',
  no_corp_manager:
    '你所属的公司暂未签署企业 CLA 或者尚未添加任何管理员。你无法进行员工签署',
  has_not_signed: '该公司尚未签署',
  invalid_token: 'Token 已过期，请重新登录',
  missing_token: 'Token 无效，请重新登陆',
  unknown_token: 'Token 无效，请重新登陆',
  unauthorized_token: 'Token 权限不匹配，请重新授权登陆',
  uncompleted_signing: '该公司的签署流程还未完成',
  unknown_email_platform: '目前不支持此类型的邮箱',
  failed_to_send_email: '发送邮件失败',
  wrong_verification_code: '验证码错误',
  restricted_email_suffix: '受限的电子邮件域名,请使用公司的专属邮箱',
  expired_verification_code: '验证码已过期',
  pdf_has_not_uploaded: '未上传组织的签名',
  num_of_corp_managers_exceeded: '管理员人数超出限制',
  corp_manager_exists: '名称已存在',
  not_same_corp: '电子邮件不属于该公司',
  not_ready_to_sign: '组织尚未就绪',
  system_error: '系统错误，请重试',
  unknown_error: '未知错误，请联系社区管理员或提交 YAML',
  title_type_repeat: '填充了相同的标题或类型',
  individual_sign: '感谢你的签署',
  corp_sign: '已向您发送电子邮件，请按照邮件中的步骤完成签署',
  emp_sign: '已向您发送电子邮件，请检查签署文件',
  invalid_telephone_num: '无效的电话号码',
  not_fill_telephone_num: '请输入电话号码',
  not_fill_address: '请输入地址',
  not_fill_fax: '请输入传真',
  invalid_email: '无效的电子邮件',
  sending_email: '已向您的邮箱发送了验证码',
  not_fill_email: '请输入正确的电子邮箱',
  not_fill_org: '请选择企业',
  send_find_pwd_email:
    '已向您的邮箱发送了重置密码的邮件，请根据提示完成密码重置',
  no_public_email_1:
    '抱歉，无法从您的 {platform} 帐户获取提交代码的电子邮件，请',
  click_here: '点击此处',
  gitee_no_public_email_2:
    '进入邮箱设置页面，取消勾选不公开我的邮箱地址选项，如果您还未为你的账户绑定任何邮箱，请点击新增，绑定邮箱后再试',
  github_no_public_email_2:
    '进入邮箱设置页面，取消勾选保持我的邮箱地址私有选项，如果您还未为你的账户绑定任何邮箱，请点击新增，绑定邮箱后再试',
  not_authorize_email: '你没有授权我们访问你的电子邮件，请检查并重试',
  not_authorize_group: '你没有授权我们访问你的组织信息，请授权后再试',
  refuse_authorize: '您未同意授权访问您的 {platform} 账户信息，无法继续签署',
  lang_error: '语言错误',
  fill_name: '请输入姓名',
  fill_corp_name: '请输入公司名称',
  fill_representative_title: '请输入代表职务',
  fill_representative_name: '请输入代表姓名',
  fill_date: '请输入日期',
  fill_verification_code: '请输入验证码',
  fill_authorize_code: '请输入授权码',
  review_privacy: '请查看隐私声明',
  not_fill_id: '请输入用户名',
  invalid_account_or_pw: '旧密码无效，请重试',
  fill_pwd: '请输入密码',
  id_pwd_err: '账号或者密码错误，请重试',
  id_pwd_err_new: '账号或者密码错误，',
  id_pwd_err_corp: '次后冻结',
  user_login_frozen: '该账户已被冻结，五分钟后重试',
  same_email: '不能填写相同的邮箱，请检查后重试',
  same_id: '不能填写相同的 ID，请检查后重试',
  exits_email: '邮箱已存在，请检查后重试',
  exits_id: 'ID 已存在，请检查后重试',
  invalid_id: 'ID 格式错误，ID 只能包含大小写字母、数字、_和.',
  paste_individual_link: '请粘贴应用于个人签署的 CLA 链接',
  select_individual_language: '请选择应用于个人签署的 CLA 的语言',
  paste_corp_link: '请粘贴应用于企业签署的 CLA 链接',
  select_corp_language: '请选择应用于企业签署的 CLA 的语言',
  authorized_email: '请为组织或仓库授权一个邮箱用于与签署者通讯',
  upload_signature_file: '请上传代表社区的签名的 PDF 文件',
  not_upload_file: '暂未上传文件，请上传后再试',
  no_file_can_download: '暂无可用文件',
  no_lang: '暂不支持{language}，请在右上角切换语言后再试',
  no_pdf_of_corp: '暂未上传企业签署得 PDF 文件，请上传后再试',
  not_pdf: '上传的文件必须是 PDF!',
  file_too_large: '上传的文件太大了!',
  cla_exists: '{lang}协议已存在，请选择其他语言后再试',
  email_system_error: '邮箱授权失败，请稍后再试',
  error_parsing_api_body: '参数错误，请重试',
  unmatched_email: '签署的邮箱与授权账号邮箱不相同',
  unmatched_user_id: '签署的 ID 与授权账号 ID 不相同',
  no_link: '该社区尚未绑定 CLA',
  unmatched_cla: '当前的 CLA 不是最新的 CLA，请刷新页面后重试',
  link_exists: '该社区已经存在绑定信息',
  checkRepoMessage:
    '您输入的仓库不属于该组织或者该仓库为私有仓库或者该仓库不存在，是否继续？',
  cla_is_used: '该 CLA 已经被使用',
  go_to_sign_employee_cla:
    '你所在的公司已经签署企业 CLA，所以你只能签署员工 CLA',
  page_error: '页面错误，请关闭页面重新打开',
  subemailErr: '请输入符合邮箱扩展规则的子邮箱',
  noSession: '系统错误，请刷新邮箱域名列表后再试',
  sameEmailSuffix: '邮箱域名已存在，请勿重复添加',
  no_link_or_unsigned: '无效的绑定信息',
  not_support_platform:
    '暂不支持该平台的隐私声明，请将隐私声明存储到 Gitee 或者 Github 的公开仓库',
  has_same_lang_privacy: '请勿配置相同语言的隐私声明',
  privacy_conf_err: '隐私声明配置错误',
  unknown_email: '该邮箱不是管理员的邮箱',
  reset_password_success: '重置密码成功',
  link_expired: '链接已失效',
  illegal_link: '非法链接',
  send_reset_password_email: '已向您的邮箱发送了重置密码的邮件',
  loading: '加载中',
  select_file: '请先选择需要上传的文件',
};