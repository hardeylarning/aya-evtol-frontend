import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvtolComponent } from './evtol.component';

describe('EvtolComponent', () => {
  let component: EvtolComponent;
  let fixture: ComponentFixture<EvtolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvtolComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvtolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
