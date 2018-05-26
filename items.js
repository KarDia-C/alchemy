"use strict"

var ingredientNames, attributeNames
var materials, equips
function compareRarity(a, b) {
	if (a.rarity != b.rarity) return b.rarity - a.rarity
	return a.type - b.type
}
function getImgNode() {
	var foo = document.createElement("span")
	foo.style.backgroundImage = "url(/img/item/item_" + this.type + "_L.png)"
	foo.className = "item"
	foo.oncontextmenu = longClick
	foo.obj = this
	return foo
}
function getHighlightImgNode() {
	var foo = document.createElement("span")
	foo.style.backgroundImage = "url(/img/item/item_" + this.type + "_L.png)"
	foo.className = "highlight r" + this.rarity
	foo.obj = this
	return foo
}
$.get("names.json", function(response){
	ingredientNames = response.ingredients
	attributeNames = response.attribs
	check()
})
$.get("materials.json", function(response,status,xhr){
	materials = response
	materials.sort(compareRarity)
	for (var mi in materials) {
		/*
		materials[mi].getDesc = function(){
			var foo = this.name
			for (var i = 0; i < ingredientNames.length; ++i)
				if (this.ingredients[i] > 0)
					foo += "\r\n" + ingredientNames[i] + "x" + this.ingredients[i]
			return foo
		}
		*/
		materials[mi].getImgNode = getImgNode
		materials[mi].getHighlightImgNode = getHighlightImgNode
		materials[mi].getDetailDesc = function() {
			var foo = ""
			for (var i = 0; i < ingredientNames.length; ++i) {
				if (this.ingredients[i] > 0) foo += ingredientNames[i] + "x" + this.ingredients[i] + "\n"
			}
			return foo.slice(0, -1)
		}
	}
	check()
})
$.get("equips.json", function(response){
	equips = response
	equips.sort(compareRarity)
	for (var mi in equips) {
		equips[mi].getImgNode = getImgNode
		equips[mi].getDetailDesc = function() {
			var foo = ""
			for (var i = 0; i < attributeNames.length; ++i) {
				if (this.attribs[i] instanceof Array) {
					if (this.attribs[i][0] > 0) {
						foo += attributeNames[i].replace("{$v1}", this.attribs[i][0]).replace("{$v2}", this.attribs[i][1]) + "\n"
					}
				} else {
					if (this.attribs[i] > 0) {
						foo += attributeNames[i].replace("{$v}", this.attribs[i]) + "\n"
					}
				}
			}
			return foo.slice(0, -1)
		}
	}
	check()
})

function getItem(key) {
	if (typeof key == "object") return key
	for (var i in materials) if (materials[i].type == key) return materials[i]
	for (var i in equips) if (equips[i].type == key) return equips[i]
	for (var i in materials) if (materials[i].name == key) return materials[i]
	for (var i in equips) if (equips[i].name == key) return equips[i]
	return undefined
}

var uiInit

function check() {
	if (ingredientNames != undefined && attributeNames != undefined && materials != undefined && equips != undefined) {
		if (uiInit == undefined) $(function(){uiInit()})
		else uiInit()
	}
}
