import * as Models from './models';
import {CrudController} from './controllers/crud';
import {EmpireController} from './controllers/empire';

const User = new CrudController(Models.User);
const Empire = new EmpireController(Models.Empire);

exports.endpoints = [
	// User
  	//{ method : 'POST', path : '/user', config : UserController.create },
  	{ method : 'GET', path : '/users', handler : (req, rep) => { User.getAll(req, rep); } },
  	{ method : 'GET', path : '/users/{_id}', handler : (req, rep) => { User.getOne(req, rep); } },
  	{ method : 'PUT', path : '/users/{_id}', handler : (req, rep) => { User.update(req, rep); } },
  	{ method : 'DELETE', path : '/users/{_id}', handler : (req, rep) => { User.remove(req, rep); } },

  	// Empire
  	{ method : 'GET' , path : '/empires/{_id}', handler : (req, rep) => { Empire.getOne(req, rep); } },

  	// Test custom controller
  	{ method : 'GET' , path : '/gigio', handler : (req, rep) => { Empire.foo(req, rep); } }
 ];