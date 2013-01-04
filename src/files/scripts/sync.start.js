void function (){
    'use strict';

    var a = 0, b = 0, c = 0, res = 0, goal = 210, part = goal/3;

    function A(){ return Math.random()*100; }

    function B(){ return Math.random()*100; }

    function C(){ return Math.random()*100; }

    function D(v){ return Math.random() * v + part - v; }

    if ( (a = A()) < part ) { a += D(a); }

    if ( (b = B()) < part ) { b += D(b); }

    if ( (c = C()) < part ) { c += D(c); }

    if ( (res = a + b + c) > goal ) {
        console.log('success', res);
    } else {
        console.error('fail', res);
    }

}();
