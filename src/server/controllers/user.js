const Joi = require('joi');
const Boom = require('boom');
import {CrudController} from './crud';
import * as Models from '../models';
const User = new Models.User;

class UserController extends CrudController{
	rectOnAction(request, reply) {
		reply(request);
	};
};

export {
	UserController
};