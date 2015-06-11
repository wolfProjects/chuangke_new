// Created by sam mok (Siso brand interactive team.) 2015

var components = {
    datepicker: function(){
        /* simple inline calendar */
        var dime = "2015/6/13";
        var dime1 = "2015/6/10";
        var dime2 = "2015/6/1";
        $('#m-calendar-box').DatePicker({
            mode: 'multiple',
            inline: true,
            calendars: 1,
            date: [dime, dime1 ,dime2],
            onChange: function(data) {
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