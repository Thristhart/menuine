var merge = require('deepmerge');
var MenuItem = require('./lib/item');
var Menuine = function(initialItems, opts) {
  this.opts = {
    element: "ul",
    item: {
      element: "li"
    }
  };
  this.opts = merge(this.opts, opts || {});
  this.items = [];
  this.subMenus = [];

  this.element = document.createElement(this.opts.element);
  this.element.className = "Menuine menu";
  this.element.style.position = "absolute";
  this.hide();
}

Menuine.prototype.addItem = function(item) {
  var itemObject = new MenuItem(item, this.opts.item);
  this.items.push(itemObject);
  this.element.appendChild(itemObject.element);
  return itemObject;
};
Menuine.prototype.addSubmenu = function(item, menu) {
  var itemObject = this.addItem(item);
  itemObject.submenu = menu;
  itemObject.element.className += " has_submenu";
  menu.parent = this;
  this.subMenus.push(menu);
  if(this.element.parentNode) {
    this.element.parentNode.appendChild(menu.element);
  }
  itemObject.on('click', function() {
    menu.toggle();
  });
  itemObject.on('mouseenter', function() {
    this.subMenus.forEach(function(menu) {
      menu.hide();
    });
    menu.show();
  }.bind(this));
};
Menuine.prototype.show = function() {
  this.element.style.visibility = "visible";
  if(this.parent) {
    var parentRect = this.parent.element.getBoundingClientRect();
    this.element.style.left = parentRect.right;
  }
};
Menuine.prototype.hide = function() {
  this.element.style.visibility = "hidden";
  this.subMenus.forEach(function(menu) {
    menu.hide();
  });
};
Menuine.prototype.isVisible = function() {
  return this.element.style.visibility === "visible";
};
Menuine.prototype.toggle = function() {
  if(this.isVisible()) {
    this.hide();
  }
  else {
    this.show();
  }
};

module.exports = Menuine;
