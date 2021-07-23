import { BigInt, Address } from "@graphprotocol/graph-ts"
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
  
} from "../../generated/TreeFactory/TreeFactory"

import { 
    Tree as TreeEntity,
    GB as GBEntity, 
    Actor as ActorEntity
} from '../../generated/schema'

import { GBFactory } from '../../generated/GBFactory/GBFactory'

import { log } from '@graphprotocol/graph-ts'

import {
  dummyConvertToHex,
  loadOrCreateActor,
  upsertFund,
  getFund
} from '../utils'

export function handleLocalDevelopmentFundWithdrawn(
  event: LocalDevelopmentFundWithdrawn
): void {}

export function handleAmbassadorBalanceWithdrawn(
  event: AmbassadorBalanceWithdrawn
): void {
  let ambassador = loadOrCreateActor(event.params.ambassador.toHexString(), 'ambassador')
  ambassador.totalWithdraw = ambassador.totalWithdraw.plus(event.params.amount)
  ambassador.save()
}

export function handlePlanterBalanceWithdrawn(
  event: PlanterBalanceWithdrawn
): void {
  let planter = loadOrCreateActor(event.params.planter.toHexString(), 'planter')
  planter.totalWithdraw = planter.totalWithdraw.plus(event.params.amount)
  planter.save()
}

export function handlePriceChanged(event: PriceChanged): void {}

export function handleRescueFundWithdrawn(event: RescueFundWithdrawn): void {}

export function handleResearchFundWithdrawn(
  event: ResearchFundWithdrawn
): void {}

export function handleTreeFunded(event: TreeFundedEvent): void {
  let treeId = event.params.treeId
  if (!treeId)
    return

  let theTree = TreeEntity.load(treeId.toHexString())
  if(!theTree)
    return

  //let theTree = TreeEntity.load(event.params.treeId.toHexString())
  theTree.lastFundedDate = event.params._event.block.timestamp
  theTree.currentFund = event.params.totalFund
  theTree.totalFund = theTree.totalFund.plus(event.params.totalFund)

  let owner = loadOrCreateActor(event.params.owner.toHexString(), 'owner')
  let ownedTrees = owner.ownedTrees
  ownedTrees.push(theTree.id)
  owner.ownedTrees = ownedTrees
  owner.save()
  
  theTree.owner = event.params.owner.toHexString()
  
  let contractTreeFactory = TreeFactory.bind(event.address)  
  theTree.planterRemainingBalance = contractTreeFactory.treeToPlanterRemainingBalance(event.params.treeId)
  theTree.ambassadorRemainingBalance = contractTreeFactory.treeToAmbassadorRemainingBalance(event.params.treeId)
  
  let gbId = contractTreeFactory.treeToGB(event.params.treeId);
  let greenBlock = GBEntity.load(gbId.toHexString())
  theTree.ambassador = greenBlock.ambassador
  
  let planter = loadOrCreateActor(theTree.planter, "planter")
  planter.totalFund = planter.totalFund.plus(event.params.planterBalance)
  planter.save()

  let ambassador = loadOrCreateActor(theTree.ambassador, "ambassador")
  ambassador.totalFund = ambassador.totalFund.plus(event.params.ambassadorBalance)
  ambassador.save()

  theTree.save()
  upsertFund("treejerTotalFund", contractTreeFactory.treejerFund())
  upsertFund('ambassadorsTotalFunds', event.params.ambassadorBalance)
  upsertFund('plantersTotalFunds', event.params.planterBalance)
  upsertFund('totalFund', event.params.totalFund)
}

export function handleTreePlanted(event: TreePlantedEvent): void {

  let theTree = new TreeEntity(event.params.id.toHex())
  theTree.latitude = event.params.latitude
  theTree.longitude = event.params.longitude
  theTree.plantedDate = event.params.plantedDate

  theTree.currentFund = new BigInt(0)
  theTree.totalFund = new BigInt(0)

   // Bind the contract to the address that emitted the event
  let contractTreeFactory = TreeFactory.bind(event.address)  

  let tree = contractTreeFactory.trees(event.params.id)
  theTree.birthDate = tree.value3
  theTree.lastFundedDate = tree.value4
  theTree.height = new BigInt(tree.value5)
  theTree.diameter = new BigInt(tree.value6)

  let treeTypeID = contractTreeFactory.treeToType(event.params.id)
  theTree.treeType = dummyConvertToHex(treeTypeID) 
  
  theTree.planter = contractTreeFactory.treeToPlanter(event.params.id).toHexString()
  
  let planter = loadOrCreateActor(theTree.planter, "planter")
  let plantedTrees = planter.plantedTrees
  plantedTrees.push(theTree.id)
  planter.plantedTrees = plantedTrees
  planter.save()

  let gBlock = contractTreeFactory.treeToGB(event.params.id)
  theTree.greenBlock = gBlock.toHexString()

  theTree.save()
}

export function handleTreejerFundWithdrawn(event: TreejerFundWithdrawn): void {
  let amount = getFund('treejerTotalWithdraw')
  if(!amount)
    amount = new BigInt(0)
  amount = amount.plus(event.params.amount)
  upsertFund("treejerTotalWithdraw", amount)
}
