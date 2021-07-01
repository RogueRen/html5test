
# 商城H5演示DEMO

该项目是提供给外包团队的商城H5开发演示文档


## 在线文档

https://s1.mi.com/m/partner/eg/out/global.html

## 线上测试地址

https://s1.mi.com/m/partner/eg/index.html

![mishop demo](https://s1.mi.com/m/partner/eg/qrcode.png "mishop demo")

## 文件说明

### [sdk.js](https://github.com/macaienlei/shop_demo/blob/master/sdk.js)

商城开放给h5的部分能力和部分工具方法

```
@global platform                    - 判断客户端环境
@property platform.isApp            - 商城安卓客户端
@property platform.isIOSApp         - 商城评估客户端
@property platform.isMiniprogram    - 商城微信小程序
@property platform.isMiuiBrowser    - 小米手机miui浏览器
@property platform.isWeixin         - 微信 webview
@func goProduct                     - 跳转单品页（全端支持跳转）
@func goAppWallet                   - 跳转客户端我的钱包（仅商城APP支持）
@func goActivity                    - 跳转活动页（全端支持跳转）
@func goHome                        - 跳转首页（全端支持跳转）
@func isLogin                       - 判断用户登录状态
@func doLogin                       - 执行登录账号
@func shareInitApp                  - 注册客户端分享(仅商城APP支持，被动模式)
@func shareOpenApp                  - 打开客户端分享(仅商城APP支持，主动模式)
@func downloadImg                   - 保存单张url图片(仅商城APP支持)
@func downloadBase64Img             - 保存单张base64图片(仅商城安卓APP支持)
```

### [wxa.js](https://github.com/macaienlei/shop_demo/blob/master/wxa.js)

微信开放给h5的部分能力和方法

```
@func getWXSign                      - 获取微信权限验证配置信息（注册微信自定义分享需要）
```

### [stat.js](https://github.com/macaienlei/shop_demo/blob/master/stat.js)

```
商城统计代码（自研 + 百度统计），项目中必须引入
```

### [index.html](https://github.com/macaienlei/shop_demo/blob/master/index.html) & [app.js](https://github.com/macaienlei/shop_demo/blob/master/app.js)

```
演示demo基于vue框架开发，可自行选择http库必须支持jsonp跨域请求（demo中采用fetch-jsonp）
```

## 自定义上报统计数据

```
/**
 * 小米自研-点击触发上报事件（如有需求由小米商城研发协调配置并提供相关参数）
 * _msq.push(['trackEvent', 'logCode', 'url', '', {'extent': '额外参数' }]);
 * @param {string} trackEvent       - 点击事件类型
 * @param {string} logCode          - 由埋点管理系统生成
 * @param {string} [url]            - 跳转的目标url
 * @param {string} [pid]            - 位置ID(统计代码生成的会自带位置ID，自定义点击事件留空)
 * @param {JSON} [{extend}]         - 点击事件需要上报的额外参数，必须保证数组第5位
 */
_msq.push(['trackEvent', 'hd#bpm=&uni=&cdm=&next=6.64.2.产品ID']);


/**
 *  百度统计-点击触发上报事件
 */
_hmt.push(['_trackEvent', '类型', '操作', '标签']);
```

## 登录逻辑 isLogin 和 doLogin

app.js > isLogin() 判断账号登录状态

app.js > doLogin() 提供账号登录能力

```
if (!isLogin()) {
  // 未登录状态
  doLogin()
  return
}
// 已登录状态
```

## 微信自定义分享

1. 引入微信的sdk.js文件 https://res.wx.qq.com/open/js/jweixin-1.6.0.js

2. wxa.js > getWXSign() [获取配置信息并完成权限注册](https://github.com/macaienlei/shop_demo/blob/master/app.js#L104)
[官方文档](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html#4)

```
getWXSign(function(err, res){
  if(err){
    self.logging(err)
    return
  }
  wx.config({
    debug: true,
    appId: res.appId,
    timestamp: res.timestamp,
    nonceStr: res.nonceStr,
    signature: res.signature,
    jsApiList: ["updateTimelineShareData", "updateAppMessageShareData", "wx-open-launch-weapp"] //选择需要使用的接口如调用拍照或从手机相册中选图接口
  })
})
```

3. [注册分享内容](https://github.com/macaienlei/shop_demo/blob/master/app.js#L121)
[官方文档](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html#10)

```
wx.updateTimelineShareData({
  title: "带你360°探索 10", //40字
  link: "https://s1.mi.com/m/webgl/J/",
  imgUrl: "https://s1.mi.com/m/webgl/J/Img/shareImg.jpg", //绝对地址
  success: function() {},
  cancel: function() {}
})

//注册微信好友分享内容
wx.updateAppMessageShareData({
  title: "带你360°探索 10", //25字
  desc: "内外都是细节，点击查看",  //35字
  link: "https://s1.mi.com/m/webgl/J/",
  imgUrl: "https://s1.mi.com/m/webgl/J/Img/shareImg.jpg", //绝对地址
  success: function() {},
  cancel: function() {}
})
```

## 微博授权接口

接口请求地址：
```
https://xmt.www.mi.com/index.php
```

请求参数说明：

 | 字段名 | 字段说明 |
 | --- | --- |
 | type | jsonp |
 | m | interface-weibo |
 | do | authorize |
 | redirect_url | 授权成功后回跳url |
 | scope | 6位随机数字 |
 | jsonpCallback | `jsonp${do}` |

请求示例：
```
https://xmt.www.mi.com/index.php?type=jsonp&m=interface-weibo&do=authorize&redirect_url=http%3A%2F%2Fs1.mi.com/examples%2F&scope=447961&jsonpCallback=jsonpauthorize
```

响应示例：
```
jsonpauthorize({"code":0,"msg":"success","data":{"oauth_url":"https:\/\/api.weibo.com\/oauth2\/authorize?client_id=1124658987&response_type=code&redirect_uri=http%3A%2F%2Fs1.mi.com/examples%2F&scope=447961&display=default"}});
```

返回参数：

 | 字段名 | 字段说明 |
 | --- | --- |
 | data.oauth_url | 前端跳转授权地址url，授权成功后跳转至redirect_url?code=access_token |

回跳示例：
```
https://s1.mi.com/m/examples/?code=267603ac9be967816f7ff7078281b56b
```

## 获取微博用户信息接口

接口请求：
```
https://xmt.www.mi.com/index.php
```

参数说明：

 | 字段名 | 字段说明 |
 | --- | --- |
 | type | jsonp |
 | m | interface-weibo |
 | do | usersShow |
 | code | 微博授权接口成功回跳url参数code |
 | jsonpCallback | `jsonp${do}` |

请求示例：
```
https://xmt.www.mi.com/index.php?type=jsonp&m=interface-weibo&do=usersShow&code=267603ac9be967816f7ff7078281b56b&jsonpCallback=jsonpusersShow
```

响应示例：
```
jsonpusersShow({"code":0,"msg":"success","data":{"id":1248113655,"idstr":"1248113655","class":1,"screen_name":"\u56e7\u56fe\u56de\u56f0","name":"\u56e7\u56fe\u56de\u56f0","province":"32","city":"4","location":"\u6c5f\u82cf \u5e38\u5dde","description":"","url":"http:\/\/blog.sina.com.cn\/w3c","profile_image_url":"https:\/\/tvax4.sinaimg.cn\/crop.0.0.1080.1080.50\/4a64b3f7ly8g7fl86h3y3j20u00u0q5h.jpg?KID=imgbed,tva&Expires=1625057566&ssig=9sDLx47afc","cover_image_phone":"http:\/\/ww1.sinaimg.cn\/crop.0.0.640.640.640\/549d0121tw1egm1kjly3jj20hs0hsq4f.jpg","profile_url":"caienlei","domain":"caienlei","weihao":"","gender":"m","followers_count":838,"friends_count":224,"pagefriends_count":0,"statuses_count":939,"video_status_count":0,"video_play_count":0,"favourites_count":161,"created_at":"Wed Apr 21 15:43:54 +0800 2010","following":true,"allow_all_act_msg":false,"geo_enabled":true,"verified":false,"verified_type":-1,"remark":"","insecurity":{"sexual_content":false},"status":{"visible":{"type":0,"list_id":0},"created_at":"Fri Apr 23 11:11:35 +0800 2021","id":4629102466960537,"idstr":"4629102466960537","mid":"4629102466960537","can_edit":false,"version":1,"show_additional_indication":0,"text":"mi.com","textLength":6,"source_allowclick":0,"source_type":2,"source":"<a href=\"http:\/\/weibo.com\/\" rel=\"nofollow\">iPhone\u5ba2\u6237\u7aef<\/a>","favorited":false,"truncated":false,"in_reply_to_status_id":"","in_reply_to_user_id":"","in_reply_to_screen_name":"","pic_urls":[],"geo":null,"is_paid":false,"mblog_vip_type":0,"annotations":[{"shooting":1,"client_mblogid":"iPhone-9839BCB6-36D1-478D-9F0C-AEAEF9A62DF2"},{"mapi_request":true}],"reposts_count":0,"comments_count":0,"attitudes_count":0,"pending_approval_count":0,"isLongText":false,"reward_exhibition_type":0,"hide_flag":0,"mlevel":0,"biz_feature":0,"hasActionTypeCard":0,"darwin_tags":[],"hot_weibo_tags":[],"text_tag_tips":[],"mblogtype":0,"rid":"0","userType":0,"more_info_type":0,"positive_recom_flag":0,"content_auth":0,"gif_ids":"","is_show_bulletin":2,"comment_manage_info":{"comment_permission_type":-1,"approval_comment_type":0},"pic_num":0},"ptype":0,"allow_all_comment":false,"avatar_large":"https:\/\/tvax4.sinaimg.cn\/crop.0.0.1080.1080.180\/4a64b3f7ly8g7fl86h3y3j20u00u0q5h.jpg?KID=imgbed,tva&Expires=1625057566&ssig=%2BGClMwPB7o","avatar_hd":"https:\/\/tvax4.sinaimg.cn\/crop.0.0.1080.1080.1024\/4a64b3f7ly8g7fl86h3y3j20u00u0q5h.jpg?KID=imgbed,tva&Expires=1625057566&ssig=Rrqa3Wp4P5","verified_reason":"","verified_trade":"","verified_reason_url":"","verified_source":"","verified_source_url":"","follow_me":true,"like":false,"like_me":false,"online_status":0,"bi_followers_count":127,"lang":"zh-cn","star":0,"mbtype":0,"mbrank":0,"svip":0,"block_word":0,"block_app":0,"credit_score":80,"user_ability":0,"urank":20,"story_read_state":-1,"vclub_member":0,"is_teenager":0,"is_guardian":0,"is_teenager_list":0,"pc_new":0,"special_follow":false,"planet_video":0,"video_mark":0,"live_status":0,"brand_account":0}});
```

返回参数：

 | 字段名 | 字段说明 |
 | --- | --- |
 | data.avatar_large | 头像180x180 |
 | data.avatar_hd | 头像1024x1024 |
 | data.name | 用户昵称 |

## 微信授权接口

请求接口：
```
https://xmt.www.mi.com/index.php
```

参数说明：

 | 字段名 | 字段说明 |
 | --- | --- |
 | type | jsonp |
 | do | authorize |
 | redirect_url | 授权成功后回跳url |
 | m | interface-weixin |
 | public_id | gh_f10ac97bb079 |
 | jsonpCallback | `jsonp${do}` |
 | sign | md5(`${do}---${jsonpCallback}---${m}---${public_id}---${redirect_url}---jsonp@#$3^*9^#@(XD)5#@%)`) |

请求示例：
```
https://xmt.www.mi.com/index.php?type=jsonp&do=authorize&redirect_url=https%3A%2F%2Fs1.mi.com%2Fm%2Fexamples%2F&m=interface-weixin&public_id=gh_f10ac97bb079&sign=7f7e78ac8ca43bc72a3cffb8fd3907ce&jsonpCallback=jsonpauthorize
```

响应示例：
```
jsonpauthorize({"code":0,"msg":"success","data":{"oauth_url":"https:\/\/open.weixin.qq.com\/connect\/oauth2\/authorize?appid=wx8388fce6cb5c6eca&redirect_uri=https%3A%2F%2Fwx10.www.mi.com%2Fredirect.html%3Fpublicid%3Dgh_f10ac97bb079%26url%3Dhttp%253A%252F%252Flocal-node.mi.com%253A8080%252F&response_type=code&scope=snsapi_userinfo&state=%21%40W%24%25%21%40TR%21%21%40%23%25f2%23%40#wechat_redirect"}});
```

返回参数：

 | 字段名 | 字段说明 |
 | --- | --- |
 | data.oauth_url | 前端跳转授权地址url，授权成功后跳转至redirect_url?code=access_token&publicid=xxx |

回跳示例：
```
https://s1.mi.com/m/examples/?code=051H1x00076VYL1sn7200hcvtQ3H1x07&publicid=gh_f10ac97bb079
```

## 获取微信用户信息

请求接口：
```
https://xmt.www.mi.com/index.php
```

参数说明：

 | 字段名 | 字段说明 |
 | --- | --- |
 | type | jsonp |
 | do | authinfo |
 | code | 微信授权成功回跳链接中url参数code |
 | m | interface-weixin |
 | public_id | gh_f10ac97bb079 |
 | jsonpCallback | `jsonp${do}` |
 | sign | md5(`${code}---${do}---${jsonpCallback}---${m}---${public_id}---jsonp@#$3^*9^#@(XD)5#@%)`) |

请求示例：
```
https://xmt.www.mi.com/index.php?type=jsonp&code=071RRWZv3LwQDW2tnH3w3SOQZy2RRWZy&do=authinfo&m=interface-weixin&public_id=gh_f10ac97bb079&sign=64877f0a545466b47fba3888aaae442d&jsonpCallback=jsonpauthinfo
```

响应示例：
```
jsonpauthinfo({"code":0,"msg":"success","data":{"errcode":0,"errmsg":"","openid":"oMH_Gjl_LlR4y5txZdBNEZ9sFvvE","nickname":"\u8521\u6069\u857e","sex":1,"province":"\u5317\u4eac","city":"\u6d77\u6dc0","country":"\u4e2d\u56fd","headimgurl":"https:\/\/thirdwx.qlogo.cn\/mmopen\/vi_32\/DYAIOgq83eo1ONBtOA5ClPWTj9Whr7jfhJgQHG1Gp0Wt5AiaWsgdnLjobczxq2bfzGQ8xbd576B48dFXPpyNZMw\/132","privilege":[],"unionid":"ogCr2shL7FNG3hgEy8CMVEmrxNwE"}});
```

返回参数：

 | 字段名 | 字段说明 |
 | --- | --- |
 | data.headimgurl | 头像 |
 | data.nickname | 昵称 |

## 微信JS-SDK权限验证配置接口

该接口返回注册微信JS-SDK必填信息，注册成功后可以使用JS-SDK提供的能力，如自定义分享功能

官方文档：https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html

appId: wx8388fce6cb5c6eca

请求接口：
```
https://xmt.www.mi.com/index.php
```

参数说明：

 | 字段名 | 字段说明 |
 | --- | --- |
 | type | jsonp |
 | do | sdk_signature_info |
 | url | 当前页面的url，location.href |
 | m | interface-weixin |
 | public_id | gh_f10ac97bb079 |
 | callback | callback |

请求示例：
```
https://xmt.www.mi.com/index.php?m=interface-weixin&do=sdk_signature_info&public_id=gh_f10ac97bb079&url=https%3A%2F%2Fs1.mi.com%2Fm%2Fexamples%2Findex.html%3Fcode%3D071RRWZv3LwQDW2tnH3w3SOQZy2RRWZy%26dx%3D%26publicid%3Dgh_f10ac97bb079&type=jsonp&callback=callback
```

响应示例：
```
callback({"code":0,"msg":"success","data":{"nonce_str":"cUbTJ9nJ4BftIDgU","timestamp":"1625050493","signature":"553f12678d5988c1c157afe885f47729cfc2c535"}});
```

参数说明：

 | 字段名 | 字段说明 | 备注 |
 | --- | --- | --- |
 | nonce_str | cUbTJ9nJ4BftIDgU | 生成签名的随机串 |
 | signature | 553f12678d5988c1c157afe885f47729cfc2c535 | 签名 |
 | timestamp | 1625050493 | 生成签名的时间戳 |


## 提示

- 本地开发时域名建议配置 test.s1.mi.com 方便进行接口联调
- 测试链接生成二维码后可以通过商城app中扫码工具访问便于测试客户端环境
- 大部分情况下接口访问需要跨域请求（静态资源部署域名 s1.mi.com ，接口服务域名 i.huodong.mi.com）
- 静态文件添加版本号（缓存说明：html类型缓存为max-age=120, 其余静态资源缓存 max-age=31535000）
- 接口POST方式，发送AJAX请求时开启 withCredentials 属性，否则部分浏览器不会发送cookie

