/* global $:true */
+function ($) {
  var modal = $.modal.prototype.defaults;
  modal.modalButtonOk = "确定";
  modal.modalButtonCancel = "取消";
  modal.modalPreloaderTitle = "正在加载...";

  var calendar = $.fn.calendar.prototype.defaults;
  
  calendar.monthNames = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月' , '九月' , '十月', '十一月', '十二月'];
  calendar.monthNamesShort = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月' , '九月' , '十月', '十一月', '十二月'];
  calendar.dayNames = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  calendar.dayNamesShort = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
}($);
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