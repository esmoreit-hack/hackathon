const Joi = require('joi');
const Boom = require('boom');

class CrudController {
    constructor( model ){
        this.model = model;
    };

    getAll(request, reply){
        this.model.find({}, (err, user) => {
            if (!err) {
                reply(user);
            } else {
                reply(err); // 500 error
            }
        });
    };

    getOne(request, reply){
        this.model.findOne({
            '_id': request.params._id
        }, (err, user) => {
            if (!err) {
                reply(user);
            } else {
                reply(Boom.badImplementation(err)); // 500 error
            }
        });
    };

    create(request, reply){
        var model = new this.model(request.payload);
        model.save((err, response) => {
            if (!err) {
                reply(response).created('/'+response+'/' + response._id); // HTTP 201
            } else {
                if (11000 === err.code || 11001 === err.code) {
                    reply(Boom.forbidden("please provide another user id, it already exist"));
                } else reply(Boom.forbidden(err)); // HTTP 403
            }
        });

    };

    update(request, reply){
        this.model.findOne({
            '_id': request.params._id
        }, (err, user) => {
            if (!err) {
                //TODO Update fields
                user.save(function(err, user) {
                    if (!err) {
                        reply(user).updated('/user/' + user._id); // HTTP 201
                    } else {
                        if (11000 === err.code || 11001 === err.code) {
                            reply(Boom.forbidden("please provide another user id, it already exist"));
                        } else reply(Boom.forbidden(getErrorMessageFrom(err))); // HTTP 403
                    }
                });
            } else {
                reply(Boom.badImplementation(err)); // 500 error
            }
        });
    };

    remove(request, reply){
        console.log('cao');
        this.model.findOne({
            '_id': request.params._id
        }, (err, removed) => {
            if (!err && removed) {
                console.log(removed);
                removed.remove();
                reply({
                    message: this.model+" deleted successfully"
                });
            } else if (!err) {
                // Couldn't find the object.
                reply(Boom.notFound());
            } else {
                reply(Boom.badRequest("Could not delete "+this.model));
            }
        });
    }
};

export {
  CrudController
};