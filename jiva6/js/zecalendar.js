YUI.add('zecalendar', function (Y, NAME) {
  Y.ZeCalendar = Y.Base.create('calendar', Y.Calendar, [], {
    initializer: function() {
      this.events = [
        this.on('selectionChange', function (ev) {
          var newDate = ev.newSelection[0];
          this.get('oTar').set('value', Y.DataType.Date.format(newDate, {format:"%m/%d/%Y"}));
          this.set('oTar',null);
        }, this),
        this.get('boundingBox').on(['focusoutside'], function(ev) {
          this.set('oTar',null);
        }),
        this.after('oTarChange', this._afterOtarChange),
        this.after('render', function (){
          this.get('boundingBox').setStyle('position', 'absolute');
        })
      ];
    },
    destructor: function(){
      for (var i=0;i<this.events.length;i++) {
        this.events[i].detach();
      }
    },
    _afterOtarChange: function(ev){
      if (ev.newVal === null) {
        this.hide();
      }
      else {
        var oReg = ev.newVal.get('region');
        this.show();
        this.get('boundingBox').setXY([oReg.left,oReg.bottom]);
      }
    }
  }, 
  {ATTRS: 
    {oTar: {value: null,
            validator: function(val) {
              return val === null || val.constructor.NAME === 'node';
            }
      }
    }
  });
}, '@VERSION@', {"requires": ["calendar", "widget-position", "widget-position-align", "widget-position-constrain", "datatype-date", "event-outside", "event-focus"]});
/*
YUI.add('zecalendar', function (Y, NAME) {
  Y.ZeCalendar = Y.Base.create('calendar', Y.Calendar, [Y.WidgetPosition, Y.WidgetPositionAlign, Y.WidgetPositionConstrain]);
}, '@VERSION@', {"requires": ["calendar", "widget-position", "widget-position-align", "widget-position-constrain"]})*/