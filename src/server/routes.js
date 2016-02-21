'use strict';
import * as Models from './models';
import {CrudController} from './controllers/crud';
import {EmpireController} from './controllers/empire';
import {PlanetController} from './controllers/planet';
import {UserController} from './controllers/user';

const User = new UserController(Models.User);
const Instance = new CrudController(Models.Instance);
const Empire = new EmpireController(Models.Empire);
const Planet = new PlanetController(Models.Planet);

exports.endpoints = [
  	// User
  	{ method : 'POST', path : '/users', handler : (req, rep) => { User.create(req, rep); } },
  	{ method : 'GET', path : '/users', handler : (req, rep) => { User.getAll(req, rep); } },
  	{ method : 'GET', path : '/users/{_id}', handler : (req, rep) => { User.getOne(req, rep); } },
  	{ method : 'PUT', path : '/users/{_id}', handler : (req, rep) => { User.update(req, rep); } },
    { method : 'DELETE', path : '/users/{_id}', handler : (req, rep) => { User.remove(req, rep); } },
    { method : 'POST', path : '/users/register/:action', handler : (req, rep) => { User.rectOnAction(req, rep); } },

    // Planets
    { method : 'GET', path : '/planets', handler : (req, rep) => { Planet.getAll(req, rep); } },

  	// Empire
  	{ method : 'GET' , path : '/empires/{_id}', handler : (req, rep) => { Empire.getOne(req, rep); } },

    // Instance (not really a good idea, just here for testing purpose)
    { method : 'POST', path : '/instances', handler : (req, rep) => { Instance.create(req, rep); } },

  	// Test custom controller
  	{ method : 'GET' , path : '/gigio', handler : (req, rep) => { Empire.foo(req, rep); } }
  ];