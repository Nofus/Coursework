import { AbstractComponent } from "./view/abstract-component.js";

const RenderPosition = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};

function createElement(template) {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;
  return newElement.firstElementChild;
}

function render(component, container, place = RenderPosition.BEFOREEND) {
  if (!(component instanceof AbstractComponent)) {
    throw new Error('Можно рендерить только компоненты');
  }
  if (container === null) {
    throw new Error('Элемент-контейнер не существует');
  }
  container.insertAdjacentElement(place, component.element);
}

export {RenderPosition, createElement, render};