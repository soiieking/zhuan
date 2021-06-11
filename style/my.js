/*
 * @Author: liushengxiao 
 * @Date: 2021-05-09 11:36:32 
 * @Last Modified by: liushengxiao
 * @Last Modified time: 2021-06-11 17:31:13
 */



//对大转盘进行一版优化
//当前抽奖机会次数
let chou = 3;
$('.jihui>h1>span').html(chou); //写入抽奖机会次数
//将奖品分为几份？
const base_number = 8; //将大转盘的角度分为8份
//写入每一项奖品的角度数据
let base_angle = []
for (let i = 0; i < base_number; i++) {
    base_angle[i] = (360 / base_number) * (i + 1) - ((360 / base_number) / 2);
}
/*定义奖项的文字描述
    1.这里的子数据，应该和大转盘的份数保持一致，多了无所谓，少了可能报错。
    2.角度是按照x轴逆时针计算的，奖品的位置是错开的。
    3.因为奖品位置是不连续的，所以描述的文字，要根据大转盘图片素材的情况，对每一项进行调试和重写。

*/
const base_text = [{
        title: "很遗憾，未中奖!",
        text: "下次继续努力吧",
        html: true
    },
    {
        title: "恭喜你，抽到二等奖!",
        text: "您获得了小米手环，请<a href='中奖信息填写表单.html' style='color:#F8BB86'>点击这里填写收货信息</a>！",
        html: true,
        showConfirmButton: true, //如果希望不要显示确认按钮，设置为false即可。
    },
    {
        title: "恭喜你，抽到七等奖!",
        text: "您获得了全屋wifi免费上门检测特权，请<a href='中奖信息填写表单.html' style='color:#F8BB86'>点击这里领取</a>！",
        html: true,
        showConfirmButton: true,
    },
    {
        title: "恭喜你，抽到一等奖!",
        text: "您获得了小米扫地机器人，请<a href='中奖信息填写表单.html' style='color:#F8BB86'>点击这里填写收货信息</a>！",
        html: true,
        showConfirmButton: true,
    },
    {
        title: "恭喜你，抽到三等奖!",
        text: "您获得了行车记录仪，请<a href='中奖信息填写表单.html' style='color:#F8BB86'>点击这里填写收货信息</a>！",
        html: true,
        showConfirmButton: true,
    },
    {
        title: "恭喜你，抽到六等奖!",
        text: "您获得了视频彩铃（首月免费），请<a href='中奖信息填写表单.html' style='color:#F8BB86'>点击这里领取</a>！",
        html: true,
        showConfirmButton: true,
    },
    {
        title: "恭喜你，抽到四等奖!",
        text: "您获得了烧烤炉+帐篷，请<a href='中奖信息填写表单.html' style='color:#F8BB86'>点击这里领取</a>！",
        html: true,
        showConfirmButton: true,
    },
    {
        title: "恭喜你，抽到五等奖!",
        text: "您获得了空气炸锅，请<a href='中奖信息填写表单.html' style='color:#F8BB86'>点击这里领取</a>！",
        html: true,
        showConfirmButton: true,
    },
]


//转盘逻辑
$("#lotteryBtn").rotate({
    bind: {
        click: function() {
            if (chou == 0) {
                swal('对不起，当前没有抽奖次数')
            } else {
                chou--; //抽奖次数-1
                console.log(`剩余抽奖次数${chou}`);
                //随机获得一个中奖角度
                function suiji(n, m) { return Math.floor(Math.random() * (m - n + 1) + n) };
                let jiang = suiji(1, base_number); //根据大转盘奖品份数，随机获得一项。

                //概率问题,利用100的区间进行分段概率计算
                //
                // let sj = suiji(1, 100); //取得1-100随机数
                // switch (sj) {
                //     case 1 <= sj < 51: //50%的概率获得  第一项奖品
                //         jiang = 1;
                //         break;
                //     case 51 <= sj < 71: //20%的概率 获得第二项
                //         jiang = 2;
                //         break;
                //     case 71 <= sj < 81: //10%的概率 获得第三项
                //         jiang = 3;
                //         break;
                //     //依次类推
                //     case  sj == 100: //1%的概率 获得第n项
                //         jiang = n;
                //         break;
                // }




                // 调试的时候可以用静态数据进行测试
                //jiang = 1;

                //显示中奖信息
                rotateFunc(jiang, base_angle[jiang - 1], base_text[jiang - 1])
            }
        }
    }
});

//显示中奖信息函数
var rotateFunc = (awards, angle, text) => { //awards:奖项，angle:奖项对应的角度
    $('.rotate-bg').stopRotate();
    $(".rotate-bg").rotate({
        angle: 0,
        duration: 5000,
        animateTo: angle + 1440,
        callback: function() {
            swal(text)

        }
    });
};