void function (global){
    'use strict';

    var subject = Object.create(null), sum = 0, root = 0, levelCount = 3,
        maxCallbackTime = 1000, promisify = global.deferred ? global.deferred.promisify : require('deferred').promisify;

    function isInt(n) { return n % 1 === 0; }

    function check(object, level, cb){
        function task(){
            if ( typeof object[level] === 'undefined' ) {
                cb(new Error('this is really sad, but '+
                        'medikoo doesn\'t believe in functions which would' +
                        'return only true/false'));
            } else {
                cb();
            }
        }
        setTimeout(task, Math.random()*maxCallbackTime);
    }

    function set(object, level, cb){
        function task(){ object[level] = Object.create(null); cb(); }
        setTimeout(task, Math.random()*maxCallbackTime);
    }

    function write(object, cb){
        function task(){
            cb(null, object.value = Math.floor(Math.random() * 1000) + 1);
        }
        setTimeout(task, Math.random()*maxCallbackTime);
    }

    function findLevels(object){
        var levels = [];
        (function fl(obj, levelIndex){
            var currentLevel=obj['level'+levelIndex];
            if ( currentLevel != null ) {
                levels[levelIndex] = currentLevel;
                fl(currentLevel, levelIndex+1);
            }
        }(object, 0));
        return levels;
    }

    function makeDivisible(object, cb){
        function task(){
            var levels = findLevels(object);
            levels.forEach(
                function(obj){
                    var diff;
                    if ( diff = obj.value % levels.length ) {
                        obj.value += -1 *diff;
                    }
                }
            );
            cb();
        }
        setTimeout(task, Math.random()*maxCallbackTime);
    }

    function mean(object, cb){
        function task(){
            var levels = findLevels(object),
                mean = levels.reduce(
                    function(a, b){ return (a.value || a) + b.value; },
                    0
                )/levels.length/levels.length;


            levels.forEach(function(obj){
                var val = obj.value;
                obj.value = val*mean;
            });
            cb();
        }
        setTimeout(task, Math.random()*maxCallbackTime);
    }

    function result(object, cb){
        sum = findLevels(object).reduce(
                function(a, b){ return (a.value || a) + b.value; }, 0);

        if ( isInt(root = Math.sqrt(sum)) ) {
            console.log('success', JSON.stringify(object), sum, root);
        } else {
            console.error('failure',JSON.stringify(object), sum, root);
        }
        cb();
    }

    var chk = promisify(check);
    var st = promisify(set);
    var wrt = promisify(write);
    var mkdv = promisify(makeDivisible);
    var mn = promisify(mean);
    var rslt = promisify(result);

    chk(subject,'level0')
    (null,function(){return st(subject,'level0')})
    (function(){return wrt(subject.level0)})

    (function(){return chk(subject.level0,'level1')})
    (null,function(){return st(subject.level0,'level1')})
    (function(){return wrt(subject.level0.level1)})

    (function(){return chk(subject.level0.level1,'level2')})
    (null,function(){return st(subject.level0.level1,'level2')})
    (function(){return wrt(subject.level0.level1.level2)})

    (function(){return mkdv(subject)})
    (function(){return mn(subject)})
    (function(){return rslt(subject)})
    .end()

}(this);
