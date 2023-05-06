/*
 * @Author: liushengxiao 
 * @Date: 2022-11-20 16:11:17 
 * @Last Modified by: liushengxiao
 * @Last Modified time: 2023-05-06 15:52:11
 */

let vm = new Vue({
    el: '.myapp',
    data: {
        user_info: {
            phone: '189***1234',
            jihui: 5,

        },
        zhuandong: {
            isok: true,//是否可点
            deg_base: 360//默认角度
        },
        //奖品配置项
        zhuanpan_config: [
            {
                name: '恭喜您获得一等奖',
                desc: '100分钟语音'
            },
            {
                name: '恭喜您获得二等奖',
                desc: '3GB流量'
            },
            {
                name: '恭喜您获得三等奖',
                desc: '1GB流量'
            },
            {
                name: '很遗憾，未中奖',
                desc: '谢谢参与'
            },
        ]
    },
    methods: {
        //抽奖效果
        choujiang() {
            let suiji = (n, m) => { return Math.floor(Math.random() * (m - n + 1) + n) };
            //机会判断
            if (this.user_info.jihui <= 0) {
                xtip.alert('对不起，您的抽奖机会已经用完~', { icon: 'e' })
            } else {
                //如果有抽奖机会
                if (this.zhuandong.isok) {
                    this.user_info.jihui--;//抽奖机会-1
                    this.zhuandong.isok = false;//临时关闭按钮点击事件，防止用户连点
                    //随机中奖品
                    let n = suiji(1, this.zhuanpan_config.length)
                    console.log(n);
                    //播放旋转动画
                    let deg_base = this.zhuandong.deg_base;
                    let deg_a = (360 / this.zhuanpan_config.length * (n - 1)) + 360 * 5;
                    //使用css的transform属性,播放旋转动画
                    document.querySelector('#jpimg').style.transform = `rotateZ(${deg_a + (360 - (deg_base % 360)) + deg_base}deg)`;
                    //因为css里面定义的动画时间是3s，所以3s后弹出中奖信息
                    setTimeout(() => {
                        let jp = this.zhuanpan_config[n - 1];//奖品信息
                        let tiptxt = n == 4 ? '下次继续努力哦' : `恭喜您获得了:${jp['desc']}，稍后系统会为您赠送，请注意查收您的短信哦`;
                        let icons = n == 4 ? 'e' : 's'
                        //弹窗内容，xtip插件的配置项详情可查看：https://ovsexia.github.io/xtiper/
                        xtip.win({
                            type: 'alert',
                            tip: tiptxt,
                            icon: icons,
                            title: `${jp['name']}`,
                            btn1: function () {
                                console.log(jp.desc);
                                //点击确定后，也许需要存储用户中奖信息到后台
                            },
                        });
                        this.zhuandong.deg_base = deg_a + (360 - (deg_base % 360)) + deg_base;//重新计算基础角度，以便于二次转盘转动的时候，能够匹配到对应到奖品
                        this.zhuandong.isok = true;//放开抽奖点击事件
                    }, 3200);
                }
            }

        }
    },
});