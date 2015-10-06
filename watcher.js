/*
 * Watcher v1.0 - 09-21-2015
 * A jQuery plugin for enabling publish/subscribe (Observer) functionality
 *
 * Copyright 2015 Dave Gillem; MIT Licensed
 */

;(function ($, window) {
	"use strict";

	var watchers			= {},
		watcherID			= -1,

		_addWatcher			= function(event, callback) {
			if(!watchers[event]){
				watchers[event] = [];
			}
			watchers[event].push({
							callback	: callback,
							id			: ++watcherID
			});
			return watcherID;
	    },
	    _removeWatcher		= function(event, id) {
			var whichWatcher,
				currEvent = watchers[event];
			for(var i=0, loopcount=currEvent.length; i<loopcount; i++){
				whichWatcher = currEvent[i];
				if(whichWatcher.id === id) {
					currEvent.splice(i, 1);
					return true;
				}
			}
			return false;
	    },
	    _removeAllWatchers	= function(event) {
			delete watchers[event];
	    },
		_notifyWatchers		= function(event, data) {
			var whichEvent = watchers[event];
			//console.log('DISPATCHING EVENT',event, data);
			if(whichEvent){
				whichEvent && $.each(whichEvent, function() {
					this.callback.call($, data);
				});
			}
	    },
		_pubMap				= {
								'publish'		: _notifyWatchers,
								'subscribe'		: _addWatcher,
								'unsubscribe'	: _removeWatcher,
								'unsubscribeAll': _removeAllWatchers
							};

	$.watcher 			= function(method, event, data) {
		var methodCall = _pubMap[method];
		if (methodCall) {
			methodCall(event, data);
		}else{
			throw new Error("There is not a "+method+" that can be called for $.watcher");
		}
	};

})(jQuery, this);