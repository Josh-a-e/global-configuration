import { get } from './configuration';

function globalConfiguration() {
    const conf = get();
    if (!conf) {
        throw new Error('global-configuration has not been set. Do so using global-configuration/set');
    }
    return conf;
}

export default globalConfiguration();
