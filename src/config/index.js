const db_connection =  () => {
    const conn = {
        server: process.env.DB_HOST,
        database: process.env.DB_NAME,
        options: { encrypt:true }
    }
    if (process.env.NODE_ENV && process.env.NODE_ENV == 'development') {
        conn['user'] = process.env.DB_USER
        conn['password'] = process.env.DB_PW
    } else {
        conn['authentication'] = {
            type: 'azure-active-directory-msi-app-service'
        }
    }

    return conn;
}

module.exports = {
    db_connection
}