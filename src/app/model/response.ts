export type Status = 'INITIAL' | 'LOADING' | 'SUCCESS' | 'ERROR';

export interface Error {
    code: number;
    description: string;
}
