void function (){
    'use strict';

    var subject = Object.create(null), sum = 0, root = 0;

    function isInt(n) { return n % 1 === 0; }

    function check(object, level){
        return typeof object[level] !== 'undefined';
    }

    function set(object, level){ return object[level] = Object.create(null) ; }

    function write(object){ object.value = Math.floor(Math.random() * 98) + 1; }

    function findLevels(object){
        var levels = [];
        (function fl(obj, levelIndex){
            var currentLevel=obj['level'+levelIndex];
            if ( currentLevel != null ) {
                levels[levelIndex] = currentLevel ;
                fl(currentLevel, levelIndex+1);
            }
        }(object, 0));
        return levels;
    }

    function makeDivisble(object){
        var levels = findLevels(object);
        levels.forEach(
            function(obj){
                var diff;
                if ( diff = obj.value % levels.length ) {
                    obj.value -= diff;
                }
            }
        );
    }

    function mean(object){
        var levels = findLevels(object),
            mean = levels.reduce(
                function(a, b){ return (a.value || a) + b.value; },
                0
            ) / levels.length;


        levels.forEach(function(obj){
            var val = obj.value;
            obj.value = val*(mean/levels.length);
        });
    }

    if ( ! check(subject, 'level0') ) set(subject, 'level0');
    write(subject.level0);

    if ( ! check(subject.level0, 'level1') ) set(subject.level0, 'level1');
    write(subject.level0.level1);

    if ( ! check(subject.level0.level1, 'level2') ) {
        set(subject.level0.level1, 'level2');
    }
    write(subject.level0.level1.level2);

    if ( ! check(subject.level0.level1.level2, 'level3') ) {
        set(subject.level0.level1.level2, 'level3');
    }
    write(subject.level0.level1.level2.level3);

    makeDivisble(subject);

    mean(subject);

    sum = findLevels(subject).reduce(
            function(a, b){ return (a.value || a) + b.value; }, 0);

    if ( isInt(root = Math.sqrt(sum)) ) {
        console.log('success', JSON.stringify(subject), sum, root);
    } else {
        console.error('failure',JSON.stringify(subject), sum, root);
    }

}();
