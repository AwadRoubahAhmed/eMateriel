import { MongoClient } from "mongodb";

class MongodbService {
    //connection au server MongoDB
    public connect = async () => {
        /*
        URL de connexion
        MongodbService://USER:PASSWORD@HOST:PORT/DATABASE?authSours=admin
        */

        const url = `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}:27017/${process.env.MONGODB_DATABASE}?authSource=admin`;

        const client = new MongoClient(url);
        try {
            return await client.connect();
        } catch (_error) {
            await client.close();
        }
    };
}
export default MongodbService;