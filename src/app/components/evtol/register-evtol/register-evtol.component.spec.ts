import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterEvtolComponent } from './register-evtol.component';

describe('RegisterEvtolComponent', () => {
  let component: RegisterEvtolComponent;
  let fixture: ComponentFixture<RegisterEvtolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterEvtolComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterEvtolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
