
import assert = require('assert');
import {Sequelize, Model, DataTypes} from 'sequelize';
import {options, attribute} from '../index';
import * as sinon from 'sinon';

// Just a dummy
const sequelize: Sequelize = Object.create(Sequelize.prototype);

describe('TypeScript', () => {

    it('should call Model.init with correct attributes and options', () => {

        const stub = sinon.stub(Model, 'init');

        try {

            @options({sequelize})
            class User extends Model {

                @attribute(DataTypes.STRING)
                public username: string;

                @attribute()
                public street: string;

                @attribute()
                public loginCount: number;

                @attribute()
                public lastLogin: Date;

                @attribute()
                public passwordHash: Buffer;
            }

            assert(stub.calledOnce);

            const attributesArg = stub.args[0][0];
            const optionsArg = stub.args[0][1];

            assert.equal(typeof attributesArg, 'object');
            assert.equal(attributesArg.username, DataTypes.STRING);
            assert.equal(attributesArg.street, DataTypes.STRING);
            assert.equal(attributesArg.loginCount, DataTypes.INTEGER);
            assert.equal(attributesArg.lastLogin, DataTypes.DATE);
            assert.equal(attributesArg.passwordHash, DataTypes.BLOB);

            assert.equal(typeof optionsArg, 'object');
            assert.equal(optionsArg.sequelize, sequelize);

        } finally {

            stub.restore();
        }
    });

});
