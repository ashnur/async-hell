void function (){
    'use strict';

    var a = 0, b = 0, c = 0, res = 0, goal = 210, part = goal/3;

    function A(cb){ setTimeout(cb, Math.random()*3000, Math.random()*100); }

    function B(cb){ setTimeout(cb, Math.random()*3000, Math.random()*100); }

    function C(cb){ setTimeout(cb, Math.random()*3000, Math.random()*100); }

    function D(v,cb){
        setTimeout(cb, Math.random()*3000, (Math.random()-1) * v + part);
    }

    A(function(v){ a = v; if( a < part; ){ D(v, function(v){ a += v; });};});

    A(function(v){ b = v; if( b < part; ){ D(v, function(v){ b += v; });};});

    A(function(v){ c = v; if( c < part; ){ D(v, function(v){ c += v; });};});

    if ( (res = a + b + c) > goal ) {
        console.log('success', res);
    } else {
        console.error('fail', res);
    }

}();
