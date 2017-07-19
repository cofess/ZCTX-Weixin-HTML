/*===============================================================================
************   SUI   ************
===============================================================================*/
$(function () {
  'use strict';
  //var basePath = "http://localhost:63342/devwork/zc/dev/Public/template/green";
  
  //无限滚动（首页->热点资讯）
  $(document).on("pageInit", "#page-news-infinite-scroll", function(e, id, page) {
    var loading = false;
    // 每次加载添加多少条目
    var itemsPerLoad = 20;
    // 最多可加载的条目
    var maxItems = 100;
    var lastIndex = $('.list-block ul li')[0].length;
    function addItems(number, lastIndex) {
      // 生成新条目的HTML
      var html = '';
      for (var i = lastIndex + 1; i <= lastIndex + number; i++) {
        //html += '<li class="item-content""><div class="item-inner"><div class="item-title">新条目</div></div></li>';
		html +='<li><a href="../News/detail.html" class="item-content pr-1x">'+
                 	'<div class="item-inner">'+
                    	'<div class="item-text color-dark">关系更亲密？巴西婴儿母乳喂养率居全球前列</div>'+
						'<div class="item-subtitle"><span>众测天下</span><span class="color-grey pull-right"><i class="zc zc-comment zc-w pull-left"></i> 99+</span></div>'+
                     '</div>'+
                     '<div class="item-media"><img src="'+basePath+'/img/demo/thumb.jpg" style="width: 3rem;"></div>'+
         		'</a></li>';
      }
      // 添加新条目
      $('.infinite-scroll.active .list-block ul').append(html);
    }
    $(page).on('infinite', function() {
      // 如果正在加载，则退出
      if (loading) return;
      // 设置flag
      loading = true;
      var tabIndex = 0;
      if($(this).find('.infinite-scroll.active').attr('id') == "tab1"){
        tabIndex = 0;
      }
      if($(this).find('.infinite-scroll.active').attr('id') == "tab2"){
        tabIndex = 1;
      }
      lastIndex = $('.list-block ul').eq(tabIndex).find('li').length;
      // 模拟1s的加载过程
      setTimeout(function() {
        // 重置加载flag
        loading = false;
        if (lastIndex >= maxItems) {
          // 加载完毕，则注销无限加载事件，以防不必要的加载
          //$.detachInfiniteScroll($('.infinite-scroll').eq(tabIndex));
          // 删除加载提示符
          $('.infinite-scroll-preloader').eq(tabIndex).hide();
          return;
        }
        addItems(itemsPerLoad,lastIndex);
        // 更新最后加载的序号
        lastIndex =  $('.list-block ul').eq(tabIndex).find('li').length;
        $.refreshScroller();
      }, 1000);
    });
  });
  
  //无限滚动（查一查列表、关注的项目）
  $(document).on("pageInit", "#page-trends-infinite-scroll", function(e, id, page) {
    var loading = false;
    // 每次加载添加多少条目
    var itemsPerLoad = 20;
    // 最多可加载的条目
    var maxItems = 100;
    var lastIndex = $('.list-container li').length;
    function addItems(number, lastIndex) {
      // 生成新条目的HTML
      var html = '';
      for (var i = lastIndex + 1; i <= lastIndex + number; i++) {
        //html += '<li class="item-content"><div class="item-inner"><div class="item-title">新条目</div></div></li>';
		html += '<li><a href="#" class="item-content pr-1x">'+
                       '<div class="item-inner">'+
                           '<div class="item-title-row">'+
                                '<div class="item-title">梧柏塘富硒米2.5kg检测</div>'+
                            '</div>'+
                            '<div class="item-subtitle">生产日期/批号:2015.08.18</div>'+
                            '<div class="item-text"><span class="color-red">镉 超标</span></div>'+
                        '</div>'+
                        '<div class="item-media"><img src="'+basePath+'/img/unqualified_mark.png" style="width: 3.5rem;"></div>'+
                 '</a></li>';
      }
      // 添加新条目
      $('.infinite-scroll .list-container').append(html);
    }
    $(page).on('infinite', function() {
      // 如果正在加载，则退出
      if (loading) return;
      // 设置flag
      loading = true;
      // 模拟1s的加载过程
      setTimeout(function() {
        // 重置加载flag
        loading = false;
        if (lastIndex >= maxItems) {
          // 加载完毕，则注销无限加载事件，以防不必要的加载
          $.detachInfiniteScroll($('.infinite-scroll'));
          // 删除加载提示符
          $('.infinite-scroll-preloader').remove();
          return;
        }
        addItems(itemsPerLoad,lastIndex);
        // 更新最后加载的序号
        lastIndex = $('.list-container li').length;
        $.refreshScroller();
      }, 1000);
    });
  });
 
  
  //无限滚动（曝光台列表）
  $(document).on("pageInit", "#page-unsafe-infinite-scroll", function(e, id, page) {
    var loading = false;
    // 每次加载添加多少条目
    var itemsPerLoad = 20;
    // 最多可加载的条目
    var maxItems = 100;
    var lastIndex = $('.list-container li').length;
    function addItems(number, lastIndex) {
      // 生成新条目的HTML
      var html = '';
      for (var i = lastIndex + 1; i <= lastIndex + number; i++) {
        //html += '<li class="item-content"><div class="item-inner"><div class="item-title">新条目</div></div></li>';
		html += '<li><a href="#" class="item-content pr-1x">'+
                       '<div class="item-inner">'+
                           '<div class="item-title-row">'+
                                '<div class="item-title">梧柏塘富硒米2.5kg检测</div>'+
                            '</div>'+
                            '<div class="item-subtitle">生产日期/批号:2015.08.18</div>'+
							'<div class="item-subtitle">检测日期:2016-02-18</div>'+
							'<div class="item-subtitle">抽样地:深圳市</div>'+
                        '</div>'+
                        '<div class="item-media"><img src="'+basePath+'/img/unqualified_mark.png" style="width: 3.5rem;"></div>'+
                 '</a></li>';
      }
      // 添加新条目
      $('.infinite-scroll .list-container').append(html);
    }
    $(page).on('infinite', function() {
      // 如果正在加载，则退出
      if (loading) return;
      // 设置flag
      loading = true;
      // 模拟1s的加载过程
      setTimeout(function() {
        // 重置加载flag
        loading = false;
        if (lastIndex >= maxItems) {
          // 加载完毕，则注销无限加载事件，以防不必要的加载
          $.detachInfiniteScroll($('.infinite-scroll'));
          // 删除加载提示符
          $('.infinite-scroll-preloader').remove();
          return;
        }
        addItems(itemsPerLoad,lastIndex);
        // 更新最后加载的序号
        lastIndex = $('.list-container li').length;
        $.refreshScroller();
      }, 1000);
    });
  }); 

  //无限滚动（食事周刊）
  $(document).on("pageInit", "#page-weekly-infinite-scroll", function(e, id, page) {
    var loading = false;
    // 每次加载添加多少条目
    var itemsPerLoad = 20;
    // 最多可加载的条目
    var maxItems = 100;
    var lastIndex = $('.list-container li').length;
    function addItems(number, lastIndex) {
      // 生成新条目的HTML
      var html = '';
      for (var i = lastIndex + 1; i <= lastIndex + number; i++) {
        //html += '<li class="item-content"><div class="item-inner"><div class="item-title">新条目</div></div></li>';
		html += '<li class="bg-white mb-0x">'+
                    '<a href="#" class="item-content ds-block pr-1x">'+
                        '<div class="item-media"><img src="'+basePath+'/img/demo/thumb-weekly.jpg" class="img-responsive r-round-s"></div>'+
                              '<div class="item-inner ml-no">'+
                                   '<div class="item-title">办公室一族必学的护眼食疗</div>'+
                                   '<div class="item-title-row">'+
                                       '<div class="item-sub-title color-grey">2016.03.09</div>'+
                                       '<div class="item-after">'+
										 '<span class="color-grey pull-right"><i class="zc zc-comment zc-w pull-left"></i> 99+</span>'+
									   '</div>'+
                                    '</div>'+
                          '</div>'+
              '</a></li>';
      }
      // 添加新条目
      $('.infinite-scroll .list-container').append(html);
    }
    $(page).on('infinite', function() {
      // 如果正在加载，则退出
      if (loading) return;
      // 设置flag
      loading = true;
      // 模拟1s的加载过程
      setTimeout(function() {
        // 重置加载flag
        loading = false;
        if (lastIndex >= maxItems) {
          // 加载完毕，则注销无限加载事件，以防不必要的加载
          $.detachInfiniteScroll($('.infinite-scroll'));
          // 删除加载提示符
          $('.infinite-scroll-preloader').remove();
          return;
        }
        addItems(itemsPerLoad,lastIndex);
        // 更新最后加载的序号
        lastIndex = $('.list-container li').length;
        $.refreshScroller();
      }, 1000);
    });
  });   
  
  //无限滚动（最新报告、参与的项目）
  $(document).on("pageInit", "#page-dynamic-infinite-scroll", function(e, id, page) {
    var loading = false;
    // 每次加载添加多少条目
    var itemsPerLoad = 20;
    // 最多可加载的条目
    var maxItems = 100;
    var lastIndex = $('.list-container li').length;
    function addItems(number, lastIndex) {
      // 生成新条目的HTML
      var html = '';
      for (var i = lastIndex + 1; i <= lastIndex + number; i++) {
        //html += '<li class="item-content"><div class="item-inner"><div class="item-title">新条目</div></div></li>';
		html += '<li><a href="#" class="item-content pr-1x">'+
					   '<div class="item-media"><img src="'+basePath+'/img/demo/thumb.jpg" style="width: 3rem;"></div>'+
                       '<div class="item-inner">'+
                           '<div class="item-title-row">'+
                                '<div class="item-title">梧柏塘富硒米2.5kg检测</div>'+
                            '</div>'+
                            '<div class="item-subtitle">生产日期/批号:2015.08.18</div>'+
                            '<div class="item-text"><span class="color-red">镉 超标</span></div>'+
                        '</div>'+
                        '<div class="item-media"><img src="'+basePath+'/img/unqualified_mark.png" style="width: 3.5rem;"></div>'+
                 '</a></li>';
      }
      // 添加新条目
      $('.infinite-scroll .list-container').append(html);
    }
    $(page).on('infinite', function() {
      // 如果正在加载，则退出
      if (loading) return;
      // 设置flag
      loading = true;
      // 模拟1s的加载过程
      setTimeout(function() {
        // 重置加载flag
        loading = false;
        if (lastIndex >= maxItems) {
          // 加载完毕，则注销无限加载事件，以防不必要的加载
          $.detachInfiniteScroll($('.infinite-scroll'));
          // 删除加载提示符
          $('.infinite-scroll-preloader').remove();
          return;
        }
        addItems(itemsPerLoad,lastIndex);
        // 更新最后加载的序号
        lastIndex = $('.list-container li').length;
        $.refreshScroller();
      }, 1000);
    });
  }); 
  
  //无限滚动（最新报告、参与的项目）
  $(document).on("pageInit", "#page-join-infinite-scroll", function(e, id, page) {
    var loading = false;
    // 每次加载添加多少条目
    var itemsPerLoad = 20;
    // 最多可加载的条目
    var maxItems = 100;
    var lastIndex = $('.list-container li').length;
    function addItems(number, lastIndex) {
      // 生成新条目的HTML
      var html = '';
      for (var i = lastIndex + 1; i <= lastIndex + number; i++) {
        //html += '<li class="item-content"><div class="item-inner"><div class="item-title">新条目</div></div></li>';
		html += '<li class="mb-0x bg-white">'+
                            '<a href="">'+
                                '<div class="item-content">'+
                                    '<div class="item-media"><img src="'+basePath+'/img/avatar.png" class="thumb-0x r-circle"></div>'+
                                    '<div class="item-inner as-center after-no">'+
                                        '<div class="item-title-row">'+
                                            '<div class="item-title">消失的石头</div>'+
                                            '<div class="item-after fw-bold color-main">众测中</div>'+
                                        '</div>'+
                                    '</div>'+
                                '</div>'+
                                '<div class="item-content pr-1x bv">'+
                                    '<div class="item-media"><img src="'+basePath+'/img/demo/thumb.jpg" style="width: 4rem;"></div>'+
                                    '<div class="item-inner">'+
                                        '<div class="item-title-row">'+
                                            '<div class="item-title">蓬盛沙丁鱼检测</div>'+
                                        '</div>'+
                                        '<div class="item-text">食品安全我做主，小伙伴们快来支持我~ 一起来参与食品安全检测...</div>'+
                                        '<div class="item-subtitle">2016-03-11 14:40 发起</div>'+
                                    '</div>'+
                                '</div>'+
                                '<div class="row pv-0x text-center">'+
                                    '<div class="col-33 br"><p class="m-no color-dark">2000元</p><small class="color-grey">已筹</small></div>'+
                                    '<div class="col-33 br"><p class="m-no color-dark">3000元</p><small class="color-grey">目标</small></div>'+
                                    '<div class="col-33"><p class="m-no color-dark">26人</p><small class="color-grey">支持人数</small></div>'+
                                '</div>'+
                            '</a></li>';
      }
      // 添加新条目
      $('.infinite-scroll .list-container').append(html);
    }
    $(page).on('infinite', function() {
      // 如果正在加载，则退出
      if (loading) return;
      // 设置flag
      loading = true;
      // 模拟1s的加载过程
      setTimeout(function() {
        // 重置加载flag
        loading = false;
        if (lastIndex >= maxItems) {
          // 加载完毕，则注销无限加载事件，以防不必要的加载
          $.detachInfiniteScroll($('.infinite-scroll'));
          // 删除加载提示符
          $('.infinite-scroll-preloader').remove();
          return;
        }
        addItems(itemsPerLoad,lastIndex);
        // 更新最后加载的序号
        lastIndex = $('.list-container li').length;
        $.refreshScroller();
      }, 1000);
    });
  }); 

  //无限滚动（收藏的文章）
  $(document).on("pageInit", "#page-favorite-infinite-scroll", function(e, id, page) {
    var loading = false;
    // 每次加载添加多少条目
    var itemsPerLoad = 20;
    // 最多可加载的条目
    var maxItems = 100;
    var lastIndex = $('.list-container li').length;
    function addItems(number, lastIndex) {
      // 生成新条目的HTML
      var html = '';
      for (var i = lastIndex + 1; i <= lastIndex + number; i++) {
		html += '<li>'+
                    '<a class="item-content" href="#">'+
                        '<div class="item-media"><img src="'+basePath+'/img/demo/thumb.jpg" style="width: 3rem;"></div>'+
                           '<div class="item-inner">'+
                              '<div class="item-title-row">'+
                                  '<div class="item-title">新《食品安全法》开始实施</div>'+
                              '</div>'+
                              '<div class="item-text">无证网店，不能发布新食品，自制食品朋友圈不能随便卖</div>'+
                          '</div>'+
                      '</a></li>';
      }
      // 添加新条目
      $('.infinite-scroll .list-container').append(html);
    }
    $(page).on('infinite', function() {
      // 如果正在加载，则退出
      if (loading) return;
      // 设置flag
      loading = true;
      // 模拟1s的加载过程
      setTimeout(function() {
        // 重置加载flag
        loading = false;
        if (lastIndex >= maxItems) {
          // 加载完毕，则注销无限加载事件，以防不必要的加载
          $.detachInfiniteScroll($('.infinite-scroll'));
          // 删除加载提示符
          $('.infinite-scroll-preloader').remove();
          return;
        }
        addItems(itemsPerLoad,lastIndex);
        // 更新最后加载的序号
        lastIndex = $('.list-container li').length;
        $.refreshScroller();
      }, 1000);
    });
  });   

  //省市区选择器
  $(document).on("pageInit", "#page-city-picker", function(e) {
    $("#city-picker").cityPicker({
        //value: ['天津', '河东区']
    });
  });

  $.init();//SUI初始化

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
}(Zepto);
