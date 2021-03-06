[@poppinss/chokidar-ts](../README.md) › [src](../modules/src.md) › [TypescriptCompiler](src.typescriptcompiler.md)

# Class: TypescriptCompiler

Typescript compiler exposes the API to build, watch or parse
the typescript config file.

## Hierarchy

* **TypescriptCompiler**

## Index

### Constructors

* [constructor](src.typescriptcompiler.md#constructor)

### Properties

* [ts](src.typescriptcompiler.md#ts)

### Methods

* [builder](src.typescriptcompiler.md#builder)
* [configParser](src.typescriptcompiler.md#configparser)
* [use](src.typescriptcompiler.md#use)
* [watcher](src.typescriptcompiler.md#watcher)

## Constructors

###  constructor

\+ **new TypescriptCompiler**(`cwd`: string, `configFileName`: string, `ts`: typeof tsStatic): *[TypescriptCompiler](src.typescriptcompiler.md)*

**Parameters:**

Name | Type |
------ | ------ |
`cwd` | string |
`configFileName` | string |
`ts` | typeof tsStatic |

**Returns:** *[TypescriptCompiler](src.typescriptcompiler.md)*

## Properties

###  ts

• **ts**: *typeof tsStatic*

## Methods

###  builder

▸ **builder**(`options`: tsStatic.ParsedCommandLine): *[Builder](src.builder.md)‹›*

Get builder instance

**Parameters:**

Name | Type |
------ | ------ |
`options` | tsStatic.ParsedCommandLine |

**Returns:** *[Builder](src.builder.md)‹›*

___

###  configParser

▸ **configParser**(): *[ConfigParser](src.configparser.md)‹›*

Get config parser instance

**Returns:** *[ConfigParser](src.configparser.md)‹›*

___

###  use

▸ **use**(`transformer`: [PluginFn](../modules/src.md#pluginfn), `lifecycle`: "before" | "after"): *this*

Add plugin which can apply transformers to the typescript compiler

**Parameters:**

Name | Type |
------ | ------ |
`transformer` | [PluginFn](../modules/src.md#pluginfn) |
`lifecycle` | "before" &#124; "after" |

**Returns:** *this*

___

###  watcher

▸ **watcher**(`options`: tsStatic.ParsedCommandLine): *[Watcher](src.watcher.md)‹›*

Get watcher instance

**Parameters:**

Name | Type |
------ | ------ |
`options` | tsStatic.ParsedCommandLine |

**Returns:** *[Watcher](src.watcher.md)‹›*
