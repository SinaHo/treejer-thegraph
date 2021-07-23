import {
  NewType as NewTypeEvent, 
} from "../../generated/TreeFactory/TreeType"

import { 
    TreeType as TreeTypeEntity
} from '../../generated/schema'

export function handleNewType(event: NewTypeEvent): void {
  let theNewType = new TreeTypeEntity(event.params.typeId.toHex())
  theNewType.name = event.params.name
  theNewType.scientificName = event.params.scientificName
  theNewType.O2Formula = event.params.O2Formula
  theNewType.price = event.params.price
  theNewType.save()  
}