import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LanguageComponent } from './language.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MaterialModule } from '../../material/material.module';

describe('LanguageComponent', () => {
  let component: LanguageComponent;
  let fixture: ComponentFixture<LanguageComponent>;
  let translate: TranslateService;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [ LanguageComponent ],
      imports: [
        TranslateModule.forRoot(),
        MaterialModule,
      ],
      providers: [
        TranslateService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    translate = TestBed.inject(TranslateService);
    fixture = TestBed.createComponent(LanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
