var PostbirdAutoCheckIn = {
    platform: 'PANDA',
    textContent: '#签到',
    descText: '———来自直播自动签到插件',
    descTime: 3000,
    descFlag: true,
    textareaDom: null,
    btnDom: null,
    time: 60000,
    domSelector: {
        'PANDA': {
            textarea: '.room-chat-texta',
            sendbtn: '.room-chat-send'
        }
    },
    init: function (options) {
        this.platform = options.platform || this.platform;
        this.platform = this.platform.toUpperCase();
        this.textContent = options.textContent || this.textContent;
        this.time = options.time || this.time;
        if(!this.domSelector[this.platform]){
            var errMsg = '平台未支持或输入错误,请重试';
            alert(errMsg);
            throw new Error(errMsg);
        }
        this.textareaDom = document.querySelector(this.domSelector[this.platform].textarea);
        this.btnDom = document.querySelector(this.domSelector[this.platform].sendbtn);
        this.verify(); // 校验
        this.checkIn(); // 自动写入
    },
    verify:function(){
        // 检查参数是否正确
        var errMsg = '未发现可自动操作的输入框或按钮';
        if(!this.textareaDom || !this.btnDom){
            alert(errMsg);
            throw new Error(errMsg);
        }
    },
    checkIn: function () {
        var _this = this;
        // 启动监听
        var inter = setInterval(function () {
            _this.fillText();
            // 进行desc
            _this.desc();
        }, _this.time);
    },
    fillText: function () {
        // 填充内容
        this.textareaDom.value = this.textContent;
        // 触发点击
        this.btnDom.click();
    },
    // 插件后缀描述
    desc: function () {
        // 如果开启desc后缀
        var _this = this;
        if (_this.descFlag) {
            // 三秒后输出描述
            setTimeout(function () {
                _this.textareaDom.value = _this.descText;
                _this.btnDom.click();
            }, _this.descTime);
        }
    }
};

/** 触发事件
*  @param   platform      直播平台
*  @param   textContent   签到命令
*  @param   time          签到间隔   
**/
function initPostbirdAutoChectIn(platform, textContent, time) {
    PostbirdAutoCheckIn.init({
        platform: platform,
        textContent: textContent,
        time: time
    });
}