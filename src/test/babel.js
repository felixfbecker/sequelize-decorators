
import assert from 'assert';
import {Sequelize, Model, DataTypes} from 'sequelize';
import {options, attributes} from '../index';
import * as sinon from 'sinon';

// Just a dummy
const sequelize = Object.create(Sequelize.prototype);

describe('Babel', () => {
    it('should call Model.init with correct attributes and options', () => {

        const stub = sinon.stub(Model, 'init');

        try {
            @options({sequelize})
            @attributes({username: Sequelize.STRING})
            class User extends Model {} // eslint-disable-line no-unused-vars

            assert(stub.calledOnce);

            const attributesArg = stub.args[0][0];
            const optionsArg = stub.args[0][1];

            assert.equal(typeof attributesArg, 'object');
            assert.equal(attributesArg.username, DataTypes.STRING);

            assert.equal(typeof optionsArg, 'object');
            assert.equal(optionsArg.sequelize, sequelize);

        } finally {

            stub.restore();
        }
    });
})

