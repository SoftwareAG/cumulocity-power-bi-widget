import { TestBed } from '@angular/core/testing';

import { GpPowerbiWidgetService } from './gp-powerbi-widget.service';

describe('GpPowerbiWidgetService', () => {
  let service: GpPowerbiWidgetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GpPowerbiWidgetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
