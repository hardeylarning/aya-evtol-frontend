import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvtolsComponent } from './evtols.component';

describe('EvtolsComponent', () => {
  let component: EvtolsComponent;
  let fixture: ComponentFixture<EvtolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvtolsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvtolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
