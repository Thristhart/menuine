var merge = require('deepmerge');
var EventEmitter = require('events').EventEmitter;
var util = require('util');

var MenuItem = function(item, opts) {
  this.opts = {
    element: "li"
  };
  this.opts = merge(this.opts, opts);

  this.element = document.createElement(this.opts.element);
  this.element.innerHTML = item.text;
  this.element.className = "Menuine item";
  this.element.addEventListener("click", function(event) {
    this.emit("click", event);
  }.bind(this));
  this.element.addEventListener("mousemove", function(event) {
    this.emit("mousemove", event);
  }.bind(this));
  this.element.addEventListener("mouseenter", function(event) {
    this.emit("mouseenter", event);
  }.bind(this));
};

util.inherits(MenuItem, EventEmitter);


module.exports = MenuItem;
