import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDeleteTweetComponent } from './update-delete-tweet.component';

describe('UpdateDeleteTweetComponent', () => {
  let component: UpdateDeleteTweetComponent;
  let fixture: ComponentFixture<UpdateDeleteTweetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateDeleteTweetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDeleteTweetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
