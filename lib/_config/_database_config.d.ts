import 'dotenv/config';
declare class DB {
    static connect(): Promise<void>;
}
export default DB;
