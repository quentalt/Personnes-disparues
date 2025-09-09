export interface MissingPerson {
  id?: string;
  fullName: string;
  age: number;
  dateOfDisappearance: string;
  description: string;
  lastKnownLocation: string;
  contactName: string;
  contactInfo: string;
  photo?: string;
  status: 'active' | 'found' | 'closed';
  createdAt?: Date;
  updatedAt?: Date;
}

export interface SearchFilters {
  query?: string;
  location?: string;
  ageRange?: {
    min: number;
    max: number;
  };
  dateRange?: {
    start: string;
    end: string;
  };
  status?: string;
}