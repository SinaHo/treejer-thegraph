import {
  GBFactory,
  NewGBAdded as NewGBAddedEvent, 
} from "../../generated/GBFactory/GBFactory"

import { 
  GB as GBEntity, 
} from '../../generated/schema'

import {
  loadOrCreateActor
} from '../utils'

export function handleNewGBAdded(event: NewGBAddedEvent): void {
  let theNewGreenBlock = new GBEntity(event.params.id.toHexString())
  theNewGreenBlock.title = event.params.title

  let contractGBFactory = GBFactory.bind(event.address)  
  let gBlock = contractGBFactory.greenBlocks(event.params.id)
  theNewGreenBlock.coordinates = gBlock.value1
  theNewGreenBlock.status = gBlock.value2
  
  let gbAmbassador = contractGBFactory.gbToAmbassador(event.params.id);
  let ambassador = loadOrCreateActor(gbAmbassador.toHexString(), "ambassador")
  ambassador.save()

  theNewGreenBlock.ambassador = gbAmbassador.toHexString()
  
  theNewGreenBlock.save()  
}