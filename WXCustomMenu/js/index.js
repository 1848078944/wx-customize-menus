let obj;
let mId;
let tempObj;
let button;
let objp;
let objs;
let ix;
let menu = '<div class="custom-menu-view__menu"><div class="text-ellipsis"></div></div>';
let customBtns = $('.custom-menu-view__footer__right');
let setMenuText;
let colIndex;//一级菜单列数;
let radios;
let delClick;
//添加菜单按钮
let customEl = '<div class="custom-menu-view__menu"><div class="text-ellipsis">新建菜单</div></div>'
let customUl = '<ul class="custom-menu-view__menu__sub"><li class="custom-menu-view__menu__sub__add"><div class="text-ellipsis"><i class="glyphicon glyphicon-plus text-info"></i></div></li></ul>';
let customLi = '<li class="custom-menu-view__menu__sub__add"><div class="text-ellipsis">新建子菜单</div></li>';

//一级菜单对象
function parents(param) {
    this.name = param;
    this.sub_button = [];
}

//二级菜单对象
function subs(param) {
    this.name = param;
}

//显示第一级菜单
function showMenu() {
    if (button.length == 1) {
        appendMenu(button.length);
        showBtn();
        $('.custom-menu-view__menu').css({
            width: '50%',
        });
    }
    if (button.length == 2) {
        appendMenu(button.length);
        showBtn();
        $('.custom-menu-view__menu').css({
            width: '33.3333%',
        });
    }
    if (button.length == 3) {
        appendMenu(button.length);
        showBtn();
        $('.custom-menu-view__menu').css({
            width: '33.3333%',
        });
    }
    for (var b = 0; b < button.length; b++) {
        $('.custom-menu-view__menu')[b].setAttribute('alt', b);
    }
}

//显示子菜单
function showBtn() {
    for (var i = 0; i < button.length; i++) {
        var text = button[i].name;
        var list = document.createElement('ul');
        list.className = "custom-menu-view__menu__sub";
        $('.custom-menu-view__menu')[i].childNodes[0].innerHTML = text;
        $('.custom-menu-view__menu')[i].appendChild(list);
        for (var j = 0; j < button[i].sub_button.length; j++) {
            var text = button[i].sub_button[j].name;
            var li = document.createElement("li");
            var tt = document.createTextNode(text);
            var div = document.createElement('div');
            li.className = 'custom-menu-view__menu__sub__add';
            li.id = 'sub_' + i + '_' + j;//设置二级菜单id
            div.className = "text-ellipsis";
            div.appendChild(tt);
            li.appendChild(div);
            $('.custom-menu-view__menu__sub')[i].appendChild(li);
        }
        var ulBtnL = button[i].sub_button.length;
        var iLi = document.createElement("li");
        var ii = document.createElement('i');
        var iDiv = document.createElement("div");
        ii.className = "glyphicon glyphicon-plus text-info";
        iDiv.className = "text-ellipsis";
        iLi.className = 'custom-menu-view__menu__sub__add';
        iDiv.appendChild(ii);
        iLi.appendChild(iDiv);
        if (ulBtnL < 5) {
            $('.custom-menu-view__menu__sub')[i].appendChild(iLi);
        }

    }
}

//显示添加的菜单
function appendMenu(num) {
    var menuDiv = document.createElement('div');
    var mDiv = document.createElement('div');
    var mi = document.createElement('i');
    mi.className = 'glyphicon glyphicon-plus text-info iBtn';
    mDiv.className = 'text-ellipsis';
    menuDiv.className = 'custom-menu-view__menu';
    mDiv.appendChild(mi);
    menuDiv.appendChild(mDiv);
    switch (num) {
        case 1:
            customBtns.append(menu);
            customBtns.append(menuDiv);
            break;
        case 2:
            customBtns.append(menu);
            customBtns.append(menu);
            customBtns.append(menuDiv);
            break;
        case 3:
            customBtns.append(menu);
            customBtns.append(menu);
            customBtns.append(menu);
            break;
    }
}

//初始化菜单按钮
function addMenu() {
    var menuI = '<div class="custom-menu-view__menu"><div class="text-ellipsis"><i class="glyphicon glyphicon-plus text-info iBtn"></i></div></div>';
    var sortIndex = true;
    customBtns.append(menuI);
    var customFirstBtns = $('.custom-menu-view__menu');
    var firstBtnsLength = customFirstBtns.length;
    if (firstBtnsLength <= 1) {
        customFirstBtns.css({
            width: '100%',
        })
    }
}

function setSubText() {
    var actived = $('.custom-menu-view__menu__sub__add').hasClass('subbutton__actived');
    var activedTxt = $('.subbutton__actived').text();
    if (actived) {
        setInput(activedTxt);
        updateTit(activedTxt);

        radios[0].checked = true;
        $('#editMsg').show();
        $('#editPage').hide();
        $('.msg-context__item').show();
        $('.msg-template').hide();
    }
}

//对新添加二级菜单添加id
function setLiId() {
    var prev = $('.custom-menu-view__menu')[colIndex].getElementsByTagName('i')[0].parentNode.parentNode.previousSibling;
    var divText = prev.childNodes[0].innerHTML;
    if (typeof (button[colIndex].sub_button) == "undefined") {
        var sub_button = {"sub_button": []};
        button[colIndex].append(sub_button);
    }
    button[colIndex].sub_button.push(new subs(divText));
    var id = button[colIndex].sub_button.length - 1;
    prev.setAttribute('id', 'sub_' + colIndex + '_' + id);

    $('.custom-menu-view__footer__right').find('.subbutton__actived').removeClass('subbutton__actived');
    $('.custom-menu-view__menu').eq(colIndex).find('i').parent().parent().prev().addClass('subbutton__actived');
}

//设置右边input的value
function setInput(val) {
    $('input[name="custom_input_title"]').val(val);
}

//实时更新右侧顶部标题
function updateTit(text) {
    $('#cm-tit').html(text);
}

function sortable(m, sortIndex) {
    if (sortIndex) {
        Sortable.create(document.getElementById('menuStage_2_' + m), {
            animation: 300, //动画参数
            disabled: false,
        });
    } else {
        var el = document.getElementById('menuStage_2_' + m);
        var sortable = Sortable.create(el, {
            disabled: true,
        });
        sortable.destroy();

    }
}

//type为click时添加删除按钮元素
function delElement() {
    var msgTemp = $('.msg-template');
    var delEl = '<span class="msg-panel__del del-tuwen">删除</span>';
    msgTemp.append(delEl);
    if (msgTemp.find('span').length == 0) {
        msgTemp.append(delEl);
    }
};

//保存
function saveAjax() {
    $.ajax({
        url: baseURL + 'sys/menuConfig/saveButton',
        type: "POST",
        data: JSON.stringify({
            "menu": obj.menu,//先将对象转换为字符串再传给后台
            "appId": $("#appIdcode").val()
        }),
        contentType: "application/json",
        dataType: "json",
        success: function (data) {
            if (data.reg == "ok") {
                layer.msg("创建成功！");
            } else {
                layer.alert(data.msg);
            }
        }
    });
}

function deleteMenu() {
    $.ajax({
        url: baseURL + 'sys/menuConfig/delete',
        type: "POST",
        data: JSON.stringify({
            "appid": $("#appIdcode").val()
        }),
        contentType: "application/json",
        dataType: "json",
        success: function (data) {
            if (data.reg == "ok") {
                layer.msg("删除成功！");
                obj = {
                    "menu": {button: []}
                };
                $('.custom-menu-view__menu').remove();
                menuCreate(obj);
                $(".msg-tab_item").removeClass('on');
                $("#imgtextLi").addClass("on");
            } else {
                layer.alert(data.msg);
            }
        }
    })
}

function menuCreate(obj) {
    $('.iBtn').parent().unbind("click");
    $('.reminder').unbind("click");
    $('.text-ellipsis').unbind("click");
    $('li>.text-ellipsis>i').unbind("click");
    $('input[name="url"]').unbind("keyup");
    $('input[name="custom_input_title"]').unbind("keyup");
    $('.msg-panel__tab>li').unbind("click");
    $('#selectModal .modal-body .panel').unbind("click");
    $('#selectModal .ensure').unbind("click");
    $('#delMenu').unbind("click");
    $('#saveBtns').unbind("click");
    customBtns.unbind("click");
    mId = null;
    tempObj = {};//存储HTML对象
    if (typeof (obj.menu) != "undefined") {
        button = obj.menu.button;//一级菜单
    } else {
        button = [];
    }

    //显示异常
    if (obj.errcode) {
        $('#abnormalModal').modal('show');
    }
    objp = new parents();
    objs = new subs();
    if (typeof (button) != "undefined") {
        ix = button.length;//一级菜单数量
    } else {
        ix = 0;
    }
    if (typeof (button) != "undefined" && button.length > 0) {
        showMenu();
        //$('.cm-edit-before').hide();
        $('.cm-edit-after').hide();
    } else {
        addMenu();
        $('.cm-edit-before').siblings().hide();
    }
    $('.custom-menu-view__footer__right').off('click').on('click', ".iBtn", function () {
        var dom = $(this).parent(".text-ellipsis");
        if ($(dom).siblings("ul").length == 0) {
            ix = $('.custom-menu-view__menu[alt]').size();
            var num = $('.custom-menu-view__footer__right').find('.custom-menu-view__menu').length;
            var ulNum = $(dom).parents('.custom-menu-view__menu').prev().find('.custom-menu-view__menu__sub').length;
            ix++;
            if (ix < 4) {
                $(dom).parent().before(customEl);
                $(dom).parent().prev().append(customUl);

                $('.custom-menu-view__footer__right').find('.subbutton__actived').removeClass('subbutton__actived');
                $(dom).parent().prev().addClass('subbutton__actived');

                //一级菜单列数
                var buttonIndex = $(dom).parents('.custom-menu-view__menu').index() - 1;
                $('.custom-menu-view__menu').eq(buttonIndex).on('click', (function (buttonIndex) {
                    var txt = $('.custom-menu-view__menu').eq(buttonIndex).text();
                    setMenuText(txt);
                })(buttonIndex));

                if (ix == 1) {
                    $('.custom-menu-view__menu').css({
                        width: '50%'
                    });
                    $('.custom-menu-view__menu')[ix - 1].setAttribute('alt', ix - 1);
                }
                if (ix == 2) {
                    $('.custom-menu-view__menu').css({
                        width: '33.3333%'
                    });
                    $('.custom-menu-view__menu')[ix - 1].setAttribute('alt', ix - 1);
                }
                var divText = $(dom).parent().prev().find('.text-ellipsis').text();
                button.push(new parents(divText));
            }
            if (ix == 3) {
                $(dom).parents('.custom-menu-view__menu').remove();
                $(dom).parent().append(customUl);
                var index = ix - 1
                if ($(".custom-menu-view__menu").eq(ix - 1).children(".text-ellipsis").children(".iBtn").length == 0) {
                    $('.custom-menu-view__menu')[ix - 1].setAttribute('alt', ix - 1);
                }
            }
            $('.cm-edit-after').show().siblings().hide();
        }
    });
    setMenuText = function (value) {
        setInput(value);
        updateTit(value);

        radios[0].checked = true;
        $('#editMsg').show();
        $('#editPage').hide();
        $('.msg-context__item').show();
        $('.msg-template').hide();
    }
    //添加子菜单
    customBtns.on('click', 'li>.text-ellipsis>i', function () {
        //绑定删除事件
        $('.msg-panel__del').on('click', delClick);
        colIndex = $(this).parents('.custom-menu-view__menu').prevAll().length;
        var liNum = $(this).parents('.custom-menu-view__menu').find('li').length;

        if (liNum <= 1) {
            $('#reminderModal').modal('show');
        } else {
            if (liNum < 6) {
                $(this).parent().parent().before(customLi);
                setLiId();
            }
            if (liNum == 5) {
                $(this).parents('li').remove();
            }
        }
        $('#radioGroup').show();
        setSubText()
    });
    //确定添加子菜单事件
    $('.reminder').click(function () {
        var ul = $('.custom-menu-view__menu')[colIndex].getElementsByTagName('ul')[0];
        var li = document.createElement('li');
        var div = document.createElement('div');
        var Text = document.createTextNode('新建子菜单');
        li.className = "custom-menu-view__menu__sub__add";
        div.className = "text-ellipsis";
        div.appendChild(Text);
        li.appendChild(div);
        ul.insertBefore(li, ul.childNodes[0]);
        setLiId();
        delete button[colIndex].type;
        delete button[colIndex].media_id;
        delete button[colIndex].url;
        $('#reminderModal').modal('hide');

        setSubText();
    });
    imageText();
    //点击菜单
    customBtns.on('click', '.text-ellipsis', function () {
        $('.cm-edit-after').show().siblings().hide();
        if ($(this).parent().attr('id') || $(this).parent().attr('alt')) {
            $(this).parents('.custom-menu-view__footer__right').find('.subbutton__actived').removeClass('subbutton__actived');
            $(this).parent().addClass('subbutton__actived');
        }
        //一级菜单列数
        var buttonIndex = $(this).parents('.custom-menu-view__menu').prevAll().length;
        if ($('.msg-context__item').is(':hidden')) {
            $('.msg-template').show();
        } else if ($('.msg-context__item').is(':visible')) {
            $('.msg-template').hide();
        }
        //点击在一级菜单上
        if ($(this).parent().attr('alt')) {

            if ($('.custom-menu-view__menu').hasClass('subbutton__actived')) {
                var current = $('.subbutton__actived');
                var alt = current.attr('alt');
                var lis = current.find('ul>li');
                setInput(button[buttonIndex].name);
                updateTit(button[buttonIndex].name);
                if (lis.length > 1) {
                    $('#editMsg').hide();
                    $('#editPage').hide();
                    $('#radioGroup').hide();
                } else {
                    if (button[buttonIndex].type == 'media_id') {
                        radios[0].checked = true;
                        switch (button[buttonIndex].ctype) {
                            case 'image':
                                $("#imgLi").trigger('click');
                                break;
                            case 'voice':
                                $("#voice").trigger('click');
                                break;
                            case 'video':
                                $("#video").trigger('click');
                                break;
                            default:
                                $("#imgtextLi").trigger("click");
                        }
                        $('#editMsg').show();
                        $('#editPage').hide();
                        $('#radioGroup').show();

                        //拿key换取mediaId
                        subKey = button[buttonIndex].media_id;
                        $('.msg-template').html($('#' + subKey).html());
                        delElement();
                        //绑定删除事件
                        $('.msg-panel__del').on('click', delClick);

                        $('.msg-template').html(tempObj[button[buttonIndex].media_id]);
                    } else if (button[buttonIndex].type == 'view') {
                        $('input[name="url"]').val(button[buttonIndex].url);
                        radios[1].checked = true;
                        $('#editMsg').hide();
                        $('#editPage').show();
                        $('#radioGroup').show();
                    } else if (!button[buttonIndex].type) {
                        radios[0].checked = true;
                        $('#editMsg').show();
                        $('#editPage').hide();
                        $('#radioGroup').show();
                    }
                    if (button[buttonIndex].media_id) {
                        $('.msg-context__item').hide();
                        $('.msg-template').show();
                    } else {
                        $('.msg-context__item').show();
                        $('.msg-template').hide();
                    }
                }

            }

        }
        //点击在二级菜单上
        if ($(this).parent().attr('id')) {
            var subIndex = $(this).parent("li").prevAll().length;
            var subText = button[buttonIndex].sub_button[subIndex].name;
            var subUrl = button[buttonIndex].sub_button[subIndex].url;
            var subType = button[buttonIndex].sub_button[subIndex].type;
            var subKey = button[buttonIndex].sub_button[subIndex].media_id;

            if ($('.custom-menu-view__menu__sub__add').hasClass('subbutton__actived')) {
                setInput(subText);
                updateTit(subText);
                $('#radioGroup').show();
                if (subType == 'media_id') {
                    radios[0].checked = true;
                    switch (button[buttonIndex].sub_button[subIndex].ctype) {
                        case 'image':
                            $("#imgLi").trigger('click');
                            break;
                        case 'voice':
                            $("#voice").trigger('click');
                            break;
                        case 'video':
                            $("#video").trigger('click');
                            break;
                        default:
                            $("#imgtextLi").trigger("click");
                    }
                    $('#editMsg').show();
                    $('#editPage').hide();

                    //拿key换取图文消息
                    $('.msg-template').html($('#' + subKey).html());
                    delElement();
                    //绑定删除事件
                    $('.msg-panel__del').on('click', delClick);
                    $('.msg-template').html(tempObj[subKey]);
                } else if (subType == 'view') {
                    radios[1].checked = true;
                    $('#editMsg').hide();
                    $('#editPage').show();
                    $('input[name="url"]').val(subUrl);
                } else if (!subType) {
                    radios[0].checked = true;
                    $('#editMsg').show();
                    $('#editPage').hide();
                    $('input[name="url"]').val('');
                }
                if (subKey) {
                    $('.msg-context__item').hide();
                    $('.msg-template').show();
                } else {
                    $('.msg-context__item').show();
                    $('.msg-template').hide();
                }
            }
        }
        //绑定删除事件
        $('.msg-panel__del').on('click', delClick);
    });

    //保存右侧菜单名称
    $('input[name="custom_input_title"]').keyup(function () {
        var val = $(this).val();
        var current = $('.subbutton__actived');
        if ($('.custom-menu-view__menu__sub__add').hasClass('subbutton__actived')) {
            var sub_row = $(".subbutton__actived").parents('.custom-menu-view__menu').prevAll().length;
            var sub_col = $('.subbutton__actived').prevAll().length;
            button[sub_row].sub_button[sub_col].name = val;
            current.find('.text-ellipsis').text(val);
            updateTit(val);
        } else if ($('.custom-menu-view__menu').hasClass('subbutton__actived')) {
            var alt = current.attr('alt');
            button[alt].name = val;
            current.children('.text-ellipsis').text(val);
            updateTit(val)
        }

    });
    //保存右侧跳转页面的url
    $('input[name="url"]').keyup(function () {
        var val = $(this).val();
        var current = $('.subbutton__actived');
        if ($('.custom-menu-view__menu__sub__add').hasClass('subbutton__actived')) {
            var sub_row = $(".subbutton__actived").parents('.custom-menu-view__menu').prevAll().length;
            var sub_col = $('.subbutton__actived').prevAll().length;
            button[sub_row].sub_button[sub_col].url = val;
            button[sub_row].sub_button[sub_col].type = 'view';
            if (button[sub_row].sub_button[sub_col].url == '') {
                delete button[sub_row].sub_button[sub_col].url;
            }
        } else if ($('.custom-menu-view__menu').hasClass('subbutton__actived')) {
            var alt = current.attr('alt');
            button[alt].url = val;
            button[alt].type = 'view';
            if (button[alt].url == '') {
                delete button[alt].url;
            }
        }

    });


    //tab切换
    $('.msg-panel__tab>li').click(function () {
        $('.msg-panel__tab>li').eq($(this).index()).addClass('on').siblings().removeClass('on');
        $('.msg-panel__context').eq($(this).index()).removeClass('hide').siblings().addClass('hide')
    });

    //菜单内容跳转
    radios = document.getElementsByName("radioBtn");
    for (var n = 0; n < radios.length; n++) {
        radios[n].index = n;
        radios[n].onchange = function () {
            if (radios[this.index].checked == true) {
                if (radios[this.index].value == 'link') {
                    $('#editMsg').hide();
                    $('#editPage').show();
                } else {
                    $('#editMsg').show();
                    $('#editPage').hide();
                }
            }
        };
    }


    delClick = function () {
        $('.msg-template').empty();
        $('.msg-context__item').show();
        $('.mask-bg').hide();

        var current = $('.subbutton__actived');
        if ($('.custom-menu-view__menu__sub__add').hasClass('subbutton__actived')) {
            var sub_col = $(".subbutton__actived").prevAll().length;
            var sub_row = $(".subbutton__actived").parents('.custom-menu-view__menu').prevAll().length;
            delete button[sub_row].sub_button[sub_col].media_id;
            delete button[sub_row].sub_button[sub_col].type;
        } else if ($('.custom-menu-view__menu').hasClass('subbutton__actived')) {
            var alt = $(".subbutton__actived").prevAll().length;
            delete button[alt].media_id;
            delete button[alt].type;
        }
    };
    //删除菜单按钮
    $('#delMenu').click(function () {
        var is_Actived = $('.custom-menu-view__menu').hasClass('subbutton__actived');//一级菜单选择项
        var is_actived = $('.custom-menu-view__menu__sub__add').hasClass('subbutton__actived');//二级菜单选中项
        var rowIndex = 0;
        var colIndex = 0;
        var liLength = $(".subbutton__actived").parents('.custom-menu-view__menu__sub');
        if (is_Actived) {
            rowIndex = $(".subbutton__actived").prevAll().length;
            $('.subbutton__actived').remove();
            button.splice(rowIndex, 1);
            let buttonLength = $(".custom-menu-view__menu:last[alt]").length;
            let isTrue = $(".custom-menu-view__menu .text-ellipsis .iBtn");
            if (buttonLength == 1) {
                $(".custom-menu-view__menu").css("width", '33.3333%');
            } else if (buttonLength == 0) {
                $(".custom-menu-view__menu").css("width", '50%');
            }
            if ($(".custom-menu-view__footer__right").children().length == 1) {
                $(".custom-menu-view__menu").css("width", '100%');
            }
            let divHtml = '<div class="custom-menu-view__menu"><div class="text-ellipsis"><i class="glyphicon glyphicon-plus text-info iBtn"></i></div></div>';
            if (!isTrue.length && isTrue.length == 0) {
                $(".custom-menu-view__footer__right").last().append(divHtml);
            }
        } else if (is_actived) {
            rowIndex = $(".subbutton__actived").parents('.custom-menu-view__menu').prevAll().length;
            colIndex = $('.subbutton__actived').prevAll().length;
            $('.subbutton__actived').remove();
            button[rowIndex].sub_button.splice(colIndex, 1);
            /*            if (colIndex == 0) {
                            delete button[rowIndex].sub_button;
                        }*/
            var l = $(liLength).find('li').length;
            var add_button = $(liLength).find("i");
            if (l < 5) {
                if (!add_button.length) {
                    let liHtml = '<li class="custom-menu-view__menu__sub__add"><div class="text-ellipsis"><i class="glyphicon glyphicon-plus text-info"></i></div></li>';
                    $(liLength).find("li:last").after(liHtml);
                }
            }
        }
        //清除右边数据
        $('.cm-edit-before').show().siblings().hide();
        updateTit('');
        setInput('');
        $('input[name="url"]').val('');
        $('.msg-template').children().remove();
        $('.msg-context__item').show();
    })
    //保存自定义菜单
    $('#saveBtns').click(function () {
        let url = null;
        let strRegex = '(https?|ftp|file)://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]';
        let re = new RegExp(strRegex);
        let flag ;
        for (let i = 0; i < button.length; i++) {
            if(button[i].sub_button.length){//判断是否有子元素
                for (let j = 0; j < button[i].sub_button.length; j++) {
                    //二级菜单
                    if (button[i].sub_button[j].hasOwnProperty('url')) {
                        url = button[i].sub_button[j].url;
                        if (!re.test(url)) {
                            layer.msg("请输入正确的url地址！");
                            flag =  false;
                        }
                    } else if (button[i].sub_button[j].hasOwnProperty('media_id')) {
                        flag = true;
                    } else {
                        flag =  false;
                        layer.msg("菜单内容不能为空！");
                    }
                }
            }else{//无
                //一级菜单
                if (button[i].hasOwnProperty('url')) {
                    url = button[i].url;
                    if (!re.test(url)) {
                        layer.msg("请输入正确的url地址！");
                        flag =  false;
                    }
                } else if (button[i].hasOwnProperty('media_id')) {
                    flag = true;
                } else {
                    flag =  false;
                    layer.msg("菜单内容不能为空！");
                }
            }
        }
        if(flag){
            saveAjax();
        }
    });
}


function imageText() {
    let appid = $("#appIdcode").val();
    $.ajax({
        url: baseURL + 'cwmcNewsInfo/twinfoList',
        type: 'POST',
        data: {'appid': appid, 'status': 1},
        dataType: "json",
        cache: false,
        async: false,
        success: function (responseStr) {
            $("#imgTextAdd").empty();
            let html = '';
            for (let i = 0; i < responseStr.list.length; i++) {
                let divHtml1 = '';
                let divHtml2 = '';

                if (i % 3 == 0) {
                    html += '<div style="display: flex;">';
                }
                let imgUrl = responseStr.list[i].groupList[0].url;
                html += '<div id=' + JSON.stringify(responseStr.list[i].groupList[0].media_id) + ' class="col-xs-4">' +
                    '<div class="panel panel-default">' +
                    '<div class=" newmodul">' +
                    '<div class="panel-heading msg-date">' +
                    '<div class=" weui-panel weui-panel_access">' +
                    '<div class="weui-panel__hd" style="height: 200px;background-image:url(' + imgUrl + ');background-size: 100% 100%;">' +
                    '<span class="newtitle">' + responseStr.list[i].groupList[0].title + '</span>' +
                    '</div>';
                let circle = '';
                if (responseStr.list[i].groupList.length > 1) {
                    html += '<div class="weui-panel__bd">';
                    for (let j = 1; j < responseStr.list[i].groupList.length; j++) {
                        circle = circle +
                            '<a href="javascript:void(0);" class="weui-media-box weui-media-box_appmsg">' +
                            '<div class="weui-media-box__bd">' +
                            '<h4 class="weui-media-box__title">' + responseStr.list[i].groupList[j].title + '</h4>' +
                            '</div>' +
                            '<div class="weui-media-box__hd">' +
                            '<img class="weui-media-box__thumb" src="' + responseStr.list[i].groupList[j].url + '" alt="">' +
                            '</div>' +
                            '</a>'
                    }
                    html += circle + '</div>';
                }
                html += '</div></div></div><div class="mask-bg"><div class="mask-icon"><i class="icon-ok"></i></div></div></div></div>';
                if (i % 3 == 2) {
                    html += '</div>'
                }
            }
            $("#imgTextAdd").append(html);
            modalAddClick();
        },
        error: function (responseStr) {
            layer.alert("出错啦");
        }
    });
    let delHtml = '<span class="msg-panel__del del-tuwen">删除</span>';
    if ($(".subbutton__actived").attr('alt')) {
        let row = $(".subbutton__actived").prevAll().length;
        if (button[row].ctype != null) {
            $('.msg-template').empty();
            $('.msg-context__item').css("display", "block");
            $('.mask-bg').hide();
        } else if (typeof (button[row].ctype) == 'undefined') {
            $('.msg-template').empty();
            $('.msg-context__item').css("display", "block");
        } else {
            var subKey = button[row].media_id;
            if (typeof (subKey) == 'undefined') {
                $('.msg-template').empty();
                $('.msg-context__item').css("display", "block");
                $('.mask-bg').hide();
            } else {
                $('.msg-template').html($('#' + subKey).html());
                $('.msg-template').append(delHtml);
                //绑定删除事件
                $('.msg-panel__del').on('click', delClick);
                $('.msg-context__item').css("display", "none");
            }
        }
    } else if ($(".subbutton__actived").attr('id')) {
        let row = $(".subbutton__actived").parents('.custom-menu-view__menu').prevAll().length;
        let clo = $(".subbutton__actived").prevAll().length;
        if (typeof (button[row].sub_button[clo].ctype) == 'undefined') {
            $('.msg-template').empty();
            $('.msg-context__item').css("display", "block");
        } else if (button[row].sub_button[clo].ctype != null) {
            $('.msg-template').empty();
            $('.msg-context__item').css("display", "block");
            $('.mask-bg').hide();
        } else {
            var subKey = button[row].sub_button[clo].media_id;
            if (typeof (subKey) == 'undefined') {
                $('.msg-template').empty();
                $('.msg-context__item').css("display", "block");
                $('.mask-bg').hide();
            } else {
                $('.msg-template').html($('#' + subKey).html());
                $('.msg-template').append(delHtml);
                //绑定删除事件
                $('.msg-panel__del').on('click', delClick);
                $('.msg-context__item').css("display", "none");
            }
        }
    }
}

function picture() {
    var appid = $("#appIdcode").val();
    $.ajax({
        url: baseURL + 'wechat/material/loadPic',
        type: 'POST',
        data: {appid: appid},
        dataType: "json",
        cache: false,
        async: false,
        success: function (responseStr) {
            $("#imgTextAdd").empty();
            var imgHtml = '';
            for (let i = 0; i < responseStr.length; i++) {
                if (i % 3 == 0) {
                    imgHtml += '<div style="display: flex;">'
                }
                imgHtml += '<div id=' + JSON.stringify(responseStr[i].mediaId) + ' class="col-xs-4">'
                    + '<div class="panel panel-default">'
                    + '<div class="panel-body">'
                    + '<div class="msg-img"><img src=' + JSON.stringify(responseStr[i].url) + ' alt=""></div>'
                    + '</div>'
                    + '<div class="mask-bg"><div class="mask-icon"><i class="icon-ok"></i></div></div>'
                    + '</div>'
                    + '</div>';
                if (i % 3 == 2) {
                    imgHtml += '</div>'
                }
            }
            ;
            $("#imgTextAdd").append(imgHtml);
            modalAddClick();
        },
        error: function (responseStr) {
            layer.alert("出错啦");
        }
    });
    let delHtml = '<span class="msg-panel__del del-tuwen">删除</span>';
    if ($(".subbutton__actived").attr('alt')) {
        let row = $(".subbutton__actived").prevAll().length;
        if (button[row].ctype != 'image') {
            $('.msg-template').empty();
            $('.msg-context__item').css("display", "block");
            $('.mask-bg').hide();
        } else {
            var subKey = button[row].media_id;
            if (typeof (subKey) == 'undefined') {
                $('.msg-template').empty();
                $('.msg-context__item').css("display", "block");
                $('.mask-bg').hide();
            } else {
                $('.msg-template').html($('#' + subKey).html());
                $('.msg-template').append(delHtml);
                //绑定删除事件
                $('.msg-panel__del').on('click', delClick);
                $('.msg-context__item').css("display", "none");
            }
        }
    } else if ($(".subbutton__actived").attr('id')) {
        let row = $(".subbutton__actived").parents('.custom-menu-view__menu').prevAll().length;
        let clo = $(".subbutton__actived").prevAll().length;
        if (typeof (button[row].sub_button[clo].ctype) == 'undefined') {
            $('.msg-template').empty();
            $('.msg-context__item').css("display", "block");
        } else if (button[row].sub_button[clo].ctype != 'image') {
            $('.msg-template').empty();
            $('.msg-context__item').css("display", "block");
            $('.mask-bg').hide();
        } else {
            var subKey = button[row].sub_button[clo].media_id;
            if (typeof (subKey) == 'undefined') {
                $('.msg-template').empty();
                $('.msg-context__item').css("display", "block");
                $('.mask-bg').hide();
            } else {
                $('.msg-template').html($('#' + subKey).html());
                $('.msg-template').append(delHtml);
                //绑定删除事件
                $('.msg-panel__del').on('click', delClick);
                $('.msg-context__item').css("display", "none");
            }
        }
    }
}

function voice() {
    var appid = $("#appIdcode").val();
    $.ajax({
        url: baseURL + 'wechat/material/loadVoice',
        type: 'POST',
        data: {appid: appid},
        dataType: "json",
        cache: false,
        async: false,
        success: function (responseStr) {
            $("#imgTextAdd").empty();
            for (var i = 0; i < responseStr.length; i++) {
                let voice = '<div id=' + JSON.stringify(responseStr[i].mediaId) + ' class="col-xs-4">' +
                    '   <div class="panel panel-default">' +
                    '   <div class="panel-body"><div class="wx-audio-content jg" >' +
                    '    <audio muted class="wx-audio-content"  src=\"' + responseStr[i].url + '\" loop="true"></audio>' +
                    '    <div class="wx-audio-left">\n' +
                    '     <img class="wx-audio-state"  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFQAAABUCAMAAAArteDzAAAAaVBMVEUAAAAarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRlIa6J1AAAAInRSTlMA9wYa38QR7ZJnMK1IIqBsO3fXDbSGQudZz5fKpV0rfbpRlHIjYQAAA35JREFUWMPFWduyqjAMDS0tgtwEFBGv/P9Hntmh3cWDTYsMs/Oio3SRy0qapuCU7PXIRdUGQxCFncgfrwzWCb/l4TCTML/xbxFlIQariEJ+AZnkwUBKkCdLIZvBQ5olsPw61Uhc4vTOa4Ca39P4IqYWXH2dyw5mWXUs2ez/8liZVx6YD2bW6wXRzmpesov0U70HxW5azTBmpD1xqJW9uUzfaS0Lp1ms0Nru6Nfv9WPSi8lahT2BKoWyvARPKZUPhLRiduq9ckHaKds6y5pa6XmARXJQutaEP4MzLJTzyJfmk193I2YKiyUdUXcf+OnCdKPO+JqNvxO2kx4YNcr+c2jvjpE7Wv27W4uRS/C1jFEu3mpdhJyX34PWISY3ByNj/SxhhZRjfZ0UMkUJt3Bxx08rJU2xbFB16YEZDiG3JSy6sHlXNPbCHIbOVpHiN1VzjBLzKOCkmxjGKld6B4oNbjkiqi3rkJeBNN8jBj7SUEaxyGgnjE1OkS0mHkUAgd5X/qWF80mWR7PaOY0410GrnHHXVHpSqlZII521RzeXqtpkTkgEEitIiwF1YeLDJgQnIldbgAx5wMBj5z4br+aWB5GdGbxUxGjUp6ESLmxhJsaMFzx+Pi5+VIpN6bTUlcvPfw/InXlvjO5MjsdE/ucg6DjxRlEJY4Wb0J1IlnR0ZoXGEHF/6l1I68d+vj3ho9xH0mO+cjumNiMxvg/tTOWYcIAkqCl+XjRbtH7CHv4aCQrIQIui3TCxNPyN1BMXfhQFFxCgJ/yzmYAaTpGgEZpPoOq60GJctfkRaX5IBApRVTNTm/TvnYHqCEoh6kMzUCuNxnUUpVzkB/2+/Pc5iTpT5PdNUx78FrMT6kymqbugmEpxNZU4JXaph7v0GbOGxJQ3SZU+ryINSWT8iAt6skg7txPD1wCJN/rrQG0nZuNzo54nHQOnNj6zRTtRj5Pe5klu0d7NBGTThvFENhNE20NQS5BtD9GgUdQqyQZtaSuZ4bIr1fUGcmHTCz1SRpJNL9GeE3xNHe35/CDhRj04DhLzI48b9eI48mxxONvyGLn+wGtsLTY5mm87RFg/7jhNxh3bD2aANWtHSFsOu7Yfy60fIG4/6lw/lN14fOwedJdWXxKD7m1H8u7LAwZMZsn88mCDa46/v5DZ6OoIhcf7dg7Y7mPalb7XcVEwDEFU+V3H/QOplcP+ctPpgwAAAABJRU5ErkJggg==" />\n' +
                    '    </div>' +
                    '    <div class="wx-audio-right">' +
                    '     <div><p class="wx-audio-title">' + responseStr[i].title + '</p>' +
                    '     <p class="wx-audio-disc">' + responseStr[i].createTime + '</p>' +
                    '     <p class="wx-audio-disc">00:' + responseStr[i].duration + '</p></div>' +
                    '    </div></div>' +
                    '   </div><div class="mask-bg"><div class="mask-icon"><i class="icon-ok"></i></div></div></div>';
                $("#imgTextAdd").append(voice);
            }
            modalAddClick();
        },
        error: function (responseStr) {
            layer.alert("出错啦");
        }
    });
    let delHtml = '<span class="msg-panel__del del-tuwen">删除</span>';
    if ($(".subbutton__actived").attr('alt')) {
        let row = $(".subbutton__actived").prevAll().length;
        if (button[row].ctype != 'voice') {
            $('.msg-template').empty();
            $('.msg-context__item').css("display", "block");
            $('.mask-bg').hide();
        } else {
            var subKey = button[row].media_id;
            if (typeof (subKey) == 'undefined') {
                $('.msg-template').empty();
                $('.msg-context__item').css("display", "block");
                $('.mask-bg').hide();
            } else {
                $('.msg-template').html($('#' + subKey).html());
                $('.msg-template').append(delHtml);
                //绑定删除事件
                $('.msg-panel__del').on('click', delClick);
                $('.msg-context__item').css("display", "none");
            }
        }
    } else if ($(".subbutton__actived").attr('id')) {
        let row = $(".subbutton__actived").parents('.custom-menu-view__menu').prevAll().length;
        let clo = $(".subbutton__actived").prevAll().length;
        if (typeof (button[row].sub_button[clo].ctype) == 'undefined') {
            $('.msg-template').empty();
            $('.msg-context__item').css("display", "block");
        } else if (button[row].sub_button[clo].ctype != 'voice') {
            $('.msg-template').empty();
            $('.msg-context__item').css("display", "block");
            $('.mask-bg').hide();
        } else {
            var subKey = button[row].sub_button[clo].media_id;
            if (typeof (subKey) == 'undefined') {
                $('.msg-template').empty();
                $('.msg-context__item').css("display", "block");
                $('.mask-bg').hide();
            } else {
                $('.msg-template').html($('#' + subKey).html());
                $('.msg-template').append(delHtml);
                //绑定删除事件
                $('.msg-panel__del').on('click', delClick);
                $('.msg-context__item').css("display", "none");
            }
        }
    }
}

function video1() {
    var appid = $("#appIdcode").val();
    $.ajax({
        url: baseURL + 'wechat/material/loadVoice',
        type: 'POST',
        data: {appid: appid},
        dataType: "json",
        cache: false,
        async: false,
        success: function (responseStr) {
            $("#imgTextAdd").empty();
            for (var i = 0; i < responseStr.length; i++) {
                let voice = '<div id=' + JSON.stringify(responseStr[i].mediaId) + ' class="col-xs-4">' +
                    '   <div class="panel panel-default">' +
                    '   <div class="panel-body"><div class="wx-audio-content jg" >' +
                    '    <audio muted class="wx-audio-content"  src=\"' + responseStr[i].url + '\" loop="true"></audio>' +
                    '    <div class="wx-audio-left">\n' +
                    '     <img class="wx-audio-state"  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFQAAABUCAMAAAArteDzAAAAaVBMVEUAAAAarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRkarRlIa6J1AAAAInRSTlMA9wYa38QR7ZJnMK1IIqBsO3fXDbSGQudZz5fKpV0rfbpRlHIjYQAAA35JREFUWMPFWduyqjAMDS0tgtwEFBGv/P9Hntmh3cWDTYsMs/Oio3SRy0qapuCU7PXIRdUGQxCFncgfrwzWCb/l4TCTML/xbxFlIQariEJ+AZnkwUBKkCdLIZvBQ5olsPw61Uhc4vTOa4Ca39P4IqYWXH2dyw5mWXUs2ez/8liZVx6YD2bW6wXRzmpesov0U70HxW5azTBmpD1xqJW9uUzfaS0Lp1ms0Nru6Nfv9WPSi8lahT2BKoWyvARPKZUPhLRiduq9ckHaKds6y5pa6XmARXJQutaEP4MzLJTzyJfmk193I2YKiyUdUXcf+OnCdKPO+JqNvxO2kx4YNcr+c2jvjpE7Wv27W4uRS/C1jFEu3mpdhJyX34PWISY3ByNj/SxhhZRjfZ0UMkUJt3Bxx08rJU2xbFB16YEZDiG3JSy6sHlXNPbCHIbOVpHiN1VzjBLzKOCkmxjGKld6B4oNbjkiqi3rkJeBNN8jBj7SUEaxyGgnjE1OkS0mHkUAgd5X/qWF80mWR7PaOY0410GrnHHXVHpSqlZII521RzeXqtpkTkgEEitIiwF1YeLDJgQnIldbgAx5wMBj5z4br+aWB5GdGbxUxGjUp6ESLmxhJsaMFzx+Pi5+VIpN6bTUlcvPfw/InXlvjO5MjsdE/ucg6DjxRlEJY4Wb0J1IlnR0ZoXGEHF/6l1I68d+vj3ho9xH0mO+cjumNiMxvg/tTOWYcIAkqCl+XjRbtH7CHv4aCQrIQIui3TCxNPyN1BMXfhQFFxCgJ/yzmYAaTpGgEZpPoOq60GJctfkRaX5IBApRVTNTm/TvnYHqCEoh6kMzUCuNxnUUpVzkB/2+/Pc5iTpT5PdNUx78FrMT6kymqbugmEpxNZU4JXaph7v0GbOGxJQ3SZU+ryINSWT8iAt6skg7txPD1wCJN/rrQG0nZuNzo54nHQOnNj6zRTtRj5Pe5klu0d7NBGTThvFENhNE20NQS5BtD9GgUdQqyQZtaSuZ4bIr1fUGcmHTCz1SRpJNL9GeE3xNHe35/CDhRj04DhLzI48b9eI48mxxONvyGLn+wGtsLTY5mm87RFg/7jhNxh3bD2aANWtHSFsOu7Yfy60fIG4/6lw/lN14fOwedJdWXxKD7m1H8u7LAwZMZsn88mCDa46/v5DZ6OoIhcf7dg7Y7mPalb7XcVEwDEFU+V3H/QOplcP+ctPpgwAAAABJRU5ErkJggg==" />\n' +
                    '    </div>' +
                    '    <div class="wx-audio-right">' +
                    '     <div><p class="wx-audio-title">' + responseStr[i].title + '</p>' +
                    '     <p class="wx-audio-disc">' + responseStr[i].createTime + '</p>' +
                    '     <p class="wx-audio-disc">00:' + responseStr[i].duration + '</p></div>' +
                    '    </div></div>' +
                    '   </div><div class="mask-bg"><div class="mask-icon"><i class="icon-ok"></i></div></div></div>';
                $("#imgTextAdd").append(voice);
            }
            $("#imgTextAdd").append(voice);
            modalAddClick();
        },
        error: function (responseStr) {
            layer.alert("出错啦");
        }
    });
    let delHtml = '<span class="msg-panel__del del-tuwen">删除</span>';
    if ($(".subbutton__actived").attr('alt')) {
        let row = $(".subbutton__actived").prevAll().length;
        if (button[row].ctype != 'video') {
            $('.msg-template').empty();
            $('.msg-context__item').css("display", "block");
            $('.mask-bg').hide();
        } else {
            var subKey = button[row].media_id;
            if (typeof (subKey) == 'undefined') {
                $('.msg-template').empty();
                $('.msg-context__item').css("display", "block");
                $('.mask-bg').hide();
            } else {
                $('.msg-template').html($('#' + subKey).html());
                $('.msg-template').append(delHtml);
                //绑定删除事件
                $('.msg-panel__del').on('click', delClick);
                $('.msg-context__item').css("display", "none");
            }
        }
    } else if ($(".subbutton__actived").attr('id')) {
        let row = $(".subbutton__actived").parents('.custom-menu-view__menu').prevAll().length;
        let clo = $(".subbutton__actived").prevAll().length;
        if (typeof (button[row].sub_button[clo].ctype) == 'undefined') {
            $('.msg-template').empty();
            $('.msg-context__item').css("display", "block");
        } else if (button[row].sub_button[clo].ctype != 'video') {
            $('.msg-template').empty();
            $('.msg-context__item').css("display", "block");
            $('.mask-bg').hide();
        } else {
            var subKey = button[row].sub_button[clo].media_id;
            if (typeof (subKey) == 'undefined') {
                $('.msg-template').empty();
                $('.msg-context__item').css("display", "block");
                $('.mask-bg').hide();
            } else {
                $('.msg-template').html($('#' + subKey).html());
                $('.msg-template').append(delHtml);
                //绑定删除事件
                $('.msg-panel__del').on('click', delClick);
                $('.msg-context__item').css("display", "none");
            }
        }
    }
}

function modalAddClick() {
    $(".msg-panel_select").on('click', function () {
        if ($("li").hasClass("msg-tab_item on")) {
            let dom = $("#clickUl").find(".on").attr('id');
            switch (dom) {
                case 'imgtextLi':
                    $(".modal-title1").text('选择图文消息');
                    break;
                case 'imgLi':
                    $(".modal-title1").text('选择图片消息');
                    break;
                case 'voice':
                    $(".modal-title1").text('选择语音消息');
                    break;
                case 'video':
                    $(".modal-title1").text('选择视频消息');
                    break;
            }
        }
    });
    //id为selectModal弹框选中遮罩层
    $('#selectModal .modal-body .panel').click(function () {
        $(this).find('.mask-bg').show();
        $(this).parent().siblings().find('.mask-bg').hide();
        mId = $(this).parent().attr('id');
    });
    //id为selectModal弹框确定按钮事件
    $('#selectModal .ensure').on('click', function () {
        var msgTemp = $('.msg-template');
        var delEl = '<span class="msg-panel__del del-tuwen">删除</span>';
        if (mId != null) {
            msgTemp.html($('#' + mId).html());
            delElement();
            msgTemp.find('.mask-bg').hide();
            msgTemp.siblings().hide();
            msgTemp.show();
            tempObj[mId] = msgTemp.html();
            //绑定删除事件
            $('.msg-panel__del').on('click', delClick);
            var current = $('.subbutton__actived').prevAll().length;
            var input_name = $('input[name="custom_input_title"]');
            if ($('.custom-menu-view__menu__sub__add').hasClass('subbutton__actived')) {
                var sub_col = $(".subbutton__actived").prevAll().length;
                var sub_row = $(".subbutton__actived").parents('.custom-menu-view__menu').prevAll().length;
                button[sub_row].sub_button[sub_col].name = input_name.val();
                button[sub_row].sub_button[sub_col].media_id = mId;
                button[sub_row].sub_button[sub_col].type = 'media_id';
                if ($("li").hasClass("msg-tab_item on")) {
                    let dom = $("#clickUl").find(".on").attr('id');
                    switch (dom) {
                        case 'imgtextLi':
                            button[sub_row].sub_button[sub_col].ctype = null;
                            break;
                        case 'imgLi':
                            button[sub_row].sub_button[sub_col].ctype = 'image';
                            break;
                        case 'voice':
                            button[sub_row].sub_button[sub_col].ctype = 'voice';
                            break;
                        case 'video':
                            button[sub_row].sub_button[sub_col].ctype = 'video';
                            break;
                    }
                }
            } else if ($('.custom-menu-view__menu').hasClass('subbutton__actived')) {
                button[current].name = input_name.val();
                button[current].media_id = mId;
                button[current].type = 'media_id';
                if ($("li").hasClass("msg-tab_item on")) {
                    let dom = $("#clickUl").find(".on").attr('id');
                    switch (dom) {
                        case 'imgtextLi':
                            button[current].ctype = null;
                            break;
                        case 'imgLi':
                            button[current].ctype = 'image';
                            break;
                        case 'voice':
                            button[current].ctype = 'voice';
                            break;
                        case 'video':
                            button[current].ctype = 'video';
                            break;
                    }
                }
            }
        }
        $('#selectModal').modal('hide');
    });
}

function appIdChange() {
    var app_id = $("#appIdcode").val();
    $.ajax({
        url: baseURL + 'sys/menuConfig/queryListByAppOrParent/' + app_id,
        type: "POST",
        data: null, // 以json字符串方式传递
        cache: false,
        async: false,
        success: function (data) {
            if (data.buttonMenu.button.length > 0) {
                obj = {
                    "menu": data.buttonMenu
                };
                $('.custom-menu-view__menu').remove();

                //清除右边数据
                $('.cm-edit-before').show().siblings().hide();
                menuCreate(obj);
            } else {
                obj = {
                    "menu": data.buttonMenu
                };
                $('.custom-menu-view__menu').remove();
                menuCreate(obj);
                //清除右边数据
                $('.cm-edit-before').show().siblings().hide();
            }
        },
        error: function (data) {
        }
    });
}

jQuery(function ($) {
    $.ajax({
        url: baseURL + 'sys/role/getappidlist',
        type: "POST",
        data: null, // 以json字符串方式传递
        cache: false,
        async: false,
        success: function (data) {

            var str = "";
            for (var i = 0; i < data.list.length; i++) {
                str += "<option value='" + data.list[i].id + "'>" + data.list[i].text + "</option>";
            }
            if (data.list.length >= 0) {
                $(".custom-menu-view__title").text(data.list[0].text);
            }
            $('#appIdcode').html(str);
            appIdChange();
        },
        error: function (data) {
        }
    });

    $("#appIdcode").on("change", function (e) {
        // e 的话就是一个对象 然后需要什么就 “e.参数” 形式 进行获取
        appIdChange();
        imageText();
        $(".custom-menu-view__title").text(' ');
        $(".custom-menu-view__title").text($("#appIdcode").find("option:selected").text());
    })
})

$('#synchroBtns').click(function () {
    $.ajax({
        url: baseURL + 'sys/menuConfig/synchro',
        type: "POST",
        data: JSON.stringify({
            "appId": $("#appIdcode").val()
        }),
        contentType: "application/json",
        dataType: "json",
        success: function (data) {
            if (data.reg == "ok") {
                layer.msg("同步成功！");
            } else {
                layer.alert(data.msg);
            }
        },
        error: function (data) {
        }
    });

});


$(function () {
    // 预览点击
    $("#showPhone").on('click', function () {
        $("#mobileDiv").css('display', "block");
        $(".mask").css('display', "block");
        //公众号名
        $(".nickname").text(' ');
        $(".nickname").text($("#appIdcode").find("option:selected").text());
        $("#viewList").empty();
        $("#viewShow").empty();
        $(".cm-edit-after").css('display', 'none');
        $(".cm-edit-before").css('display', 'block');
        $(".subbutton__actived").removeClass('subbutton__actived');
        //遍历按钮
        let html
        for (let i = 0; i < obj.menu.button.length; i++) {
            html = '<li class="pre_menu_item grid_item size1of' + obj.menu.button.length + ' jsViewLi " id="menu_' + i + '">' +
                '<a href="javascript:void(0);" class="jsView pre_menu_link" title="' + obj.menu.button[i].name + '" draggable="false" ' +
                'media_id="' + obj.menu.button[i].media_id + '" ctype="' + obj.menu.button[i].ctype + '" type="' + obj.menu.button[i].type + '">';
            if (obj.menu.button[i].sub_button.length) {
                html += '<i class="icon_menu_dot"></i>';
            }
            html += obj.menu.button[i].name + '</a>';
            let htmlDiv = '';
            if (obj.menu.button[i].sub_button.length) {
                htmlDiv += '<div class="sub_pre_menu_box jsSubViewDiv" style="display:none">' +
                    '<ul class="sub_pre_menu_list">';
                for (let j = 0; j < obj.menu.button[i].sub_button.length; j++) {
                    htmlDiv += '<li id="subMenu_menu_0_' + j + '">' +
                        '<a href="javascript:void(0);" class="jsSubView" title="' + obj.menu.button[i].sub_button[j].name + '" draggable="false" ' +
                        'media_id="' + obj.menu.button[i].sub_button[j].media_id + '" ctype="' + obj.menu.button[i].sub_button[j].ctype + '" type="' + obj.menu.button[i].sub_button[j].type + '">' +
                        obj.menu.button[i].sub_button[j].name +
                        '</a>' +
                        '</li>';
                }
                htmlDiv += '</ul>' +
                    '<i class="arrow arrow_out"></i>' +
                    '<i class="arrow arrow_in"></i>' +
                    '</div>';
            }
            html += htmlDiv + '</li>';
            $("#viewList").append(html);
        }

        $(".jsViewLi").off('click').on('click', function () {
            switch ($(this).find('.jsSubViewDiv').css('display')) {
                case 'none':
                    $('.jsSubViewDiv').css('display', 'none');
                    $(this).find('.jsSubViewDiv').css('display', 'block');
                    break;
                case 'block':
                    $('.jsSubViewDiv').css('display', 'none');
                    $(this).find('.jsSubViewDiv').css('display', 'none');
                    break;
            }
        })
        $("#viewList").off('click').on('click', 'li', function () {
            switch ($(this).children('a').attr('type')) {
                case 'media_id':
                    let media_id = $(this).children('a').attr('media_id');
                    switch ($(this).children('a').attr('ctype')) {// $('#' + mId).html()
                        case 'null':
                            imageText();
                            $("#viewShow").append('<li class="show_item">' + $('#' + media_id).html() + '</li>');
                            $('.mobile_preview_bd').scrollTop($('#viewShow')[0].scrollHeight);
                            break;
                        case 'image':
                            picture();
                            $("#viewShow").append('<li class="show_item">' + $('#' + media_id).html() + '</li>');
                            $('.mobile_preview_bd').scrollTop($('#viewShow')[0].scrollHeight);
                            break;
                        case 'voice':
                            voice();
                            $("#viewShow").append('<li class="show_item">' + $('#' + media_id).html() + '</li>');
                            $('.mobile_preview_bd').scrollTop($('#viewShow')[0].scrollHeight);
                            break;
                        case 'video':
                            video1();
                            $("#viewShow").append('<li class="show_item">' + $('#' + media_id).html() + '</li>');
                            $('.mobile_preview_bd').scrollTop($('#viewShow')[0].scrollHeight);
                            break;
                    }
                    break;
                case 'view':
                    //根据当前点击li判断上级ul是否一级菜单
                    if ($(this).parent('ul').hasClass('sub_pre_menu_list')) {//代表二级菜单
                        let row = $(this).parents('.pre_menu_item').prevAll().length;
                        let col = $(this).prevAll().length;
                        $(this).children('a').attr('href', button[row].sub_button[col].url);
                        $(this).children('a').attr('target', '_blank');
                    } else if ($(this).parent('ul').hasClass('pre_menu_list')) {//代表一级菜单
                        let row = $(this).prevAll().length;
                        $(this).children('a').attr('href', button[row].url);
                        $(this).children('a').attr('target', '_blank');
                    }
                    break;
            }
        });
    })
    // 退出预览
    $(".mobile_preview_closed").on('click', function () {
        $("#mobileDiv").css('display', "none");
        $(".mask").css('display', "none");
    })
})