void function(root){
    var bonzo = require('bonzo')
        , qwery = require('qwery')
        , bean = require('bean')
        , navigation = bonzo(bonzo.create('<ul>'))
        , $ = function(){ return bonzo(qwery.apply(null, arguments)); }
        , pages = $('#pages div.page')
        , container = $('#pages')
        ;

    navigation.addClass('navigation').addClass('cf')

    function createLi(text, link){
        var li =  bonzo(bonzo.create('<li>')).text(text)
            ;

        bean.on(li[0], 'click', function(el){
            pages.hide()
            bonzo(link).show()
        })
        return li
    }

    function createConsole(script, dependency ){
        var run =  bonzo(bonzo.create('<button>')).text('run')
            , konsole = bonzo(bonzo.create('<div class="console"><div class="content"></div></div>'))
            , konscont = $('.content',konsole)
            , realm = function(){}
            ;

        realm.evaluate = function(source, showLoading){
            var console = {log:function(){konscont.text(log(arguments))}}
                ;
            console.log('running...')
            eval(source)
        }



        bean.on(run[0], 'click', function(el){
            if ( dependency ) {
                realm.evaluate(dependency+';\n'+script)
            }else{
                realm.evaluate(script)
            }
        })

        konsole.append(run)

        return konsole
    }

    pages.hide().first().show()

    pages.each(function(el, idx){
        navigation.append(createLi($('h4',el).text(), el))
    })

    function movements(element, count){
        var index = element.data('order')
            , next = $('div.page[data-order='+(index<count?index+1:0)+']')
            , prev = $('div.page[data-order='+(index<0?index-1:count-1)+']')
            , nb = bonzo(bonzo.create('<button>')).text('Next').addClass('next')
            , pb = bonzo(bonzo.create('<button>')).text('Previous').addClass('previous')
            ;
        bean.on(nb[0], 'click', function(){
            pages.hide()
            next.show()
            window.scroll(0,0)
        })
        bean.on(pb[0], 'click', function(){
            pages.hide()
            prev.show()
            window.scroll(0,0)
        })
        element.append(nb)
        element.append(pb)
    }

    pages.each(function(el, idx){
        var filename, dependency, dependencySource, element = bonzo(el);


        function addConsole(withDependency){
            if ( filename = element.data('jssource') ) {
                reqwest({
                    url: './scripts/'+filename
                    , type: 'string'
                    , method: 'get'
                })
                .then(function (resp) {
                    element.append(createConsole(resp.response, withDependency))
                }).then(function (resp) {
                    movements(element, pages.length)
                })
            }
        }

        if ( dependencySource = element.data('jsdependency') ) {
            reqwest({
                url: './scripts/'+dependencySource
                , type: 'string'
                , method: 'get'
            }).then(function (resp) {
                console.log('loaded '+dependencySource)
                addConsole(resp.response)
            })
        } else {
            addConsole()
        }
    })

    container.prepend(navigation)


}(this)
