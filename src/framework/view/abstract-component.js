import { createElement } from "../render.js";

export class AbstractComponent {
   #element = null;
   
   constructor() {
       if (new.target === AbstractComponent) {
         throw new Error('Нельзя создавать экземпляр AbstractComponent');
       }
   }

   get element() {
     if (!this.#element) {
       this.#element = createElement(this.template);
       this.afterElementCreate?.();
     }
     return this.#element;
   }
   
   get template() {
     throw new Error('Абстрактный метод не реализован: get template');
   }

   removeElement() {
     this.#element = null;
   }
}