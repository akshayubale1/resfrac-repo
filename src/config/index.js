const db_connection =  () => {
    const conn = {
        server: process.env.server,
        database: process.env.database,
        options: { encrypt:true, trustServerCertificate: true },
        user: process.env.username,
        password: process.env.password
}
    return conn;
}

module.exports = {
    db_connection
}
