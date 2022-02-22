import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GpPowerbiWidgetComponent } from './gp-powerbi-widget.component';

describe('GpPowerbiWidgetComponent', () => {
  let component: GpPowerbiWidgetComponent;
  let fixture: ComponentFixture<GpPowerbiWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GpPowerbiWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GpPowerbiWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
