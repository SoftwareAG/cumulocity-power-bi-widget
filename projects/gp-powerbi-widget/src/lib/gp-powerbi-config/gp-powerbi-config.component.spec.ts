import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GpPowerbiConfigComponent } from './gp-powerbi-config.component';

describe('GpPowerbiConfigComponent', () => {
  let component: GpPowerbiConfigComponent;
  let fixture: ComponentFixture<GpPowerbiConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GpPowerbiConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GpPowerbiConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
