import { Connection, createConnection, getConnectionManager, getConnectionOptions } from 'typeorm';

export default async (): Promise<Connection> => {
    const defaultOptions = await getConnectionOptions();
    //Verifica a se vai ser utilizado o DB 'test' ou 'prod'
    // através da variavel de ambiente NODE_ENV que foi definida em:
    //package.json -> scripts -> test
    return createConnection(
        Object.assign(defaultOptions, {
            database: process.env.NODE_ENV === 'test'
                ? "./src/database/database.test.sqlite"
                : defaultOptions.database
        })
    );
};