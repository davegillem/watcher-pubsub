!function($,r){"use strict";var n={},c=-1,t=function(r,t){n[r]||(n[r]=[]);for(var e,i=!1,u=n[r],a=0,l=u.length;l>a;a++)if(e=u[a],e.callback===t)return i=!0,e.id;return i?void 0:(n[r].push({callback:t,id:++c}),c)},e=function(r,c){for(var t,e=n[r],i=0,u=e.length;u>i;i++)if(t=e[i],t.id===c)return e.splice(i,1),!0;return!1},i=function(r){delete n[r]},u=function(r,c){var t=n[r];t&&t&&$.each(t,function(){this.callback.call($,c)})},a={publish:u,subscribe:t,unsubscribe:e,unsubscribeAll:i};$.watcher=function(r,n,c){var t=a[r];if(!t)throw new Error("There is not a "+r+" that can be called for $.watcher");t(n,c)}}(jQuery,this);