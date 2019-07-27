import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';

import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule } from './core/core.module';
import { RouterModule } from '@angular/router';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
      ],
      imports: [
        RouterTestingModule,
        RouterModule.forRoot([]),
        CoreModule
      ]
    }).compileComponents();
  }));

  xit('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
