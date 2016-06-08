 /*
 * Watcher v1.2.2 - 12-09-2015, https://github.com/davegillem/watcher-pubsub
 * ===================================
 * A jQuery plugin for enabling publish/subscribe (Observer) functionality
 *
 * (c) Copyright 2015 Dave Gillem, http://davegillem.com
 * MIT Licensed
 */

;(function ($, window) {
	"use strict";

	var watchers			= {},
		watcherID			= -1,

		_addWatcher			= function(event, callback) {
			if(!watchers[event]){
				watchers[event] = [];
			}

			var whichWatcher, watcherRef,
				isCopy 		= false,
				currEvent 	= watchers[event] || [],
				evtLen		= currEvent.length;
			// check for duplicates
			for(var i=0, loopcount=evtLen; i<loopcount; i++){
				whichWatcher = currEvent[i];
				if(whichWatcher.callback === callback) {
					isCopy = true;
					watcherRef = whichWatcher.id;
				}
			}
			if(!isCopy){
				++watcherID;
				watchers[event].push({
							callback	: callback,
							id			: watcherID
				});
				watcherRef = watcherID;
			}
			return watcherRef;
	    },
	    _removeWatcher		= function(event, id) {
			var whichWatcher,
				isRemoved 	= false,
				currEvent 	= watchers[event] || [],
				evtLen		= currEvent.length;
			for(var i=0, loopcount=evtLen; i<loopcount; i++){
				whichWatcher = currEvent[i];
				if(whichWatcher.id == id) {
					currEvent.splice(i, 1);
					isRemoved = true;
					break; // jump out once/if ID is found
				}
			}
			return isRemoved;
	    },
	    _removeAllWatchers	= function(event) {
			delete watchers[event];
	    },
		_notifyWatchers		= function(event, data) {
			var whichEvent = watchers[event];
			if(whichEvent){
/*
				// if whichEvent then $.each
				whichEvent && $.each(whichEvent, function() {
					this.callback.call($, data);
				});
*/
				$.each(whichEvent, function() {
					this.callback.call($, data);
				});
			}
	    },
	    _getWatchers		= function (event){
		    	return event ? watchers[event] : watchers;
	    },
		_pubMap				= {
								'getWatchers'	: _getWatchers,
								'publish'		: _notifyWatchers,
								'subscribe'		: _addWatcher,
								'unsubscribe'	: _removeWatcher,
								'unsubscribeAll': _removeAllWatchers
							};

	$.watcher 			= function(method, event, data) {
		var methodCall = _pubMap[method];
		if (methodCall) {
			return methodCall(event, data);
		}else{
			throw new Error("There is not a "+method+" that can be called for $.watcher");
		}
	};

})(jQuery, this);