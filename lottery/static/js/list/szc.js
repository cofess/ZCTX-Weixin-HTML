CP.SZC = function() {
    var lotteryType = $("#content_home").children().eq(0).attr("id").replace("buy_", "");
    var hasTouch = "ontouchstart" in window;
    var start_ev = hasTouch ? "touchstart" : "mousedown";
    var end_ev = hasTouch ? "touchend" : "mouseup";
    var s = { ssq: { red: 33, blue: 16, miniRedNum: 6, maxRedNum: 20, miniBlueNum: 1, count: 5, lot_id: "01", name: "双色球" }, dlt: { red: 35, blue: 12, miniRedNum: 5, maxRedNum: 20, miniBlueNum: 2, count: 5, lot_id: "50", name: "大乐透" }, qlc: { red: 30, blue: 0, miniRedNum: 7, maxRedNum: 30, miniBlueNum: 0, count: 5, lot_id: "07", name: "七乐彩" } };
    var last_update = 0;
    var g = { zhushu: 0, beishu: 1, qishu: 1, totalMoney: 0, zhuijia: 2, codes: "", buyType: 1, loty_id: s[lotteryType]["lot_id"], qihao_id: "", hmMoney: "" };
    var $dom = { $ballRed: $("#ball_red"), $ballBlue: $("#ball_blue"), $btnRandom: $("#shake"), $btnRandom1: $("#jxbtn"), $clearAll: $("#clearAll"), $curCount: $("#Notes"), $curAmount: $("#Money"), $clearBall: $("#deleted"), $totalCount: $("#countNotes"), $totalAmount: $("#countMoney"), $issueInfo: $("#issue_info"), $kjslide: $("#kj_slide"), $addList: $("#addlist"), $betList: $("#bet_list"), $lotFooter: $("#lot_footer"), $tboxBeishu: $("#tbox_beishu"), $tboxQishu: $("#tbox_qishu"), $hand: $("#hand"), $dobuy: $("#dobuy"), $dohm: $("#dohm"), $hmSubmit: $("#hmSubmit") };
    var o = {
        clickBall: function(_this, on) {
            $(_this).is("." + on) ? $(_this).removeClass() : $(_this).addClass(on).addClass("ball_scale");
            o.countTotal()
        },
        highLight: function(_arr, dom) {
            o.clear($(dom + " cite"));
            for (var j = 0, l1 = _arr.length; j < l1; j++) { $(dom + " cite").eq(parseInt(_arr[j], 10) - 1).addClass("cur") }
        },
        clear: function(dom) {
            dom.each(function() { $(this).removeClass() });
            o.countTotal()
        },
        jxNum: function(n, type) {
            if (type) {
                for (var i = 1; i <= n; i++) {
                    var red = CP.Util.padArray(CP.math.random(1, s[lotteryType]["red"], s[lotteryType]["miniRedNum"], false)).sort(function(a, b) {
                        return a - b
                    });
                    var _code = "";
                    if (lotteryType == "qlc") { _code += red } else {
                        var blue = CP.Util.padArray(CP.math.random(1, s[lotteryType]["blue"], s[lotteryType]["miniBlueNum"], false)).sort(function(a, b) {
                            return a - b
                        });
                        _code = red + "|" + blue
                    }
                    o.addToList([_code, 1]);
                    o.countAll()
                }
                window.scrollTo(0, 1);
                o.setLocal()
            } else {
                var red = CP.Util.padArray(CP.math.random(1, s[lotteryType]["red"], s[lotteryType]["miniRedNum"], false)).sort(function(a, b) {
                    return a - b
                });
                var blue = CP.Util.padArray(CP.math.random(1, s[lotteryType]["blue"], s[lotteryType]["miniBlueNum"], false)).sort(function(a, b) {
                    return a - b
                });
                o.highLight(red, "#ball_red");
                o.highLight(blue, "#ball_blue");
                o.countTotal()
            }
        },
        addList: function() {
            var red = $dom.$ballRed.find(".cur").length;
            var blue = $dom.$ballBlue.find(".cur").length;
            if (!g.qihao_id) {
                alert("期号获取失败!请刷新页面");
                return false
            } else if (red < s[lotteryType]["miniRedNum"]) {
                if (lotteryType == "ssq") { alert("请至少选择6个红球") } else if (lotteryType == "dlt") { alert("至少选择5个红球，2个蓝球") } else if (lotteryType == "qlc") { alert("请至少选择7个球") }
                return false
            } else if (red > s[lotteryType]["maxRedNum"]) {
                if (lotteryType == "ssq") { alert("最多投注20个红球") } else if (lotteryType == "dlt") { alert("最多投注20个前区号码") }
                return false
            } else if (blue < s[lotteryType]["miniBlueNum"]) {
                if (lotteryType == "ssq") { alert("请至少选择1个蓝球") } else if (lotteryType == "dlt") { alert("至少选择5个红球，2个蓝球") }
                return false
            } else {
                var _arrRed = o.getCode($dom.$ballRed);
                var _code = "";
                if (lotteryType == "qlc") { _code += CP.Util.padArray(_arrRed) } else {
                    var _arrBlue = o.getCode($dom.$ballBlue);
                    _code = CP.Util.padArray(_arrRed) + "|" + CP.Util.padArray(_arrBlue)
                }
                if ($("#countNotes").text() == "0") {
                    $("#tbox_qishu").val("1");
                    $("#tbox_beishu").val("1")
                }
                o.addToList([_code, g.zhushu]);
                window.location.href = "#type=fun&fun=CP.SZC.openList";
                o.setLocal()
            }
        },
        getCode: function(dom) {
            var _arr = [];
            for (var i = 0; i < dom.find(".cur").length; i++) { _arr[i] = dom.find(".cur").eq(i).text() }
            return _arr
        },
        addToList: function(arr) {
            var _html = "";
            _html = '<div class="ssqtzNum">';
            _html += '<cite class="errorBg"><em class="error2"></em></cite>';
            _html += "<span><em>" + arr[0].split("|")[0].replace(/,/g, " ") + "</em>";
            if (lotteryType != "qlc") { _html += "<cite>" + arr[0].split("|")[1].replace(/,/g, " ") + "</cite>" }
            _html += "</span><p>普通投注&nbsp;&nbsp;&nbsp;" + arr[1] + "注" + 2 * arr[1] + "元</p>";
            _html += '<input type="hidden" value="' + arr[1] + '" name="bet_num" class="bet-num">';
            _html += '<input type="hidden" value="' + arr[0] + '" name="bet" class="bet">';
            _html += "</div>";
            $dom.$betList.prepend(_html);
            o.clear($("#ball_red cite,#ball_blue cite"));
            $dom.$curCount.text(0);
            $dom.$curAmount.text(g.zhushu = 0)
        },
        openList: function() {
            var grade = parseInt(localStorage.getItem("grade"));
            if (grade > 0) { $("#dobuy").html("立即预约") }
            if ($(".cp-lot").length == 0) {
                window.history.back();
                return 0
            }
            $("#betball,#bethm").hide();
            $("#betlist").show();
            $("#lot_footer").removeClass("fo_basket fo_hm").addClass("fo_buy");
            TopAnch.init({ title: "投注列表", prevShow: true, prevFun: function() { window.location.href = "#type=url&p=list/" + lotteryType + ".html" }, isBack: true, nextShow: false, style: false });
            o.countAll();
            window.scrollTo(0, 1)
        },
        hmDet: function() {
            var rg = parseInt($("#rg").val() || 0);
            var bd = parseInt($("#bd").val() || 0);
            var z = rg + bd;
            g.hmMoney = z;
            $("#hm_m cite:eq(0)").html(rg);
            $("#hm_m cite:eq(1)").html(bd);
            $("#hm_m cite:eq(2)").html(z)
        },
        doHm: function() {
            $("#betball,#betlist").hide();
            $("#bethm").show();
            $("#lot_footer").removeClass("fo_basket fo_buy").addClass("fo_hm");
            TopAnch.init({ title: "发起合买", prevShow: true, prevFun: function() { window.location.href = "#type=fun&fun=CP.SZC.openList" }, isBack: true, nextShow: false, style: false });
            $("#hmDet cite").eq(0).html(g.zhushu);
            $("#hmDet cite").eq(1).html(g.beishu);
            $("#hmDet cite").eq(2).html(g.totalMoney);
            $("#rg").val(Math.ceil(g.totalMoney * .05));
            $("#rg_bl").html(Math.floor($("#rg").val() / g.totalMoney * 1e4) / 100 + "%");
            $("#bd").removeAttr("disabled");
            $("#bd").val("0");
            $("#bd_bl").html("0%");
            o.hmDet()
        },
        countTotal: function() {
            var red = 0,
                blue = 0;
            red = $dom.$ballRed.find(".cur").length;
            blue = $dom.$ballBlue.find(".cur").length;
            g.zhushu = CP.math.C(red, s[lotteryType]["miniRedNum"]) * CP.math.C(blue, s[lotteryType]["miniBlueNum"]);
            g.money = g.zhushu * g.zhuijia;
            $dom.$curCount.text(g.zhushu);
            $dom.$curAmount.text(g.money);
            if (g.zhushu) {
                $dom.$curCount.addClass("red");
                $dom.$curAmount.addClass("red")
            } else {
                $dom.$curCount.removeClass("red");
                $dom.$curAmount.removeClass("red")
            }
        },
        countAll: function() {
            var zhushu = 0;
            g.beishu = $dom.$tboxBeishu.val();
            g.qishu = $dom.$tboxQishu.val();
            var codes = [];
            $("#bet_list .bet-num").each(function(e) {
                zhushu += parseInt($(this).val());
                codes.push($(this).next().val())
            });
            g.codes = codes.join(";");
            $dom.$totalCount.html(g.zhushu = zhushu);
            $dom.$totalAmount.html(g.totalMoney = g.zhushu * g.zhuijia * g.beishu * g.qishu)
        },
        getArgument: function(t) {
            var buy = {};
            var code = CP.Util.joinString(g.loty_id, g.codes);
            switch (t) {
                case 1:
                    buy = { payUrl: "/trade/pcast.go", gid: g.loty_id, pid: g.qihao_id, codes: code, muli: g.beishu, countMoney: g.totalMoney, orderType: "dg" };
                    break;
                case 2:
                    buy = { payUrl: "/trade/pcast.go", gid: g.loty_id, pid: g.qihao_id, codes: code, muli: g.beishu, desc: $("#hmDesc").val() || "快乐购彩、欧耶！", countMoney: g.totalMoney, bnum: $("#rg").val(), pnum: $("#bd").val(), oflag: $("#isPublic .cur").attr("v") || 0, wrate: $("#ratio .cur").attr("v") || 5, orderType: "hm" };
                    break;
                case 3:
                    var muli = "",
                        pid = g.qihao_id;
                    for (var i = 0; i < g.qishu; i++) {
                        muli += g.beishu + ",";
                        pid += ","
                    }
                    pid = pid.substring(0, pid.length - 1);
                    muli = muli.substring(0, muli.length - 1);
                    buy = { payUrl: "/trade/zcast.go", gid: g.loty_id, pid: pid, codes: code, muli: muli, countMoney: g.totalMoney, zflag: $(".zjStop em").hasClass("nocheck") ? "0" : "1", orderType: "zh" };
                    break
            }
            return buy
        },
        dopay: function(t) {
            g.qishu = parseInt($dom.$tboxQishu.val());
            g.qishu > 1 ? g.buyType = 3 : t ? g.buyType = 2 : g.buyType = 1;
            var _obj = o.getArgument(g.buyType);
            var cMoney = "";
            t ? cMoney = g.hmMoney : cMoney = g.totalMoney;
            var data = { gid: g.loty_id, cMoney: cMoney, payPara: _obj };
            alert("提交中，请稍后！", "loading");
            CP.User.info(function(options) {
                remove_alert();
                if (options) { jQuery.extend(data, options) }
                CP.Popup.buybox(data)
            });
            sessionStorage.removeItem(lotteryType)
        },
        dobuy: function(t) {
            var info = "";
            if (g.zhushu < 1) { info = "请至少选择一注彩票" } else if (!g.qishu) { info = "请输入期数" } else if (!g.beishu) { info = "请输入倍数" }
            if (info != "") {
                alert(info);
                return
            }
            if (t) { window.location.href = "#type=fun&fun=CP.SZC.doHm" } else { o.dopay() }
        },
        setLocal: function() {
            var codes = [];
            $("#bet_list .bet:input").each(function() { codes.push($(this).val()) });
            g.codes = codes.join(";");
            CP.Storage.set(lotteryType, g.codes, true)
        },
        fromLocal: function() {
            var _json = CP.Storage.get(lotteryType, true);
            if (_json) {
                try {
                    g.codes = _json;
                    var codes = _json.split(";");
                    for (var i = 0, l = codes.length; i < l; i++) {
                        var _arr = codes[i].split("|");
                        o.addToList([codes[i], CP.math.C(_arr[0].split(",").length, s[lotteryType]["miniRedNum"]) * CP.math.C(_arr[1].split(",").length, s[lotteryType]["miniBlueNum"])])
                    }
                    o.countAll()
                } catch (e) { sessionStorage.removeItem(lotteryType) }
            }
        },
        getQihao: function(callback) {
            if (callback) {
                $.ajax({
                    url: CP.Data.apps + "/trade/info.go?gid=" + g.loty_id,
                    dataType: "xml",
                    cache: true,
                    success: function(xml) {
                        var data = {},
                            issueInfo = [],
                            miss_ = {};
                        var R = $(xml).find("rows");
                        data.pid = R.attr("pid");
                        data.atime = R.attr("atime");
                        data.tn = R.attr("tn");
                        data.now = new Date(arguments[2].getResponseHeader("Date"));
                        o.renderQihao(data);
                        var rp = R.find("rowp");
                        rp.each(function(a) {
                            var t = {};
                            t.pid = $(this).attr("pid");
                            t.acode = $(this).attr("acode");
                            t.tn = $(this).attr("tn");
                            issueInfo[a] = t
                        });
                        if (lotteryType == "ssq" || lotteryType == "dlt") {
                            var r = R.find("row");
                            r.each(function() {
                                var color = $(this).attr("color");
                                var curyl = $(this).attr("curyl");
                                if (color == "red") { miss_.red = curyl } else { miss_.blue = curyl }
                            });
                            o.miss(miss_);
                            $("#yl").bind(start_ev, function() {
                                if ($(this).find(".omitico").hasClass("omitico2")) {
                                    $(this).removeClass("red").addClass("gray");
                                    $dom.$ballRed.find(".omitnum").hide();
                                    $dom.$ballBlue.find(".omitnum").hide()
                                } else {
                                    $(this).removeClass("gray").addClass("red");
                                    $dom.$ballRed.find(".omitnum").show();
                                    $dom.$ballBlue.find(".omitnum").show()
                                }
                                $(this).find(".omitico").toggleClass("omitico2")
                            })
                        }
                        callback(issueInfo)
                    },
                    error: function() {
                        $dom.$issueInfo.html("网络不通畅，请点击刷新");
                        $dom.$issueInfo.bind(end_ev, function() { window.location.reload() })
                    }
                })
            } else {
                return false
            }
        },
        renderQihao: function(data) {
            g.qihao_id = data.pid;
            var wk = ["日", "一", "二", "三", "四", "五", "六"];
            var now = CP.calcTime(data.now, "+8");
            var et = data.atime;
            var severtime = now.getFullYear() + "-" + CP.Util.pad(now.getMonth() + 1, 2) + "-" + CP.Util.pad(now.getDate(), 2);
            var et1 = et.substr(11, 5),
                et2 = et.substr(0, 10),
                et3 = et.substr(5, 6);
            var timeText = "";
            timeText = CP.Util.dateDiff(severtime, et2);
            timeText = { 0: "今天", 1: "明天", 2: "后天" }[timeText] || et3;
            var tDATE = et.substr(0, 10);
            tDATE = new Date(tDATE);
            var wk2 = "周" + wk[tDATE.getDay()];
            if (timeText != "") {
                $dom.$issueInfo.html("第 " + data.pid + " 期 " + timeText + "" + et1 + "(" + wk2 + ") 截止");
                return true
            } else {
                return false
            }
        },
        miss: function(data) {
            var redcuryl = data.red.split(",");
            var bluecuryl = data.blue.split(",");
            for (var n = 0, rl = redcuryl.length; n < rl; n++) { $dom.$ballRed.find(".omitnum cite").eq(n).html(redcuryl[n]) }
            for (var n = 0, bl = bluecuryl.length; n < bl; n++) { $dom.$ballBlue.find(".omitnum cite").eq(n).html(bluecuryl[n]) }
        },
        getTime: function() {
            o.getQihao(function(data) {
                var t = data.length,
                    kjhtml = "";
                for (var n = 0; n < t; n++) {
                    var red = data[n].acode.split("|")[0];
                    var blue = data[n].acode.split("|")[1];
                    red = red.replace(/,/g, " ");
                    blue = blue.replace(/,/g, " ");
                    kjhtml += '<ul><li class="first">' + data[n].pid.substr(4, 3) + '期</li><li><span class="red">' + red + '</span>&nbsp;<span class="blue">' + blue + "</span></li></ul>"
                }
                $dom.$kjslide.next().html(kjhtml)
            })
        },
        reStyle: function() {
            var winHeight = $(window).height();
            var box_header_height = $(".tzHeader").height();
            var buyFooterHeight = $(".buyFooter").height();
            var tmpHeight = winHeight - 46;
            alert(buyFooterHeight + "~~~");
            $(".cp-lot").height(tmpHeight);
            $("#content_home").height(tmpHeight);
            $(".absolutmain").height(tmpHeight - buyFooterHeight);
            $(".absolutmain").css("bottom", buyFooterHeight)
        }
    };
    var bind = function() {
        o.getTime();
        $dom.$ballRed.find("div:eq(0) cite").Touch({ fun: function(el) { o.clickBall(el, "cur") } });
        $dom.$ballBlue.find("div:eq(0) cite").Touch({ fun: function(el) { o.clickBall(el, "cur") } });
        $dom.$btnRandom.bind(start_ev, function() { o.jxNum(1, 0) });
        $dom.$btnRandom1.bind(start_ev, function() { o.jxNum(1, 1) });
        $dom.$clearBall.bind(start_ev, function() {
            o.clear($("#ball_red cite"));
            o.clear($("#ball_blue cite"))
        });
        $dom.$kjslide.bind(start_ev, function() {
            if ($(this).find(".ssqup").hasClass("ssqdown")) { $(this).next().show() } else { $(this).next().hide() }
            $(this).find(".ssqup").toggleClass("ssqdown")
        });
        $dom.$addList.bind("click", function() { o.addList() });
        $dom.$hand.bind(start_ev, function() { location.href = "#type=url&p=list/" + lotteryType + ".html" });
        $dom.$clearAll.bind(start_ev, function() {
            $dom.$betList.html("");
            $("#tbox_qishu").val("1");
            $("#tbox_beishu").val("1");
            CP.Storage.remove(lotteryType, true);
            o.countAll();
            if (g.qishu > 1) {
                $("#dohm").addClass("fqhmGray");
                $(".zjStop").show()
            } else {
                $("#dohm").removeClass("fqhmGray");
                $(".zjStop").hide()
            }
        });
        $dom.$dobuy.bind(start_ev, function() { o.dobuy() });
        $dom.$dohm.bind(start_ev, function() {!$(this).hasClass("fqhmGray") && o.dobuy("hm") });
        $dom.$hmSubmit.bind(start_ev, function() {
            if (parseInt($("#rg").val()) < g.totalMoney * .05) {
                return
            }
            o.dopay("hm")
        });
        $dom.$betList.delegate(".errorBg", end_ev, function() {
            var del = $(this).parent();
            del.addClass("del");
            setTimeout(function() {
                del.remove();
                o.countAll();
                o.setLocal()
            }, 400)
        });
        var buyTimes = 1;
        var zuiqishuNum = 1;
        $dom.$tboxBeishu.KeyBoard({
            val: buyTimes,
            max: 999,
            min: 1,
            num: 1,
            tag: "倍",
            fn: function() {
                g.beishu = $(this.ts).val();
                o.countAll()
            }
        });
        $dom.$tboxQishu.KeyBoard({
            val: zuiqishuNum,
            max: 154,
            min: 1,
            num: 1,
            tag: "期",
            fn: function() {
                g.qishu = $(this.ts).val();
                if (g.qishu > 1) {
                    $("#dohm").addClass("fqhmGray");
                    $(".zjStop").show()
                } else {
                    $("#dohm").removeClass("fqhmGray");
                    $(".zjStop").hide()
                }
                o.countAll()
            }
        });
        $(".zjStop").bind(start_ev, function() { $(this).find("em").toggleClass("nocheck check") });
        $("#rg").on("keyup", function() {
            var bd_ = parseInt($("#bd").val());
            if ($(this).val() >= g.totalMoney) {
                $(this).val(g.totalMoney);
                $("#rg_bl").html("100%")
            } else {
                if ($(this).val() == "") { $("#rg_bl").html("0%") } else { $("#rg_bl").html(Math.floor(parseInt($("#rg").val()) / g.totalMoney * 1e4) / 100 + "%") }
            }
            if (!$("#chk").hasClass("nocheck") || parseInt($(this).val()) + bd_ > g.totalMoney) {
                if ($(this).val() == "") {
                    $("#bd").val(g.totalMoney);
                    $("#bd_bl").html("100%")
                } else {
                    $("#bd").val(g.totalMoney - parseInt($(this).val()));
                    $("#bd_bl").html(Math.ceil(parseInt($("#bd").val()) / g.totalMoney * 1e4) / 100 + "%")
                }
            }
            o.hmDet()
        }).on("change", function() {
            var t = $(this).val();
            if (t == "") { t = 0 }
            if (parseInt(t) < g.totalMoney * .05) {
                alert("认购金额不能小于5%");
                $(this).val(Math.ceil(g.totalMoney * .05));
                $("#rg_bl").html(Math.floor(parseInt($("#rg").val()) / g.totalMoney * 1e4) / 100 + "%")
            }
            if (!$("#chk").hasClass("nocheck")) {
                $("#bd").val(g.totalMoney - parseInt($(this).val()));
                $("#bd_bl").html(Math.ceil(parseInt($("#bd").val()) / g.totalMoney * 1e4) / 100 + "%")
            }
            o.hmDet()
        });
        $("#bd").on("keyup", function() {
            var rg_ = parseInt($("#rg").val());
            parseInt($(this).val()) > g.totalMoney - rg_ && $(this).val(g.totalMoney - rg_);
            if ($(this).val() == "") { $("#bd_bl").html("0%") } else {
                $(this).val(parseInt($(this).val()));
                $("#bd_bl").html(Math.ceil(parseInt($("#bd").val()) / g.totalMoney * 1e4) / 100 + "%")
            }
            o.hmDet()
        }).on("change", function() {
            if ($(this).val() == "") {
                $(this).val("0");
                $("#bd_bl").html("0%");
                o.hmDet()
            }
        });
        $("#chk").bind(start_ev, function() {
            var rg_ = parseInt($("#rg").val());
            $(this).toggleClass("nocheck");
            if (!$("#chk").hasClass("nocheck")) {
                $("#bd").attr("disabled", true);
                $("#bd").val(g.totalMoney - rg_);
                $("#bd_bl").html(Math.ceil(parseInt($("#bd").val()) / g.totalMoney * 1e4) / 100 + "%")
            } else { $("#bd").removeAttr("disabled") }
            o.hmDet()
        });
        $("#ratio li,#isPublic li").on(start_ev, function() {
            !$(this).hasClass("cur") && $(this).toggleClass("cur");
            $(this).siblings().removeClass("cur")
        });
        Shake.run(function() {
            var curTime = (new Date).getTime();
            if (curTime - last_update > 1500 && $("#betball").is(":visible")) {
                $(".mask2").show();
                o.clear($("#ball_red cite"));
                o.clear($("#ball_blue cite"));
                imitate();
                last_update = curTime
            }
        })
    };
    var imitate = function() {
        var left_ = 5;
        var ratio = (90 / 7).toFixed(2);
        var delay = .1;
        var tfb = delay * 1e3 * 7 + 500;
        var red = CP.math.random(1, s[lotteryType]["red"], s[lotteryType]["miniRedNum"], false).sort(function(a, b) {
            return a - b
        });
        for (var i = 1; i <= s[lotteryType]["miniRedNum"]; i++) {
            $("body").append('<div class=ssq1 style="left:' + left_ + "%;-webkit-animation-delay: " + delay * i + "s;animation-delay: " + delay * i + 's;">' + CP.Util.pad(red[i - 1], 2) + "</div>");
            left_ += parseFloat(ratio)
        }
        if (lotteryType != "qlc") {
            var blue = CP.math.random(1, s[lotteryType]["blue"], s[lotteryType]["miniBlueNum"], false).sort(function(a, b) {
                return a - b
            });
            for (var i = 1; i <= s[lotteryType]["miniBlueNum"]; i++) {
                $("body").append('<div class="ssq1 ssqblue" style="left:' + left_ + "%;-webkit-animation-delay: " + delay * (i + 6) + "s;animation-delay: " + delay * (i + 6) + 's;">' + CP.Util.pad(blue[i - 1], 2) + "</div>");
                left_ += parseFloat(ratio)
            }
        }
        setTimeout(function() { goto_() }, tfb)
    };
    var goto_ = function() {
        var num, l, t, this_;
        var red = [],
            blue = [];
        $(".ssq1").each(function(aa) {
            num = parseInt($(this).text(), "10");
            num -= 1;
            if (aa < s[lotteryType]["miniRedNum"]) {
                this_ = $("#ball_red cite").eq(num);
                red.push(num)
            } else {
                this_ = $("#ball_blue cite").eq(num);
                blue.push(num)
            }
            t = this_.offset().top;
            l = this_.offset().left;
            $(this).animate({ left: l, top: t }, 300)
        });
        setTimeout(function() {
            for (var s in red) { $("#ball_red cite").eq(red[s]).addClass("cur") }
            for (var s in blue) { $("#ball_blue cite").eq(blue[s]).addClass("cur") }
            $(".ssq1").remove();
            $(".mask2").hide();
            o.countTotal()
        }, 250)
    };
    var init = function() {
        o.fromLocal();
        TopAnch.init({ title: s[lotteryType]["name"], prevShow: true, prevFun: function() { window.location.href = "#type=index" }, menu: [{ name: "投注选号", url: "javascript:;", cur: true }, { name: "开奖结果", url: "#type=url&p=kj/result.html?in_=" + s[lotteryType].lot_id, cur: false }, { name: "玩法帮助", url: "#type=url&p=wf/" + lotteryType + ".html", cur: false }], style: false });
        bind()
    };
    var getGloryDatd = function() {
        var getDajiangfudi = sessionStorage.getItem("BigMoney");
        if (getDajiangfudi != "" && getDajiangfudi != null) {
            var data = getDajiangfudi.split(",");
            for (var i in data) {
                if (i != data.length - 1) { $(".ssqBall").not(".ssqblueBall").find('cite:contains("' + data[i] + '")').trigger("touchend") } else { $(".ssqBall.ssqblueBall").find('cite:contains("' + data[i] + '")').trigger("touchend") }
            }
            sessionStorage.removeItem("BigMoney")
        }
    };
    return { openList: o.openList, doHm: o.doHm, s: s, lotteryType: lotteryType, init: init, getGloryDatd: getGloryDatd }
}();

function resetPage() {
    TopAnch.init({ title: CP.SZC.s[CP.SZC.lotteryType]["name"], prevShow: true, prevFun: function() { window.location.href = "#type=index" }, menu: [{ name: "投注选号", url: "javascript:;", cur: true }, { name: "合买跟单", url: "#type=url&p=user/hallhm.html?in=" + CP.Util.lot(CP.SZC.s[CP.SZC.lotteryType].lot_id, 2), cur: false }, { name: "开奖结果", url: "#type=url&p=kj/result.html?in_=" + CP.SZC.s[CP.SZC.lotteryType].lot_id, cur: false }, { name: "玩法帮助", url: "#type=url&p=wf/" + CP.SZC.lotteryType + ".html", cur: false }], style: false });
    $("#betball").show();
    $("#betlist,#bethm").hide();
    $("#lot_footer").removeClass("fo_buy fo_hm").addClass("fo_basket")
}
$(function() {
    CP.SZC.init();
    CP.SZC.getGloryDatd()
});
