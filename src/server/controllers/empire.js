const Joi = require('joi');
const Boom = require('boom');
import {CrudController} from './crud';

class EmpireController extends CrudController{
	foo(request, reply) {
		reply('foo');
	};
};

export {
	EmpireController
};