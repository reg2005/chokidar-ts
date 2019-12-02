[@poppinss/chokidar-ts](../README.md) › ["src/Contracts"](_src_contracts_.md)

# External module: "src/Contracts"

## Index

### Type aliases

* [ImportReferenceNode](_src_contracts_.md#importreferencenode)
* [PluginFn](_src_contracts_.md#pluginfn)
* [SourceFilesManagerOptions](_src_contracts_.md#sourcefilesmanageroptions)

## Type aliases

###  ImportReferenceNode

Ƭ **ImportReferenceNode**: *object*

Shape of an import reference. The version is required to
find between stale dependencies without running
unnecessary loops

#### Type declaration:

___

###  PluginFn

Ƭ **PluginFn**: *function*

Shape of Plugin function

#### Type declaration:

▸ (`ts`: ts, `config`: tsStatic.CompilerOptions): *tsStatic.TransformerFactory‹tsStatic.SourceFile› | tsStatic.CustomTransformerFactory*

**Parameters:**

Name | Type |
------ | ------ |
`ts` | ts |
`config` | tsStatic.CompilerOptions |

___

###  SourceFilesManagerOptions

Ƭ **SourceFilesManagerOptions**: *object*

Options accepted by source files manager

#### Type declaration: