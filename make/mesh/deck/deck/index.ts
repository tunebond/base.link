import { Link, LinkHint, Mesh, Nest, NestPackageType, code } from '~'
import type { MeshType, SiteProcessInputType } from '~'

export * from './bear/index.js'
export * from './face/index.js'
export * from './link/index.js'
export * from './mint/index.js'
export * from './term/index.js'
export * from './test/index.js'

export function generate_full_deckCard_deck(
  input: SiteProcessInputType,
): MeshType<Mesh.Package> {
  const link = code.findFullStringConstantByName(input, 'link')
  const version = code.findFullStringConstantByName(input, 'version')
  const exportFile = code.findFullStringConstantByName(input, 'export')
  const testFile = code.findFullStringConstantByName(input, 'test')

  code.assertString(link)
  code.assertString(version)

  const [host, name] = code.splitPackageModuleName(link)

  code.assertString(host)
  code.assertString(name)

  return {
    bear: exportFile,
    bound: false,
    face: [],
    host,
    mark: version,
    name,
    scope: input.scope,
    term: [],
    test: testFile,
    type: Mesh.Package,
  }
}

export function process_deckCard_deck(
  input: SiteProcessInputType,
): void {
  const nest = code.assumeLink(input, Link.Tree)
  const deck: NestPackageType = {
    children: [],
    scope: input.scope,
    type: Nest.Package,
  }

  code.gatherIntoMeshParent(input, deck)

  const childInput = code.withElement(input, deck)

  code.processNestedChildren(
    childInput,
    nest,
    code.process_deckCard_deck_nestedChildren,
  )

  code.replaceIfBound(childInput, deck, () =>
    code.generate_full_deckCard_deck(childInput),
  )
}

export function process_deckCard_deck_nestedChildren(
  input: SiteProcessInputType,
): void {
  const type = code.getLinkHint(input)
  const index = code.assumeLinkIndex(input)
  switch (type) {
    case LinkHint.DynamicTerm:
    case LinkHint.DynamicText:
    case LinkHint.DynamicPath:
    case LinkHint.StaticPath:
      code.throwError(code.generateInvalidNestCaseError(input, type))
      break
    case LinkHint.StaticText: {
      if (index === 0) {
        code.process_deckCard_deck_link(input)
      } else {
        throw new Error('Unhandled text.')
      }
      break
    }
    case LinkHint.StaticTerm:
      if (index > 0) {
        code.process_deckCard_deck_nestedTerm(input)
      } else {
        throw new Error('Unhandled term.')
      }
      break
    default:
      code.throwError(code.generateUnhandledNestCaseError(input, type))
  }
}

export function process_deckCard_deck_nestedTerm(
  input: SiteProcessInputType,
): void {
  const term = code.resolveTermString(input)
  switch (term) {
    case 'bear': {
      code.process_deckCard_deck_bear(input)
      break
    }
    case 'test': {
      code.process_deckCard_deck_test(input)
      break
    }
    case 'mint': {
      code.process_deckCard_deck_mint(input)
      break
    }
    default: {
      code.throwError(code.generateUnknownTermError(input))
    }
  }
}

export function splitPackageModuleName(string: string): Array<string> {
  const [host, name] = string.split('/')
  const array: Array<string> = []
  if (host) {
    array.push(host.replace(/^@/, ''))
  }
  if (name) {
    array.push(name)
  }
  return array
}
