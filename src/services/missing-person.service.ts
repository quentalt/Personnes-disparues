import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { MissingPerson, SearchFilters } from '../models/missing-person.model';

@Injectable({
  providedIn: 'root'
})
export class MissingPersonService {
  private missingPersonsSubject = new BehaviorSubject<MissingPerson[]>([
    {
      id: '1',
      fullName: 'Sophie Martin',
      age: 23,
      dateOfDisappearance: '2024-01-15',
      description: 'Cheveux bruns, yeux verts, 1m65, portait une veste rouge le jour de sa disparition',
      lastKnownLocation: 'Paris, 15ème arrondissement',
      contactName: 'Marie Martin',
      contactInfo: 'marie.martin@email.com',
      photo: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300',
      status: 'active',
      createdAt: new Date('2024-01-16')
    },
    {
      id: '2',
      fullName: 'Lucas Dubois',
      age: 17,
      dateOfDisappearance: '2024-01-20',
      description: 'Cheveux blonds, yeux bleus, 1m75, cicatrice au menton, portait un sweat à capuche noir',
      lastKnownLocation: 'Lyon, gare Part-Dieu',
      contactName: 'Pierre Dubois',
      contactInfo: '06.12.34.56.78',
      photo: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=300',
      status: 'active',
      createdAt: new Date('2024-01-21')
    },
    {
      id: '3',
      fullName: 'Emma Rodriguez',
      age: 34,
      dateOfDisappearance: '2024-01-18',
      description: 'Cheveux noirs courts, yeux marrons, 1m60, tatouage papillon sur le poignet gauche',
      lastKnownLocation: 'Marseille, Vieux-Port',
      contactName: 'Carlos Rodriguez',
      contactInfo: 'carlos.rodriguez@email.com',
      photo: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=300',
      status: 'active',
      createdAt: new Date('2024-01-19')
    }
  ]);

  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  getAllMissingPersons(): Observable<MissingPerson[]> {
    return this.missingPersonsSubject.asObservable();
  }

  getMissingPersonById(id: string): Observable<MissingPerson | undefined> {
    return this.missingPersonsSubject.pipe(
      map(persons => persons.find(p => p.id === id))
    );
  }

  addMissingPerson(person: Omit<MissingPerson, 'id' | 'createdAt' | 'updatedAt'>): Observable<MissingPerson> {
    this.loadingSubject.next(true);
    
    const newPerson: MissingPerson = {
      ...person,
      id: this.generateId(),
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    return of(newPerson).pipe(
      delay(1000), // Simulate API call
      map(person => {
        const currentPersons = this.missingPersonsSubject.value;
        this.missingPersonsSubject.next([person, ...currentPersons]);
        this.loadingSubject.next(false);
        return person;
      })
    );
  }

  searchMissingPersons(filters: SearchFilters): Observable<MissingPerson[]> {
    this.loadingSubject.next(true);
    
    return this.missingPersonsSubject.pipe(
      delay(500), // Simulate API call
      map(persons => {
        let filtered = persons;

        if (filters.query) {
          const query = filters.query.toLowerCase();
          filtered = filtered.filter(person => 
            person.fullName.toLowerCase().includes(query) ||
            person.lastKnownLocation.toLowerCase().includes(query) ||
            person.description.toLowerCase().includes(query)
          );
        }

        if (filters.location) {
          const location = filters.location.toLowerCase();
          filtered = filtered.filter(person => 
            person.lastKnownLocation.toLowerCase().includes(location)
          );
        }

        if (filters.ageRange) {
          filtered = filtered.filter(person => 
            person.age >= filters.ageRange!.min && person.age <= filters.ageRange!.max
          );
        }

        if (filters.status) {
          filtered = filtered.filter(person => person.status === filters.status);
        }

        if (filters.dateRange) {
          const startDate = new Date(filters.dateRange.start);
          const endDate = new Date(filters.dateRange.end);
          filtered = filtered.filter(person => {
            const disappearanceDate = new Date(person.dateOfDisappearance);
            return disappearanceDate >= startDate && disappearanceDate <= endDate;
          });
        }
        this.loadingSubject.next(false);
        return filtered;
      })
    );
  }

  getRecentlyAdded(limit: number = 6): Observable<MissingPerson[]> {
    return this.missingPersonsSubject.pipe(
      map(persons => 
        persons
          .sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0))
          .slice(0, limit)
      )
    );
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}