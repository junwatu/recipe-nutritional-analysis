import * as GridDB from './libs/griddb.cjs';
import { generateRandomID } from './libs/rangen.js';

const { collectionDb, store, conInfo } = await GridDB.initGridDbTS();

export async function saveData({ recipe, nutrition, ascii }) {
	const id = generateRandomID();
	const recipeIngredients = String(recipe);
	const nutritionDetails = String(nutrition);
	const asciiNutrition = String(ascii);

	const packetInfo = [parseInt(id), recipeIngredients, nutritionDetails, asciiNutrition];
	const saveStatus = await GridDB.insert(packetInfo, collectionDb);
	return saveStatus;
}

export async function getDatabyID(id) {
	return await GridDB.queryByID(id, conInfo, store);
}

export async function getAllData() {
	return await GridDB.queryAll(conInfo, store);
}

export async function info() {
	return await GridDB.containersInfo(store);
}
