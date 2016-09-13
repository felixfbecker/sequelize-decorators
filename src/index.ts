import {Model, InitOptions, ModelAttributes, DataTypes, ModelAttributeColumnOptions} from 'sequelize';
import 'reflect-metadata';

const S_ATTRIBUTES = Symbol('attributes');

export function Options(options: InitOptions) {
    return function(model: typeof Model): void {
        const attributes: ModelAttributes = Reflect.getMetadata(S_ATTRIBUTES, model) || {};
        model.init(attributes, options);
    };
}

export function Attribute(options?: string | DataTypes.DataType | ModelAttributeColumnOptions) {
    return function(prototype: Object, name: string): void {
        const type = Reflect.getMetadata('design:type', prototype, name);
        /* istanbul ignore else */
        if (type && (!options || (typeof options !== 'string' && !(options instanceof DataTypes.ABSTRACT) && !(<ModelAttributeColumnOptions>options).type))) {
            switch (type) {
                case String: options = DataTypes.STRING; break;
                case Number: options = DataTypes.INTEGER; break;
                case Date: options = DataTypes.DATE; break;
                case Buffer: options = DataTypes.BLOB; break;
                // enum, array, hstore, geometry, range
            }
        }
        const attributes: ModelAttributes = Reflect.getMetadata(S_ATTRIBUTES, prototype.constructor) || {};
        attributes[name] = options;
        Reflect.defineMetadata(S_ATTRIBUTES, attributes, prototype.constructor);
    };
}

export function Attributes(attributes: ModelAttributes) {
    return function(model: typeof Model): void {
        Reflect.defineMetadata(S_ATTRIBUTES, attributes, model);
    };
}
