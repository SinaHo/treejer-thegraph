import { BigInt, Address } from "@graphprotocol/graph-ts"

import { 
    Actor as ActorEntity,
    Fund as FundEntity,
} from '../generated/schema'

export function dummyConvertToHex(num: number): string {  
  return `0x${num.toString(16)}`
}

export function upsertFund(id: string, amount: BigInt): void {
  let theFund = FundEntity.load(id)
  if (theFund == null) {
    theFund = new FundEntity(id)
    theFund.amount = new BigInt(0)
  }
  theFund.amount = theFund.amount.plus(amount)
  theFund.save()
}

export function getFund(id: string): BigInt {
  let theFund = FundEntity.load(id)
  if (theFund == null) {
    theFund = new FundEntity(id)
    theFund.amount = new BigInt(0)
  }
  return theFund.amount
}

export function loadOrCreateActor(id: string, role: string=""): ActorEntity {
    let actor: ActorEntity
    actor = <ActorEntity> ActorEntity.load(id)
    
    if(actor === null)
    {
      actor = new ActorEntity(id)
      actor.totalFund = new BigInt(0)
      actor.credit = new BigInt(0)
      actor.totalWithdraw = new BigInt(0)
      actor.totalSeeds = new BigInt(0)
      actor.isAmbassador = false
      actor.isOwner = false
      actor.isPlanter = false
      actor.ownedTrees = []
      actor.plantedTrees = []
    }

    if(role != "") {
      if(role=="ambassador") {
        actor.isAmbassador = true
      }else if(role=="planter") {
        actor.isPlanter = true
      }else if(role=="owner") {
        actor.isOwner = true
      }
    }

    return actor
}