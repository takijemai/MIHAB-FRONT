import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListchatPage } from './listchat.page';

describe('ListchatPage', () => {
  let component: ListchatPage;
  let fixture: ComponentFixture<ListchatPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ListchatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
