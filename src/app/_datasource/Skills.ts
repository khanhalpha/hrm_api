export interface Skills{
    skill : Skill,
    level : Level,
    employeeskillid : number
}

export interface Skill{
    id : number;
    skilldescription : string,
    skillname : string,
    color: string
}

export interface Level{
    id : number,
    levelname : string,
    leveldescription : string
}