import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePublicaComponent } from './home-publica.component';

describe('HomePublicaComponent', () => {
  let component: HomePublicaComponent;
  let fixture: ComponentFixture<HomePublicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePublicaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomePublicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
