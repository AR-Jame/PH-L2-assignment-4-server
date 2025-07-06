import type { Model } from "mongoose";

export interface IBooks {
    title: string,
    author: string,
    genre: 'FICTION' | 'NON_FICTION' | 'SCIENCE' | 'HISTORY' | 'BIOGRAPHY' | 'FANTASY',
    isbn: string,
    description?: string,
    copies: number,
    available: boolean
}

export interface BookQueryParams {
    filter?: string;
    sortBy?: string;
    sort?: 'asc' | 'desc';
    limit?: string;
}

export interface BookStatics extends Model<IBooks> {
    updateAvailability(doc: object): void
}