import { TestBed } from '@angular/core/testing'
import { Router } from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing'
import { TranslateService } from '@ngx-translate/core'
import { UserManualUrlResolver } from './usermanualurl.resolver'

describe('ProjectMenuPipe', () => {
  let resolver: UserManualUrlResolver

  const mockTranslateService = {
    onLangChange: jest.fn(),
    currentLang: 'de',
  } as unknown as TranslateService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
    }).compileComponents()
    const router = TestBed.inject(Router)

    resolver = new UserManualUrlResolver(mockTranslateService, router)
  })

  it('should create', () => {
    expect(resolver).toBeTruthy()
  })

  it('resolve should open window', () => {
    resolver.resolve()
    // expect(mockWindow.location.href).toBe('https://num-portal-webapp.readthedocs.io/de/latest/');
  })
})
