import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { SubscriptionClientPage } from './subscription-client.page';

// import { SubscriptionClientPage } from './subscription-client.component';

describe('SubscriptionClientPage', () => {
  let component: SubscriptionClientPage;
  let fixture: ComponentFixture<SubscriptionClientPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriptionClientPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SubscriptionClientPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
