'use strict';
import * as Models from './models';
import {CrudController} from './controllers/crud';
import {EmpireController} from './controllers/empire';

const User = new CrudController(Models.User);
const Instance = new CrudController(Models.Instance);
const Empire = new EmpireController(Models.Empire);

exports.endpoints = [
	// User
  	{ method : 'POST', path : '/users', handler : (req, rep) => { User.create(req, rep); } },
  	{ method : 'GET', path : '/users', handler : (req, rep) => { User.getAll(req, rep); } },
  	{ method : 'GET', path : '/users/{_id}', handler : (req, rep) => { User.getOne(req, rep); } },
  	{ method : 'PUT', path : '/users/{_id}', handler : (req, rep) => { User.update(req, rep); } },
    { method : 'DELETE', path : '/users/{_id}', handler : (req, rep) => { User.remove(req, rep); } },

  	// Empire
  	{ method : 'GET' , path : '/empires/{_id}', handler : (req, rep) => { Empire.getOne(req, rep); } },

    // Instance (not really a good idea, just here for testing purpose)
    { method : 'POST', path : '/instances', handler : (req, rep) => { Instance.create(req, rep); } },

  	// Test custom controller
  	{ method : 'GET' , path : '/gigio', handler : (req, rep) => { Empire.foo(req, rep); } }
 ];