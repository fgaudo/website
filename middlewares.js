var Url = require('url')
var slash = require('./libs/slash')
var testMatchingRoute = require('./libs/testMatchingRoute')

module.exports.disableQueryString =
    function (request, response, next)
    {
        var parsedUrl = Url.parse(request.url)

        if(parsedUrl.search === null)
            return next()

        response.redirect(parsedUrl.pathname)
    }

module.exports.redirectToLowercase =
    function(request, response, next)
    {        
        var method = request.method.toLowerCase();

        if (!(method === 'get' || method === 'head')) {
            next();
            return;
        }

        var parsedUrl = Url.parse(request.url)
        var lowerPathName = parsedUrl.pathname.toLowerCase()
        var upperCaseFound = /[A-Z]/g.test(parsedUrl.pathname)
        var match = testMatchingRoute(request.app._router.stack, method, lowerPathName)

        if(!upperCaseFound || !match) {
            return next()
        }
        
        var qs = parsedUrl.search || ''

        response.redirect(lowerPathName + qs)
    }

module.exports.slash = slash()
