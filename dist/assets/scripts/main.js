// Created by sam mok (Siso brand interactive team.) 2015

"use strict";

var app = {
    components: {
        kv: function(){
            jQuery(".m-kv").slide({titCell: '.m-kv-head ul', mainCell:".m-kv-body ul", delayTime: 450, effect:'left', autoPlay:true, autoPage: '<li></li>'});
        },

        formValidation: {
            init: function (){
                // get validation code
                (function (){
                    var btnValidationAbleFlag = true;
                    $('.getValidationCode').click(function (){
                        var time = 45;

                        if (btnValidationAbleFlag == true){
                            // TODO: ajax get validation code here;

                            btnValidationAbleFlag = false;
                            $(this).addClass('btn-disabled');
                            $('.getValidationCode').text('再次获取验(' + (time--) +')');

                            var timer = setInterval(function (){
                                if (time == -1){
                                    clearInterval(timer);
                                    $('.getValidationCode').text('获取验证码').removeClass('btn-disabled');
                                    btnValidationAbleFlag = true;
                                } else {
                                    $('.getValidationCode').text('再次获取(' + (time--) +')');
                                }
                            }, 1000);
                        } else {
                        }
                    });
                })()
            }
        },

        floatPanel: {
            successMessage: function (floatPanel){
                $(floatPanel).find('.m-form').addClass('vh');
                $(floatPanel).find('.m-floatpanel-success').fadeIn();
            },
            init: function (){
                $('.m-floatpanel-close').click(function (){
                    $(this).parents('.m-floatpanel').fadeOut();
                });
            }
        },

        log: {
            logIn: function (){
                $('.m-floatpanel').fadeOut();
                $('.logInPanel').fadeIn();
            },
            registration: function (){
                $('.m-floatpanel').fadeOut();
                $('.registrationPanel').fadeIn();
            },
            init: function (){
                // TEST Login test
                $('#loginTEST').click(function () {
                    var validFormResult = true;

                    //  如果通过登陆验证, 则关闭登陆面板 并且将头部登陆注册的结构
                    //  header-sign-before 加上class: hide
                    //  geader-sign-after  去除class: hide
                    if (validFormResult) {
                        //  hide login panel
                        $$('.m-floatpanel').hide();

                        //  show user panel in page header
                        $('.header-sign-before').addClass('hide');
                        $('.header-sign-after').removeClass('hide');
                    }
                });

                // to login
                $('.toLogIn').click(function (){
                    $('.m-floatpanel').hide();
                    $('.logInPanel').show();
                });

                // to registration
                $('.toRegistration').click(function (){
                    $('.m-floatpanel').hide();
                    $('.registrationPanel').show();
                });

                // to reset password
                $('.toForgotPassword').click(function (){
                    $('.m-floatpanel').hide();
                    $('.resetPasswordPanel').show();
                });

                // reset password step
                $('.resetPasswordNextStep').click(function (){
                    // ajax below
                    if (true) {
                        app.components.floatPanel.successMessage('.resetPasswordPanel');
                    } else {
                        // do some tips for user
                    }
                });
            }
        }
    },
    initApp: function (){
        this.components.kv();
        this.components.formValidation.init();
        this.components.floatPanel.init();
        this.components.log.init();

        // log & registration
        $('.header-logInBtn').click(function (){
            app.components.log.logIn();
        });

        $('.header-registerBtn').click(function (){
            app.components.log.registration();
        });

        // header logo animate
        $('.header-logo').mouseover(function (){
            $(this).addClass('animation');
        }).mouseout(function (){
            $(this).removeClass('animation');
        });
    }
};

$(function (){
    // init app
    app.initApp();
});