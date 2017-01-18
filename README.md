# watcher
A small (~400 bytes gzipped) Pub/Sub plugin for implementing broadcasters in jQuery

## Usage

```js
import 'watcher-min.js'

// subscribe to (watch) an event
var sub1 = $.watcher('subscribe', '/myEvents/event1', function(results) {
    console.log('Event received', result);
});

// publish an event
$.watcher('publish', '/myEvents/event1', {myParam : 'Param Value'});

// unsubscribe to an event
$.watcher('unsubscribe', '/myEvents/event1', sub1);

// remove all subscribers from an event
$.watcher('unsubscribeAll', '/myEvents/event1');

// get all subscribers to an event
var myWatchers = $.watcher('getWatchers', '/myEvents/event1');
```

* * *

## API
The watcher plugin runs as a singleton so every call (listed below) gets wrapped into the `$.watcher()` method. 

The signature for every call is as follows:
`$.watcher(action, event, handler/data);`

###### Parameters

-   `action` *[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)* : Type of action to execute on the $.watcher plugin
-   `event` *[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)* : Type (name) of event
-   `handler` *[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)* : (**Subscribe Only**) Function to call or execute when the event being watched is published
-   `data` *[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)* : (**Publish Only**) A collection of key/value pairs to be passed along to any subscribers of the event

---

#### getWatchers

Get a reference to all subscribers of a specific event. 

###### Parameters

-   `event` *[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)* : Type (name) of event to watch

###### Returns

-   `watchers` *[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)* : An array of references to subscribers to the specified event

---

#### publish

Broadcast an event to all subscribers

###### Parameters

-   `event` *[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)* : Type of event to unregister `handler` from, or `"*"`
-   `data` *[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)* : A collection of key/value pairs to be passed along to any subscribers of the event


---


#### subscribe

Listens for an event to be broadcast and executes a handler (callback) method
Will also receive a results object allowing for additional parameters to be passed from the broadcaster

###### Parameters

-   `event` *[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)* : Type (name) of event to watch
-   `handler` *[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)* : Function to call or execute when the event being watched is published

---

#### unsubscribe

Removes a specific watcher from an event subscription
*This is good practice to do when the subscription is no longer needed to mark for garbage cleanup*

###### Parameters

-   `event` *[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)* : Type (name) of event to unsunscribe from
-   `reference` **\[Any]** : A variable reference to whatever was used when setting up the watcher initially

---

#### unsubscribeAll

Removes all watchers from an event subscription
*This is good practice to do when the event is no longer needed to mark all watchers for garbage cleanup*

###### Parameters

-   `event` *[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)* : Type (name) of event to remove subscribers from
