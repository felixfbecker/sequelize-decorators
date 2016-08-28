
import assert from 'assert';
import {Sequelize, Model, DataTypes} from 'sequelize';
import {Options, Attributes} from '../index';
import * as sinon from 'sinon';

// Just a dummy
const sequelize = Object.create(Sequelize.prototype);

describe('Babel', () => {
    it('should call Model.init with correct attributes and options', () => {

        const stub = sinon.stub(Model, 'init');

        try {
            @Options({sequelize})
            @Attributes({username: Sequelize.STRING})
            class User extends Model {} // eslint-disable-line no-unused-vars

            assert(stub.calledOnce);

            const attributes = stub.args[0][0];
            const options = stub.args[0][1];

            assert.equal(typeof attributes, 'object');
            assert.equal(attributes.username, DataTypes.STRING);

            assert.equal(typeof options, 'object');
            assert.equal(options.sequelize, sequelize);

        } finally {

            stub.restore();
        }
    });
})

