"use strict"

var filterRules = [0]

$(function(){
	var $filters = $(".filter")
	for (var i = 0; i < $filters.length; ++i) {
		var filter = $filters[i]
		if (filter.attributes.ftype.value == "rarity") filter.onclick = function() {
			--filterRules[0]
			if (filterRules[0] == -1) filterRules[0] = 4 // 等史诗材料出现后要改成 = 5
			this.className = "filter f" + filterRules[0]
			filterChanged()
		}
		else filter.onclick = function() {
			if (this.classList.contains("f1")) { // 已选中，取消选中
				this.classList.remove("f1")
				filterRules.splice(filterRules.indexOf(this.attributes.ftype.value), 1)
			} else {
				this.classList.add("f1")
				filterRules.push(parseInt(this.attributes.ftype.value))
			}
			filterChanged()
		}
	}
})

function filter(materials) {
	var foo = []
	for (var i = 0; i < materials.length; ++i) {
		if (filterRules[0] != 0 && materials[i].rarity != filterRules[0]) continue
		var f = true
		materials[i].value = 0
		for (var j = 1; j < filterRules.length; ++j) if (materials[i].ingredients[filterRules[j]] <= 0) {
			f = false
			break
		} else materials[i].value += materials[i].ingredients[filterRules[j]]
		if (f) foo.push(materials[i])
	}
	foo.sort(function(a, b){
		if (a.value == 0) {
			if (a.rarity != b.rarity) return b.rarity - a.rarity
			return a.type - b.type
		}
		if (a.value == b.value) return b.value - a.value
		return a.type - b.type
	})
	return foo
}
