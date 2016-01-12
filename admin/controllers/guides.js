'use strict'

var parseUrl = require('url').parse

var db = require(__APP + 'database') 

module.exports.showAll =
    function (request, response)
    {
        var sql = 'SELECT * FROM guides'
        db.all(sql, [],
            function (err, rows)
            {
                if(err)
                    throw err
            
                response.render('guides/index', {'guides': rows})
            }
        )
    }

module.exports.show =
    function (request, response, next)
    {
        var sql = 'SELECT * FROM guides WHERE id = ?'
        db.get(sql, [request.params.id],
            function (err, row)
            {
                if(err)
                    throw err

                response.render('guides/show', {'guide': row})
            }
        )
    }


module.exports.add =
    function (request, response, next)
    {
        var sql = "INSERT INTO guides(title, body, created, modified) values (?, ?, date('now'), NULL)"
        db.run(sql, [request.body.title, request.body.body],
            function(err)
            {
                if(err)
                    return response.status(500).end()

                return response.status(201).end()
            }       
        )

    }

module.exports.addView =
    function (request, response, next)
    {
        response.render('guides/addView')
    }

module.exports.update =
    function (request, response, next)
    {
        var sql = "UPDATE guides SET title=?, body=?, modified=date('now') WHERE id=?"
        db.run(sql, [request.body.title, request.body.body, request.params.id],
            function(err)
            {
                if(err)
                    return response.status(500).end()

                return response.status(204).end()
            }       
        )

    }

module.exports.delete =
    function (request, response, next)
    {
        var sql = "DELETE FROM guides WHERE id=?"
        db.run(sql, [request.params.id],
            function(err)
            {
                if(err)
                    return response.status(500).end()

                return response.status(204).end()
            }       
        )
    }
