import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadEvtolComponent } from './load-evtol.component';

describe('LoadEvtolComponent', () => {
  let component: LoadEvtolComponent;
  let fixture: ComponentFixture<LoadEvtolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadEvtolComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadEvtolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
