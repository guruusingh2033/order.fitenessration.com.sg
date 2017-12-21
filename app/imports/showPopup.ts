import { ReflectiveInjector, Compiler } from '@angular/core';
import * as _ from 'lodash';
declare var $:JQueryStatic;

import { createModule } from './components';

export interface ShowPopupOptions {
	init?:any;
	initComponent?:Function;
	close?:Function;
	title?:boolean;
	providers?:Array<any>;
	fullscreen?:boolean;

	mod?:any;
	compiler?: Compiler;
}

export function showPopup(viewContainer, component, opts:ShowPopupOptions={}, type:string = 'basic-popup-with-title') {
	function show() {
		var injector;
		if (opts.providers) {
			injector = ReflectiveInjector.resolveAndCreate(opts.providers, viewContainer.injector);
		}

	  var res:any = viewContainer.createComponent(factory, 0, injector);

		if (res.instance.init) res.instance.init(opts.init);
		if (opts.initComponent) opts.initComponent(res.instance);

		var wrapperEl = $(`
			<div class="popup-wrapper">
				<div class="popup">
					<span class="popup__title">${res.instance.title || component.title}</span>
					<a href="#" class="popup__close">Close</a>
					<div class="popup__content">
					</div>
				</div>
			</div>`).appendTo('body');
		if (opts.title === false) {
			wrapperEl.find('.popup__title').remove();
		}
		if (opts.fullscreen) {
			wrapperEl.addClass('fullscreen');
		}
		var popupEl = wrapperEl.children('.popup');
		wrapperEl.addClass(type);
		wrapperEl.find('.popup__content').append(res._hostElement.nativeElement);
		var close = () => {
			viewContainer.clear();
			wrapperEl.remove();
			if (opts.close) opts.close(res.instance);
			$(window).unbind('resize', updatePosition);
		};
		wrapperEl.find('.popup__close').click(() => {
			close();
			return false;
		});
		function updatePosition() {
			popupEl.css({left: Math.max(0, $(window).width()/2 - popupEl.width()/2), top: Math.max(0, $(window).height()/2 - popupEl.height()/2)});
		}
		$(window).resize(updatePosition);
		updatePosition();
		popupEl.css('visibility', 'hidden');
		setTimeout(() => {
			updatePosition();
			popupEl.css('visibility', '');
		}, 0);
		res.instance.close = close;
		res.instance.updateTitle = () => {
			wrapperEl.find('.popup__title').html(res.instance.title || component.title);
		};
	}

	var mod = opts.mod;

  let factory:any = _.find(mod.componentFactories, { componentType: component });
  if (factory) {
  	show();
  }
  else {

		opts.compiler.compileModuleAndAllComponentsAsync(createModule(component)).then((mod) => {
		  factory = _.find(mod.componentFactories, { componentType: component });
			show();
		});
  }
}
