import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewaddPage } from './newadd.page';

describe('NewaddPage', () => {
  let component: NewaddPage;
  let fixture: ComponentFixture<NewaddPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NewaddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
