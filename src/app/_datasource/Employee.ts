import { Department } from '../_service/department.service';
import { Skills } from './Skills';

export interface EmployeeResponse {
    content: Employee[];
    totalElements: number;
}
export interface Employee{
    id:number,
    fullname:string,
    birthday:Date,
    gender:boolean,
    department:Department,
    skills : Skills[],
    phone:string,
    address:string,
    email:string
}
