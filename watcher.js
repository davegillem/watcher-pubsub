/*
 * Watcher v1.2 - 11-23-2015
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

			var whichWatcher, watcherRef,
				isCopy = false,
				currEvent = watchers[event];
			// check for duplicates
			for(var i=0, loopcount=currEvent.length; i<loopcount; i++){
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
				isRemoved = false,
				currEvent = watchers[event];
			for(var i=0, loopcount=currEvent.length; i<loopcount; i++){
				whichWatcher = currEvent[i];
				if(whichWatcher.id == id) {
					currEvent.splice(i, 1);
					isRemoved = true;
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
				whichEvent && $.each(whichEvent, function() {
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