Fork
------

orignal author: [@hamasyou](https://twitter.com/hamasyou/)
original url: [@hamasyou](https://github.com/hamasyou/titanium_alloy_calendar)
original license: [MIT License][MIT]

About
------
This is the calendar widget of Titanium Alloy.

Usage
------
Copy the `widgets` folder in `app/widgets` folder of your project.
And add dependencies in `config.json`.

### config.json ###
Add dependencies of `app/config.json`

```json
{
    "global": {},
    "env:development": {},
    "env:test": {},
    "env:production": {},
    "os:ios": {},
    "os:android": {},
    "dependencies": {
        "com.apiomat.calendar": "1.2"
    }
}
```

For more information, please see the `sample` project.


#### show calendar ####
```javascript
var moment = require('alloy/moment'),
    month = moment();

var widget = Alloy.createWidget('com.apiomat.calendar', 'widget', {period: month});
$.index.add(widget.getView());
```


#### set image ####
You can set original image into tile.
For example, Set the image into tiles of 16 day.

```javascript
widget.setImage(16, '[imageUrl]');
```

#### set background image####
You can set original background image into tile.
For example, Set the background image into tiles of 16 day.

```javascript
widget.setBackgroundImage(16, '[imageUrl]');
```

#### select day ####
You can select tile by programatic.

```javascript
widget.select(18);
```

#### add view ####
You can add views programatic.

```javascript
widget.addView(18,view);
```

### Configuration ###
```javascript
widget = Alloy.createWidget('com.apiomat.calendar', 'widget', {
        period : currentMonth,      //moment.js object
        weekStartOn : "monday",     //sunday or monday
        holiday : false,            //show holidays
        displayDayNames : false,    //show name of weekdays
        
        //set color
        color : {
            sat : "#c2c2c2",        //saturday
            sun : "#9d9d9d ",       //sunday
            work : "#4b4b4b",       //workday
            out : "#e0e0e0",        
            today :"red",           //today
            tabBgColor : "white",   //tab backgŕound
            tabColor : "black",     //tab font 
            tabSpace:"black",       //space between tabs

        },

        //set font
        font : {
            fontSize : '16dp'
        },
        dateSpace:20,               //space left and right
        tabBar : true,              //show a tab bar above
        tabCount : 3,               //how many tabs?
        range:3,                    //How many months are shown before and after
        
        swipeCB : doSwipe,          //swipe callback
        select : doSelect,          //tabselect callback
        click:doClick               //click callback

    });
```



License
----------
Forked by [@apiomat](https://twitter.com/apiomat)
Copyright &copy; 2013 Apinauten GmbH.
Licensed under the [MIT License][MIT]
[MIT]: http://www.opensource.org/licenses/mit-license.php


Reference
------
- [ThanksHamasYou](https://twitter.com/hamasyou/)
- [ThanksObento](http://mountposition.co.jp/obento/)
