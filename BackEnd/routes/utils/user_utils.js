const res = require("express/lib/response");
const { json } = require("express/lib/response");
const DButils = require("./DButils");


async function marked(user_id, recipe_id){
    return await DButils.execQuery(`select * from FavoriteRecipes where user_id ='${user_id}' and recipe_id ='${recipe_id}'`);
}
async function markAsFavorite(user_id, recipe_id){
    await DButils.execQuery(`insert into FavoriteRecipes values ('${user_id}',${recipe_id})`);
}
async function removefromFavorite(user_id, recipe_id){
    return await DButils.execQuery(`delete from FavoriteRecipes where user_id ='${user_id}' and recipe_id ='${recipe_id}'`);
}
async function removefromPrivate(user_id, recipe_id){
    await DButils.execQuery(`delete from PrivateRecipes where user_id ='${user_id}' and recipe_id ='${recipe_id}'`);
}
async function removefromFamily(user_id, recipe_id){
    return await DButils.execQuery(`delete from FamilyRecipes where user_id ='${user_id}' and recipe_id ='${recipe_id}'`);
}
async function getFavoriteRecipes(user_id){
    const recipes_id = await DButils.execQuery(`select recipe_id from FavoriteRecipes where user_id='${user_id}'`);
    return recipes_id;
}
async function addPrivateRecipe(user_id,image,title,minutes,vegan,vegetarian,gluten,ingredients,instructions){
    await DButils.execQuery(`insert into PrivateRecipes values ('0','${user_id}','${image}','${title}','${minutes}','0',${vegan},${vegetarian},${gluten},'${ingredients}','${instructions}')`);
}
async function getPrivateRecipes(user_id){
    var result = []
    const private_recipes = await DButils.execQuery(`select * from PrivateRecipes where user_id='${user_id}'`);
    for (let i = 0 ; i<private_recipes.length; i++){
        var obj = {
            "id":private_recipes[i].recipe_id,
            "image":private_recipes[i].image,
            "title":private_recipes[i].title,
            "readyInMinutes":private_recipes[i].minutes,
            "popularity":private_recipes[i].popularity,
            "vegan":Boolean(private_recipes[i].vegan),
            "vegetarian":Boolean(private_recipes[i].vegetarian),
            "glutenFree":Boolean(private_recipes[i].glutenFree),
            "ingredients":private_recipes[i].ingredients,
            "instructions":private_recipes[i].instructions
            }
            result.push(obj)
    }
    return result
}
async function getPrivateRecipeFullinfo(user_id, recipe_id)
{   
    var result = []
    console.log('private')
    const private_recipes = await DButils.execQuery(`select * from PrivateRecipes where user_id ='${user_id}' and recipe_id='${recipe_id}'`);
    for (let i = 0 ; i<private_recipes.length; i++){
        
        var obj = {
            "image":private_recipes[i].image,
            "title":private_recipes[i].title,
            "readyInMinutes":private_recipes[i].minutes,
            "aggregateLikes":private_recipes[i].popularity,
            "vegan":Boolean(private_recipes[i].vegan),
            "vegetarian":Boolean(private_recipes[i].vegetarian),
            "glutenFree":Boolean(private_recipes[i].glutenFree),
            "ingredients":private_recipes[i].ingredients,
            "instructions":private_recipes[i].instructions
            }
            result.push(obj)
    }
    return result[0]
}
async function getFamilyRecipeFullinfo(user_id, recipe_id)
{   
    var result = []
    const private_recipes = await DButils.execQuery(`select * from FamilyRecipes where user_id ='${user_id}' and recipe_id='${recipe_id}'`);
    for (let i = 0 ; i<private_recipes.length; i++){
        var obj = {
            "image":private_recipes[i].image,
            "title":private_recipes[i].title,
            "owner":private_recipes[i].recipe_owner,
            "custom_time":private_recipes[i].custom_time,
            "readyInMinutes":private_recipes[i].minutes,
            "aggregateLikes":private_recipes[i].popularity,
            "vegan":Boolean(private_recipes[i].vegan),
            "vegetarian":Boolean(private_recipes[i].vegetarian),
            "glutenFree":Boolean(private_recipes[i].glutenFree),
            "ingredients":private_recipes[i].ingredients,
            "instructions":private_recipes[i].instructions
            }
            result.push(obj)
    }
    return result[0]
}

async function addFamilyRecipe(user_id,recipe_owner,custom_time,imageUrl,title,minutes,vegan,vegetarian,gluten,ingrediants,instructions){
    await DButils.execQuery(`insert into FamilyRecipes values ('0','${user_id}','${recipe_owner}','${custom_time}','${imageUrl}','${title}','${minutes}',${vegan},${vegetarian},${gluten},'${ingrediants}','${instructions}')`);
}
  
async function getFamilyRecipes(user_id){
    let result = []
    const familyrecipes = await DButils.execQuery(`select * from FamilyRecipes where user_id='${user_id}'`);
    for (let i = 0 ; i<familyrecipes.length; i++){
        var obj = {
            "id":familyrecipes[i].recipe_id,
            "recipe_owner":familyrecipes[i].recipe_owner,
            "image":familyrecipes[i].imageUrl,
            "title":familyrecipes[i].title,
            "readyInMinutes":familyrecipes[i].minutes,
            "ingredients":familyrecipes[i].ingredients,
            "instructions":familyrecipes[i].instructions
            }
            result.push(obj)
    }
    return result
}
async function addWatchedRecipes(user_id, recipe_id) {
    // Check if the entry already exists
    const existingEntry = await DButils.execQuery(`
        SELECT * FROM WatchedRecipes
        WHERE user_id = '${user_id}' AND recipe_id = '${recipe_id}'
    `);

    // If the entry exists, update the watched_time to current timestamp
    if (existingEntry.length > 0) {
        await DButils.execQuery(`
            UPDATE WatchedRecipes
            SET watched_time = CURRENT_TIMESTAMP
            WHERE user_id = '${user_id}' AND recipe_id = '${recipe_id}'
        `);
    } else {
        // If the entry doesn't exist, insert a new record
        await DButils.execQuery(`
            INSERT INTO WatchedRecipes (user_id, recipe_id)
            VALUES ('${user_id}', '${recipe_id}')
        `);
    }

    // Ensure the user only has a maximum of 3 last watched recipes
    const watchedRecipes = await DButils.execQuery(`
        SELECT * FROM WatchedRecipes
        WHERE user_id = '${user_id}'
        ORDER BY watched_time DESC
    `);

    if (watchedRecipes.length > 3) {
        // Delete the oldest watched recipe (last in the list)
        const oldestRecipe = watchedRecipes[watchedRecipes.length - 1];
        await DButils.execQuery(`
            DELETE FROM WatchedRecipes
            WHERE user_id = '${user_id}' AND recipe_id = '${oldestRecipe.recipe_id}'
        `);
    }
}


async function getWatchedRecipes(user_id){
    return await DButils.execQuery(`select * from WatchedRecipes where user_id='${user_id}'`)
}

exports.marked = marked;
exports.getPrivateRecipeFullinfo = getPrivateRecipeFullinfo;
exports.getFamilyRecipeFullinfo = getFamilyRecipeFullinfo;
exports.markAsFavorite = markAsFavorite;
exports.removefromFavorite = removefromFavorite;
exports.removefromPrivate = removefromPrivate;
exports.removefromFamily = removefromFamily;
exports.getFavoriteRecipes = getFavoriteRecipes;
exports.addPrivateRecipe = addPrivateRecipe;
exports.getPrivateRecipes = getPrivateRecipes;
exports.addFamilyRecipe = addFamilyRecipe;
exports.getFamilyRecipes = getFamilyRecipes;
exports.addWatchedRecipes = addWatchedRecipes;
exports.getWatchedRecipes = getWatchedRecipes;

