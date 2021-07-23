import { BigInt } from "@graphprotocol/graph-ts"
import {
  TreeFactory,
  AmbassadorBalanceWithdrawn,
  LocalDevelopmentFundWithdrawn,
  PlanterBalanceWithdrawn,
  PriceChanged,
  RescueFundWithdrawn,
  ResearchFundWithdrawn, 
  TreejerFundWithdrawn,

  TreePlanted as TreePlantedEvent, 
  TreeFunded as TreeFundedEvent 
  
} from "../generated/TreeFactory/TreeFactory"

import {
  NewType as NewTypeEvent, 
} from "../generated/TreeFactory/TreeType"

import {
  TreeType,
} from '../generated/TreeFactory/TreeType'

import { 
    TreeType as TreeTypeEntity, 
    TreePlanted as TreePlantedEntity, 
    Tree as TreeEntity,
    // TreeFunded as TreeFundedEntity 
} from '../generated/schema'

import { log } from '@graphprotocol/graph-ts'



// export function handleAmbassadorBalanceWithdrawn(
//   event: AmbassadorBalanceWithdrawn
// ): void {
//   // Entities can be loaded from the store using a string ID; this ID
//   // needs to be unique across all entities of the same type
//   let entity = ExampleEntity.load(event.transaction.from.toHex())

//   // Entities only exist after they have been saved to the store;
//   // `null` checks allow to create entities on demand
//   if (entity == null) {
//     entity = new ExampleEntity(event.transaction.from.toHex())

//     // Entity fields can be set using simple assignments
//     entity.count = BigInt.fromI32(0)
//   }

//   // BigInt and BigDecimal math are supported
//   entity.count = entity.count + BigInt.fromI32(1)

//   // Entity fields can be set based on event parameters
//   entity.ambassador = event.params.ambassador
//   entity.amount = event.params.amount

//   // Entities can be written to the store with `.save()`
//   entity.save()

//   // Note: If a handler doesn't require existing field values, it is faster
//   // _not_ to load the entity from the store. Instead, create it fresh with
//   // `new Entity(...)`, set the fields that should be updated and save the
//   // entity back to the store. Fields that were not set or unset remain
//   // unchanged, allowing for partial updates to be applied.

//   // It is also possible to access smart contracts from mappings. For
//   // example, the contract that has emitted the event can be connected to
//   // with:
//   //
//   // let contract = Contract.bind(event.address)
//   //
//   // The following functions can then be called on this contract to access
//   // state variables and other data:
//   //
//   // - contract.accessRestriction(...)
//   // - contract.ambassadorsFund(...)
//   // - contract.ambassadorsPercentage(...)
//   // - contract.daiToken(...)
//   // - contract.gbFactory(...)
//   // - contract.gbTreeCount(...)
//   // - contract.gbTrees(...)
//   // - contract.isTreeFactory(...)
//   // - contract.isTrustedForwarder(...)
//   // - contract.localDevelopmentFund(...)
//   // - contract.localDevelopmentFundPercentage(...)
//   // - contract.notFundedTrees(...)
//   // - contract.notFundedTreesLastIndex(...)
//   // - contract.notFundedTreesUsedIndex(...)
//   // - contract.notPlantedTrees(...)
//   // - contract.notPlantedTreesLastIndex(...)
//   // - contract.notPlantedTreesUsedIndex(...)
//   // - contract.planterTreeCount(...)
//   // - contract.planterTrees(...)
//   // - contract.plantersFund(...)
//   // - contract.plantersPercentage(...)
//   // - contract.price(...)
//   // - contract.rescueFund(...)
//   // - contract.rescueFundPercentage(...)
//   // - contract.researchFund(...)
//   // - contract.researchFundPercentage(...)
//   // - contract.treeToAmbassadorBalancePerSecond(...)
//   // - contract.treeToAmbassadorRemainingBalance(...)
//   // - contract.treeToGB(...)
//   // - contract.treeToPlanter(...)
//   // - contract.treeToPlanterBalancePerSecond(...)
//   // - contract.treeToPlanterRemainingBalance(...)
//   // - contract.treeToType(...)
//   // - contract.treeToken(...)
//   // - contract.treejerFund(...)
//   // - contract.treejerPercentage(...)
//   // - contract.trees(...)
//   // - contract.trustedForwarder(...)
//   // - contract.typeTreeCount(...)
//   // - contract.typeTrees(...)
//   // - contract.updateFactory(...)
//   // - contract.updateToAmbassadorBalanceWithdrawn(...)
//   // - contract.updateToPlanterBalanceWithdrawn(...)
//   // - contract.versionRecipient(...)
//   // - contract.getPlanterWithdrawableBalance(...)
//   // - contract.getAmbassadorWithdrawableBalance(...)
// }

export function handleLocalDevelopmentFundWithdrawn(
  event: LocalDevelopmentFundWithdrawn
): void {}

export function handlePlanterBalanceWithdrawn(
  event: PlanterBalanceWithdrawn
): void {}

export function handlePriceChanged(event: PriceChanged): void {}

export function handleRescueFundWithdrawn(event: RescueFundWithdrawn): void {}

export function handleResearchFundWithdrawn(
  event: ResearchFundWithdrawn
): void {}



