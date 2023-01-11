import { Color, Mesh, code } from '~'
import type {
  BlueConstantType,
  BluePathType,
  BlueTermLinkType,
  BlueValueType,
  LinkPathType,
} from '~'

export function createBlueConstant(
  name: BlueTermLinkType,
  value: BlueValueType | Array<BlueConstantType>,
): BlueConstantType {
  return {
    color: Color.Blue,
    hidden: code.createBlueBoolean(false),
    name,
    type: Mesh.Constant,
    value,
  }
}

export function createBluePath(value: LinkPathType): BluePathType {
  return {
    color: Color.Blue,
    type: Mesh.Path,
    value,
  }
}
