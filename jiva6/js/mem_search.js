var tmplpage = '<fieldset>\
                  <legend>Member Search</legend>\
                  <form name="pat_search" id="pat_search">\
                    <div id="demo" class="yui3-g">\
                      <div class="yui3-u-1-4 label">\
                        <label for="ac-input">Name:</label>\
                      </div>\
                      <div class="yui3-u-1-4">\
                        <input id="ac-input" name="memname" type="text" formvalidator:FormField="yes" formvalidator:Type="TextBaseField">\
                      </div>\
                      <div class="yui3-u-1-4 label">\
                        <label for="dob-input">DOB:</label>\
                      </div>\
                      <div class="yui3-u-1-4">\
                        <input id="dob-input" name="dob" class="ze-calendar" type="text">\
                      </div>\
                      <div class="yui3-u-1-4 label">\
                        <label for="member-id">Member Id:</label>\
                      </div>\
                      <div class="yui3-u-1-4">\
                        <input id="member-id" name="memid" type="text">\
                      </div>\
                      <div class="yui3-u-1-4 label">\
                        <label for="member-type">Member Type:</label>\
                      </div>\
                      <div class="yui3-u-1-4">\
                        <select id="member-type" name="memtype">\
                          <option value="">-- Select -- </option>\
                          <option value="1">Id</option>\
                          <option value="2">SSN</option>\
                        </select>\
                      </div>\
                    </div>\
                    <div style="clear:both"></div>\
                    <div align="center">\
                      <input type="submit" name="search" value="Search"/>\
                    </div>\
                  </form>\
                </fieldset>';
                
YUI.add('memsrc', function (Y, NAME) {
  Y.TestView = Y.Base.create(NAME, Y.ZeView, [], {
    events: {
      '[name=search]': {click: 'search'}
    },
    template: tmplpage,
    initializer: function () {
      Y.mix(this.events, Y.TestView.superclass.events);
      this.attachEvents(this.events);
    },
    _render: function (container) {
      container.setHTML(this.template);
      var ac = container.one('#ac-input').plug(Y.Plugin.AutoComplete, {
        source: 'names?query={query}',
        resultTextLocator: 'name'
      });
      ac.ac.after('select', function(){console.log(arguments)});
      this._destroyOnExit.push(ac);
    },
    search: function (ev) {
      ev.halt();
      var fs = Y.all('#pat_search input,#pat_search select'), qs={};
      fs.each(function (f) {
        var val = f.get('value');
        if (val) {
          qs[f.get('name')] = val;
        }
      });
      Y.use('model-list','model-sync-zope', function () {
        var MyM = Y.Base.create('MyM', Y.ModelList, [Y.ModelSync.Zope]);
        var ml = new MyM({root: 'memresults'});
        ml.load(qs, function (error, resp) {});
      });
    }
  });
}, '@VERSION@', {requires: ['zeview', 'autocomplete']});