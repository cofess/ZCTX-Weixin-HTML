/**
 * 存放对 msui 的 config，需在 zepto 之后 msui 之前加载
 *
 * Created by bd on 15/12/21.
 */
$.config = {
    // 路由功能开关过滤器，返回 false 表示当前点击链接不使用路由
    routerFilter: function($link) {
        // 某个区域的 a 链接不想使用路由功能
        if ($link.is('.disable-router a')) {
            return false;
        }

        return true;
    }
};


//var basePath = "http://localhost:63342/devwork/zc/dev/Public/template/green";
//load加载
window.onload = function() {
    var loader = new WxMoment.Loader();
    //声明资源文件列表
    var fileList = ["/img/index1.png", "/img/index2.png", "/img/index3.png", "/img/index4.png"];
    for (var i = 0; i < fileList.length; i++) {
        loader.addImage(basePath + fileList[i]);
    }
    //进度监听
    loader.addProgressListener(function(e) {
        var percent = Math.round((e.completedCount / e.totalCount) * 100);
        _loadinghtml = "Loading " + percent + "%";
        $('#loadfont').html(_loadinghtml);
    });

    //加载完成
    loader.addCompletionListener(function() {

        //可以在这里隐藏 Loading 页面开始进入主内容页面
        setTimeout(function() {
            $('#preLoad').hide('low');
        },
        1000);
    });
    //启动加载
    loader.start();
}