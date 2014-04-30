function Controller() {
    function doPrevMonth() {
        var widget;
        $.calendar.remove($.calendar.children[0]);
        currentMonth.subtract("months", 1);
        widget = Alloy.createWidget("com.apiomat.calendar", "widget", {
            period: currentMonth
        });
        $.calendar.add(widget.getView());
        Ti.API.info(widget.calendarMonth());
    }
    function doNextMonth() {
        var widget;
        $.calendar.remove($.calendar.children[0]);
        currentMonth.add("months", 1);
        widget = Alloy.createWidget("com.apiomat.calendar", "widget", {
            period: currentMonth
        });
        $.calendar.add(widget.getView());
        Ti.API.info(widget.calendarMonth());
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.index = Ti.UI.createWindow({
        layout: "vertical",
        backgroundColor: "white",
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    $.__views.__alloyId0 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        id: "__alloyId0"
    });
    $.__views.index.add($.__views.__alloyId0);
    $.__views.prevMonth = Ti.UI.createButton({
        left: 0,
        id: "prevMonth",
        title: "prevMonth"
    });
    $.__views.__alloyId0.add($.__views.prevMonth);
    doPrevMonth ? $.__views.prevMonth.addEventListener("click", doPrevMonth) : __defers["$.__views.prevMonth!click!doPrevMonth"] = true;
    $.__views.nextMonth = Ti.UI.createButton({
        right: 0,
        id: "nextMonth",
        title: "nextMonth"
    });
    $.__views.__alloyId0.add($.__views.nextMonth);
    doNextMonth ? $.__views.nextMonth.addEventListener("click", doNextMonth) : __defers["$.__views.nextMonth!click!doNextMonth"] = true;
    $.__views.calendar = Ti.UI.createView({
        id: "calendar"
    });
    $.__views.index.add($.__views.calendar);
    $.__views.current = Alloy.createWidget("com.apiomat.calendar", "widget", {
        id: "current",
        __parentSymbol: $.__views.calendar
    });
    $.__views.current.setParent($.__views.calendar);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var moment = require("alloy/moment");
    var currentMonth = moment();
    $.current.select(18);
    $.calendar.on("click", function() {
        $.current.selectedDate();
    });
    $.index.open();
    __defers["$.__views.prevMonth!click!doPrevMonth"] && $.__views.prevMonth.addEventListener("click", doPrevMonth);
    __defers["$.__views.nextMonth!click!doNextMonth"] && $.__views.nextMonth.addEventListener("click", doNextMonth);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;