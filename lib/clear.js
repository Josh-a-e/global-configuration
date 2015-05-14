import path from 'path';

function reset() {
    delete require.cache[ path.join(__dirname, 'configuration.js') ];
    delete require.cache[ path.join(__dirname, 'set.js') ];
    delete require.cache[ path.join(__dirname, 'index.js') ];
}

export default reset;
