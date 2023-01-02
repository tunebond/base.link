import type {
  FoldNodeType,
  FoldRangeType,
  TextSplitInputType,
  TextTokenType,
} from '~'

import { Text, TextTokenBaseType } from './text/index.js'

export enum Link {
  Boolean = 'link-boolean',
  Decimal = 'link-decimal',
  Hashtag = 'link-hashtag',
  Index = 'link-index',
  Path = 'link-path',
  Plugin = 'link-plugin',
  SignedInteger = 'link-signed-integer',
  String = 'link-string',
  Term = 'link-term',
  Text = 'link-text',
  Tree = 'link-tree',
  UnsignedInteger = 'link-unsigned-integer',
}

// eslint-disable-next-line sort-exports/sort-exports
export const LINK_TYPE = [
  Link.Boolean,
  Link.Decimal,
  Link.Hashtag,
  Link.Index,
  Link.Path,
  Link.Plugin,
  Link.SignedInteger,
  Link.String,
  Link.Term,
  Link.Text,
  Link.Tree,
  Link.UnsignedInteger,
]

export type LinkBooleanType = {
  like: Link.Boolean
  value: boolean
}

export type LinkDecimalType = {
  like: Link.Decimal
  range: FoldRangeType
  value: number
}

export type LinkHashtagType = {
  code: string
  like: Link.Hashtag
  range: FoldRangeType
  system: string
}

export type LinkIndexType = {
  like: Link.Index
  nest: Array<LinkTreeType | LinkTermType | LinkPathType>
  parent: LinkPathType
}

export type LinkInputStateType = {
  contexts: Array<{
    path: Array<number>
    stack: Array<LinkNodeType>
    tree: LinkTreeType | LinkPluginType | LinkIndexType
  }>
  index: number
  tree: LinkTreeType
}

export type LinkInputType = TextSplitInputType & {
  state: LinkInputStateType
  token: FoldNodeType
}

export type LinkMappingType = {
  'link-boolean': LinkBooleanType
  'link-decimal': LinkDecimalType
  'link-hashtag': LinkHashtagType
  'link-index': LinkIndexType
  'link-path': LinkPathType
  'link-plugin': LinkPluginType
  'link-signed-integer': LinkSignedIntegerType
  'link-string': LinkStringType
  'link-term': LinkTermType
  'link-text': LinkTextType
  'link-tree': LinkTreeType
  'link-unsigned-integer': LinkUnsignedIntegerType
}

export type LinkNodeType =
  | LinkTermType
  | LinkStringType
  | LinkTreeType
  | LinkUnsignedIntegerType
  | LinkSignedIntegerType
  | LinkTextType
  | LinkPluginType
  | LinkIndexType
  | LinkDecimalType
  | LinkHashtagType
  | LinkPathType
  | LinkBooleanType

export type LinkPathType = {
  like: Link.Path
  parent: LinkTreeType | LinkPluginType | LinkIndexType
  segment: Array<LinkTermType | LinkIndexType>
}

export type LinkPluginType = {
  like: Link.Plugin
  nest: Array<LinkTreeType | LinkTermType | LinkPathType>
  parent: LinkTermType | LinkTextType
  size: number
}

export type LinkResultType = TextSplitInputType & {
  link: LinkTreeType
}

export type LinkSignedIntegerType = {
  like: Link.SignedInteger
  range: FoldRangeType
  value: number
}

export type LinkStringType = {
  like: Link.String
  range: FoldRangeType
  value: string
}

export type LinkTermType = {
  dereference: boolean
  guard: boolean
  like: Link.Term
  parent: LinkPathType | LinkTreeType | LinkPluginType
  query: boolean
  segment: Array<LinkStringType | LinkPluginType>
}

export type LinkTextType = {
  like: Link.Text
  segment: Array<LinkStringType | LinkPluginType>
}

export type LinkTreeType = {
  head?: LinkTermType
  like: Link.Tree
  nest: Array<
    | LinkTextType
    | LinkPathType
    | LinkTreeType
    | LinkUnsignedIntegerType
    | LinkSignedIntegerType
    | LinkHashtagType
    | LinkDecimalType
    | LinkStringType
    | LinkBooleanType
    | LinkTermType
  >
  parent?: LinkTreeType | LinkPluginType | LinkIndexType
}

export type LinkType<T extends Link> = LinkMappingType[T]

export type LinkUnsignedIntegerType = {
  like: Link.UnsignedInteger
  value: number
}

export type LinkWorkListCallbackType = (
  token: TextTokenType<Text>,
) => void

export type LinkWorkListInputType = {
  callback: LinkWorkListCallbackType
  parent: LinkNodeType
}