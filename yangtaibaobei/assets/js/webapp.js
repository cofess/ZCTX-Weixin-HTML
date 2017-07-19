/* 
 * store.js
 * 本地存储localstorage的封装，提供简单的AIP
 * http://jaywcjlove.github.io/store.js
 */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.store = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
"use strict";module.exports=function(){function e(){try{return o in n&&n[o]}catch(e){return!1}}var t,r={},n="undefined"!=typeof window?window:global,i=n.document,o="localStorage",a="script";if(r.disabled=!1,r.version="1.3.20",r.set=function(e,t){},r.get=function(e,t){},r.has=function(e){return void 0!==r.get(e)},r.remove=function(e){},r.clear=function(){},r.transact=function(e,t,n){null==n&&(n=t,t=null),null==t&&(t={});var i=r.get(e,t);n(i),r.set(e,i)},r.getAll=function(){},r.forEach=function(){},r.serialize=function(e){return JSON.stringify(e)},r.deserialize=function(e){if("string"==typeof e)try{return JSON.parse(e)}catch(t){return e||void 0}},e())t=n[o],r.set=function(e,n){return void 0===n?r.remove(e):(t.setItem(e,r.serialize(n)),n)},r.get=function(e,n){var i=r.deserialize(t.getItem(e));return void 0===i?n:i},r.remove=function(e){t.removeItem(e)},r.clear=function(){t.clear()},r.getAll=function(){var e={};return r.forEach(function(t,r){e[t]=r}),e},r.forEach=function(e){for(var n=0;n<t.length;n++){var i=t.key(n);e(i,r.get(i))}};else if(i&&i.documentElement.addBehavior){var c,u;try{u=new ActiveXObject("htmlfile"),u.open(),u.write("<"+a+">document.w=window</"+a+'><iframe src="/favicon.ico"></iframe>'),u.close(),c=u.w.frames[0].document,t=c.createElement("div")}catch(l){t=i.createElement("div"),c=i.body}var f=function(e){return function(){var n=Array.prototype.slice.call(arguments,0);n.unshift(t),c.appendChild(t),t.addBehavior("#default#userData"),t.load(o);var i=e.apply(r,n);return c.removeChild(t),i}},d=new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]","g"),s=function(e){return e.replace(/^d/,"___$&").replace(d,"___")};r.set=f(function(e,t,n){return t=s(t),void 0===n?r.remove(t):(e.setAttribute(t,r.serialize(n)),e.save(o),n)}),r.get=f(function(e,t,n){t=s(t);var i=r.deserialize(e.getAttribute(t));return void 0===i?n:i}),r.remove=f(function(e,t){t=s(t),e.removeAttribute(t),e.save(o)}),r.clear=f(function(e){var t=e.XMLDocument.documentElement.attributes;e.load(o);for(var r=t.length-1;r>=0;r--)e.removeAttribute(t[r].name);e.save(o)}),r.getAll=function(e){var t={};return r.forEach(function(e,r){t[e]=r}),t},r.forEach=f(function(e,t){for(var n,i=e.XMLDocument.documentElement.attributes,o=0;n=i[o];++o)t(n.name,r.deserialize(e.getAttribute(n.name)))})}try{var v="__storejs__";r.set(v,v),r.get(v)!=v&&(r.disabled=!0),r.remove(v)}catch(l){r.disabled=!0}return r.enabled=!r.disabled,r}();
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1])(1)
});
/* 
 * 数组函数
 * 从数组中删除指定值（不是指定位置）的元素
 * http://jxd-zxf.iteye.com/blog/765804
 */
//查找某个值在数组中的位置
Array.prototype.indexOf = function(val) {  
    for (var i = 0; i < this.length; i++) {  
        if (this[i] == val) return i;  
    }  
    return -1;  
};

//从数组中删除某个值
Array.prototype.remove = function(val) {  
    var index = this.indexOf(val);  
    if (index > -1) {  
         this.splice(index, 1);  
    }  
}; 

/* global $:true */
+function ($) {
  var modal = $.modal.prototype.defaults;
  modal.modalButtonOk = "确定";
  modal.modalButtonCancel = "取消";
  modal.modalPreloaderTitle = "正在加载...";
  modal.closePrevious = false;//https://github.com/lihongxun945/light7/issues/51

  var calendar = $.fn.calendar.prototype.defaults;
  
  calendar.monthNames = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月' , '九月' , '十月', '十一月', '十二月'];
  calendar.monthNamesShort = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月' , '九月' , '十月', '十一月', '十二月'];
  calendar.dayNames = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  calendar.dayNamesShort = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
}($);
/**
 * 下拉刷新
 * 
 */
$(document).on('refresh', '.pull-to-refresh-content',function(e) {
    setTimeout(function() {
        $.pullToRefreshDone('.pull-to-refresh-content');
    }, 2000);
});
/*===============================================================================
************   Accordion   ************
===============================================================================*/
/* global Zepto:true */
+function ($) {
    "use strict";

    $.accordionToggle = function (item) {
        item = $(item);
        if (item.length === 0) return;
        if (item.hasClass('accordion-item-expanded')) $.accordionClose(item);
        else $.accordionOpen(item);
    };
    $.accordionOpen = function (item) {
        item = $(item);
        var list = item.parents('.accordion-list').eq(0);
        var content = item.children('.accordion-item-content');
        if (content.length === 0) content = item.find('.accordion-item-content');
        var expandedItem = list.length > 0 && item.parent().children('.accordion-item-expanded');
        if (expandedItem.length > 0) {
            $.accordionClose(expandedItem);
        }
        content.css('height', content[0].scrollHeight + 'px').transitionEnd(function () {
            if (item.hasClass('accordion-item-expanded')) {
                //content.transition(0);
                //content.css('height', 'auto');
                //var clientLeft = content[0].clientLeft;
                //content.transition('');
                item.trigger('opened');
            }
            else {
                content.css('height', '');
                item.trigger('closed');
            }
        });
        item.trigger('open');
        item.addClass('accordion-item-expanded');
    };
    $.accordionClose = function (item) {
        item = $(item);
        var content = item.children('.accordion-item-content');
        if (content.length === 0) content = item.find('.accordion-item-content');
        item.removeClass('accordion-item-expanded');
        //content.transition(0);
        content.css('height', content[0].scrollHeight + 'px');
        // Relayout
        //var clientLeft = content[0].clientLeft;
        // Close
        //content.transition('');
        content.css('height', '').transitionEnd(function () {
            if (item.hasClass('accordion-item-expanded')) {
                //content.transition(0);
                //content.css('height', 'auto');
                //var clientLeft = content[0].clientLeft;
                //content.transition('');
                item.trigger('opened');
            }
            else {
                content.css('height', '');
                item.trigger('closed');
            }
        });
        item.trigger('close');
    };

    $(document).on("click", ".accordion-item .item-content, .accordion-item-toggle", function(e) {
        e.preventDefault();
        var clicked = $(this);
        // Accordion
        if (clicked.hasClass('accordion-item-toggle') || (clicked.hasClass('item-link') && clicked.parent().hasClass('accordion-item'))) {
            var accordionItem = clicked.parent('.accordion-item');
            if (accordionItem.length === 0) accordionItem = clicked.parents('.accordion-item');
            if (accordionItem.length === 0) accordionItem = clicked.parents('li');
            $.accordionToggle(accordionItem);
        }
    });
}($);
/**
 * back回退时，只url回退 页面不回退
 * https://github.com/lihongxun945/light7/issues/129
 */
$('document').ready(function(){
    setTimeout(function() {
        window.addEventListener('popstate', $.proxy(self.onpopstate, self));
        //console.log(1);
    }, 0);
});

/**
 * cart
 */
jQuery(document).ready(function(){
    var product = $('.item-goods'),
        productCustomization = $('.goods-para'),
        cart = $('.cart');

    if(!store.has('cart')){
        store.set('cart', {
            sum:0,//购物车商品总数
            totalCost:0,//购物车商品总额
            goods:'[]',//购物车商品列表
        });
        var storeCart = store.get("cart");
        var items= JSON.parse(storeCart.goods);
        console.log(items);
    }else{
        if(store.get('cart').sum>0){
            ( !cart.hasClass('item-added') ) && cart.addClass('item-added');
            cart.find('span').text(store.get('cart').sum);
        }
    }
    
    initCustomization(productCustomization);

    function initCustomization(items) {
        updateCost();
        items.each(function(){
            var actual = $(this),
                //selectOptions = actual.find('[data-type="select"]'),
                addToCartBtn = actual.find('.add-to-cart'),
                removeBtn = actual.find('.remove-item'),
                numbox = actual.find('.numbox');

            numbox.on('click', function(event) {
                event.preventDefault();
                /* Act on the event */
                var num=parseInt($(this).find('input[type="number"]').val());
                if( $(event.target).is('.minus') && num > 0 ) {
                    $(this).find('input[type="number"]').val(num-1);
                }
                if($(event.target).is('.plus')){
                    $(this).find('input[type="number"]').val(num+1);
                }
                $(this).find('input[type="number"]').change();//模拟change事件
            });

            removeBtn.on('click', function(event) {
                event.preventDefault();
                /* Act on the event */
                $(this).closest('.goods-para').remove();
                updateCost();
            });

            //detect click on the add-to-cart button
            addToCartBtn.on('click', function() {   
                //console.log(parseInt(numbox.find('input[type="number"]').val()));
                updateCart(parseInt(numbox.find('input[type="number"]').val()));
                numbox.find('input[type="number"]').val(1);
            });
        });
    }

    //重新初始化对象
    function reInit(){
        product = $('.item-goods');
        productCustomization = $('.goods-para');
        cart = $('.cart');
        console.log(productCustomization.length);
    }

    //更新购物车
    function updateCart(num) {
        var storeCart = store.get("cart");//读取本地存储的购物车信息
        storeCart.sum=storeCart.sum+num;//购物车商品总数
        //show counter if this is the first item added to the cart
        ( !cart.hasClass('item-added') ) && cart.addClass('item-added'); 
        // var cartItems = cart.find('span'),
        //     text = parseInt(cartItems.text()) + num;
        cart.find('span').text(storeCart.sum);//更新购物车商品数量
        var cost=productCustomization.find('.item-price').text()*productCustomization.find('input[type="number"]').val();//本次加入购物车商品的费用
        var item={"id":productCustomization.attr('data-id'),"title":productCustomization.find('.item-goods .item-title').text(),"thumb":productCustomization.find('.item-media img').attr('src'),"price":productCustomization.find('.item-price').text(),"num":productCustomization.find('input[type="number"]').val(),"spec-title":productCustomization.find('.item-spec .item-title').text(),"spec-item":productCustomization.find('.item-spec input[name=specItem]').val()};
        //store.set('cart-item', item);
        
        var items= JSON.parse(storeCart.goods);//购物车商品数组
        var flag=-1;//标记：购物车是否已经含有当前添加的商品
        if(items.length){
            console.log(items);
            $.each(items, function (key, value) {
                if(value.id==productCustomization.attr('data-id')){
                    flag=key;
                }
            });
            if(flag!=-1){
                //购物车中已经有当前添加的商品，更新商品信息
                items[flag].num=parseInt(items[flag].num)+parseInt(productCustomization.find('input[type="number"]').val());
            }else{
                //购物车中没有当前添加的商品，将商品信息插入数组
                items.push(item);
            }
        }else{
            //购物车为空，将商品信息插入数组
            items.push(item);
        }
        console.log(JSON.stringify(items));
        storeCart.totalCost=storeCart.totalCost+cost;//购物车商品总额
        storeCart.goods=JSON.stringify(items);//购物车商品列表
        store.set('cart', storeCart);//本地存储购物车信息

        $('#price_total').text(storeCart.totalCost);
    }

    //更新结算合计总额
    function updateCost(){
        var sum=0;
        reInit();
        // console.log(productCustomization.find("input[name=goods-check]").length);
        // console.log($(document).find("input[name=goods-check]").length);
        // console.log(productCustomization.length);
        productCustomization.each(function () {
            if($(this).find("input[name=goods-check]").prop("checked")){
                sum+=$(this).attr('data-price')*$(this).find('input[type="number"]').val();
            }
        });
        $('.price_total').text(sum);
    }

    //加入购物车
    $(document).on('click', '.item-goods .add-cart', function(event) {
        productCustomization.attr('data-id',$(this).closest('.item-goods').attr('data-id'));
        productCustomization.find('.item-goods .item-media .thumbnail').attr('src',$(this).closest('.item-goods').attr('data-media'));
        productCustomization.find('.item-goods .item-title').text($(this).closest('.item-goods').attr('data-title'));
        productCustomization.find('.item-goods .item-price').text($(this).closest('.item-goods').attr('data-price'));
        
        //规格参数
        console.log($(this).closest('.item-goods').attr('data-spec'));
        var goodSpec=$(this).closest('.item-goods').attr('data-spec').split("-");
        console.log(goodSpec);
        var html='';
        var spechtml='';
        $.each(goodSpec, function (key, value) {
            var itemSpec=value.substring(1,value.length-1);//去掉头尾大括号
            var specArray=itemSpec.split(",");
            var specItemArray = specArray[1].split("|");
            $.each(specItemArray, function (key, value) {
                if(key>0){
                    spechtml+='<label class="label-check"><input type="radio" name="specItem" value="'+value+'"><span>'+value+'</span></label>';
                }else{
                    spechtml+='<label class="label-check"><input type="radio" name="specItem" value="'+value+'" checked><span>'+value+'</span></label>';
                }               
            });
            console.log(specItemArray);
            //console.log(specArray[0]);
            html+='<div class="item-content">'+
                '<div class="item-inner">'+
                '<div class="item-title-row">'+
                '<div class="item-title">'+specArray[0]+'</div></div>'+
                '<div class="item-spec-content">'+spechtml+
                '</div></div></div>'
        });
        $('.item-spec').html(html);
        console.log(goodSpec[0].substring(1,goodSpec[0].length-1));
        //console.log(JSON.parse($(this).closest('.item-goods').attr('data-spec')));
        console.log($(this).closest('.item-goods').attr('data-id'));
    });

    // 选择
    $(".checkAll").on('change', function(event) {
        event.preventDefault();
        /* Act on the event */
        var obj=$(this);
        if(obj.prop("checked")){
            //全选
            productCustomization.each(function () {
                $(this).find("input[name=goods-check]").prop("checked",true);
            });
        }else{
            //取消
            productCustomization.each(function () {
                $(this).find("input[name=goods-check]").prop("checked",false);
            });
        }
        updateCost();
    });

    productCustomization.find("input[name=goods-check],input[type=number]").on('change', function(event) {
        event.preventDefault();
        /* Act on the event */
        updateCost();
    });
});