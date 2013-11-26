webapp-coffee-devstarter
========================

A simple, yet effective dev environnement for webapps being developped in CoffeeScript.

Brings you :
------------
- a dev server (using GruntJS)
- dependencies (using Bower)
- modular CoffeeScript/JS (using RequireJS)
- reseted and normalized CSS

Requirements
------------

To get up and running, all you need is [NodeJS](http://http://nodejs.org/) to be installed.

Then simply run in your terminal : 

```
npm install
bower install
```

You're all set !

Usage
-----

To get your developement server up, all you need to do is running

```
grunt server
```

It will automagically watch your CS source files and recompile/reload it each times it gets changed

Alternatively you can run :
```
grunt build
```

To compile your project without running it, and:
```
grunt clean
```

To erase every file the compilation process made.