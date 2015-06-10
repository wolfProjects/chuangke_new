// Created by sam mok (Siso brand interactive team.) 2015

var unit = {
    components: {
        unit_tap: function () {
            $('.mall-img').click(function(){
                var imgsrc = this.src;
                $('.big-img').attr('src',imgsrc);
                console.log(imgsrc)
            })

        }
    },

    initUi: function (){
        this.components.unit_tap();
    }
};

$(function (){
    // unit index
    unit.initUi();
});