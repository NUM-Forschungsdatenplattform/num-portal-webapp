import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TranslateModule } from '@ngx-translate/core'
import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms'

const SHARED_MODULES = [TranslateModule, FormsModule, ReactiveFormsModule]

@NgModule({
  declarations: [],
  imports: [...SHARED_MODULES, CommonModule],
  exports: [...SHARED_MODULES],
})
export class SharedModule {}
