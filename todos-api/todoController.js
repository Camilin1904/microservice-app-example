'use strict';
const cache = require('memory-cache');
const {Annotation, 
    jsonEncoder: {JSON_V2}} = require('zipkin');

const OPERATION_CREATE = 'CREATE',
      OPERATION_DELETE = 'DELETE';

class TodoController {
    constructor({tracer, redisClient, logChannel}) {
        this._tracer = tracer;
        this._redisClient = redisClient;
        this._logChannel = logChannel;
    }

    // TODO: these methods are not concurrent-safe
    list (req, res) {
        const data = this._getTodoData(req.user.username)

        res.json(data.items)
    }

    create (req, res) {
        // TODO: must be transactional and protected for concurrent access, but
        // the purpose of the whole example app it's enough
        const data = this._getTodoData(req.user.username)
        const todo = {
            content: req.body.content,
            id: data.lastInsertedID
        }
        data.items[data.lastInsertedID] = todo

        data.lastInsertedID++
        
        console.log('todo', todo)
        this._setTodoData(req.user.username, data)

        this._logOperation(OPERATION_CREATE, req.user.username, todo.id)

        res.json(todo)
    }

    delete (req, res) {
        const data = this._getTodoData(req.user.username)
        const id = req.params.taskId
        delete data.items[id]
        this._setTodoData(req.user.username, data)

        this._logOperation(OPERATION_DELETE, req.user.username, id)

        res.status(204)
        res.send()
    }

    _logOperation (opName, username, todoId) {

        console.log('log operation', opName, username, todoId)

        /*
        this._tracer.scoped(() => {
            const traceId = this._tracer.id;
            this._redisClient.publish(this._logChannel, JSON.stringify({
                zipkinSpan: traceId,
                opName: opName,
                username: username,
                todoId: todoId,
            }))
        })*/

        const attemptPublish = (retriesLeft = 3) => {
            console.log('attemptPublish', retriesLeft)
            const traceId = this._tracer.id;
            this._redisClient.publish(this._logChannel,  JSON.stringify({
                                                                        zipkinSpan: traceId,
                                                                        opName: opName,
                                                                        username: username,
                                                                        todoId: todoId,
                    }), (err, reply) => {
                console.log('publish callback', err, reply)
                if (err) {
                    if (retriesLeft > 0) {
                        console.warn(`Redis publish failed. Retrying... (${3 - retriesLeft + 1})`);
                        setTimeout(() => attemptPublish(retriesLeft - 1), 500); 
                    }else {
                        console.error('Failed to publish message after retries', err)
                    }
                } else {
                    console.log('Message published successfully', reply)
                }
            });
        };

        attemptPublish(); 
    }

    _getTodoData (userID) {
        var data = cache.get(userID)
        if (data == null) {
            data = {
                items: {
                    '1': {
                        id: 1,
                        content: "Create new todo",
                    },
                    '2': {
                        id: 2,
                        content: "Update me",
                    },
                    '3': {
                        id: 3,
                        content: "Delete example ones",
                    }
                },
                lastInsertedID: 3
            }

            this._setTodoData(userID, data)
        }
        return data
    }

    _setTodoData (userID, data) {
        cache.put(userID, data)
    }
}

module.exports = TodoController