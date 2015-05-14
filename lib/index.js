import { get } from './configuration';

function globalConfiguration() {
    const configuration = get();
    console.log('get called -> ' + (configuration ? 'ok' : 'nope'));
    if (!configuration) {
        throw new Error('global-configuration has not been set. Do so using global-configuration/set');
    }
    return configuration;
}

export default globalConfiguration();
