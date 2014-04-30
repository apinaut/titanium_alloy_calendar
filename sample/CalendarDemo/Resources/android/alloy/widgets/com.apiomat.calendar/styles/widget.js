function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.apiomat.calendar/" + s : s.substring(0, index) + "/com.apiomat.calendar/" + s.substring(index + 1);
    return true && 0 !== path.indexOf("/") ? "/" + path : path;
}

module.exports = [ {
    isApi: true,
    priority: 1000.0002,
    key: "View",
    style: {
        width: Ti.UI.FILL,
        height: Ti.UI.FILL
    }
}, {
    isId: true,
    priority: 100000.0003,
    key: "container",
    style: {
        top: 0,
        left: 0,
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE
    }
}, {
    isId: true,
    priority: 100000.0004,
    key: "tabBar",
    style: {
        width: Ti.UI.FILL,
        height: "40",
        layout: "horizontal",
        showHorizontalScrollIndicator: false,
        scrollType: "horizontal",
        horizontalWrap: false
    }
}, {
    isId: true,
    priority: 100000.0005,
    key: "days",
    style: {
        backgroundRepeat: true,
        layout: "horizontal",
        height: Ti.UI.SIZE
    }
}, {
    isId: true,
    priority: 100000.0006,
    key: "dates",
    style: {
        layout: "vertical",
        top: "22dp",
        height: Ti.UI.FILL
    }
} ];