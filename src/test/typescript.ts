
import assert = require('assert');
import {Sequelize, Model, DataTypes} from 'sequelize';
import {Options, Attribute} from '../index';
import * as sinon from 'sinon';

// Just a dummy
const sequelize: Sequelize = Object.create(Sequelize.prototype);

describe('TypeScript', () => {

    it('should call Model.init with correct attributes and options', () => {

        const stub = sinon.stub(Model, 'init');

        try {
            const usernameAttribute = {type: DataTypes.STRING, unique: true};

            @Options({sequelize})
            class User extends Model {

                @Attribute(usernameAttribute)
                public username: number; // not using string here to check it is not inferring

                @Attribute(DataTypes.STRING)
                public firstName: number; // not using string here to check it is not inferring

                @Attribute()
                public street: string;

                @Attribute()
                public loginCount: number;

                @Attribute()
                public lastLogin: Date;

                @Attribute()
                public passwordHash: Buffer;
            }

            assert(stub.calledOnce);

            const attributes = stub.args[0][0];
            const options = stub.args[0][1];

            assert.equal(typeof attributes, 'object');
            assert.equal(attributes.username, usernameAttribute);
            assert.equal(attributes.firstName, DataTypes.STRING);
            assert.equal(attributes.street, DataTypes.STRING);
            assert.equal(attributes.loginCount, DataTypes.INTEGER);
            assert.equal(attributes.lastLogin, DataTypes.DATE);
            assert.equal(attributes.passwordHash, DataTypes.BLOB);

            assert.equal(typeof options, 'object');
            assert.equal(options.sequelize, sequelize);

        } finally {

            stub.restore();
        }
    });

    it('should call Model.init correctly when only @Options was used', () => {

        const stub = sinon.stub(Model, 'init');

        try {

            @Options({sequelize})
            class User extends Model {}

            sinon.assert.calledOnce(stub);

            const attributes = stub.args[0][0];
            const options = stub.args[0][1];

            assert.equal(typeof attributes, 'object');
            assert.deepEqual(attributes, {});

            assert.equal(typeof options, 'object');
            assert.equal(options.sequelize, sequelize);

        } finally {

            stub.restore();
        }
    });

});
