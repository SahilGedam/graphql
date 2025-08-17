import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookAddUpdate } from './book-add-update';

describe('BookAddUpdate', () => {
  let component: BookAddUpdate;
  let fixture: ComponentFixture<BookAddUpdate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookAddUpdate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookAddUpdate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
