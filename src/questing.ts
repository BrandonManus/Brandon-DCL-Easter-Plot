import { engine } from "@dcl/sdk/ecs"
import { getTriggerEvents, getActionEvents } from '@dcl/asset-packs/dist/events'
import { TriggerType } from '@dcl/asset-packs'
import { getPlayer } from "@dcl/sdk/players"
import { LSCQUEST_EVENTS, LSCQuestAction, LSCQuestConnect, lscQuestEvent } from "lsc-questing-dcl"

export const QUEST_ID = "Xyq7Wk" // Change to your Quest ID
export const STEP_ID = "Ld4H70" // Change to your Step ID
export const TASK_ID = "9uonE" // Change to your Task ID

export function LSCQuesting(){
    LSCQuestConnect(engine, getPlayer, QUEST_ID)

    const sceneEgg = engine.getEntityOrNullByName("assets/scene/qxg_drone.glb") //change your scene entity name here

	if (sceneEgg) {
		// detect triggers
		const triggers = getTriggerEvents(sceneEgg)
		triggers.on(TriggerType.ON_INPUT_ACTION, () => {
			console.log('Egg clicked!!')
			// custom code
			LSCQuestAction(QUEST_ID, STEP_ID, TASK_ID)
		})
	}
}

/////////////////// LSC QUESTING FUNCTIONS AND OPTIONAL EVENT LISTENERS ///////////////////

//// Starting a Quest
// LSCQuestStart(QUEST_ID)

//// Running a Quest Action
// LSCQuestAction(QUEST_ID, STEP_ID, TASK_ID)


//// Listenting to Quest Events
// lscQuestEvent.on(LSCQUEST_EVENTS.QUEST_STARTED, (eventInfo:any)=>{
// 	console.log('received a new quest event action', eventInfo)
// })

// lscQuestEvent.on(LSCQUEST_EVENTS.QUEST_COMPLETE, (eventInfo:any)=>{
// 	console.log('received a quest complete', eventInfo)
// })

// lscQuestEvent.on(LSCQUEST_EVENTS.QUEST_STEP_COMPLETE, (eventInfo:any)=>{
// 	console.log('received a new quest step complete', eventInfo)
// })

// lscQuestEvent.on(LSCQUEST_EVENTS.QUEST_TASK_COMPLETE, (eventInfo:any)=>{
// 	console.log('received a new quest task complete', eventInfo)
// })

// lscQuestEvent.on(LSCQUEST_EVENTS.QUEST_END, (eventInfo:any)=>{
// 	console.log('received a quest end', eventInfo)
// })

// lscQuestEvent.on(LSCQUEST_EVENTS.QUEST_ERROR, (eventInfo:any)=>{
// 	console.log('received a quest error', eventInfo)
// })

// lscQuestEvent.on(LSCQUEST_EVENTS.QUEST_DATA, (eventInfo:any)=>{
// 	console.log('received a quest data', eventInfo)
// })

// lscQuestEvent.on(LSCQUEST_EVENTS.QUEST_UPDATE, (eventInfo:any)=>{
// 	console.log('received a quest update', eventInfo)
// })