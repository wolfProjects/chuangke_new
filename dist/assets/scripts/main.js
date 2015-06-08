// Created by sam mok (Siso brand interactive team.) 2015

"use strict";

var app = {
    components: {
        kv: function(){
            jQuery(".m-kv").slide({titCell: '.m-kv-head ul', mainCell:".m-kv-body ul", delayTime: 450, effect:'left', autoPlay:true, autoPage: '<li></li>'});
        }
    },
    initApp: function (){
        this.components.kv();
    }
};

$(function (){
    // init app
    app.initApp();
});