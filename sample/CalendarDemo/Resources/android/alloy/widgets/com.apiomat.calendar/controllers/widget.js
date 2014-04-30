function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.apiomat.calendar/" + s : s.substring(0, index) + "/com.apiomat.calendar/" + s.substring(index + 1);
    return true && 0 !== path.indexOf("/") ? "/" + path : path;
}

function Controller() {
    new (require("alloy/widget"))("com.apiomat.calendar");
    this.__widgetId = "com.apiomat.calendar";
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "widget";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.view = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "view",
        layout: "vertical"
    });
    $.__views.view && $.addTopLevelView($.__views.view);
    $.__views.tabBar = Ti.UI.createScrollView({
        width: Ti.UI.FILL,
        height: "40",
        layout: "horizontal",
        showHorizontalScrollIndicator: false,
        scrollType: "horizontal",
        horizontalWrap: false,
        id: "tabBar"
    });
    $.__views.view.add($.__views.tabBar);
    $.__views.container = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        top: 0,
        left: 0,
        id: "container",
        layout: "vertical"
    });
    $.__views.view.add($.__views.container);
    $.__views.days = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        backgroundRepeat: true,
        layout: "horizontal",
        id: "days"
    });
    $.__views.container.add($.__views.days);
    $.__views.dates = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        layout: "vertical",
        top: "22dp",
        id: "dates"
    });
    $.__views.container.add($.__views.dates);
    doClick ? $.__views.dates.addEventListener("click", doClick) : __defers["$.__views.dates!click!doClick"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var CALENDAR_WIDTH, DAY_COLOR, OUTDAY_COLOR, TILE_WIDTH, WEEK_COLOR, args, calendarMonth, col, createWeekView, day, dayOfWeek, doClick, i, moment, nextMonth, period, prevMonth, row, tile, weekView, _i, _j, _k, _len, _ref, _ref1, _ref2;
    moment = require("alloy/moment");
    args = arguments[0] || {};
    period = null != args.period ? moment(args.period) : moment();
    weekStartsWith = null != args.weekStartOn ? args.weekStartOn : "monday";
    tiles = [];
    tabCount = null != args.tabCount ? args.tabCount : 3;
    dateCount = null != args.dateCount ? args.dateCount : 7;
    dateSpace = null != args.dateSpace ? args.dateSpace : 30;
    tabBar = null != args.tabBar ? args.tabBar : false;
    displayDayNames = null != args.displayDayNames ? args.displayDayNames : true;
    holiday = null != args.holiday ? args.holiday : true;
    font = null != args.font ? args.font : {
        fontSize: "16dp"
    };
    rangeFromToday = null != args.rangeFromToday ? args.rangeFromToday : false;
    range = null != args.range ? args.range : 6;
    args.color = null != args.color ? args.color : {};
    tabBgColor = null != args.color.tabBgColor ? args.color.tabBgColor : "white";
    tabColor = null != args.color.tabColor ? args.color.tabColor : "black";
    sat = null != args.color.sat ? args.color.sat : "grey";
    sun = null != args.color.sun ? args.color.sun : "grey";
    work = null != args.color.work ? args.color.work : "black";
    out = null != args.color.out ? args.color.out : "grey";
    today = null != args.color.today ? args.color.today : "red";
    if (rangeFromToday) {
        rangeFromToday = false;
        Ti.API.info("rangeFromToday isn't supported at the moment");
    }
    var swipeCB = args.swipeCB || void 0;
    var selectCB = args.select || void 0;
    var clickCB = args.click || void 0;
    $.dates.addEventListener("swipe", function(e) {
        "undefined" != typeof swipeCB && swipeCB(e);
    });
    doClick = function(e) {
        clickCB(e);
    };
    weekStart = 0;
    switch (weekStartsWith) {
      case "monday":
        moment.lang("de", {
            week: {
                dow: 1
            }
        });
        _ref = [ "Mo", "Di", "Mi", "Do", "Fr", "Sa", "So" ];
        if ("undefined" != typeof args.color) {
            WEEK_COLOR = [ work, work, work, work, work, sat, sun ];
            DAY_COLOR = [ work, work, work, work, work, sat, sun ];
            OUTDAY_COLOR = [ out, out, out, out, out, out, out ];
        } else {
            WEEK_COLOR = [ "#999999", "#999999", "#999999", "#999999", "#999999", "#91C176", "#FF9999" ];
            DAY_COLOR = [ "#333333", "#333333", "#333333", "#333333", "#333333", "#64A515", "#FF0000" ];
            OUTDAY_COLOR = [ "grey", "grey", "grey", "grey", "grey", "grey", "grey" ];
        }
        break;

      case "sunday":
        moment.lang("en", {
            week: {
                dow: 0
            }
        });
        _ref = [ "sun", "mon", "tue", "wed", "thu", "fri", "sat" ];
        if ("undefined" != typeof args.color) {
            WEEK_COLOR = [ sun, work, work, work, work, work, sat ];
            DAY_COLOR = [ sun, work, work, work, work, work, sat ];
            OUTDAY_COLOR = [ out, out, out, out, out, out, out ];
        } else {
            WEEK_COLOR = [ "#FF9999", "#999999", "#999999", "#999999", "#999999", "#999999", "#91C176" ];
            DAY_COLOR = [ "#FF0000", "#333333", "#333333", "#333333", "#333333", "#333333", "#64A515" ];
            OUTDAY_COLOR = [ "grey", "grey", "grey", "grey", "grey", "grey", "grey" ];
        }
        break;

      default:
        start = 2;
    }
    $.dates.left = dateSpace;
    $.dates.right = dateSpace;
    $.days.left = dateSpace;
    $.days.right = dateSpace;
    var viewWidth = Ti.Platform.displayCaps.platformWidth - 10;
    viewWidth /= Ti.Platform.displayCaps.logicalDensityFactor;
    var tabWidth = viewWidth / tabCount;
    tabWidth = Math.floor(tabWidth);
    TILE_WIDTH = (viewWidth - 2 * dateSpace) / dateCount;
    TILE_WIDTH = Math.floor(TILE_WIDTH);
    CALENDAR_WIDTH = viewWidth;
    $.days.width = $.dates.width = CALENDAR_WIDTH;
    $.selected = null;
    if (tabBar) {
        $.tabBar.backgroundColor = tabBgColor;
        var months = [];
        months[0] = L("january", "january");
        months[1] = L("february", "february");
        months[2] = L("march", "march");
        months[3] = L("april", "april");
        months[4] = L("may", "may");
        months[5] = L("june", "june");
        months[6] = L("july", "july");
        months[7] = L("august", "august");
        months[8] = L("september", "september");
        months[9] = L("october", "october");
        months[10] = L("november", "november");
        months[11] = L("december", "december");
        i = -range;
        var selectedMonth = "";
        if (rangeFromToday) {
            j = moment().month(moment().month()) - moment().month(period.month());
            i > j && (j = moment().month(moment().month()).month());
        } else j = 0;
        while (range >= i) {
            var localMonth = "";
            localMonth = rangeFromToday ? moment().month(moment().month()).year(moment().year()) : moment().month(period.month()).year(period.year());
            j > i ? localMonth.subtract("months", Math.abs(i)) : localMonth.add("months", Math.abs(i));
            if (i != j) var view = Ti.UI.createView({
                backgroundColor: tabBgColor,
                width: tabWidth,
                height: 40,
                textAlign: "center",
                layout: "horizontal",
                monthLocal: localMonth
            }); else selectedMonth = Ti.UI.createView({
                backgroundColor: tabBgColor,
                width: tabWidth,
                height: 40,
                textAlign: "center",
                layout: "horizontal"
            });
            var viewLabel = Ti.UI.createLabel({
                id: "id" + i,
                color: tabColor,
                backgroundColor: tabBgColor,
                textAlign: "center",
                width: Ti.UI.FILL,
                text: months[localMonth.months()],
                height: Ti.UI.FILL,
                monthLocal: localMonth
            });
            viewLabel.addEventListener("click", function(e) {
                selectCB(e);
            });
            if (i != j) {
                view.add(viewLabel);
                $.tabBar.add(view);
            } else {
                selectedMonth.add(viewLabel);
                $.tabBar.add(selectedMonth);
            }
            if (range > i) {
                var border = Ti.UI.createView({
                    color: tabSpace,
                    backgroundColor: tabSpace,
                    width: 1,
                    height: 35
                });
                $.tabBar.add(border);
            }
            i++;
        }
        $.tabBar.contentWidth = "auto";
        var postLayoutCallback = function() {
            var x;
            var x = selectedMonth.rect.x * Ti.Platform.displayCaps.logicalDensityFactor - selectedMonth.rect.width * Ti.Platform.displayCaps.logicalDensityFactor;
            $.tabBar.scrollTo(x, selectedMonth.rect.y);
            $.tabBar.removeEventListener("postlayout", postLayoutCallback);
        };
        $.tabBar.addEventListener("postlayout", postLayoutCallback);
    }
    if (displayDayNames) for (i = _i = 0, _len = _ref.length; _len > _i; i = ++_i) {
        day = _ref[i];
        $.days.add(Ti.UI.createLabel({
            color: WEEK_COLOR[i],
            textAlign: "center",
            font: font,
            text: day,
            width: TILE_WIDTH
        }));
    } else $.days.height = 0;
    $.calendar = {};
    calendarMonth = moment(period);
    period.date(1);
    dayOfWeek = period.weekday();
    prevMonth = moment(period).subtract("months", 1);
    nextMonth = moment(period).add("months", 1);
    holiday && _.defer(function() {
        return require(WPATH("holiday")).fetch(calendarMonth, function(holidays) {
            var name, ui, _ref1;
            for (name in holidays) {
                day = holidays[name];
                day = moment(day, "YYYY-MM-DD").date();
                ui = null != (_ref1 = $.calendar) ? _ref1["" + day] : void 0;
                if (null != (null != ui ? ui.date : void 0)) {
                    ui.add(Ti.UI.createLabel({
                        text: name,
                        font: {
                            fontSize: "8dp"
                        },
                        color: OUTDAY_COLOR[0],
                        top: 0,
                        left: "2dp",
                        touchEnabled: false
                    }));
                    ui.children[0].color = DAY_COLOR[0];
                }
            }
        });
    });
    col = 0;
    row = 0;
    createWeekView = function() {
        return Ti.UI.createView({
            layout: "horizontal",
            width: CALENDAR_WIDTH,
            height: TILE_WIDTH
        });
    };
    weekView = createWeekView();
    if (0 !== dayOfWeek) for (i = _j = _ref1 = dayOfWeek - 1; 0 >= _ref1 ? 0 >= _j : _j >= 0; i = 0 >= _ref1 ? ++_j : --_j) {
        previousMonth = 0 === col ? prevMonth.add("days", prevMonth.daysInMonth() - 1 - i) : previousMonth.add("days", 1);
        weekView.add(Ti.UI.createLabel({
            color: OUTDAY_COLOR[col],
            textAlign: "center",
            text: previousMonth.date(),
            font: font,
            backgroundColor: "transparent",
            width: TILE_WIDTH,
            height: TILE_WIDTH,
            prevMonth: true
        }));
        col++;
    }
    for (i = _k = 1, _ref2 = period.daysInMonth(); _ref2 >= 1 ? _ref2 >= _k : _k >= _ref2; i = _ref2 >= 1 ? ++_k : --_k) {
        tile = Ti.UI.createView({
            backgroundColor: "transparent",
            width: TILE_WIDTH,
            height: TILE_WIDTH,
            date: period.unix()
        });
        date = 10 > period.date() ? "0" + period.date() : period.date();
        tiles[period.date()] = period.date() == moment().date() && period.month() == moment().month() && period.year() == moment().year() ? Ti.UI.createLabel({
            color: today,
            font: font,
            backgroundColor: "transparent",
            textAlign: "center",
            text: date,
            width: TILE_WIDTH,
            height: TILE_WIDTH,
            _isEntry: false,
            touchEnabled: false
        }) : Ti.UI.createLabel({
            color: DAY_COLOR[period.weekday()],
            font: font,
            backgroundColor: "transparent",
            textAlign: "center",
            text: date,
            width: TILE_WIDTH,
            height: TILE_WIDTH,
            _isEntry: false,
            touchEnabled: false
        });
        tile.add(tiles[period.date()]);
        weekView.add(tile);
        $.calendar["" + period.date()] = tile;
        period.add("days", 1);
        col++;
        if (7 === col) {
            $.dates.add(weekView);
            weekView = createWeekView();
            col = 0;
            row++;
        }
    }
    while (0 !== col) {
        weekView.add(Ti.UI.createLabel({
            color: OUTDAY_COLOR[col],
            textAlign: "center",
            text: nextMonth.date(),
            font: font,
            backgroundColor: "transparent",
            width: TILE_WIDTH,
            height: TILE_WIDTH,
            nextMonth: true
        }));
        nextMonth.add("days", 1);
        col++;
        if (7 === col) {
            $.dates.add(weekView);
            col = 0;
            row++;
        }
    }
    exports.setImage = function(day, image, options) {
        var _ref3;
        null == options && (options = {});
        moment.isMoment(day) && (day = day.date());
        tile = null != (_ref3 = $.calendar) ? _ref3["" + day] : void 0;
        if (null != (null != tile ? tile.date : void 0)) {
            tile.remove(tile.children[0]);
            _.extend(tile, {
                _isEntry: true
            }, options);
            return tile.add(Ti.UI.createImageView({
                image: image,
                width: TILE_WIDTH,
                height: TILE_WIDTH,
                touchEnabled: false
            }));
        }
    };
    exports.addView = function(day, view, options) {
        var _ref3;
        null == options && (options = {});
        moment.isMoment(day) && (day = day.date());
        tile = null != (_ref3 = $.calendar) ? _ref3["" + day] : void 0;
        if (null != (null != tile ? tile.date : void 0)) return tiles[day].add(view);
        return "backgroundImage not set";
    };
    exports.setBackgroundImage = function(day, image, options) {
        var _ref3;
        null == options && (options = {});
        moment.isMoment(day) && (day = day.date());
        tile = null != (_ref3 = $.calendar) ? _ref3["" + day] : void 0;
        if (null != (null != tile ? tile.date : void 0)) return tiles[day].setBackgroundImage(image);
        return "backgroundImage not set";
    };
    exports.setView = function(day, view, options) {
        var _ref3;
        null == options && (options = {});
        moment.isMoment(day) && (day = day.date());
        tile = null != (_ref3 = $.calendar) ? _ref3["" + day] : void 0;
        if (null != tile) {
            _.extend(tile, options);
            return tile.add(view);
        }
    };
    exports.calendarMonth = function() {
        return calendarMonth;
    };
    exports.select = function(day) {
        var touchEvent, _ref3;
        moment.isMoment(day) && (day = day.date());
        touchEvent = "singletap";
        tile = null != (_ref3 = $.calendar) ? _ref3["" + day] : void 0;
        return null != tile ? tile.fireEvent(touchEvent, {
            source: tile
        }) : void 0;
    };
    exports.selectedDate = function() {
        return null != $.selected ? moment.unix($.selected.date) : moment();
    };
    exports.destroy = function() {
        $.calendar = null;
        $.selected = null;
        return $.destroy();
    };
    __defers["$.__views.dates!click!doClick"] && $.__views.dates.addEventListener("click", doClick);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;