import { log } from "@graphprotocol/graph-ts"

import {
  SeedFactory,
  SeedMinted as SeedMintedEvent, 
} from "../../generated/SeedFactory/SeedFactory"

import {
  loadOrCreateActor
} from '../utils'

export function handleSeedMinted(event: SeedMintedEvent): void {
  let actor = loadOrCreateActor(event.params.owner.toHexString())
  log.info('+++ seeder id is: {}', [event.params.owner.toHexString()])
  actor.totalSeeds = actor.totalSeeds.plus(event.params.totalSeed)
//   actor.totalSeeds = event.params.totalSeed
  actor.save() 
}