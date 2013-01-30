void function (global){
    'use strict';

console.log(async);
    var subject = Object.create(null), sum = 0, root = 0, levelcount = 3,
        maxCallbackTime = 1000, async = global.async || require('async');

    function isInt(n) { return n % 1 === 0; }

    function check(object, level, cb){
        function task(){ cb(typeof object[level] !== 'undefined'); }
        setTimeout(task, Math.random()*maxCallbackTime);
    }

    function set(object, level, cb){
        function task(){ object[level] = Object.create(null); cb(); }
        setTimeout(task, Math.random()*maxCallbackTime);
    }

    function write(object, cb){
        function task(){
            object.value = Math.floor(Math.random() * 1000) + 1;
            cb();
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

    function result(object){
        sum = findLevels(object).reduce(
                function(a, b){ return (a.value || a) + b.value; }, 0);

        if ( isInt(root = Math.sqrt(sum)) ) {
            console.log('success', JSON.stringify(object), sum, root);
        } else {
            console.error('failure',JSON.stringify(object), sum, root);
        }
    }

    function createWriter(obj, level, cb){ return function(){
        write(obj[level], cb);
    }; }

    async.auto({
        build_levels: function(cb){
            var i, tasks=[];
            for ( i = 0; i < levelcount; i++ ) {
                tasks[i] = function(i){
                    return function(object, callback){
                        var currentLevel = 'level'+i;
                        if ( callback == null ) {
                            callback = object;
                            object = subject;
                        }
                        check(object, currentLevel, function(exists){
                            if ( ! exists ) {
                                set(object, currentLevel, createWriter(
                                        object,
                                        currentLevel,
                                        function(){
                                            callback(null, object[currentLevel]);
                                        }
                                    )
                                );
                            } else {
                                write(object[currentLevel],
                                    function(){
                                        callback(null, object[currentLevel]);
                                    }
                                );
                            }
                        });
                    };
                }(i);
            }
            async.waterfall(tasks, cb);
        },
        makeDivisible : ['build_levels', function(cb){
            makeDivisible(subject, cb);
        }],
        mean : ['makeDivisible', function(cb){
            mean(subject, cb);
        }],
        result : ['mean', function(){
            result(subject);
        }]
    });
}(this);
