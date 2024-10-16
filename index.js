const sql = require('mssql');
const port = 4000;

const connect = async () => {
    console.log("entrou")
    try {
        // make sure that any items are correctly URL encoded in the connection string
        //await sql.connect('Server=192.168.7.232,1433;Database=dadostst7;User Id=paulo;Password=Pp@paulo2021;Encrypt=true')
        console.log(this.room)
        await sql.connect(config())
        console.log("conectou?")
        // console.log(this.room.db)
        //console.log(sql)
        // const result = await sql.query("SELECT * FROM ZCA010 WHERE ZCA_MAT = '003136'")
        //console.dir(result)
        const transaction = new sql.Transaction()

        transaction.begin(err => {
            const request = new sql.Request(transaction)
            request.query(`
                INSERT INTO ZCA010 (ZCA_FILIAL, ZCA_MAT, ZCA_CARGO, ZCA_CAPACI, ZCA_INICIO, ZCA_FIM, ZCA_HORAS, ZCA_ANOREF, ZCA_FLUIG, R_E_C_N_O_)
                VALUES ('0101', '003136', '02077', 'TESTE - TRANSACTION', '20241009', '20241009', '14.52', '2024', '11111', (SELECT TOP 1 (R_E_C_N_O_ + 1) FROM ZCA010 ORDER BY R_E_C_N_O_ DESC))
            `, (err, result) => {
                // ... error checks
                console.log("Resultado")
                console.log(result)
                transaction.commit(err => {
                    // ... error checks
                    console.log("Transaction committed.")
                })
            })
        })
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