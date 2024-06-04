

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { BrowserModule } from '@angular/platform-browser'
import { Component, NgModule } from '@angular/core'
import { PlaygroundModule } from 'angular-playground'
import { LayoutModule } from '../src/app/layout/layout.module'
import { SharedModule } from '../src/app/shared/shared.module'
import { RouterTestingModule } from '@angular/router/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { SandboxesDefined } from './sandboxes'

PlaygroundModule.configure({
  selector: 'num-root',
  overlay: false,
  modules: [LayoutModule, SharedModule, RouterTestingModule, BrowserAnimationsModule],
  sandboxesDefined: SandboxesDefined,
})

@Component({
  selector: 'playground-app',
  template: '<playground-root></playground-root>',
})
export class AppComponent {}

@NgModule({
  imports: [
    BrowserModule,
    PlaygroundModule,
    LayoutModule,
    SharedModule,
    RouterTestingModule,
    BrowserAnimationsModule,
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err))
