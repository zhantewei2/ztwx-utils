"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disDate = void 0;
var _second = 1000;
var _minute = _second * 60;
var _hour = _minute * 60;
var _day = _hour * 24;
var _year = _day * 365;
var _just = _second * 10;
exports.disDate = function (params) {
    var date = null;
    if (typeof params == 'string' || typeof params == 'number') {
        date = new Date(params);
    }
    else if (params instanceof Date) {
        date = params;
    }
    if (!date)
        return '';
    var disNum = new Date().getTime() - date.getTime();
    if (disNum < _just)
        return '刚刚';
    var content = '';
    var run = function () {
        var year, yearRD, day, dayRD, hour, hourRD, minute, minuteRD, second, defineM = false;
        year = Math.floor(disNum / _year);
        yearRD = disNum % _year;
        if (year)
            return content += year + '年';
        if (yearRD) {
            day = Math.floor(yearRD / _day);
            if (day)
                return content += day + '天';
            dayRD = yearRD % _day;
            if (dayRD) {
                hour = Math.floor(dayRD / _hour);
                if (hour)
                    content += hour + '小时';
                hourRD = dayRD % _hour;
                if (hourRD) {
                    minute = Math.floor(hourRD / _minute);
                    if (minute) {
                        if (content) {
                            return content += minute + '分钟';
                        }
                        else {
                            defineM = true;
                            content += minute + '分';
                        }
                    }
                    minuteRD = hourRD % _minute;
                    if (minuteRD) {
                        second = Math.floor(minuteRD / _second);
                        content += second + '秒';
                    }
                    else if (defineM) {
                        content += '钟';
                    }
                }
            }
        }
    };
    run();
    return content + '前';
};
