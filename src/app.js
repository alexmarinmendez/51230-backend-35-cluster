import cluster from 'cluster'
import { cpus } from 'os'

if (cluster.isPrimary) {
    for (let index = 0; index < cpus().length; index++) {
        cluster.fork()
    }
} else {
    console.log('Proceso worker creado...')
    let result = 0
    for (let index = 0; index < 5e3; index++) {
        result += index
    }
    console.log(`Proceso worker (${process.pid}): ${result}`)
}