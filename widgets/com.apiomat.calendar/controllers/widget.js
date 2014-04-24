/**
 * original author:	hamasyou (https://github.com/hamasyou)
 * original url:	https://github.com/hamasyou/titanium_alloy_calendar
 * 
 * author: 			Apinauten GmbH (Tim Friedrich)
 * url:				http://www.apiomat.com
 * version:			1.2
 * license:			MIT License
 * 
 * tags: 			calendar, alloy, titanium, swipe, tabs
 */

var CALENDAR_WIDTH, DAY_COLOR, OUTDAY_COLOR, TILE_WIDTH, WEEK_COLOR, args, calendarMonth, col, createWeekView, day, dayOfWeek, doClick, i, moment, nextMonth, period, prevMonth, row, tile, weekView, _i, _j, _k, _len, _ref, _ref1, _ref2;

//a javascript date library for parsing, validating, manipulating, and formatting dates.
moment = require('moment');

//get all args
args = arguments[0] || {};

/**
 * init some variables
 */
period = args.period != null ? moment(args.period) : moment();
weekStartsWith = args.weekStartOn!=null ? args.weekStartOn : "monday";
tiles = []; //tileArray
tabCount	=args.tabCount				!=null 	? 	args.tabCount 			: 3;
dateCount	=args.dateCount				!=null 	? 	args.dateCount 			: 7;
dateSpace	=args.dateSpace				!=null 	? 	args.dateSpace 			: 30;
tabBar		=args.tabBar				!=null 	? 	args.tabBar 			: false;
displayDayNames		= 	args.color.displayDayNames		!=null	?	args.color.displayDayNames		:	true;
holiday		= 	args.holiday			!=null	?	args.holiday			:	true;
font		= 	args.font				!=null 	?	args.font				: 	{fontSize : '16dp'};
rangeFromToday=args.rangeFromToday		!=null	?	args.rangeFromToday		:	false;
range		=	args.range				!=null	?	args.range				:	6;
args.color	=	args.color				!=null	?	args.color				: 	{};
tabBgColor	=	args.color.tabBgColor	!=null 	? 	args.color.tabBgColor 	: 	"white";
tabColor	=	args.color.tabColor		!=null	?	args.color.tabColor		: 	"black";
sat			= 	args.color.sat			!=null	?	args.color.sat			:	"grey";
sun			= 	args.color.sun			!=null	?	args.color.sun			:	"grey";
work		= 	args.color.work			!=null	?	args.color.work			:	"black";
out			= 	args.color.out			!=null	?	args.color.out			:	"#ececec";
today		= 	args.color.today		!=null	?	args.color.today		:	"red";

if (rangeFromToday) {
	rangeFromToday=false;
	Ti.API.info("rangeFromToday isn't supported at the moment");
}

//callbacks
var swipeCB = args.swipeCB || undefined;
var selectCB = args.select || undefined;
var clickCB=args.click || undefined;

//eventListener: listen on swipe actions
$.dates.addEventListener('swipe', function(e) {
	if ( typeof swipeCB !== 'undefined') {
		swipeCB(e);
	}

});

//listen on date click
doClick = function(e) {
	clickCB(e);
	// var _ref, _ref1, _ref2;
	// if ((e.source.date != null) && !e.source._isEntry) {
		// if ($.selected != null) {
			// if (( _ref = $.selected.children[0]) != null) {
				// _ref.backgroundColor = "transparent";
			// }
		// }
		// $.selected = e.source;
		// return ( _ref1 = $.selected) != null ? ( _ref2 = _ref1.children[0]) != null ? _ref2.backgroundImage = WPATH('/images/calendar/selected.png') :
		// void 0 :
		// void 0;
	// }
};

weekStart = 0;

/**
 * start of the week
 */
switch(weekStartsWith) {
	case "monday":
		weekStart = 2;
		_ref = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
		if ( typeof args.color !== "undefined") {
			WEEK_COLOR = [sun,work, work, work, work, work, sat];
			DAY_COLOR = [sun,work, work, work, work, work, sat];
			OUTDAY_COLOR = [out,out, out, out, out, out, out];

		} else {
			WEEK_COLOR = ['#999999', '#999999', '#999999', '#999999', '#999999', '#91C176', '#FF9999'];
			DAY_COLOR = ['#FF0000', '#333333', '#333333', '#333333', '#333333', '#333333', '#64A515'];
			OUTDAY_COLOR = ['#999999', '#999999', '#999999', '#999999', '#999999', '#91C176', '#FF9999'];

		}
		break;
	case "sunday":
		weekStart = 1;
		_ref = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
		if ( typeof args.color !== "undefined") {
			WEEK_COLOR = [sun,work, work, work, work, work, sat];
			DAY_COLOR = [sun,work, work, work, work, work, sat];
			OUTDAY_COLOR = [out,out, out, out, out, out, out];

		} else {
			WEEK_COLOR = ['#FF9999', '#999999', '#999999', '#999999', '#999999', '#999999', '#91C176'];
			DAY_COLOR = ['#FF0000', '#333333', '#333333', '#333333', '#333333', '#333333', '#64A515'];
			OUTDAY_COLOR = ['#FF9999', '#999999', '#999999', '#999999', '#999999', '#999999', '#91C176'];

		}
		break;
	default:
		start = 2;
		break;
}

/**
 * configure width
 */
//space left and right
$.dates.left=dateSpace;
$.dates.right=dateSpace;
$.days.left=dateSpace;
$.days.right=dateSpace;

//get device width
var viewWidth = Ti.Platform.displayCaps.platformWidth - 10;
if (OS_ANDROID) {
	viewWidth /= Ti.Platform.displayCaps.logicalDensityFactor;
}

//set tabWidth
var tabWidth = viewWidth / tabCount;

tabWidth = Math.floor(tabWidth);

TILE_WIDTH = (viewWidth-(dateSpace*2)) / dateCount;
TILE_WIDTH = Math.floor(TILE_WIDTH);

CALENDAR_WIDTH = viewWidth;

$.days.width = $.dates.width = CALENDAR_WIDTH;

$.selected = null;

//display tabBar above?
if (tabBar) {
	$.tabBar.backgroundColor=args.color.tabBgColor;
	
	var months = [];
	months[0] = L('january', "january");
	months[1] = L('february', "february");
	months[2] = L('march', "march");
	months[3] = L('april', "april");
	months[4] = L('may', "may");
	months[5] = L('june', "june");
	months[6] = L('july', "july");
	months[7] = L('august', "august");
	months[8] = L('september', "september");
	months[9] = L('october', "october");
	months[10] = L('november', "november");
	months[11] = L('december', "december");

	i = -(range);
	var selectedMonth = "";
	if(rangeFromToday) {
		j=moment().month(moment().month())-moment().month(period.month());
		if(j<i) {
			j=moment().month(moment().month()).month();
		}
	} else {
		j=0;
	}
	while (i <= range) {
		var localMonth="";
		if(rangeFromToday) {
			localMonth = moment().month(moment().month()).year(moment().year());
		} else {
			localMonth = moment().month(period.month()).year(period.year());
		}
		
		
		if (i < j) {
			//months before
			localMonth.subtract("months", Math.abs(i));
		} else {
			//months after
			localMonth.add("months", Math.abs(i));
		}

		//selected month?
		if (i != j) {
			var view = Ti.UI.createView({
				backgroundColor : args.color.tabBgColor,
				width : tabWidth,
				height : 40,
				textAlign : 'center',
				layout : 'horizontal',
				monthLocal : localMonth
			});

		} else {
			selectedMonth = Ti.UI.createView({
				backgroundColor : tabBgColor,
				width : tabWidth,
				height : 40,
				textAlign : 'center',
				layout : 'horizontal',

			});
		}

		var viewLabel = Ti.UI.createLabel({
			id : 'id' + i,
			color : tabColor,
			backgroundColor :  tabBgColor,
			textAlign : 'center',
			width : Ti.UI.FILL,
			text : months[localMonth.months()],
			height : Ti.UI.FILL,
			monthLocal : localMonth
		});

		//event listen on click
		viewLabel.addEventListener('click', function(e) {
			selectCB(e);
		});

		// add label to view, add view to tabBar
		if (i != j) {
			view.add(viewLabel);

			$.tabBar.add(view);
		} else {
			selectedMonth.add(viewLabel);
			$.tabBar.add(selectedMonth);
		}
		
		//create a border
		if (i < range) {
			var border = Ti.UI.createView({
				color : args.color.tabSpace,
				backgroundColor : args.color.tabSpace,
				width : 1,
				height : 35
			});
			$.tabBar.add(border);
		}
		//$.tabBar.width = Ti.UI.SIZE;

		i++;
	}

	$.tabBar.contentWidth = "auto";
	var postLayoutCallback = function(e) {

		if (OS_IOS)
		{
			var x = selectedMonth.rect.x - selectedMonth.rect.width;
			$.tabBar.setContentOffset({x: x, y: selectedMonth.rect.y}, {animated:false});
		}
		else
		{
			var x = selectedMonth.rect.x * Ti.Platform.displayCaps.logicalDensityFactor - (selectedMonth.rect.width * Ti.Platform.displayCaps.logicalDensityFactor);
			$.tabBar.scrollTo(x, selectedMonth.rect.y);
		}

		//remove listener
		$.tabBar.removeEventListener('postlayout', postLayoutCallback);

	};

	$.tabBar.addEventListener('postlayout', postLayoutCallback);

}

//display weekday names?
if (displayDayNames) {
	for ( i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
		day = _ref[i];
		$.days.add(Ti.UI.createLabel({
			color : WEEK_COLOR[i],
			textAlign : 'center',
			font : font,
			text : day,
			width : TILE_WIDTH
		}));
	}
} else {
	$.days.height = 0;
}

$.calendar = {};

calendarMonth = moment(period);

period.date(1);

dayOfWeek = period.day();

prevMonth = moment(period).subtract('months', 1);

nextMonth = moment(period).add('months', 1);

//display holiday informations?
if (holiday) {

	_.defer(function() {
		return require(WPATH('holiday')).fetch(calendarMonth, function(holidays) {
			var name, ui, _ref1;
			for (name in holidays) {
				day = holidays[name];
				day = moment(day, 'YYYY-MM-DD').date();
				ui = ( _ref1 = $.calendar) != null ? _ref1["" + day] :
				void 0;
				if ((ui != null ? ui.date :
				void 0) != null) {
					ui.add(Ti.UI.createLabel({
						text : name,
						font : {
							fontSize : '8dp'
						},
						color : OUTDAY_COLOR[0],
						top : 0,
						left : '2dp',
						touchEnabled : false
					}));
					ui.children[0].color = DAY_COLOR[0];
				}
			}
		});
	});
}

col = 0;

row = 0;

createWeekView = function() {
	return Ti.UI.createView({
		layout : 'horizontal',
		width : CALENDAR_WIDTH,
		height : TILE_WIDTH
	});
};

weekView = createWeekView();

//previous month
if (dayOfWeek !== 0) {
	for ( i = _j = _ref1 = dayOfWeek - weekStart; _ref1 <= 0 ? _j <= 0 : _j >= 0; i = _ref1 <= 0 ? ++_j : --_j) {
		weekView.add(Ti.UI.createLabel({
			color : OUTDAY_COLOR[col],
			textAlign : 'center',
			text : prevMonth.daysInMonth() - i,
			font : args.font,
			backgroundColor : 'transparent',
			width : TILE_WIDTH,
			height : TILE_WIDTH,
			prevMonth : true
		}));
		col++;
	}
}

//display selected month
for ( i = _k = 1, _ref2 = period.daysInMonth(); 1 <= _ref2 ? _k <= _ref2 : _k >= _ref2; i = 1 <= _ref2 ? ++_k : --_k) {
	tile = Ti.UI.createView({
		backgroundColor : 'transparent',
		width : TILE_WIDTH,
		height : TILE_WIDTH,
		date : period.unix()
	});
	if(period.date()<10) {
		date="0"+period.date();
	} else {
		date=period.date();
	}
	if (period.date() == moment().date() && period.month() == moment().month() && period.year() == moment().year()) {
		//today
		tiles[period.date()] = Ti.UI.createLabel({
			color : today,
			font : font,
			backgroundColor : "transparent",
			textAlign : 'center',
			text : date,
			width : TILE_WIDTH,
			height : TILE_WIDTH,
			_isEntry : false,
			touchEnabled : false,
		});
	} else {
		tiles[period.date()] = Ti.UI.createLabel({
			color : DAY_COLOR[period.day()],
			font : font,
			backgroundColor : "transparent",
			textAlign : 'center',
			text : date,
			width : TILE_WIDTH,
			height : TILE_WIDTH,
			_isEntry : false,
			touchEnabled : false,
		});
	}

	tile.add(tiles[period.date()]);
	weekView.add(tile);
	$.calendar["" + (period.date())] = tile;
	period.add('days', 1);
	col++;
	if (col === 7) {
		$.dates.add(weekView);
		weekView = createWeekView();
		col = 0;
		row++;
	}
}

//next month
while (col !== 0) {
	weekView.add(Ti.UI.createLabel({
		color : OUTDAY_COLOR[col],
		textAlign : 'center',
		text : nextMonth.date(),
		font : args.font,
		backgroundColor : 'transparent',
		width : TILE_WIDTH,
		height : TILE_WIDTH,
		nextMonth : true
	}));
	nextMonth.add('days', 1);
	col++;
	if (col === 7) {
		$.dates.add(weekView);
		col = 0;
		row++;
	}
}

/********************************** export some funtctions *************************/

/**
 * set imgae of day
 * @param {Object} day
 * @param {Object} image
 * @param {Object} options
 */
exports.setImage = function(day, image, options) {
	var _ref3;
	if (options == null) {
		options = {};
	}
	if (moment.isMoment(day)) {
		day = day.date();
	}
	tile = ( _ref3 = $.calendar) != null ? _ref3["" + day] :
	void 0;
	if ((tile != null ? tile.date :
	void 0) != null) {
		tile.remove(tile.children[0]);
		_.extend(tile, {
			_isEntry : true
		}, options);
		return tile.add(Ti.UI.createImageView({
			image : image,
			width : TILE_WIDTH,
			height : TILE_WIDTH,
			touchEnabled : false
		}));
	}
};

/**
 * add view to day
 * @param {Object} day
 * @param {Object} view
 * @param {Object} options
 */
exports.addView = function(day, view, options) {
		var _ref3;
	if (options == null) {
		options = {};
	}
	if (moment.isMoment(day)) {
		day = day.date();
	}
	tile = ( _ref3 = $.calendar) != null ? _ref3["" + day] :
	void 0;
	if ((tile != null ? tile.date :
	void 0) != null) {
		return tiles[day].add(view);
	}
	return "backgroundImage not set";
};

/**
 * set background image of day
 * @param {Object} day
 * @param {Object} image
 * @param {Object} options
 */
exports.setBackgroundImage = function(day, image, options) {
	var _ref3;
	if (options == null) {
		options = {};
	}
	if (moment.isMoment(day)) {
		day = day.date();
	}
	tile = ( _ref3 = $.calendar) != null ? _ref3["" + day] :
	void 0;
	if ((tile != null ? tile.date :
	void 0) != null) {
		return tiles[day].setBackgroundImage(image);
	}
	return "backgroundImage not set";
};

/**
 * set view of day
 * @param {Object} day
 * @param {Object} view
 * @param {Object} options
 */
exports.setView = function(day, view, options) {
	var _ref3;
	if (options == null) {
		options = {};
	}
	if (moment.isMoment(day)) {
		day = day.date();
	}
	tile = ( _ref3 = $.calendar) != null ? _ref3["" + day] :
	void 0;
	if (tile != null) {
		_.extend(tile, options);
		return tile.add(view);
	}
};

/**
 * return calendarMonth
 */
exports.calendarMonth = function() {
	return calendarMonth;
};

/**
 * return selected day
 * @param {Object} day
 */
exports.select = function(day) {
	var touchEvent, _ref3;
	if (moment.isMoment(day)) {
		day = day.date();
	}
	touchEvent = OS_ANDROID ? 'singletap' : 'click';
	tile = ( _ref3 = $.calendar) != null ? _ref3["" + day] :
	void 0;
	return tile != null ? tile.fireEvent(touchEvent, {
		source : tile
	}) :
	void 0;
};

/**
 * return selected date
 */
exports.selectedDate = function() {
	if ($.selected != null) {
		return moment.unix($.selected.date);
	} else {
		return moment();
	}
};

/**
 * destroy calendar
 */
exports.destroy = function() {
	$.calendar = null;
	$.selected = null;
	return $.destroy();
};

