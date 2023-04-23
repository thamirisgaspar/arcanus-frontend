import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArcanusComponent } from './arcanus.component';

describe('ArcanusComponent', () => {
  let component: ArcanusComponent;
  let fixture: ComponentFixture<ArcanusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArcanusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArcanusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
