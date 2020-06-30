import { Employee } from './Employee';

export interface User{
    id : number,
    username : string,
    employee : Employee,
    roles : string [] 
}