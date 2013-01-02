YUI.add("attribute-core",function(e,t){function E(e,t,n){this._yuievt=null,this._initAttrHost(e,t,n)}e.State=function(){this.data={}},e.State.prototype={add:function(e,t,n){var r=this.data[e];r||(r=this.data[e]={}),r[t]=n},addAll:function(e,t){var n=this.data[e],r;n||(n=this.data[e]={});for(r in t)t.hasOwnProperty(r)&&(n[r]=t[r])},remove:function(e,t){var n=this.data[e];n&&delete n[t]},removeAll:function(t,n){var r;n?e.each(n,function(e,n){this.remove(t,typeof n=="string"?n:e)},this):(r=this.data,t in r&&delete r[t])},get:function(e,t){var n=this.data[e];if(n)return n[t]},getAll:function(e,t){var n=this.data[e],r,i;if(t)i=n;else if(n){i={};for(r in n)n.hasOwnProperty(r)&&(i[r]=n[r])}return i}};var n=e.Object,r=e.Lang,i=".",s="getter",o="setter",u="readOnly",a="writeOnce",f="initOnly",l="validator",c="value",h="valueFn",p="lazyAdd",d="added",v="_bypassProxy",m="initializing",g="initValue",y="lazy",b="isLazyAdd",w;E.INVALID_VALUE={},w=E.INVALID_VALUE,E._ATTR_CFG=[o,s,l,c,h,a,u,p,v],E.protectAttrs=function(t){if(t){t=e.merge(t);for(var n in t)t.hasOwnProperty(n)&&(t[n]=e.merge(t[n]))}return t},E.prototype={_initAttrHost:function(t,n,r){this._state=new e.State,this._initAttrs(t,n,r)},addAttr:function(e,t,n){var r=this,i=r._state,s,o;t=t||{},n=p in t?t[p]:n;if(n&&!r.attrAdded(e))i.addAll(e,{lazy:t,added:!0});else if(!r.attrAdded(e)||i.get(e,b))o=c in t,o&&(s=t.value,delete t.value),t.added=!0,t.initializing=!0,i.addAll(e,t),o&&r.set(e,s),i.remove(e,m);return r},attrAdded:function(e){return!!this._state.get(e,d)},get:function(e){return this._getAttr(e)},_isLazyAttr:function(e){return this._state.get(e,y)},_addLazyAttr:function(e,t){var n=this._state,r=n.get(e,y);n.add(e,b,!0),n.remove(e,y),this.addAttr(e,r)},set:function(e,t){return this._setAttr(e,t)},_set:function(e,t){return this._setAttr(e,t,null,!0)},_setAttr:function(t,r,s,o){var u=!0,a=this._state,l=this._stateProxy,h,p,d,v,m,g,y;return t.indexOf(i)!==-1&&(d=t,v=t.split(i),t=v.shift()),this._isLazyAttr(t)&&this._addLazyAttr(t),h=a.getAll(t,!0)||{},p=!(c in h),l&&t in l&&!h._bypassProxy&&(p=!1),g=h.writeOnce,y=h.initializing,!p&&!o&&(g&&(u=!1),h.readOnly&&(u=!1)),!y&&!o&&g===f&&(u=!1),u&&(p||(m=this.get(t)),v&&(r=n.setValue(e.clone(m),v,r),r===undefined&&(u=!1)),u&&(!this._fireAttrChange||y?this._setAttrVal(t,d,m,r):this._fireAttrChange(t,d,m,r,s))),this},_getAttr:function(e){var t=this,r=e,o=t._state,u,a,f,l;return e.indexOf(i)!==-1&&(u=e.split(i),e=u.shift()),t._tCfgs&&t._tCfgs[e]&&(l={},l[e]=t._tCfgs[e],delete t._tCfgs[e],t._addAttrs(l,t._tVals)),t._isLazyAttr(e)&&t._addLazyAttr(e),f=t._getStateVal(e),a=o.get(e,s),a&&!a.call&&(a=this[a]),f=a?a.call(t,f,r):f,f=u?n.getValue(f,u):f,f},_getStateVal:function(e){var t=this._stateProxy;return t&&e in t&&!this._state.get(e,v)?t[e]:this._state.get(e,c)},_setStateVal:function(e,t){var n=this._stateProxy;n&&e in n&&!this._state.get(e,v)?n[e]=t:this._state.add(e,c,t)},_setAttrVal:function(e,t,n,i){var s=this,o=!0,u=this._state.getAll(e,!0)||{},a=u.validator,f=u.setter,l=u.initializing,c=this._getStateVal(e),h=t||e,p,d;return a&&(a.call||(a=this[a]),a&&(d=a.call(s,i,h),!d&&l&&(i=u.defaultValue,d=!0))),!a||d?(f&&(f.call||(f=this[f]),f&&(p=f.call(s,i,h),p===w?o=!1:p!==undefined&&(i=p))),o&&(!t&&i===c&&!r.isObject(i)?o=!1:(g in u||(u.initValue=i),s._setStateVal(e,i)))):o=!1,o},setAttrs:function(e){return this._setAttrs(e)},_setAttrs:function(e){var t;for(t in e)e.hasOwnProperty(t)&&this.set(t,e[t]);return this},getAttrs:function(e){return this._getAttrs(e)},_getAttrs:function(e){var t={},r,i,s,o=e===!0;if(!e||o)e=n.keys(this._state.data);for(i=0,s=e.length;i<s;i++){r=e[i];if(!o||this._getStateVal(r)!=this._state.get(r,g))t[r]=this.get(r)}return t},addAttrs:function(e,t,n){var r=this;return e&&(r._tCfgs=e,r._tVals=r._normAttrVals(t),r._addAttrs(e,r._tVals,n),r._tCfgs=r._tVals=null),r},_addAttrs:function(e,t,n){var r=this,i,s,o;for(i in e)e.hasOwnProperty(i)&&(s=e[i],s.defaultValue=s.value,o=r._getAttrInitVal(i,s,r._tVals),o!==undefined&&(s.value=o),r._tCfgs[i]&&delete r._tCfgs[i],r.addAttr(i,s,n))},_protectAttrs:E.protectAttrs,_normAttrVals:function(e){var t={},n={},r,s,o,u;if(e){for(u in e)e.hasOwnProperty(u)&&(u.indexOf(i)!==-1?(r=u.split(i),s=r.shift(),o=n[s]=n[s]||[],o[o.length]={path:r,value:e[u]}):t[u]=e[u]);return{simple:t,complex:n}}return null},_getAttrInitVal:function(e,t,r){var i=t.value,s=t.valueFn,o,u=!1,a,f,l,c,h,p,d;!t.readOnly&&r&&(a=r.simple,a&&a.hasOwnProperty(e)&&(i=a[e],u=!0)),s&&!u&&(s.call||(s=this[s]),s&&(o=s.call(this,e),i=o));if(!t.readOnly&&r){f=r.complex;if(f&&f.hasOwnProperty(e)&&i!==undefined&&i!==null){d=f[e];for(l=0,c=d.length;l<c;++l)h=d[l].path,p=d[l].value,n.setValue(i,h,p)}}return i},_initAttrs:function(t,n,r){t=t||this.constructor.ATTRS;var i=e.Base,s=e.BaseCore,o=i&&e.instanceOf(this,i),u=!o&&s&&e.instanceOf(this,s);t&&!o&&!u&&this.addAttrs(e.AttributeCore.protectAttrs(t),n,r)}},e.AttributeCore=E},"@VERSION@",{requires:["oop"]});
