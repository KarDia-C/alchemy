"use strict"

// const rarityWeights = [0, 1, 2, 3, 4, 5]
var rarityWeights = [0, 1, 2, 3, 4, 5]

function simulate(items) {
	var input = arguments[0] instanceof Array ? items : arguments
	var ingredients = new Array(ingredientNames[lang].length)
	ingredients.fill(0)
	var material = []
	var sum = 0
	for (i = 0; i < input.length; ++i) {
		input[i] = getItem(input[i])
		if (input[i] != undefined) {
			for (var j = 0; j < input[i].ingredients.length; ++j) {
				ingredients[j] += input[i].ingredients[j]
				sum += input[i].ingredients[j]
			}
			if (material[input[i]["type"]] == undefined) material[input[i]["type"]] = 1
			else ++material[input[i]["type"]]
		}
	}
	var result = equips.slice(0)
	result.ingredients = ingredients
	if (sum <= 50) {
		result.gold = 500
		result.hour = 1
	} else if (sum <= 75) {
		result.gold = 1000
		result.hour = 2
	} else if (sum <= 100) {
		result.gold = 1600
		result.hour = 3
	} else if (sum <= 125) {
		result.gold = 2300
		result.hour = 4
		rarityWeights = [0, 1e-10, 2, 4, 4, 5]
	} else {
		result.gold = 3100
		result.hour = 5
		rarityWeights = [0, 1e-10, 1e-10, 4, 6, 5]
	}
	sum = [0, 0, 0, 0, 0, 0]
	for (var i = 0; i < result.length; ++i) {
		while (i < result.length && (!result[i].alchemy || result[i].available.indexOf(lang) == -1)) result.splice(i, 1)
		if (i >= result.length) break
		result[i]["chance"] = result[i]["weight"] // 复制一份，避免修改原值
		for (j in result[i]["core"]) {
			if (result[i]["core"][j] > 0 && !(result[i]["core"][j] <= material[j])) { // number <= undefined = false
				result[i]["chance"] = 0
				break
			}
		}
		if (result[i]["c+i"] == undefined) {
			result[i]["c+i"] = result[i]["ingredients"].slice(0)
			for (j in result[i]["core"]) {
				var item = getItem(j)
				for (var k = 0; k < item["ingredients"].length; ++k)
					result[i]["c+i"][k] += item["ingredients"][k] * result[i]["core"][j]
			}
		}
		for (j = 0; j < result[i]["c+i"].length; ++j) {
			if (result[i]["c+i"][j] > ingredients[j]) {
				result[i]["chance"] = 0
				break
			}
		}
		if (result[i]["chance"] < 0) result[i]["chance"] = 0
		sum[result[i]['rarity']] += result[i]["chance"]
	}
	var rws = 0
	for (i = 0; i < sum.length; ++i)
		if (sum[i] > 0) rws += rarityWeights[i]
		else sum[i] = 1 // 反正都是 0 / sum 没关系啦
	if (rws == 0) rws = 1 // 同上
	for (i = 0; i < result.length; ++i) {
		result[i]["pr"] = result[i]["chance"] / sum[result[i]['rarity']] * rarityWeights[result[i]['rarity']] / rws
		result[i]["prstr"] = (result[i]["pr"]*100).toFixed(2) + "%"
	}
	result.sort(function(a, b){
		if (a["pr"] != b["pr"]) return b["pr"] - a["pr"]
		if (a["rarity"] != b["rarity"]) return b["rarity"] - a["rarity"]
		return a["type"] - b["type"]
	})
	rarityWeights = [0, 1, 2, 3, 4, 5]
	return result
}
