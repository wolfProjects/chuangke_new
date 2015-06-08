// Created by sam mok (Siso brand interactive team.) 2015

var index = {
    components: {
        tab: {
            index: 0,
            core: function (options){
                var wrap = $(options.wrap),
                    items = wrap.find(options.items),
                    prev = wrap.find(options.prev),
                    next = wrap.find(options.next);

                //  create pagination
                createPagination();

                // init tab
                items.eq(0).addClass('active');
                btnEnable();

                prev.click(function (){
                    if (index.components.tab.index > 0){
                        items.hide()
                            .eq(--index.components.tab.index).show();
                        btnEnable();
                    }
                });

                next.click(function (){
                    if (index.components.tab.index < items.length-1){
                        items.hide()
                            .eq(++index.components.tab.index).show();
                        btnEnable();
                    }
                });

                function btnEnable(){
                    if (index.components.tab.index == 0 ) {
                        prev.addClass('enable');
                    } else if (index.components.tab.index == items.length-1) {
                        next.addClass('enable');
                    } else {
                        prev.removeClass('enable');
                        next.removeClass('enable');
                    }

                    //  set current pagination
                    $('.index-unit-bd .page li').eq(index.components.tab.index).addClass('active').siblings().removeClass('active');
                }

                //  auto create pagination via get list item's length
                function createPagination() {
                    var pageAmount = $('.index-unit .column').length;
                    //  create first liDomStr
                    var liDomStr = '<li class="active"></li>';
                    //  create another
                    for (var i = 0; i<pageAmount-1; i++) {
                        liDomStr += '<li></li>';
                    }

                    //  insert to page
                    $('.index-unit-bd .page').append(liDomStr);

                    $('.index-unit-bd .page li').mouseover(function () {
                        var curIndex = $(this).index();
                        index.components.tab.index = curIndex;

                        $(this).addClass('active').siblings().removeClass('active');

                        items.hide();
                        items.eq(curIndex).show();

                        btnEnable();
                    });
                }
            }
        }
    },

    initUi: function (){
        index.components.tab.core({wrap: '.index-unit-bd', items: '.itemWrap li', prev: '.prev', next: '.next'});
    }
};

$(function (){
    // init index 
    index.initUi();
});