/// VoteDao.ts

import { IVote } from '@entities/Vote';
import redis from 'redis';
import bluebird from 'bluebird';

export interface IVoteDao {
    getAsync: (id: string) => Promise<IVote | null>;
    addAsync: (user: IVote) => Promise<void>;
    updateAsync: (user: IVote) => Promise<void>;
    deleteAsync: (id: string) => Promise<void>;
}

const redisClient : redis.RedisClient = redis.createClient(6380, process.env.REDISCACHEHOSTNAME,
    {auth_pass: process.env.REDISCACHEKEY, tls: {servername: process.env.REDISCACHEHOSTNAME}});

// del has many overload, so specify one here so that I can use in promisify
const del: (arg1:string|string[], cb?:redis.Callback<number>) => boolean =  redisClient.del;
const getAsync = bluebird.promisify(redisClient.get).bind(redisClient);
const setAsync = bluebird.promisify(redisClient.set).bind(redisClient);
const delAsync = bluebird.promisify(del).bind(redisClient);

class VoteDao implements IVoteDao {

    /**
     * @param id
     */
    public async getAsync(id: string): Promise<IVote | null> {
        return JSON.parse(await getAsync(id)) as IVote;
    }

    /**
     *
     * @param vote
     */
    public async addAsync(vote: IVote): Promise<void> {
        await setAsync(vote.id, JSON.stringify(vote));
    }

    /**
     *
     * @param vote
     */
    public async updateAsync(vote: IVote): Promise<void> {
        await setAsync(vote.id, JSON.stringify(vote));
    }

    /**
     *
     * @param id
     */
    public async deleteAsync(id: string): Promise<void> {
        await delAsync(id);
    }
}

export default VoteDao;