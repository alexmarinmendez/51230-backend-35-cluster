import cluster from 'cluster'

if (cluster.isPrimary) {
    console.log('Proceso primary trabajando...')
    cluster.fork()
    let result = 0
    for (let index = 0; index < 10; index++) {
        result += index
    }
    console.log(`Proceso primary (${process.pid}): ${result}`)
} else {
    console.log('Proceso worker creado...')
    let result = 0
    for (let index = 0; index < 5e9; index++) {
        result += index
    }
    console.log(`Proceso worker (${process.pid}): ${result}`)
}