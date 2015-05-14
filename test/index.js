/* eslint-env mocha */
import chai from 'chai';
import path from 'path';

chai.should();

const expect = chai.expect;
const pathToGlobalConfiguration = '../lib'; // todo - set via argv;
const pathToSetGlobalConfiguration = path.join(pathToGlobalConfiguration, 'set');

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
        setConfiguration.should.equal(configuration);
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
            const configurationA = { foo: 'bar' };
            const configurationB = { baz: 'qux' };
            setGlobalConfiguration(configurationA, { freeze: false });
            setGlobalConfiguration(configurationB);
            const setConfiguration = require(pathToGlobalConfiguration);
            setConfiguration.should.equal(configurationB);
        });
        it('should throw an error if unrecognised options are passed', () => {
            const setGlobalConfiguration = require(pathToSetGlobalConfiguration);
            setGlobalConfiguration({ foo: 'bar' }, { freeeze: false });
        });
        it('should throw an error if options are passed with unexpected types', () => {
            const setGlobalConfiguration = require(pathToSetGlobalConfiguration);
            expect(() => {
                setGlobalConfiguration({ foo: 'bar' }, { extend: 'true' });
            }).to.throw(Error);
        });
        it('should extend the configuration, rather than replacing them if extend is set to true', () => {
            const setGlobalConfiguration = require(pathToSetGlobalConfiguration, { freeze: false });
        });
    });
    afterEach(() => {
        Object.keys(require.cache).forEach((key) => {
            delete require.cache[ key ];
        });
    });
});
