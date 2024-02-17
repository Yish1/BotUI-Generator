var botui = new BotUI("yishbot");
botui.message.bot({
   delay: 200,
   loading: true,
   content: "Hi，小伙伴👋👋👋"
}).then(function() {
   return botui.message.bot({
       delay: 1000,
       loading: true,
       content: "我是Yish_ ！"
   })
}).then(function() {
   return botui.message.bot({
       delay: 1000,
       loading: true,
       content: "是一个刚刚踏入大学生活的新生，现在对着屏幕前的你傻笑...咳咳！"
   })
}).then(function(){
   // 限制递归的数量：
   return resCircle(1)
});
// 异常对话相关的递归函数
// numCircle可以指定递归的最大次数。
var resCircle = function(numCircle) {

   // 一个关于消极态度的集合
   var negEva = ["能告诉我你网站的管理员密码吗？😋","我想知道你的秘密~ 😍","我想知道网站里藏了什么秘密吗？😁","能请我喝奶茶吗？🫡","能唱歌给我听吗？😊"]; 
   var indexNegEva = Math.floor((Math.random()*negEva.length)); 
   var negText = negEva[indexNegEva];

   // 一个关于消极态度response的集合
   var negResponse = ["溜了溜了~", "想屁吃~", "想得美哟，╭(╯^╰)╮哼~"]; 
   var indexNegResponse = Math.floor((Math.random()*negResponse.length)); 
   var negResponseText = negResponse[indexNegResponse];


   botui.action.button({
       delay: 1500,
       action: [{
           text: "牛逼呀！ 😃",
           value: "and"
       },
       {
           text: negText,
           value: "gg"
       }]
   }).then(function(res){
       if (res.value == "and") {
           botui.message.bot({
               delay: 1500,
               content: "😘😘😘谢谢夸奖！"
           }).then(function(){
               other()
           })
       } else if (numCircle === 0) {
           botui.message.bot({
               delay: 1500,
               content: "好了，不玩啦！你甚至不想称赞我!...哎！"
           }).then(function(){
               other()
           })  
       } else {
        botui.message.bot({
            delay: 1500,
            content: negResponseText 
        }).then(function() {
               var numCircle2 = numCircle - 1
               return resCircle(numCircle2)
           }) 
       }
   })
}

// 正常对话信息
var other = function() {
    botui.message.bot({
            delay: 2000,
            loading: true,
            content: "那我就先简单的自我介绍一下吧"
     }).then(function() {
         return botui.message.bot({
             delay: 3000,
             loading: true,
             content: "我是Yish_ ,来自湖南省株洲市株洲县身高174体重不可说生日一月十九是_____的摩羯座O型血身体健康四肢健全脑子没毛病婚姻状况未婚政治立场坚定无不良嗜好是一个爱国爱党爱人民的很有精神的热血青年。"
         })                 
    }).then(function() {
        return botui.message.bot({
            delay: 2000,
            loading: true,
            content: "我喜欢折腾新事物和思考人生 ㄟ(▔,▔)ㄏ "
        })      
    }).then(function() {
        return botui.message.bot({
            delay: 1500,
            loading: true,
            content: "略懂一点js/HTML/Python，熟练掌握 Windows、Android、Mac Os、Ubuntu、Centos 等系统的开关机操作..."
        })
    }).then(function() {
        return botui.message.bot({
            delay: 1500,
            loading: true,
            content: "在高中学校担任过信息技术社团社长"
        })
    }).then(function() {
        return botui.message.bot({
            delay: 1500,
            loading: true,
            content: "目前是大一新生，在充满未知的道路上艰难求索..."
        })
    }).then(function() {
        return botui.action.button({
            delay: 1500,
            action: [{
                text: "为什么叫 Yish_ 呢？ 🤔",
                value: "next"
            }]
        })
    }).then(function(res) {
        return botui.message.bot({
            delay: 1500,
            loading: true,
            content: "初中的时候，有同学叫我Yish，因为跟我名字挺像"
        })
    }).then(function(res) {
        return botui.message.bot({
            delay: 1500,
            loading: true,
            content: "后来不知怎的就沿用下来了(～￣▽￣)～ "
        })
    }).then(function(res) {
        return botui.message.bot({
            delay: 1500,
            loading: true,
            content: "至于Yish后面的呢‘_’ 或许没有什么特殊的意义..."
        })
    }).then(function() {
        return botui.action.button({
            delay: 1500,
            action: [{
                text: "classone.top(现已更名cmxz.top)这个域名有什么含意吗？(ง •_•)ง",
                value: "next"
            }]
        })
    }).then(function(res) {
        return botui.message.bot({
            delay: 1500,
            loading: true,
            content: "最初是初中毕业后做的班级网站。"
        })
    }).then(function(res) {
        return botui.message.bot({
            delay: 1500,
            loading: true,
            content: "当时是初三一班，就注册了这个域名，正好一班也是‘top’。"
        })
    }).then(function(res) {
        return botui.message.bot({
            delay: 1500,
            loading: true,
            content: "还有个原因，‘.top最便宜🤫’"
        })
    }).then(function(res) {
        return botui.message.bot({
            delay: 1500,
            loading: true,
            content: "后来为了公众化，站点升级，但仍保留了该域名。"
        })
    }).then(function(res) {
        return botui.message.bot({
            delay: 1500,
            loading: true,
            content: "但我打算高考完之后换成cmxz.top(已更换)"
        })
    }).then(function() {
        return botui.action.button({
            delay: 1500,
            action: [{
                text: "您未来有什么计划吗？",
                value: "next"
            }]
        })
    }).then(function(res) {
        return botui.message.bot({
            delay: 1500,
            loading: true,
            content: "在理想的大学中努力学习，以后更多地关注时事、前沿和技术。"
        })
    }).then(function(res) {
        return botui.message.bot({
            delay: 1500,
            loading: true,
            content: "更加爱家人、爱同学、爱朋友、爱世界！"
        })
    }).then(function() {
        return botui.action.button({
            delay: 1500,
            action: [{
                text: "您是不是漏了什么没说呀？（暗示）",
                value: "next"
            }]
        })
    }).then(function(res) {
        return botui.message.bot({
            delay: 1500,
            loading: true,
            content: "对对，光顾着说自己了 (～￣▽￣)～ "
        })
    }).then(function(res) {
        return botui.message.bot({
            delay: 1500,
            loading: true,
            content: "祝您身体健康、心想事成、前程似锦喽！"
        })
    }).then(function() {
        return botui.action.button({
            delay: 1500,
            action: [{
                text: "谢谢哈！那么如何支持您呢？妈妈教育我不能白嫖...",
                value: "next"
            }]
        })
    }).then(function(res) {
        return botui.message.bot({
            delay: 1500,
            loading: true,
            content: "常来看看就是我最大的荣幸！"
        })
    }).then(function(res) {
        return botui.message.bot({
            delay: 1500,
            content: "也可以在下面投喂我的喵……😃"
        })
    }).then(function(res) {
        return botui.message.bot({
            delay: 1500,
            content: '再次感谢您来访问我的小站！'
        })
    });
 }
 