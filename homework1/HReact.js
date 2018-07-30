/**
 * HReact
 * function: 渲染 jsx 编译后的解构
 * 目前能渲染：第一层为复合组件，内部全部是原生组件
 * version: 1.0.0
 * time: 2018.7.27
 * designer: heyunjiang
 */

"use strict";

// const { createElement } = require('./dom')

/**
 * funciton: 封装复合组件，创建复合组件实例
 * 模拟 react.createClass
 */
const createCompositeComponent = (compositeComponent) => {
  const Constructor = function(component) {
    this.component = component
    // 省略掉 props 和 children
  }
  Constructor.prototype.render = function() {
  	return this.component()
  }

  return new Constructor(compositeComponent);
}

/**
 * funciton: 解析、渲染封装好的复合组件
 * 模拟 ReactCompositeComponent.mountComponent
 */
const renderCompositeComponent = (compositeComponent, container) => {
  renderNativeComponent(compositeComponent.render(), container)
}

/**
 * funciton: 渲染原生组件 由 HReact.createElement() 创建的原生对象数据结构
 * 模拟 ReactNativeComponent.mountComponent + ReactComponent._mountComponentIntoNode
 */
const renderNativeComponent = (nativeComponent, container) => {
  const markup = nativeComponent().mountComponent()
  // debugger

  let parent = container.parentNode;
  if (parent) {
  	var next = container.nextSibling;
  	parent.removeChild(container);
  	container.innerHTML = markup;
  	if (next) {
  		parent.insertBefore(container, next);
  	} else {
  		parent.appendChild(container);
  	}
  } else {
  	container.innerHTML = markup;
  }
}

/**
 * funtion: 渲染入口函数
 * @param {function} compositeComponent 复合组件
 * @param {node} container 待渲染的目标容器
 */
const renderComponent = (compositeComponent, container) => {
  renderCompositeComponent(createCompositeComponent(compositeComponent), container)
}

/**
 * funtion: 封装原生组件
 * 模拟 ReactDom.createDOMComponentClass
 */
const createDOMComponentClass = (type, props, children) => {
  const Constructor = function() {
  	this.type = type;
  	this.tag = type;
  	this.attributes = props;
  	this.children = children;
  };
  Constructor.prototype = {
  	mountComponent: function() {
  	  const ele = document.createElement(this.type);
  	  ele.innerHTML = this.children;
  	  return ele.outerHTML;
  	}
  }
  return function() {
    return new Constructor();
  }
}

const HReact = {
  renderComponent,
  createElement: createDOMComponentClass
}

module.exports = HReact;