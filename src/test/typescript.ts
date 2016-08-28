
import assert = require('assert');
import {Sequelize, Model, DataTypes} from 'sequelize';
import {Options, Attribute} from '../index';
import * as sinon from 'sinon';

// Just a dummy
const sequelize: Sequelize = Object.create(Sequelize.prototype);

it('should call Model.init with correct attributes and options', () => {

    const stub = sinon.stub(Model, 'init');

    try {

        @Options({sequelize})
        class User extends Model {

            @Attribute(DataTypes.STRING)
            public username: string;
        }

        assert(stub.calledOnce);

        const [[attributes, options]] = stub.args;

        assert.equal(typeof attributes, 'object');
        assert.equal(attributes.username, DataTypes.STRING);

        assert.equal(typeof options, 'object');
        assert.equal(options.sequelize, sequelize);

    } finally {

        stub.restore();
    }
});
