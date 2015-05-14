import path from 'path';

function reset() {
    if (require && require.cache) {
        delete require.cache[ path.join(__dirname, 'configuration.js') ];
        delete require.cache[ path.join(__dirname, 'set.js') ];
        delete require.cache[ path.join(__dirname, 'index.js') ];
    } else {
        console.warn('WARNING: require.cache not available for clearing');
    }
}

export default reset;
