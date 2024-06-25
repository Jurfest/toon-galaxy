import { TestBed } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';

import { MetaTagService } from './meta-tag.service';

describe('MetaTagService', () => {
  let service: MetaTagService;
  let metaMock: Partial<Meta>;
  let titleMock: Partial<Title>;

  beforeEach(() => {
    metaMock = {
      updateTag: jest.fn(),
    };

    titleMock = {
      setTitle: jest.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        MetaTagService,
        { provide: Meta, useValue: metaMock },
        { provide: Title, useValue: titleMock },
      ],
    });

    service = TestBed.inject(MetaTagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update meta tags and title correctly', () => {
    const title = 'Test Title';
    const description = 'Test Description';
    const image = 'https://example.com/image.jpg';
    const url = 'https://example.com/page';

    service.updateMetaTags(title, description, image, url);

    expect(titleMock.setTitle).toHaveBeenCalledWith(title);

    expect(metaMock.updateTag).toHaveBeenCalledWith({
      name: 'description',
      content: description,
    });
    expect(metaMock.updateTag).toHaveBeenCalledWith({
      property: 'og:title',
      content: title,
    });
    expect(metaMock.updateTag).toHaveBeenCalledWith({
      property: 'og:description',
      content: description,
    });
    expect(metaMock.updateTag).toHaveBeenCalledWith({
      property: 'og:image',
      content: image,
    });
    expect(metaMock.updateTag).toHaveBeenCalledWith({
      property: 'og:url',
      content: url,
    });
    expect(metaMock.updateTag).toHaveBeenCalledWith({
      name: 'twitter:card',
      content: 'summary_large_image',
    });
    expect(metaMock.updateTag).toHaveBeenCalledWith({
      name: 'twitter:title',
      content: title,
    });
    expect(metaMock.updateTag).toHaveBeenCalledWith({
      name: 'twitter:description',
      content: description,
    });
    expect(metaMock.updateTag).toHaveBeenCalledWith({
      name: 'twitter:image',
      content: image,
    });
  });
});
