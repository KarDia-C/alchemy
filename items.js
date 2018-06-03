"use strict"

var ingredientNames, attributeNames, posNames
var materials, equips, templets
function compareRarity(a, b) {
	if (a.rarity != b.rarity) return b.rarity - a.rarity
	return a.type - b.type
}
function getImgNode(value) {
	var foo = document.createElement("span")
	foo.style.backgroundImage = "url(/img/item/item_" + this.type + "_L.png)"
	foo.className = "item"
	foo.oncontextmenu = longClick
	foo.ontouchmove = moveIn
	foo.obj = this
	if (value > 0) { // undefined > 0 = false
		var bar = document.createElement("span")
		bar.className = "sortv"
		bar.innerHTML = this.value
		foo.appendChild(bar)
	}
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
	posNames = response.position
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
						var v1 = getFloatStr(this.attribs[i][0])
						var v2 = getFloatStr(this.attribs[i][1])
						if (attributeNames[i].indexOf("眩晕") != -1 || attributeNames[i].indexOf("冰冻") != -1) v2 = "2" // mmp
						foo += attributeNames[i].replace("{$v1}", v1).replace("{$v2}", v2) + "\n"
					}
				} else {
					if (this.attribs[i] > 0) {
						foo += attributeNames[i].replace("{$v}", getFloatStr(this.attribs[i])) + "\n"
					}
				}
			}
			return foo.slice(0, -1)
		}
	}
	check()
})
$.get("templets.json", function(response){
	templets = response
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

function check() {
	if (ingredientNames != undefined && materials != undefined && equips != undefined && templets != undefined) {
		$(function(){uiInit()})
	}
}

function getFloatStr(value) {
	var min = Math.round(value * .8)
	var max = Math.round(value * 1.2)
	if (min == max) return min
	return min + "~" + max
}
