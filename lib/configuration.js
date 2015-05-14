import objectAssign from 'object-assign';

let configuration;
let setOptions = {};
const validOptions = [ 'freeze', 'extend' ];
const persisentOptions = [ 'freeze' ];

function set(newConfiguration, newOptions = {}) {
    console.log('set called');
    if (configuration && setOptions.freeze !== false) {
        throw new Error('global-configuration is already set, the initial call should have `freeze` set to false to allow for this behaviour (e.g. in testing');
    }

    if (newOptions) {
        for (let newOption in newOptions) {
            if (!validOptions.indexOf(newOptions)) {
                throw new Error('Unrecognised option passed to global-configuration/set: ' + newOption);
            } else {
                const value = newOptions[ newOption ];
                if (typeof value !== 'boolean') {
                    throw new Error('Unexpected value type for ' + newOption +
                                ': ' + (typeof value) + ', boolean expected');
                }

                if (persisentOptions.indexOf(newOption) !== -1) {
                    setOptions[ newOption ] = value;
                }
            }
        }
    }

    if (newOptions.extend) {
        configuration = objectAssign(configuration, newConfiguration);
    } else {
        configuration = newConfiguration;
    }

    if (setOptions.freeze !== false && Object.freeze) {
        configuration = Object.freeze(configuration);
    }
}

function get() {
    return configuration;
}

export { get, set };