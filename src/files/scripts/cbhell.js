void function (){
    'use strict';

    var subject = Object.create(null), sum = 0, root = 0;

    function isInt(n) { return n % 1 === 0; }

    function check(object, level, cb){
        function task(){ cb(typeof object[level] !== 'undefined'); }
        setTimeout(task, Math.random()*3000);
    }

    function set(object, level, cb){
        function task(){ object[level] = Object.create(null); cb(); }
        setTimeout(task, Math.random()*3000);
    }

    function write(object, cb){
        function task(){
            cb(object.value = Math.floor(Math.random() * 1000) + 1);
        }
        setTimeout(task, Math.random()*3000);
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

    function makeDivisble(object, cb){
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
        setTimeout(task, Math.random()*3000);
    }

    function mean(object, cb){
        function task(){
            var levels = findLevels(object),
                mean = levels.reduce(
                    function(a, b){ return (a.value || a) + b.value; },
                    0
                ) / levels.length;


            levels.forEach(function(obj){
                var val = obj.value;
                obj.value = val*(mean/levels.length);
            });
            cb();
        }
        setTimeout(task, Math.random()*3000);
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

    check(subject, 'level0', function(exists){
        if ( ! exists ) {
            set(subject, 'level0', function(){
                write(subject.level0, function(){
                    check(subject.level0, 'level1', function(exists){
                        if ( ! exists ) {
                            set(subject.level0, 'level1', function(){
                                write(subject.level0.level1, function(){
                                    check(subject.level0.level1, 'level2',
                                        function(exists){
                                            if ( ! exists ) {
                                                set(subject.level0.level1,
                                                    'level2',
                                                    function(){
                                                        write(subject.level0.level1.level2,
                                                            function(){
                                                                makeDivisble(subject,
                                                                    function(){
                                                                        mean(subject,
                                                                            function(){
                                                                                result(subject);
                                                                            }
                                                                        );
                                                                    }
                                                                );
                                                            }
                                                        );
                                                    }
                                                );
                                            } else {
                                                write(subject.level0.level1.level2,
                                                    function(){
                                                        makeDivisble(subject,
                                                            function(){
                                                                mean(subject,
                                                                    function(){
                                                                        result(subject);
                                                                    }
                                                                );
                                                            }
                                                        );
                                                    }
                                                );
                                            }
                                        }
                                    );
                                });
                            });
                        } else {
                            write(subject.level0.level1, function(){
                                check(subject.level0.level1, 'level2',
                                    function(exists){
                                        if ( ! exists ) {
                                            set(subject.level0.level1,
                                                'level2',
                                                function(){
                                                    write(subject.level0.level1.level2,
                                                        function(){
                                                            makeDivisble(subject,
                                                                function(){
                                                                    mean(subject,
                                                                        function(){
                                                                            result(subject);
                                                                        }
                                                                    );
                                                                }
                                                            );
                                                        }
                                                    );
                                                }
                                            );
                                        } else {
                                            write(subject.level0.level1.level2,
                                                function(){
                                                    makeDivisble(subject,
                                                        function(){
                                                            mean(subject,
                                                                function(){
                                                                    result(subject);
                                                                }
                                                            );
                                                        }
                                                    );
                                                }
                                            );
                                        }
                                    }
                                );
                            });
                        }
                    });
                });
            });
        } else {
            write(subject.level0, function(){
                check(subject.level0, 'level1', function(exists){
                    if ( ! exists ) {
                        set(subject.level0, 'level1', function(){
                            write(subject.level0.level1, function(){
                                check(subject.level0.level1, 'level2',
                                    function(exists){
                                        if ( ! exists ) {
                                            set(subject.level0.level1,
                                                'level2',
                                                function(){
                                                    write(subject.level0.level1.level2,
                                                        function(){
                                                            makeDivisble(subject,
                                                                function(){
                                                                    mean(subject,
                                                                        function(){
                                                                            result(subject);
                                                                        }
                                                                    );
                                                                }
                                                            );
                                                        }
                                                    );
                                                }
                                            );
                                        } else {
                                            write(subject.level0.level1.level2,
                                                function(){
                                                    makeDivisble(subject,
                                                        function(){
                                                            mean(subject,
                                                                function(){
                                                                    result(subject);
                                                                }
                                                            );
                                                        }
                                                    );
                                                }
                                            );
                                        }
                                    }
                                );
                            });
                        });
                    } else {
                        write(subject.level0.level1, function(){
                            check(subject.level0.level1, 'level2',
                                function(exists){
                                    if ( ! exists ) {
                                        set(subject.level0.level1,
                                            'level2',
                                            function(){
                                                write(subject.level0.level1.level2,
                                                    function(){
                                                        makeDivisble(subject,
                                                            function(){
                                                                mean(subject,
                                                                    function(){
                                                                        result(subject);
                                                                    }
                                                                );
                                                            }
                                                        );
                                                    }
                                                );
                                            }
                                        );
                                    } else {
                                        write(subject.level0.level1.level2,
                                            function(){
                                                makeDivisble(subject,
                                                    function(){
                                                        mean(subject,
                                                            function(){
                                                                result(subject);
                                                            }
                                                        );
                                                    }
                                                );
                                            }
                                        );
                                    }
                                }
                            );
                        });
                    }
                });
            });
        }
    });

}();
