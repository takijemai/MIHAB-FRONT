import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdealistaPage } from './idealista.page';

describe('IdealistaPage', () => {
  let component: IdealistaPage;
  let fixture: ComponentFixture<IdealistaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(IdealistaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
