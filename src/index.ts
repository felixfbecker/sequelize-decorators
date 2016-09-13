/// <reference path="../node_modules/reflect-metadata/typings.d.ts" />
import {Model, InitOptions, ModelAttributes, DataTypes, ModelAttributeColumnOptions} from 'sequelize';
import 'reflect-metadata';

const S_ATTRIBUTES = Symbol('attributes');

export function options(options: InitOptions) {
    return function(model: typeof Model): void {
        const attributes: ModelAttributes = Reflect.getMetadata(S_ATTRIBUTES, model) || {};
        model.init(attributes, options);
    };
}

export function attribute(options?: string | DataTypes.DataType | ModelAttributeColumnOptions) {
    return function(prototype: Object, name: string): void {
        const type = Reflect.getMetadata('design:type', prototype, name);
        if (!options && type) {
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

export function attributes(attributes: ModelAttributes) {
    return function(model: typeof Model): void {
        Reflect.defineMetadata(S_ATTRIBUTES, attributes, model);
    };
}
