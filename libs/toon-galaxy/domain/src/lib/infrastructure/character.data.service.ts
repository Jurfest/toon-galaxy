import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@toon-galaxy/envenvironment';
import { Observable, map, of, tap } from 'rxjs';

import { CharacterEntity } from '../entities/character.models';

const characterBaseApiUrl = `${environment.BASE_API_URL}/character`;

@Injectable({ providedIn: 'root' })
export class CharacterDataService {
  private http = inject(HttpClient);

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  load(characterName: string | undefined): Observable<CharacterEntity[]> {
    // Uncomment if needed
    /*
        const url = '...';
        const params = new HttpParams().set('param', 'value');
        const headers = new HttpHeaders().set('Accept', 'application/json');
        return this.http.get<CharacterEntity[]>(url, {params, headers});
        */

    return this.http.get<any>(characterBaseApiUrl).pipe(
      tap((res) => console.log(res)),
      map((res) => res.results),
    );

    // return of([
    //   { id: 1, name: 'Lorem ipsum', description: 'Lorem ipsum dolor sit amet' },
    //   {
    //     id: 2,
    //     name: 'At vero eos',
    //     description: 'At vero eos et accusam et justo duo dolores',
    //   },
    //   {
    //     id: 3,
    //     name: 'Duis autem',
    //     description: 'Duis autem vel eum iriure dolor in hendrerit',
    //   },
    // ]);
  }
}
