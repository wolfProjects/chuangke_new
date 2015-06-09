// Created by sam mok (Siso brand interactive team.) 2015

var zhongchuang = {
    components: {
        summary: function () {
            var para = $('.zhongchuang-summary .para');
            var originText = para.text();
            var spliceText = para.text().substring(0, 180) + "...";
            var isActive = false;

            para.text(spliceText);

            $('.zhongchuang-summary .toggle').click(function () {
                $('.zhongchuang-summary').toggleClass('active');
                isActive = !isActive;
                isActive ? para.text(originText) : para.text(spliceText);
            });
        }
    },

    initUi: function (){
        this.components.summary();
    }
};

$(function (){
    // init zhongchuang
    zhongchuang.initUi();
});