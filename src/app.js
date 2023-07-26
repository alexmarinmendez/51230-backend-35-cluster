import cluster from 'cluster'
import { cpus } from 'os'
import express from 'express'

if (cluster.isPrimary) {
    for (let index = 0; index < cpus().length; index++) {
        cluster.fork()
    }
} else {
    const app = express()

    app.get('/', (req, res) => {
        res.send(`Ok from ${process.pid}`)
    })

    app.get('/simple', (req, res) => {
        let result = 0
        for (let index = 0; index < 100; index++) {
            result += index
        }
        console.log(`Proceso worker (${process.pid}): ${result}`)
        res.send(`Proceso worker (${process.pid}): ${result}`)
    })

    app.get('/complex', (req, res) => {
        let result = 0
        for (let index = 0; index < 5e6; index++) {
            result += index
        }
        console.log(`Proceso worker (${process.pid}): ${result}`)
        res.send(`Proceso worker (${process.pid}): ${result}`)
    })

    app.listen(8080, () => console.log(`Server up! listening from ${process.pid}`))
}