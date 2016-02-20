export default function Events(target){
  target.prototype._events = target._events || [];

  target.prototype.bindEvents = function(events){
    events = events || target.events || [];
    for (let event in events) {
      this.on(event, events[event]);
    }
  };

  target.prototype.on = function(name, fn){
    if(!this._events) this._events = {};
    this._events[name] = this._events[name] || [];
    this._events[name].push(fn);
  };

  target.prototype.trigger = function(name, args){
    this._events[name] = this._events[name] || [];
    args = args || [];
    this._events[name].forEach((fn) => {
      setTimeout(() =>{
        fn(...args);
      }, 0);
    });
  };

};
