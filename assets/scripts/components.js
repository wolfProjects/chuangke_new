// Created by sam mok (Siso brand interactive team.) 2015

var components = {
    datepicker: function(){

        /* 这个timeData是你要传入的time arr，就是标记的活动日期,可以是多个也可以是单个*/
        var timeData = [ " 2015/6/11" , "2015/6/3" , "2015/6/4" , "2015/6/7 " ];

        $('#m-calendar-box').DatePicker({
            mode: 'multiple',
            inline: true,
            calendars: 1,
            date: timeData,
            onChange: function(data) {
                /* onChange method ：用户 onClick calendar  */
                /* data 就是你传入的 Arr , method : getDate , getMonth , getFullYear*/
                for(var i=0; i < data.length; i++){
                    console.log(data[i].getDate());
                }

            }
        });
    },
    initUi: function (){
        components.datepicker();
    }
};

$(function (){
    // init index 
    components.initUi();
});