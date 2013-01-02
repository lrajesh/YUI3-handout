YUI.add('zeview', function (Y, NAME) {
  Y.ZeView = Y.Base.create(NAME, Y.View, [], {
    events: {
      '.ze-calendar': {click: 'showcal'}
    },
    _eventHandles: null,
    _destroyOnExit: null,

    initializer: function (){
      this._eventHandles = [];
      this._destroyOnExit = [];
    },
    destructor: function () {
      Y.Array.each(this._eventHandles,function(h){
                       h.detach();
                   });
      Y.Array.each(this._destroyOnExit,function(h){
                       h.destroy();
                   });
    },
    render: function (container) {
      container = Y.one(container);
      if (container) {
        this.set('container', container);
      } else {
        container = this.get('container');
      }
      if (container) {
        this._render(container);
      }
      return this;
    },
    attachEvents: function(events) {
      var cl = this._classes, c, i, ev={};
      for (i=0;i<cl.length;i++) {
          c = cl[i];
           if(c.prototype.events) {
              Y.mix(ev,c.prototype.events);
          }
      }
      Y.ZeView.superclass.attachEvents.call(this,ev);
    },
    showcal: function (ev) {
      YUI.Ze.calendar.set('oTar', ev.target);
    }
  });
}, '@VERSION@', {requires: ['view']});