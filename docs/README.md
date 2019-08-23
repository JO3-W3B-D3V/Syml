# Syml
[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://paypal.me/JO3W3BD3V?locale.x=en_GB)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=JO3-W3B-D3V_Syml&metric=alert_status)](https://sonarcloud.io/dashboard?id=JO3-W3B-D3V_Syml)
[![Build Status](https://travis-ci.org/JO3-W3B-D3V/Syml.svg?branch=master)](https://travis-ci.org/JO3-W3B-D3V/Syml)
[![Known Vulnerabilities](https://snyk.io//test/github/JO3-W3B-D3V/Syml/badge.svg?targetFile=package.json)](https://snyk.io//test/github/JO3-W3B-D3V/Syml?targetFile=package.json)
[![HitCount](http://hits.dwyl.com/JO3-W3B-D3V/Syml.svg)](http://hits.dwyl.com/JO3-W3B-D3V/Syml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Code Climate](https://codeclimate.com/github/JO3-W3B-D3V/Syml/badges/gpa.svg)](https://codeclimate.com/github/JO3-W3B-D3V/Syml)
![version](https://img.shields.io/badge/version-1.0.0-blue)

The purpose of Syml is to implement a state manager is to simplify the process of implementing a tool to aid with state management, unfortunately a lot of developers, junior through to senior agree that current implementations of state management such as Redux may be considered unnecessarily complex. 

Furthermore, if you were to look at the underlying API, it could spark some ideas & potentially aid you in implementing your own API of some sort or another. It's very much the case where due to the sheer simplicity, anyone should be able to make sense of this API. 

Of course, state management isn't always necessary & I know what a lot of you are probably thinking:

> Great, yet another state manager...

But that's the thing, this isn't just another state manager, it's a simple state manager, so simple in fact that it doesn't tie you into factoring your code specifically for this API. Like with Redux & similar technologies, you need to implement your reducers, your actions, dispatcher, etc. It can get quite complicated quite quickly, especially if you're not familiar with the Flux architecture. 

## Difference Outline
With Syml, it stores the state _almost_ like a global object, unlike Redux, Syml doesn't segregate the state, this is a deliberate design, it's to try and reduce the overall complexity of using & interacting with Syml.

### Event Driven
With Syml, it quite literally take advantage of functionality that's tried & tested, functionality that already exists within the browser, such as ```EventTarget.dispatchEvent()``` & ```EventTarget.addEventListener()```. After all, there would be no benefit in reinventing the wheel by implementing a custom event system/feature/API/etc.

## Similarities 
 There are _some_ vague similarities, like how when you want to fire ```Syml.updateState```, you need to pass it an object that has the properties of: 

* ```name``` - This refers to the trigger that you'd like to run once the state has been updated. 
* ```payload``` - This refers to the new state that you'd like to apply. 

Syml implements this in a simple POJO class called ```Action```.

Another similarity is that when you retrieve the state from the state manager, it will simply return a copy of the state, this prevents implementing side effects & potential bugs. 

## Documentation
To outline some more detailed documentation, here's the current methods that exist on the Syml API. 

### POJO's
|Name|Properties|Description|
|---------|----------|-----------|
|```Trigger```|<ul><li>```name``` - This is a string which is stored to a collection of triggers, this **MUST** be unique.</li><li>```trigger``` - This is just a function/callback method that you'd like to run when the trigger is being fired.</li></ul>|This POJO is used to ensure that the relevant properties are being provided to the ```registerTrigger``` method.|
|```Action```|<ul><li>```name``` - This is a string which is used to refer to some trigger name.</li><li>```payload``` - This is essentially the **new** state that you'd like to apply.</li></ul>|This is being used to ensure that the ```updateState``` method can handle the relevant update's that you're trying to apply.|

### Exceptions
|Name|Parameters|Description|
|--------------|----------|-----------|
|```Exception```|<ul><li>```message``` - This is a string that should have some form of meaning.</li></ul>|This is just a base exception class, it's just there to save on repeating code.|
|```AlreadyRegisteredTriggerException```|<ul><li>```triggerName``` - This is a string that provides the name of the trigger that you're trying to register.</li></ul>|This exception is meant to be thrown when you're trying to register some trigger that's already been registered under the given name.|
|```NoSuchTriggerException```|<ul><li>```triggerName``` - This is a string that provides the name of the trigger that you're trying to access.</li></ul>|This exception is to be thrown when you're trying to fire some trigger, however you've not assigned a trigger under that name.|

### Methods 

|Name|Parameters|Description|
|-----------|----------|-----------|
|```getState```|N/A|This will return a copy of the stored state.|
|```updateState```|<ul><li>```action``` - This is just an object that has the same properties of the ```Action``` POJO.</li></ul>|This will update the state & fire the registered trigger(s).|
|```registerTrigger```|<ul><li>```trigger``` - This is just an object that has the same properties of the ```Trigger``` POJO. </li></ul>|This will allow you to register a trigger, aka a name & some callback/event handler function.|
|```fireTrigger```|<ul><li>```triggerName``` - This is a string that you're using to specify which trigger you'd like to fire.</li></ul>|This will look for a trigger by the name assigned to some Trigger, this just allows you to manually run the event handler function.|
|```getRegisteredTriggers```|N/A|This will return an array of all trigger names that have been registered.| 
|```isTriggerRegistered```|<ul><li>```trigger``` - This is a trigger object, used to see if this trigger name has been registered or not.</li></ul>|This method will return a boolean, stating if that trigger name has been registered or not.|
|```isTriggerNameRegistered```|<ul><li>```triggerName``` - This is the name of the trigger that you're looking for.</li></ul>|This method will return a boolean, stating if that trigger name has been registered or not.|
|```destruct```|N/A|This method is used to clear all triggers & to clear the current state stored within Syml.|

## Use Case Example
To illustrate as to how simple this API is to use, you could easily use it with an Angular application... ***Todo***...
