/**
 * Underscore Underscore
 *
 * Underscore Underscore simplifies creating global classes and building namespaced objects in
 * Javascript applications.
 *
 * Licensed under MIT. Created by @sixones and @angryamoeba.
 **/

/**
 * __classRegister(name, klass) -> void
 * - name (String): name of the class to register including namespace.
 * - klass (Object): Prototype object instance to assign to the name.
 *
 * Registers the prototype object against the specified name, resolving the namespace and appending to
 * the parent if nessary. The root instance is registered against the global context variable to
 * provide access throughout the application.
 **/
__classRegister = function(name, klass) {
  var namespace = name.split('.');

  var global = (function(){
    return this;
  }).call(null);

  if (typeof(global) !== 'undefined') {
    for (var i = 0; i < namespace.length; ++i) {
      var name = namespace[i];

      if (i < (namespace.length - 1)) {
        global[name] = global[name] || { };
        global = global[name];
      } else {
        global[name] = klass;
      }
    }
  }
};

/**
 * __classExtend(name, superKlass, constructor[, klassProps, instanceProps]) -> void
 * - name (String): name of the class to create.
 * - superKlass (Type): reference to the class type to extend the new class from.
 * - constructor (Function / Object): constructor function or static class properties.
 * - klassProps (Object): static class properties, or instance properties if constructor not passed.
 * - instanceProps (Object): instance properties.
 *
 * Extends a class, creating a new class using the static class properties and instance properties,
 * and constructor if specified. Extending an existing class is similar to inheriting in other
 * languages.
 *
 * If no constructor is passed in and the "initialize" or "init" method exists on the instance properties
 * the first will be used as the constructor, if not a blank constructor will be created.
 *
 * If no instance properties are specified, the static class properties will be copied and used for the
 * class instance.
 **/
__classExtend = function(name, superKlass, constructor, klassProps, instanceProps) {
  var constructorProperties, klassProperties, instanceProperties;

  if (typeof(constructor) === 'function') {
    klassProperties = klassProps || { };
    instanceProperties = instanceProps || { };

    constructorProperties = constructor;
  } else {
    klassProperties = constructor || { };
    instanceProperties = klassProps || constructor || { };

    constructorProperties = instanceProperties.init;
  }

  var proto = Object.create(superKlass.prototype);

  for (var i in instanceProperties) {
    try {
      Object.defineProperty(proto, i, {
        value: instanceProperties[i],
        enumerable: false,
        configurable: true,
        writable: true
      });
    } catch (e) {
      proto[i] = instanceProperties[i];
    }
  }

  var klass;

  if (constructorProperties) {
    klass = constructorProperties;
  } else if (proto.initialize) {
    klass = function() {
      if (initialize) initialize.apply(this, arguments);
    };
  } else if (proto.init) {
    klass = function() {
      if (init) init.apply(this, arguments);
    };
  } else {
    klass = function() { };
  }

  klass.prototype = proto;

  for (var prop in superKlass) {
    klass[prop] = superKlass[prop];
  }

  for (var prop in klassProperties) {
    klass[prop] = klassProperties[prop];
  }

  __classRegister(name, klass);

  return klass;
};

/**
 * __classCreate(name, constructor[, klassProps, instanceProps]) -> void
 * - name (String): name of the class to create.
 * - constructor (Function / Object): constructor function or static class properties.
 * - klassProps (Object): static class properties, or instance properties if constructor not passed.
 * - instanceProps (Object): instance properties.
 *
 * Creates the class extending from a blank Object using the static class properties and instance properties,
 * and constructor if specified.
 *
 * If no constructor is passed in and the "initialize" or "init" method exists on the instance properties
 * the first will be used as the constructor, if not a blank constructor will be created.
 *
 * If no instance properties are specified, the static class properties will be copied and used for the
 * class instance.
 **/
__classCreate = function(name, constructor, klassProps, instanceProps) {
  return __classExtend(name, Object, constructor, klassProps, instanceProps);
};

if (Object.create === undefined) {
  /**
   * Object#create(target) -> void
   * - target (Object): prototype object to create.
   *
   * Creates an instance of the specified target prototype object.
   **/
  Object.create = function(target) {
    function Binding() { };

    Binding.prototype = target;

    return new Binding();
  }
}

/**
 * class __
 *
 * Underscore Underscore simplifies creating classes and building namespaced objects in JavaScript
 * applications by providing a collection of helpers.
 **/
__classCreate('__', {
  /**
   * __.create(name[, constructor, klassProps, instanceProps]) -> void
   * - name (String): name of the class to create.
   * - constructor (Function / Object): constructor function or static class properties.
   * - klassProps (Object): static class properties, or instance properties if constructor not passed.
   * - instanceProps (Object): instance properties.
   *
   * Creates the class extending from a blank Object using the static class properties and instance properties,
   * and constructor if specified.
   *
   * If no constructor is passed in and the "initialize" or "init" method exists on the instance properties
   * the first will be used as the constructor, if not a blank constructor will be created.
   *
   * If no instance properties are specified, the static class properties will be copied and used for the
   * class instance.
   **/
  create: __classCreate,

  /**
   * __.extend(name, superKlass, constructor[, klassProps, instanceProps]) -> void
   * - name (String): name of the class to create.
   * - superKlass (Type): reference to the class type to extend the new class from.
   * - constructor (Function / Object): constructor function or static class properties.
   * - klassProps (Object): static class properties, or instance properties if constructor not passed.
   * - instanceProps (Object): instance properties.
   *
   * Extends a class, creating a new class using the static class properties and instance properties,
   * and constructor if specified. Extending an existing class is similar to inheriting in other
   * languages.
   *
   * If no constructor is passed in and the "initialize" or "init" method exists on the instance properties
   * the first will be used as the constructor, if not a blank constructor will be created.
   *
   * If no instance properties are specified, the static class properties will be copied and used for the
   * class instance.
   **/
  extend: __classExtend,

  /**
   * __.register(name, klass) -> void
   * - name (String): name of the class to register including namespace.
   * - klass (Object): Prototype object instance to assign to the name.
   *
   * Registers the prototype object against the specified name, resolving the namespace and appending to
   * the parent if nessary. The root instance is registered against the global context variable to
   * provide access throughout the application.
   **/
  register: __classRegister
});
