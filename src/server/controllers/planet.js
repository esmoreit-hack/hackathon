const Joi = require('joi');
const Boom = require('boom');
import {CrudController} from './crud';
import * as Models from '../models';
const Empire = new Models.Planet;

class PlanetController extends CrudController{
	foo(request, reply) {
		Empire.foo();
		reply('foo');
	};
};

export {
	PlanetController
};