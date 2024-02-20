import os
import re
ml = 0      #主线长度 mainlaine lenth
dop = 0     #对话选项数量 dialogue number
bl = 0      #支线长度 branchline lenth
blnum = 0   #支线数量 branckline num 
bcnum = 0   #分支数量 
ismainline = 1  #路线判断，2为支线 1 is in mainline 2 is in branchline
diaopt = {}     #记录对话选项的集合 record dialogue option 
bllines = {}    #记录支线的集合 record branch line
version = 0.2
print("欢迎使用BotUI对话生成器！\n")

#字面意思Just like its name
def modeselect():
    # 保存变量副本
    savevar("1")
    print("1.创建新脚本\n2.打开已存在脚本\n")
    mode = input("选择工作模式：")
    if mode == "1":
        print("您选择了 \"1.创建新脚本\"")
        makejsfile()
    elif mode == "2":
        print("功能开发中，敬请期待")
        modeselect()
    else:
        print("输入错误，请重新输入！")
        modeselect()

#生成js文件 generate js file
def makejsfile():
    global jspath, jsname
    os.makedirs('BotUI JS', exist_ok=True)
    while True:
        jsname = input("请输入要创建的对话脚本名称：")
        if jsname == "":
            print("对话脚本名称不能为空！")
        elif not jsname[0].isalpha() or re.search("[\u4e00-\u9fa5]", jsname) or not jsname[:-1].isalnum() or not jsname[-1].isalnum() or jsname.endswith("\\"):
            print("对话脚本名称必须以英文字母开头且不能以符号结尾，请重新输入！")
        else:
            break
    jspath = os.path.join("BotUI JS", f"{jsname}.js")

    # if os.path.exists(jspath):
    #     print("文件已存在，请重新输入！\n")
    #     makejsfile()
    # else:
    with open(jspath, "w", encoding="utf8") as f:
        pass
        print(f"已创建{jspath}\n")
        title = f"var botui = new BotUI(\"{jsname}\");"
        writefile(jspath, title)
        makeroute()


def makeroute():
    while True:
        a = "1.创建主线"
        b = "2.创建支线"
        c = "3.结束当前脚本"
        d = "4.返回主线"
        e = "5.对话测试"
        f = "6.返回上一支线"
        if ismainline == 1:
            if ml == 0:
                print(f"\n{a}\n{b}\n")
            else:
                # 处于主线时
                print(f"\n{a}\n{b}\n{c}\n{e}\n")
        elif ismainline == 2:
            # 处于支线时
            if bl == 0:
                # 处于支线时，但只有一条
                print(f"\n{b}\n{c}\n{d}\n{e}\n")
            else:
                # 处于支线时，但有多条
                print(f"\n{b}\n{c}\n{d}\n{e}\n{f}\n")
        else:
            print(f"\n{a}\n{b}\n")
        mode = input("选择操作：")
        if mode == "1":
            print(f"您选择了 \"{a}\"\n")
            mainline()
        elif mode == "2":
            print(f"您选择了 \"{b}\"\n")
            makebl()
        elif mode == "3":
            print(f"您选择了 \"{c}\"\n")
            savevar("2")
            modeselect()
        elif mode == "4":
            print(f"您选择了 \"{d}\"\n")
            mainline()
        elif mode == "5":
            print(f"您选择了 \"{e}\"\n")
            diatest()
        elif mode == "6":
            print(f"您选择了 \"{f}\"\n")
            return
        else:
            print("输入错误，请重新输入！")


def mainline():
    global ml, ismainline
    back = input("输入1返回上一级，回车继续")
    if back == "1":
        return
    else:
        pass
    ismainline = 1
    text = addvalue("text", "ml")
    delay_value = addvalue("delay_value", "ml")
    loading_value = addvalue("loading_value", "ml")
    default = f'''
//Mainline start
botui.message.bot({{
    delay: {delay_value},
    loading: {loading_value},
    content: "{text}"
}})'''
    if ml == 0:
        ml += 1
    else:
        default = f'''.then(function(){{
    return botui.message.bot({{ 
        delay: {delay_value}, 
        loading: {loading_value}, 
        content: '{text}' 
    }})
}})'''
        ml += 1
    writefile(jspath, default)
    inmainline()


def inmainline():
    while True:
        a = "1.继续主线"
        b = "2.新建对话选项"
        c = "3.对话测试"
        d = "4.返回路线菜单"
        print(f"\n{a}\n{b}\n{c}\n{d}\n")
        mode = input("选择操作：")
        if mode == "1":
            print(f"您选择了 \"{a}\"\n")
            mainline()
        elif mode == "2":
            print(f"您选择了 \"{b}\"\n")
            diaoption()
        elif mode == "3":
            print(f"您选择了 \"{c}\"\n")
            diatest()
        elif mode == "4":
            print(f"您选择了 \"{d}\"\n")
            makeroute()
        else:
            print("输入错误，请重新输入！")


def makebl():
    global blname, blnum, bllines
    back = input("输入1返回上一级，回车继续")
    if back == "1":
        return
    else:
        pass
    while True:
        blname = input("请输入支线名称：")
        if not blname[0].isalpha() or re.search("[\u4e00-\u9fa5]", blname):
            print("支线名称必须以英文字母开头且不能包含中文，请重新输入！")
        else:
            break
    title = f"var {blname} = function () {{"
    writefile(jspath, title)
    blnum += 1
    bllines[blnum] = [blname]
    branchline()


def branchline():  # 新建支线
    global bl, ismainline
    text = addvalue("text", "bl")
    ismainline = 2
    delay_value = addvalue("delay_value", "bl")
    loading_value = addvalue("loading_value", "bl")
    default = f'''//Branchline start
botui.message.bot({{
    delay: {delay_value},
    loading: {loading_value},
    content: "{text}"
}})'''
    if bl == 0:
        bl += 1
    else:
        default = f'''.then(function(){{ 
    return botui.message.bot({{ 
        delay: {delay_value}, 
        loading: {loading_value}, 
        content: '{text}' 
    }}) 
}})'''
        bl += 1
    writefile(jspath, default)
    inbranchline()


def inbranchline():
    while True:
        a = "1.继续支线"
        b = "2.新建对话选项"
        c = "3.对话测试"
        d = "4.结束编辑支线并返回主线"
        print(f"\n{a}\n{b}\n{c}\n{d}\n")
        mode = input("选择操作：")
        if mode == "1":
            print(f"您选择了 \"{a}\"\n")
            branchline()
        elif mode == "2":
            print(f"您选择了 \"{b}\"\n")
            diaoption()
        elif mode == "3":
            print(f"您选择了 \"{c}\"\n")
            diatest()
        elif mode == "4":
            print(f"您选择了 \"{d}\"\n")
            endsym = '''
    };'''
            writefile(jspath, endsym)
            return
        else:
            print("输入错误，请重新输入！")


def diaoption():  # 新建对话选项
    global dop, diaopt, askt, ifbranch_head, temptext
    back = input("输入1返回上一级，回车继续")
    if back == "1":
        return
    else:
        pass
    idop = 0
    while True:
        dop += 1
        idop += 1
        text = addvalue("text", "diaop")
        delay_value = addvalue("delay_value", "diaop")
        i = input("是否链接按钮至当前路线？（1.是 2.否  默认为是）：")
        if i == "1":
            askt = "next"
        elif i == "2":
            askt = f"ask{dop}"
            print("\n即将前往分支编辑程序...")
            ifbranch_head = f'''.then(function (res) {{
        if (res.value == "{askt}") {{'''
            endbranch = '''
        } else {
            botui.message.bot({
                delay: 1500,
                content: "啊！你干什么了？"
            })
        }
    })'''
            is_end = newbranch()
            # b = 1
            # print("可用于链接到当前选项的支线有：\n")
            # while b <= len(bllines):
            #     print(f"{bllines[b]}")
            #     b += 1
            if is_end == "0":
                try:
                    temptext = ifbranch_head+temptext+endbranch
                    print(temptext)
                except:
                    print("没有接收到分支编辑程序的结果")
        else:
            askt = "next"
        diaopt[dop] = [askt, text]  # 将对话选项存入字典中
        default = f'''.then(function (res) {{ //Dialog option start
        return botui.action.button({{
            delay: {delay_value},
            action: [{{
                text: "{text}",
                value: "{askt}"
            }}'''
        if idop == 1:
            pass
        else:
            default = f'''
            ,
            {{
                text: "{text}",
                value: "{askt}"
            }}'''
        writefile(jspath, default)
        while True:
            mode = input(
                f"您已添加{dop}个对话选项，要继续嘛？\n1.继续添加\n2.查询已添加选项\n3.返回上一路线\n")
            if mode == "1":
                break
            elif mode == "3":
                print("正在返回上一路线\n")
                endsym = '''
        ]
    })
})'''
                writefile(jspath, endsym)
                try:
                    writefile(jspath, temptext)
                except:
                    pass
                return
            elif mode == "2":
                a = 1
                while a <= len(diaopt):
                    print(f"{diaopt[a]}")
                    a += 1
            else:
                print("输入错误，请重新输入！")


def newbranch():
    global temptext
    bc = 0
    while True:
        a = "1.新增分支"
        b = "2.新建对话选项"
        c = "3.结束编辑分支并返回上一路线"
        print(f"\n{a}\n{b}\n{c}\n")
        mode = input("选择操作：")
        if mode == "1":
            text = addvalue("text", "bl")
            delay_value = addvalue("delay_value", "bl")
            loading_value = addvalue("loading_value", "bl")
            default1 = f'''
            botui.message.bot({{
                delay: {delay_value},
                loading: {loading_value},
                content: "{text}"
            }})'''
            if bc == 0:
                bc += 1
            else:
                default1 = f'''.then(function(){{ //Branchline start
            return botui.message.bot({{ 
                delay: {delay_value}, 
                loading: {loading_value}, 
                content: '{text}' 
            }}) 
        }})'''
                bc += 1
            try:
                temptext = (temptext+default1)
            except:
                temptext = default1
            print(temptext)

        elif mode == "2":
            print(f"您选择了 \"{b}\"\n")
            diaoption()
        elif mode == "3":
            print(f"您选择了 \"{c}\"\n")
            return "0"
        else:
            print("输入错误，请重新输入！")


def diatest():
    html = f'''
    <link href="../css/botui-theme.css" rel="stylesheet">
    <link href="../css/botui.min.css" rel="stylesheet">
    <div id="content" class="site-content">
        <audio id="sound" preload="auto">
            <source src="../sound.mp3" type="audio/mpeg">
        </audio>
        <p></p>
        <div class="entry-content">
            <div class="popcontainer" id="{jsname}"
                style="min-height:300px; padding:2px 6px 4px 6px; background-color: transparent; border-radius: 10px;">
                <center>
                    <p></p>
                    <h6>正在测试{jspath}</h6>
                    <h4>与 xxx 对话中...</h4>
                    <p></p>
                    <p></p>
                </center><br>
                <bot-ui><br>
                    <center>
                        <p></p>
                        <div
                            style=" background-image: url(../loading.svg);background-repeat: no-repeat;background-size: 10em;background-position: center;height: 10em;">
                        </div>
                        <p>Loading</p>
                        <p></p>
                        <p></p>
                    </center><br>
                </bot-ui>
            </div>
        </div>
    </div>
    <p>
        <script src="../js/vue.min.js"></script>
    </p>
    <p>
        <script src="../js/bot.js"></script><br>
        <script src="../BotUI JS/{jsname}.js"></script>
    </p>
    <p style="color:grey;font-size:1.25rem;" align="center"><i>对话测试</i></p>
    '''
    os.makedirs('diatest', exist_ok=True)
    diatestpath = os.path.join("diatest", f"{jsname}.html")
    with open(diatestpath, "w", encoding="utf8") as f:
        f.write(html)
    os.startfile(diatestpath)
    return


def addvalue(valuename, linename):
    if valuename == "text":
        if linename == "ml":
            value_name = "主线对话内容"
        elif linename == "bl":
            value_name = "支线对话内容"
        elif linename == "diaop":
            value_name = "对话选项内容"
        else:
            value_name = "内容"
        while True:
            text = input(f"请输入{value_name} (支持MarkDown,Emoji,HTML)：")
            if text:
                return text
            else:
                print("内容不能为空，请重新输入：")
    elif valuename == "delay_value":
        while True:
            delay_value = input("请输入加载延迟时间（单位：毫秒  默认为200）：")
            if delay_value.isdigit():
                return delay_value
            elif delay_value == "":
                return "200"
            else:
                print("请正确输入数字！")
    elif valuename == "loading_value":
        while True:
            loading_value = input("是否显示加载动画（1.显示 2.不显示  默认为显示）：")
            if loading_value.isdigit():
                if loading_value == "1":
                    loading_value = "true"
                elif loading_value == "2":
                    loading_value = "false"
                else:
                    loading_value = "true"
                return loading_value
            elif loading_value == "":
                return "true"
            else:
                print("请输入正确的选项！")
    else:
        print("鬼知道你怎么触发的")


def writefile(filepath, default):
    with open(filepath, "a", encoding="utf8") as f:
        f.write(default)
    print(f"已在{filepath}中写入{default}")
    return

def savevar(varoption):
    global varbak
    if varoption == "1":
        #保存变量
        varbak = globals().copy()
        return
    else:
        # 恢复变量
        globals().update(varbak)



modeselect()
