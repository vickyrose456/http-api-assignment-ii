// Import node's path library
const path = require('path');

// Our actual configuration is an object exported by this file.
module.exports = {
    
    entry: './client/client.js',

    mode: 'production',

    watch: true,
    watchOptions: {
        aggregateTimeout: 200,
    },

    output: {
       
        path: path.resolve(__dirname, 'hosted'),
        filename: 'bundle.js',
    },
};
