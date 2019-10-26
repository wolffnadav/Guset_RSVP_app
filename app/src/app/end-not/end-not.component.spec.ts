import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EndNotComponent } from './end-not.component';

describe('EndNotComponent', () => {
  let component: EndNotComponent;
  let fixture: ComponentFixture<EndNotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EndNotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndNotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
