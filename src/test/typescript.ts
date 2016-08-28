
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

            @Options({sequelize})
            class User extends Model {

                @Attribute(DataTypes.STRING)
                public username: string;

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
            assert.equal(attributes.username, DataTypes.STRING);
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

});
