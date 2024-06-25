import { HttpErrorResponse, provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// REFACTOR: - Use environment variable
const BASE_API_URL = `https://rickandmortyapi.com/api`;

import {
  CharacterApiResponse,
  CharacterEntity,
} from '../entities/character.models';
import { CharacterDataService } from './character.data.service';

const mockCharacters: CharacterEntity[] = [
  {
    id: 1,
    name: 'Character 1',
    image: 'image_url-1',
    species: 'Human',
    type: '',
  },
  {
    id: 2,
    name: 'Character 2',
    image: 'image_url-2',
    species: 'Human',
    type: '',
  },
  {
    id: 3,
    name: 'Character 3',
    image: 'image_url-3',
    species: 'Human',
    type: '',
  },
];

const mockLoadCharacterApiRes: CharacterApiResponse<CharacterEntity[]> = {
  info: {
    count: 3,
    pages: 1,
    next: null,
    prev: null,
  },
  results: mockCharacters,
};

describe('CharacterDataService', () => {
  let characterDataService: CharacterDataService;
  let httpTestingController: HttpTestingController;

  const characterBaseApiUrl = `${BASE_API_URL}/character`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule],
      providers: [
        CharacterDataService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    characterDataService = TestBed.inject(CharacterDataService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(characterDataService).toBeTruthy();
  });

  describe('loadCharacters', () => {
    it('should return an Observable<CharacterEntity[]> when called with a name', waitForAsync(() => {
      characterDataService
        .loadCharacters('Character')
        .subscribe((characters) => {
          expect(characters).toBeTruthy();
          expect(characters.length).toBe(3);
          expect(characters).toEqual(mockLoadCharacterApiRes.results);
          expect(characters.find((character) => character.id === 3).name).toBe(
            mockCharacters[2].name,
          );
        });

      const req = httpTestingController.expectOne(
        (request) =>
          request.url.includes(characterBaseApiUrl) &&
          request.params.has('name') &&
          request.params.get('name') === 'Character',
      );

      expect(req.request.method).toEqual('GET');

      req.flush(mockLoadCharacterApiRes);
    }));

    it('should return an Observable<CharacterEntity[]> when called without a name', () => {
      characterDataService.loadCharacters(undefined).subscribe((characters) => {
        expect(characters.length).toBe(3);
        expect(characters).toEqual(mockLoadCharacterApiRes.results);
      });

      const req = httpTestingController.expectOne(
        (request) =>
          request.url.includes(characterBaseApiUrl) &&
          request.params.has('name') &&
          request.params.get('name') === '',
      );

      expect(req.request.method).toBe('GET');
      req.flush(mockLoadCharacterApiRes);
    });

    it('should give an error if load characters fails', () => {
      characterDataService.loadCharacters('').subscribe({
        next: () => {
          fail('The fetch characters operation should have failed');
        },
        error: (error: HttpErrorResponse) => {
          expect(error.status).toBe(500);
        },
      });

      const req = httpTestingController.expectOne(
        (request) =>
          request.url.includes(characterBaseApiUrl) &&
          request.params.has('name') &&
          request.params.get('name') === '',
      );

      expect(req.request.method).toEqual('GET');

      req.flush('Fetch characters failed', {
        status: 500,
        statusText: 'Internal Server Error',
      });
    });
  });
});
