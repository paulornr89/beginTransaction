const sql = require('mssql');
const port = 4000;

const connect = async () => {
    console.log("entrou")
    try {
        // make sure that any items are correctly URL encoded in the connection string
        //await sql.connect('Server=192.168.7.232,1433;Database=dadostst7;User Id=paulo;Password=Pp@paulo2021;Encrypt=true')
        await sql.connect(config())
        console.log("conectou?")
        console.log(sql)
        const result = await sql.query("SELECT * FROM ZCA010 WHERE ZCA_MAT = '003136'")
        console.dir(result)
    } catch (err) {
        console.log(err)
    }
}

connect()
function config () {
    return {
        user: 'paulo',
        password: 'Pp@paulo2021',
        database: 'dadostst7',
        server: '192.168.7.232',
        port: 1433,
        pool: {
            max: 10,
            min: 0,
            idleTimeoutMillis: 30000
        },
          options: {
          encrypt: false, // for azure
          trustServerCertificate: true // change to true for local dev / self-signed certs
        }
    }

}