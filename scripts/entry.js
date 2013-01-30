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

        realm.evaluate = function(source){
            var console = {log:function(){konscont.text(log(arguments))}}
                ;
            console.log('running...')
            eval(source)
        }


        if ( dependency ) { realm.evaluate(dependency) }

        bean.on(run[0], 'click', function(el){
            realm.evaluate(script)
        })

        konsole.append(run)

        return konsole
    }

    pages.hide().first().show()

    pages.each(function(el, idx){
        navigation.append(createLi($('h4',el).text(), el))
    })

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


}()
