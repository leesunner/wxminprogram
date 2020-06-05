const URL =  '';//ip或接口域名
const VERS = '/center-users/v1'
function rule (str){
  return URL+VERS+str
}
const api = {
  menus:rule('/api/index/app/menu/'),//获取菜单(一级)或是后面跟其他参数获取对应 菜单的子菜单
  buttons:rule('/api/user/info/menu/'),//获取按钮权限
  banner:rule('/api/index/h5/banner'),//获取首页banner
  article:rule('/api/index/h5/article'),//获取首页文章
  partyWork:rule('/api/index/app/menu/26/children'),//获取党务列表
  bussineWork:rule('/api/index/app/menu/27/children'),//获取事务列表
  financeWork:rule('/api/index/app/menu/28/children'),//获取财务列表
  getWorkCount:rule('/api/activiti/gaCount'),//获取个人中心事项数量
  baseUrl:URL+VERS,//host+网关
  workFormData:rule('/api/activiti/form/info/'),//根据taskid获取流程表单
  notice:rule('/api/user/notice'),//我的消息相关
  myReport:rule('/api/activiti/publicity'),//公告相关
  sendNotice:rule('/api/user/notice'),//发布公告
  uploadFiles:rule('/api/file/weed'),//流程上传文件
  feedback:rule('/api/index/app/feedback'),//反馈信息
  gtasks:rule('/api/activiti/gtasksPage'),//待办列表
  endGtasks:rule('/api/activiti/endGtasksPage'),//已办列表
  endGtasksDetail:rule('/api/activiti/form/data/'),//已办详情
  applyProc:rule('/api/activiti/applyProc'),//申请列表
  draftList:rule('/api/activiti/draft/page'),//草稿列表
  saveDraft:rule('/api/activiti/draft/save'),//保存流程为草稿
  getNewsDetail:rule('/api/index/h5/article/'),//获取新闻详情
  sendCode:rule('/api/index/app/send/'),//发送验证码
  phoneRegister:rule('/api/index/third/register/phone '),//手机注册
  acountRegister:rule('/api/index/third/register/username '),//账户注册
  getOpenid:rule('/api/index/third/login/jscode'),//获取openid
  getUserInfo:rule('/api/index/third/login/exchange/openid'),//通过openid获取用户信息
  bindAccount:rule('/api/index/third/login/binding/username'),//账户绑定/登录
  bindTelphone:rule('/api/index/third/login/binding/phone'),//手机绑定/登录
  telphoneLogin:rule('/api/index/mini/phone-login'),//手机号登录
  // accountLogin:rule('/api/index/mini/login'),//用户名登录
  // loginout:rule('/api/user/info/logout'),//退出登录
  checkTelCode:rule('/api/index/app/validate-code'),//手机号验证
  confirmPass:rule('/api/index/app/password/reset'),//确认修改密码
  updateTelephone:rule('/api/user/setting/telephone'),//确认修改手机号
  userDetail:rule('/api/user/info'),//获取用户资料信息
  provice:rule('/api/dict/location/province'),//获取省
  city:rule('/api/dict/location/province/'),//获取市
  district:rule('/api/dict/location/province/city/'),//获取区县
  twon:rule('/api/dict/location/province/city/district/'),//获取镇
  village:rule('/api/dict/location/province/city/district/town/'),//获取村
  hotWords:rule('/api/index/h5/search/hotKeywords'),//获取搜索热词
  allSearch:rule('/api/index/h5/search'),//搜索页综合搜索
  contentSearch:rule('/api/index/h5/search/article'),//搜索页内容搜索
  usersSearch:rule('/api/index/h5/search/user'),//搜索页用户搜索
  categories:rule('/api/index/mini/categories'),//获取栏目
  indexReport:rule('/api/activiti/publicity/last/id'),//首页banner公告公示ID
  indexReportDetail:rule('/api/activiti/publicity/'),////首页banner公告公示详情{id}
  userWorkFlowNum:rule('/api/summary/users/task/count/'),//根据时间查询用待办，已办，申请等事项完成情况统计(饼子图)
  userHotTopFive:rule('/api/summary/users/task/top-five/'),//热门事件top5
  allWorksNum:rule('/api/summary/users/task/business-type/'),//总事项项目
  // userLoginRecord:rule('/api/summary/users/login-info'),//查询用户登录ip列表
  addAppraise:rule('/api/activiti/task/comment'),//节点提交评论
  getAppraiseDetail:rule('/api/activiti/task/comment/'),//通过id查评论详情
}
module.exports = api;