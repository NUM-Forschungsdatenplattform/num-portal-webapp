import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { KeycloakService } from 'keycloak-angular';
import { AppConfigService } from 'src/app/config/app-config.service';
import { DashboardComponent } from './dashboard.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IAppConfig } from 'src/app/config/app-config.model';
describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  let appConfig: AppConfigService;
  let keycloak: KeycloakService;

  const config = ({
    env: 'test',
  } as unknown) as IAppConfig;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [TranslateModule.forRoot(), HttpClientTestingModule],
      providers: [KeycloakService],
    }).compileComponents();
  });

  beforeEach(() => {
    appConfig = TestBed.inject(AppConfigService);
    keycloak = TestBed.inject(KeycloakService);

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    component.config = config;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
