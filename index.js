var merge = require('deepmerge');
var MenuItem = require('./lib/item');
var Menuine = function(initialItems, opts) {
  this.opts = {
    element: "ul",
    item: {
      element: "li"
    },
    direction: "right"
  };
  this.opts = merge(this.opts, opts || {});
  this.items = [];
  this.subMenus = [];

  this.element = document.createElement(this.opts.element);
  this.element.className = "Menuine menu";
  this.element.style.position = "absolute";
  this.setDirection(this.opts.direction);
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
Menuine.prototype.setDirection = function(direction) {
  this.opts.direction = direction;
  this.element.classList.remove("right");
  this.element.classList.remove("left");
  this.element.classList.remove("top");
  this.element.classList.remove("down");
  this.element.classList.add(direction);
  this.subMenus.forEach(function(menu) {
    menu.setDirection(direction);
  });
};
Menuine.prototype.render = function() {
  if(this.parent) {
    var parentRect = this.parent.element.getBoundingClientRect();
    var ourRect = this.element.getBoundingClientRect();
    if(this.opts.direction == "right") {
      this.element.style.left = parentRect.right;
    }
    if(this.opts.direction == "left") {
      this.element.style.left = parentRect.left - ourRect.width;
    }
    if(this.opts.direction == "up") {
      this.element.style.bottom = parentRect.top;
    }
    if(this.opts.direction == "down") {
      this.element.style.bottom = parentRect.bottom - ourRect.height;
    }
  }
  this.subMenus.forEach(function(menu) {
    menu.render();
  });
};
Menuine.prototype.show = function() {
  this.element.style.visibility = "visible";
  this.render();
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
