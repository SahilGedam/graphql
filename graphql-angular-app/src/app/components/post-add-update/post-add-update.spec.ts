import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostAddUpdate } from './post-add-update';

describe('PostAddUpdate', () => {
  let component: PostAddUpdate;
  let fixture: ComponentFixture<PostAddUpdate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostAddUpdate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostAddUpdate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
