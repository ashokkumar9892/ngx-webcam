import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WebcamComponent} from './webcam.component';


describe('WebcamComponent', () => {
  let component: WebcamComponent;
  let fixture: ComponentFixture<WebcamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebcamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebcamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should render a video tag', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('video')).toBeTruthy();
  }));
  it('should render a canvas tag', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('canvas')).toBeTruthy();
  }));

  it('should take snapshot and provide WebcamImage object', async(() => {
    const imageCapture$ = component.imageCapture.asObservable();

    let base64: string = null;
    let dataUrl: string = null;
    let imageData: ImageData = null;

    imageCapture$
      .subscribe(p => {
        base64 = p.imageAsBase64;
        dataUrl = p.imageAsDataUrl;
        imageData = p.imageData;
      });
    component.takeSnapshot();

    expect(base64).not.toBeNull();
    expect(dataUrl).not.toBeNull();
    expect(imageData).not.toBeNull();
    expect(imageData.data).not.toBeNull();
  }));
});
