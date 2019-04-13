"use strict"

var ingredientNames, attributeNames, posNames
var materials, equips, templets
function compareRarity(a, b) {
	if (a.rarity != b.rarity) return b.rarity - a.rarity
	return a.type - b.type
}
function getImgNode(value) {
	var foo = document.createElement("div")
	foo.className = "item"
	foo.oncontextmenu = longClick
	foo.ontouchmove = moveIn
	foo.obj = this
	var img = document.createElement("img")
	img.classList = "bg"
	img.src = "/img/item/item_" + this.type + "_L.png";
	foo.appendChild(img)
	if (value > 0) { // undefined > 0 = false
		var bar = document.createElement("span")
		bar.className = "sortv"
		bar.innerHTML = this.value
		foo.appendChild(bar)
	}
	return foo
}
$.get("names.json", function(response){
	langs = response.lang
	ingredientNames = response.ingredients
	attributeNames = response.attribs
	posNames = response.position
	check()
})
$.get("materials.json", function(response,status,xhr){
	materials = response
	materials.sort(compareRarity)
	for (var mi in materials) {
		materials[mi].getImgNode = getImgNode
		materials[mi].getDetailDesc = function() {
			var foo = ""
			for (var i = 0; i < ingredientNames[lang].length; ++i) {
				if (this.ingredients[i] > 0) foo += ingredientNames[lang][i] + "x" + this.ingredients[i] + "\n"
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
			for (var i = 0; i < attributeNames[lang].length; ++i) {
				if (this.attribs[i] instanceof Array) {
					if (this.attribs[i][0] > 0) {
						var v1 = getFloatStr(this.attribs[i][0], this.floating)
						var v2 = getFloatStr(this.attribs[i][1], this.floating)
						if ([14, 15, 16, 17].indexOf(i) != -1) v2 = "2" // mmp
						foo += attributeNames[lang][i].replace("{$v1}", v1).replace("{$v2}", v2) + "\n"
					}
				} else {
					if (this.attribs[i] > 0) {
						foo += attributeNames[lang][i].replace("{$v}", getFloatStr(this.attribs[i], this.floating)) + "\n"
					}
				}
			}
			return foo.slice(0, -1)
		}
	}
	check()
})
$.get(document.domain.startsWith("diaoyf") ? "/recipe_v2/templets.php" : "templets.json", function(response){
	templets = response
	check()
})

function getItem(key) {
	if (typeof key == "object") return key
	if (key === undefined) return undefined
	for (var i in materials) if (materials[i].type == key) return materials[i]
	for (var i in equips) if (equips[i].type == key) return equips[i]
	for (var i in materials) if (materials[i].name[lang] == key) return materials[i]
	for (var i in equips) if (equips[i].name[lang] == key) return equips[i]
	return undefined
}

function check() {
	if (ingredientNames != undefined && materials != undefined && equips != undefined && templets != undefined) {
		$(function(){uiInit()})
	}
}

function getFloatStr(value, floating) {
	if (!floating) return value
	var min = Math.round(value * .8)
	var max = Math.round(value * 1.2)
	if (min == max) return min
	return min + "~" + max
}
