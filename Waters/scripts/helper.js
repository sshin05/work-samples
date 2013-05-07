;

if(window.opera){
  Array.prototype.concat = function(){
    var array = [];
    for(var i = 0, length = this.length; i < length; i++) array.push(this[i]);
    for(var i = 0, length = arguments.length; i < length; i++) {
      if(arguments[i].constructor == Array) {
        for(var j = 0, arrayLength = arguments[i].length; j < arrayLength; j++)
          array.push(arguments[i][j]);
      } else {
        array.push(arguments[i]);
      }
    }
    return array;
  }
}

if (typeof(Object.extend) != "function") {
	Object.extend = function(destination, source) {
	  for (var property in source) {
		destination[property] = source[property];
	  }
	  return destination;
	}
}

if (typeof(Function.prototype.bind) != "function")
{
	Function.prototype.bind = function(object) {
	  var func = this;
	  return function() { return func.apply(object, arguments); }
	}
}

Function.prototype.bindAsEventListener = function(object) {
	var __method = this;
	return function(event) {
		__method.call(object, event || window.event);
	}
}

var Class = {
  create: function() {
    return function() {
      this.initialize.apply(this, arguments);
    }
  }
}

function getElementsByClassName(node, classname)
{
    var a = [];
    var re = new RegExp('\\b' + classname + '\\b');
    var els = node.getElementsByTagName("*");
    for(var i=0,j=els.length; i<j; i++)
        if(re.test(els[i].className))a.push(els[i]);
    return a;
}

function removeAllChildren(node) {
	
	var childNodes = node.childNodes;
	if (node.childNodes.length == 0)
		return;
	
	for (var i = 0; i < childNodes.length ; i++ )
	{
		var childNode = childNodes[i];
		if (typeof(childNode) == "object")
			node.removeChild(childNode);
	}
}

