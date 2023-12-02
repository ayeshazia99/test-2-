/// Vote.ts

export interface IVote {
    id: string;
    votes: number[];
    candidates: string[]
}

class Vote implements IVote {

    public id: string;
    public votes: number[];
    public candidates: string[];

    constructor(id:string, votes:number[] = [], candidates:string[] = []) {
        this.id = id;
        this.votes = votes;
        this.candidates = candidates;
    }
}

export default Vote;