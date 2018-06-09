let utilFunc = {
    initIconFont () {
        let domModule = weex.requireModule('dom')
        domModule.addRule('fontFace', {
            'fontFamily': 'iconfont',
            'src' : "url('http://at.alicdn.com/t/font_657474_0ubi4h83gt8uayvi.ttf')"
        })
    },
    getUrlSearch (url, name) {
        let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
        let r = url.slice(url.indexOf('?') + 1).match(reg)
        if (r != null) {
            try {
                return decodeURIComponent(r[2])
            } catch (_e) {
                return null
            }
        }
        return null
    },
    checkPhone(phone) {
        let check = false;
        if (phone == null || phone == undefined || phone == "") {
            return check;
        }

        //正则校验手机号
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
        if (!reg.test(phone)){
            return check;
        } else {
            check = true;
        }

        return check;
    },
    getNowFormatDate() {
        let date = new Date();
        let sign1 = "-";
        let sign2 = ":";
        let year = date.getFullYear() // 年
        let month = date.getMonth() + 1; // 月
        let day  = date.getDate(); // 日
        let hour = date.getHours(); // 时
        let minutes = date.getMinutes(); // 分
        let seconds = date.getSeconds() //秒
        // var weekArr = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'];
        // var week = weekArr[date.getDay()];
        // 给一位数数据前面加 “0”
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (day >= 0 && day <= 9) {
            day = "0" + day;
        }
        if (hour >= 0 && hour <= 9) {
            hour = "0" + hour;
        }
        if (minutes >= 0 && minutes <= 9) {
            minutes = "0" + minutes;
        }
        if (seconds >= 0 && seconds <= 9) {
            seconds = "0" + seconds;
        }
        let currentdate = year + sign1 + month + sign1 + day + " " + hour + sign2 + minutes + sign2 + seconds;
        return currentdate;
    },
    formatDateTime(inputTime) {
        let date = new Date(inputTime);
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        return y + '-' + m + '-' + d;
    },
    formatDateTimeInfo(inputTime) {
        let date = new Date(inputTime);
        let sign1 = "-";
        let sign2 = ":";
        let year = date.getFullYear() // 年
        let month = date.getMonth() + 1; // 月
        let day  = date.getDate(); // 日
        let hour = date.getHours(); // 时
        let minutes = date.getMinutes(); // 分
        let seconds = date.getSeconds() //秒

        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (day >= 0 && day <= 9) {
            day = "0" + day;
        }
        if (hour >= 0 && hour <= 9) {
            hour = "0" + hour;
        }
        if (minutes >= 0 && minutes <= 9) {
            minutes = "0" + minutes;
        }
        if (seconds >= 0 && seconds <= 9) {
            seconds = "0" + seconds;
        }
        let currentdate = year + sign1 + month + sign1 + day + " " + hour + sign2 + minutes + sign2 + seconds;
        return currentdate;

    },
    timeGapDays(time) {
        let today = new Date();
        let timerToday = today.getTime();

        let birthday = new Date(time);
        let timerBirthday = birthday.getTime();

        let dayNum = (timerToday - timerBirthday) / 1000 / 3600 / 24;
        dayNum = parseInt(dayNum);
        return dayNum;
    }
};

export default utilFunc
