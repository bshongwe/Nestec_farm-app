// #1. Imports
import { createClient } from 'redis';
import { createCluster } from 'redis';

// #2. defs
const client = createClient();

const cluster = createCluster({
    rootNodes: [
        {
            url: 'redis://127.0.0.1:16379'
        },
        {
            url: 'redis://127.0.0.1:16380'
        },
        // ...
    ]
});

// #3. Test stdout
cluster.on('error', (err) => console.log('Redis Cluster Error', err));

await cluster.connect();
await client.connect();

await cluster.set('foo', 'bar');
const value = await cluster.get('foo');
console.log(value); // returns 'bar'

await cluster.quit();
