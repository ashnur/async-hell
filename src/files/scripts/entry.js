void function(root){
    var realm = continuum.createRealm()
        , bonzo = require('bonzo')
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

    function createConsole(script){
        var run =  bonzo(bonzo.create('<button>')).text('run')
            , console = bonzo(bonzo.create('<div>')).addClass('console')
            ;

        bean.on(run, 'click', function(el){
            realm.on('throw', function(err){ console.text(err) });
            realm.on('inspect', function(obj){ console.text(obj) });
            realm.evaluate(script)
        })

        console.append(run)

        return console
    }

    pages.hide().first().show()

    pages.each(function(el, idx){
        navigation.append(createLi($('h4',el).text(), el))
    })

    container.prepend(navigation)


}()
