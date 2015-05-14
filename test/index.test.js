/* eslint-env mocha */
import chai from 'chai';
import path from 'path';
import { argv } from 'yargs';

chai.should();

const expect = chai.expect;
const pathToGlobalConfiguration = argv.lib ? '../lib' : '../build';
const pathToSetGlobalConfiguration = path.join(pathToGlobalConfiguration, 'set');
const pathToResetGlobalConfiguration = path.join(pathToGlobalConfiguration, 'reset');

const reset = require(pathToResetGlobalConfiguration);

describe('global-configuration', () => {
    it('should throw an error when called without set being called prior', () => {
        expect(() => {
            require(pathToGlobalConfiguration);
        }).to.throw(Error);
    });
    it('should not throw an error when set is called called prior', () => {
        const setGlobalConfiguration = require(pathToSetGlobalConfiguration);
        const configuration = { foo: 'bar' };
        setGlobalConfiguration(configuration);
        const setConfiguration = require(pathToGlobalConfiguration);
        setConfiguration.should.deep.equal(configuration);
    });
    it('should not be possible to change properties on the object returned', () => {
        const setGlobalConfiguration = require(pathToSetGlobalConfiguration);
        setGlobalConfiguration({ foo: 'bar' });
        const configuration = require(pathToGlobalConfiguration);
        expect(() => {
            configuration.foo = 'baz';
        }).to.throw(Error);
    });
    describe('global-configuration/set', () => {
        it('should throw an error if called more than once', () => {
            const setGlobalConfiguration = require(pathToSetGlobalConfiguration);
            setGlobalConfiguration({ foo: 'bar' });
            expect(() => {
                setGlobalConfiguration({ 'foo': 'baz' });
            }).to.throw(Error);
        });
        it('should throw an error if called more than once, even if subsequent calls have freeze set to false', () => {
            const setGlobalConfiguration = require(pathToSetGlobalConfiguration);
            setGlobalConfiguration({ foo: 'bar' });
            expect(() => {
                setGlobalConfiguration({ 'foo': 'baz' }, { freeze: false });
            }).to.throw(Error);
        });
        it('shouldn\'t throw an error if called more than once when the initial call had freeze set to false', () => {
            const setGlobalConfiguration = require(pathToSetGlobalConfiguration);
            const configuration = { baz: 'qux' };
            setGlobalConfiguration({ foo: 'bar' }, { freeze: false });
            setGlobalConfiguration(configuration);
            const setConfiguration = require(pathToGlobalConfiguration);
            setConfiguration.should.deep.equal(configuration);
        });
        it('should throw an error if unrecognised options are passed', () => {
            const setGlobalConfiguration = require(pathToSetGlobalConfiguration);
            setGlobalConfiguration({ foo: 'bar' }, { freeeze: false });
        });
        it('should throw an error if options are passed with unexpected types', () => {
            const setGlobalConfiguration = require(pathToSetGlobalConfiguration);
            expect(() => {
                setGlobalConfiguration({ foo: 'bar' }, { assign: 'true' });
            }).to.throw(Error);
        });
        it('should extend the configuration, rather than replacing them if assign is set to true', () => {
            const setGlobalConfiguration = require(pathToSetGlobalConfiguration, { freeze: false });
            setGlobalConfiguration({ foo: 'bar' }, { freeze: false });
            setGlobalConfiguration({ baz: 'qux' }, { assign: true });
            const configuration = require(pathToGlobalConfiguration);
            configuration.should.deep.equal({ foo: 'bar', 'baz': 'qux' });
        });
    });
    afterEach(() => {
        reset();
    });
});
