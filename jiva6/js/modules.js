YUI_config = {
  filter: 'MIN',
  base: '++resource++js/yui3/build/',
  groups : {
    jiva: {
      base: '++resource++js/',
      modules: {
        COMMON: {
          path: 'common.js'
        },
        zecalendar: {
          path: 'zecalendar.js',
          requires: ["calendar", "widget-position", "widget-position-align", "widget-position-constrain", 'datatype-date', 'event-outside', 'event-focus']
        }
      }
    },
    views: {
      base: '++resource++js/',
      modules: {
        zeview: {
          path: 'myview.js',
          requires: ['view']
        },
        memsrc: {
          path: 'mem_search.js',
          requires: ['view', 'autocomplete']
        },
        'model-sync-zope': {
          path: 'modelSyncZope/ModelSyncZope.js',
          requires: ['io','json']
        }
      }
    }
  }
}