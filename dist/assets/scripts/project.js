/* Qianglong Mo (SukeBeta) 2015 */

var project = {
    component: {
        comment: function (){
            if ($('.redactor-main')){
                $('.redactor-main').redactor();
            }
        },

        editUnit: function (){
            // operate text
            var textArr = ['编辑', '取消'];

            // toggle edit status
            var unitModule = $('.project-unit');
            unitModule.find('.text').click(function (){
                $('.project-unit').toggleClass('status-edit');

                // change operate text
                var textElem = $(this);
                if (textElem.text() == textArr[0]){
                    textElem.text(textArr[1]);
                } else {
                    textElem.text(textArr[0]);
                    unitModule.find('.select-icon').removeClass('active');
                }
            });

            // select unit item
            unitModule.find('.select-icon').click(function (){
                $(this).toggleClass('active');
            });
        },

        logicTab: function (){
            $('.logic-hd span').click(function (){
                $(this).parents('li').addClass('active')
                    .siblings('li').removeClass('active');

                $('.logic-bd .item').eq($(this).parents('li').index()).fadeIn()
                    .siblings('.item').hide();
            });
        },

        editLogicUnit: function (){
            // operate text
            var textArr = ['更改项目套件', '完成编辑'];
            var isEditing = false;

            // switch editing status
            $('.changeUnit').click(function (){
                $('.logic-item-unit').addClass('editing');

                var textElem = $(this);
                // toggle edit status
                if (textElem.text() == textArr[0]){
                    // editing....
                    textElem.text(textArr[1]);
                    isEditing = true;
                    $('.unitSelect').show();
                } else {
                    // editing complete..
                    textElem.text(textArr[0]);
                    isEditing = false;
                    $('.unitSelect').hide();
                    resetSelect();
                }
            });

            // bind select
            $('.project-unit-list .thumb').click(function (){
                // check isEditing status
                if (isEditing) {
                    $(this).parent('.item').toggleClass('selected');
                }
            });

            // reset select
            function resetSelect (){
                $('.project-unit-list .item').removeClass('selected');
            }
        },

        cytoscape: function (config){
            var config = config;

            $('#cytoscape-wrap').cytoscape({
                style: cytoscape.stylesheet()
                    .selector('node').css({
                        "width": '78px',
                        "height": '78px',
                        'content': 'data(desc)',
                        'color': '#999999',
                        'font-size': '12px',
                        'text-halign': 'center',
                        'text-valign': 'bottom'
                    })
                    .selector(':selected').css({
                        'background-color': 'black',
                        'line-color': 'black',
                        'target-arrow-color': 'black',
                        'source-arrow-color': 'black',
                        'opacity': 1
                    })
                    .selector('edge').css({
                        'target-arrow-shape': 'circle',
                        'target-arrow-color': '#1aa9eb',
                        'line-color': '#1aa9eb',
                        'line-style': 'dashed',
                        'width': '1px'
                    })
                    .selector('.app').css({
                        "background-color": '#fff',
                        'border-width': 1,
                        'border-color': '#1aa9eb',
                        'border-style': 'solid',
                        'background-image': config.imgSourcePath + 'cytoscape-icon-app.png'
                    })
                    .selector('.action').css({
                        "background-color": '#fff',
                        'border-width': 1,
                        'border-color': '#23c3aa',
                        'border-style': 'solid',
                        'background-image': config.imgSourcePath + 'cytoscape-icon-action.png'
                    })
                    .selector('.service').css({
                        "background-color": '#fff',
                        'border-width': 1,
                        'border-color': '#ffc90f',
                        'border-style': 'solid',
                        'background-image': config.imgSourcePath + 'cytoscape-icon-service.png'
                    })
                    .selector('.root').css({
                        "width": '98px',
                        "height": '98px',
                        "font-size": "16px",
                        'background-image': 'none',
                        'text-valign': 'center'
                    })
                    .selector('.cur').css({
                        "background-color": 'lightyellow',
                        'color': '#333'
                    }),
                layout: {
                    name: 'preset',
                    directed: true,
                    padding: 10
                },
                ready: function (){
                    console.log('Ready to render..');
                    //----------------------------------------------------
                    window.cy = this;
                    cy.load(config.data.elements);

                    var appController = {
                        config: function (){
                            // lock nodes
                            cy.zoomingEnabled( false );
                        },
                        editNode: function (){
                            var curNode = null,
                                focusedNode = null;

                            // set current node
                            cy.on('tap', 'node', setCurNode);

                            cy.on('tap', cancelCurNode);

                            // modify node
                            $('#modifyNode').bind('click', modifyNode);

                            // remove node
                            $('#removeNode').bind('click', removeNode);

                            // add node
                            $('#add_btn').bind('click', addNode);

                            function setCurNode (){
                                var node = this;

                                console.log(this.id());
                                // set cur
                                if (curNode){
                                    curNode.removeClass('cur');
                                }
                                curNode = node;
                                node.addClass('cur');
                            }

                            function cancelCurNode(e){
                                if( e.cyTarget === cy ){
                                    cy.elements().removeClass('cur');
                                    curNode = null;
                                }
                            }

                            function addNode(){
                                var type = $('#add_type').val(),
                                    description = $('#add_description').val();

                                console.log( 'Detail for new node: ', type, description );

                                // check node detail
                                if (type && type != 'none' && description) {
                                    var parent = curNode;

                                    // if choose parent node
                                    if (parent) {
                                        // add new node;
                                        var node = {
                                                group: "nodes",
                                                data:{
                                                    id: 'a' + new Date().getTime(),
                                                    desc: description,
                                                    type: $('#add_type').val()
                                                },
                                                classes:type
                                            },
                                            edge = {
                                                group: "edges",
                                                data: {
                                                    // plus 1 avoid same time with above node getTime();
                                                    id: 'a' + new Date().getTime()+1,
                                                    source: node.data.id,
                                                    target: parent.id()
                                                }
                                            };

                                        setNodePosition();

                                        var addedNode = cy.add(node);
                                        var addedEdge = cy.add(edge);

                                        cy.reset().center();

                                        function setNodePosition (){
                                            // position.y value via check new node is has siblings, then calculator with sibling's position.y value;
                                            // get son edges
                                            var connectedEdges = curNode.connectedEdges(function(){
                                                return this.target().anySame( curNode );
                                            });

                                            // get son nodes
                                            var connectedNodes = connectedEdges.sources();
                                            console.log('son count before add:', connectedEdges.length);

                                            if ( connectedEdges.length >= 1 ) {
                                                console.log('has siblings');
                                                node.position = {
                                                    x: parent.position().x + (100 + 60),
                                                    y: connectedNodes[connectedNodes.length-1].position().y + 160
                                                }

                                            } else {
                                                // if not have siblings node, just keep
                                                node.position = {
                                                    x: parent.position().x + (100 + 60),
                                                    y: parent.position().y
                                                }
                                            }
                                        }
                                    } else {
                                        alert('Please choose a parent node who you want to insert node to.');
                                    }
                                } else {
                                    alert('Please select node type and write description for node.');
                                }
                            }

                            function removeNode(){
                                var nodes = curNode;
                                if (nodes.hasClass('root')) {
                                    alert('You can\'t remove root node');
                                } else {
                                    nodes.remove();
                                    curNode = null;
                                }
                            }

                            function modifyNode(){
                                var node = curNode;
                                if (node) {
                                    var text = prompt('Modify node description', '');
                                    node.data({'desc': text})
                                } else {
                                    alert('No node are select before you edit.');
                                }
                            }
                        },
                        export: {
                            png: function (){
                                // return 'String'
                                return cy.png()
                            },
                            json: function (){
                                // return 'JSON String'
                                console.log('%c Data JSON below: ', 'color: green; font-size:16px;');
                                return JSON.stringify(cy.json());
                            }
                        },
                        init: function (){
                            // config cytoscape
                            this.config();

                            // init node edit
                            this.editNode();

                            // bind getJson btn
                            $('#getJson').click(function (){
                                console.log(appController.export.json());
                            });
                        }
                    };

                    appController.init();

                    if (config.callback) config.callback();
                }
            });
        }
    },
    initUi: function (){
        this.component.comment();
        this.component.editUnit();
        this.component.logicTab();
        this.component.editLogicUnit();

        // get data, then init cytoscape
        $.ajax({
            url: 'http://sammok.github.io/cytoscape_for_app_logic_editor/build/data/data.json',
            success: function ( response ){
                console.log( 'Success to get Data:', response );

                // init cytoscape
                project.component.cytoscape({
                    data: response,
                    // the imgPath who will use for node icon
                    imgSourcePath: 'assets/images/cytoscape/',
                    // invoke when cytoscape finish init
                    callback: function (){
                        cy.autolock( true )
                            .fit( cy.$('*'))
                            .reset()
                            .center();

                        // switch editor state
                        $('.changeLogic').click(function (){
                            // switch edit state via class
                            $(this).toggleClass('active');

                            if ($(this).hasClass('active')) {
                                // state --> edit
                                cy.autolock( false );

                                // show cytoscape editor
                                $('.type-intro').addClass('active');
                                $('#cytoscape-editor').addClass('active');
                                $('.cancelChange').removeClass('hide');
                            } else {
                                // state --> normal
                                var isConfirm = confirm('你想保存它吗');

                                if ( isConfirm ) {
                                    // 保存数据后退出

                                    existEditState();
                                } else {
                                    existEditState();
                                }
                            }
                        });

                        $('.cancelChange').click(function (){
                            var isConfirm = confirm('你想保存它吗');

                            if ( isConfirm ) {
                                // 保存数据后退出

                                existEditState();
                            } else {
                                existEditState();
                            }
                        });

                        function existEditState(){
                            cy.autolock( true );
                            // hide cytoscape editor
                            $('.type-intro, .changeLogic').removeClass('active');
                            $('#cytoscape-editor').removeClass('active')
                                .find('input:text').val();
                            $('.cancelChange').addClass('hide');
                        }
                    }
                });
            },
            error: function (error) {
                console.log('Fails to get data: ', error);
            }
        });
    }
};

$(function (){
    project.initUi();
});