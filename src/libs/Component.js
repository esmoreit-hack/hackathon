import { createStore } from 'redux';
import { patch } from 'incremental-dom';
import $ from 'zepto-modules/zepto';
import Events from './decorators/Events';

require('zepto-modules/event');

@Events
class Component {

  constructor(template, model, el, partial){
    model = model || {};

    if(el) this.setEl(el);
    this.setStore(model);
    this.setTemplate(template);

    this.$ui = false;
    this.bindEvents({
      // Bind events before render
      // @todo: cleanup events;
      'before:render': () => {
        this.$ui = {};
      },
      // Bind ui and triggers after render
      'after:render': () => {
        this.bindUi(this.ui);
        this.bindEvents(this.events);
        this.events = {};
        this.bindTriggers(this.triggers);
        this.triggers = {};
      }
    });
  }

  bindUi(ui){
    for(let el in ui){
      ui[el] = $(this.el).find(ui[el]);
    }
    this.$ui = ui;
  }

  bindTriggers(triggers){
    var self = this;
    for(let k in triggers){
      let $el = false;
      let tokens = k.split(' ');
      let action = tokens[0];
      // There is no elemente
      if(!(tokens.length > 1)){
        $el = this.el;
      }else{
        let _el = tokens[1];
        if(_el.indexOf('@ui.') > -1 ){
          $el = this.$ui[_el.replace('@ui.', '')];
        }else{
          $el = $(this.el).find(el);
        }
      }
      if(!$el) continue;
      $el.on(action, (e) => {
        this.trigger(triggers[k], [e]);
      });
    }
  }

  setTemplate( template ){
    template = (typeof template === 'function') ? template : false;
    this.template = template || (this.template || false);
    if(!this.template) throw new Error('You need a template function for your component');
  }

  setStore(model){
    // Create store
    model = model || {};
    if( (typeof model.getState === 'undefined') ){
      this.store = createStore( (obj = {}, action) => {
        let _model = Object.assign(obj, action);
        return _model;
      });
      this.store.dispatch(Object.assign(model, {type: 'INIT'}));
    }else{
      this.store = model;
    }

    this.store.subscribe(() => {
      this.render();
    });
  }

  setEl(el){
    if(typeof el === 'string') el = $(el);
    this.el = el;
  }

  render(el, cb){
    if(!this.el && !el) return false;
    this.trigger('before:render');
    // try{
      patch(el || this.el, () =>{
        this.trigger('render');
        let result = this.template(this, this.store.getState(), (this.partials || false));

        if( cb ) cb(result);
        this.trigger('after:render');
        return result;
      });

    // }catch(e){
    //   console.log(e);
    // }
  }

}

export {
  Component
};
