
import { Component, ViewContainerRef, ComponentMetadata, NgModule, Compiler } from '@angular/core'
import * as _ from 'lodash';
import { CommonModule }      from '@angular/common';
import { FormsModule, ReactiveFormsModule }      from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { PricePipe } from './PricePipe';
import { DisplayPipe } from './DisplayPipe';


export function createModule(component, imports=[]) {
  @NgModule({
    declarations: [component],
    imports: [ BrowserModule, FormsModule, HttpModule, CommonModule, ReactiveFormsModule ].concat(imports)
  })
  class DynamicModule {}
  return DynamicModule;
}

export function createComponent(metadata, comp:any={}, imports=[]) {
  class DynamicComponent {
    static imports = imports;
  }
  DynamicComponent.prototype = comp;
  return Component(new ComponentMetadata(metadata))(DynamicComponent);
}

export function loadComponent(component, viewContainer: ViewContainerRef, compiler: Compiler, injector = null, cb=null) {
  if (!injector) {
    injector = viewContainer.parentInjector;
  }
  viewContainer.clear();

  var mod = createModule(component, component.imports);

  compiler.compileModuleAndAllComponentsAsync(mod).then((mod) => {
    let factory = _.find(mod.componentFactories, { componentType: component });
    var res = viewContainer.createComponent(factory, 0, injector);
    if (cb) cb(res);
  });
}
