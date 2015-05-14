# globalConfiguration

## Purpose

Provide what is essentially an explicitly set of frozen global variables which can then be required by any module that needs them.

This is preferable to having to pass any configuration all the way through your node application, which in turn is better than setting global variables.

## Example usage:

### Server Side

__service.js (initiation of server side process)__
```es6
import setConfiguration from 'global-configuration/set';
// Assuming ./app here exports an express application.
import MyApplication from './app';

// This should probably be the only place you read in environment vars IMO.
setConfiguration({ foo: 'bar' });

new MyApplication();
```

__appLogic.js (somewhere inside the application)__
````js
import configuration from 'global-configuration'

// If we were to import setConfiguration again and try and set it an error would be thrown:
// once set the configuration cannot be changed unless explicitly stated the first time it is called.

// Equally if we were to import configuration before setConfiguration had been called an error would get thrown at compile time.
// This (the compile time error) is probably the main reason why this package was written.

...

function qux() {
    return configuration.foo;
}

qux(); // bar

export default qux;
````

### Client Side

__client.js__ (initiation of client side js, assume compiled via browserify / similar)
````js

import React from 'react';
import Page from './page.jsx';
import setConfiguration from 'global-configuration/set';

(function clientJS() {
    setConfiguration(window.BOOTSTRAP_DATA.configuration);
    React.render(<Page/>, document);
}());
````

__component.js__ (somewhere inside the client side app)
````js
import React from 'react';
import configuration from 'global-configuration';

const Component = React.createClass({
    render: function render() {
        return (
            <div>{ configuration.foo }</div>
        );
    }
});

export default Component;
````

### Testing

__gulp/test.js__
````js
import gulp from 'gulp';
import mocha from 'gulp-mocha';
import setConfiguration from 'global-configuration/set';

setConfiguration({ foo: 'baz' }, { freeze: false });

gulp.task('test', function gulpTest() {
    return (
        gulp
            .src([ 'app/**.test.*' ], { read: false })
            .pipe(mocha({ reporter: 'list' }))
    );
});
````

__appLogic.test.js__
````js
import appLogic from './appLogic';
import setConfiguration from 'global-configuration';
import assert from 'assert';

describe('appLogic', () => {
    it('should return foo from configuration', () => {
        const foos = [ 'alpha', 'beta', 'gamma' ];
        foos.forEach((foo) => {
            // This only works because `freeze: false` was set the first time set was called (in gulp/test.js).
            setConfiguration({ foo: foo });
            assert(appLogic() === foo);
        });
    });
});
````
