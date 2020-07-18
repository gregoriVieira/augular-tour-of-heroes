import { Injectable } from '@angular/core';
import { Hero } from '../interface/hero';
import { HEROES } from '../mocks/mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from '../services/message.service';
import { catchError, map, tap } from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = 'api/heroes';


  constructor(private http: HttpClient, private messageService: MessageService) { }

  private handleError<T>(operation = 'operation', result?: T){
    return (error: any): Observable<T> => {

      console.error(error);

      this.log(`${operation} failed: ${error.message}`)

      return of(result as T);

    }
  }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
    .pipe(
      catchError(this.handleError<Hero[]>('getHeroes',[]))
    );
  }

  getHero(id: number): Observable<Hero>{
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(HEROES.find(hero => hero.id === id));
  }

  private log(message: string){
    this.messageService.add(`HeroService: ${message}`);
  }
}

// https://angular.io/tutorial/toh-pt6#tap-into-the-observable Part 6 Tap into the Observable

