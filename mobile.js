"use strict"

function resetLayout() {
	if (window.innerWidth > document.body.clientWidth) {
		var d = window.innerWidth - document.body.clientWidth
		$("#result").css("width", "calc(60vw - "+(d*.6)+"px)")
		$("#sc .item").css("width", "16vw")
		$("#sc .item").css("height", "16.512vw")
	} else {
		$("#result").css("width", "60vw")
		$("#sc .item").css("width", "18vw")
		$("#sc .item").css("height", "18.576vw")
	}
}
window.addEventListener("resize", resetLayout)
$(resetLayout)

var selected = []
var showing = false

function toggleSelector() {
	if (showing) hideSelector()
	else showSelector()
}

function showSelector() {
	$("#selector")[0].style.display = "block"
	showing = true
}

function hideSelector() {
	$("#selector")[0].style.display = "none"
	showing = false
}

function clickMaterial(event) {
	var count = event.currentTarget.count
	if (selected[count] == undefined) {
		showSelector()
	} else {
		setMaterial(count)
	}
}

function longClickMaterial(event) {
	var count = event.currentTarget.count
	event.preventDefault()
}

// function setMaterial(container, itemObj, updateSim = true) {
function setMaterial(container, itemObj, updateSim) {
	if (updateSim == undefined) updateSim = true
	if (container == -1) { // 自动添加
		for (var i = 0; i < 4; ++i) if (selected[i] == undefined) {
			container = i
			break
		}
		if (container == -1) return // 没有空位
	}
	var containerDom = $(".select")[container]
	if (itemObj == selected[container]) return
	if (selected[container] != undefined) { // 清除原物品
		containerDom.removeChild(containerDom.children[0])
		containerDom.children[0].style.display = ""
	}
	if (itemObj != undefined) { // 添加新物品
		containerDom.children[0].style.display = "none"
		containerDom.insertBefore(itemObj.getImgNode(), containerDom.children[0])
	}
	selected[container] = itemObj
	if (updateSim) setResult(simulate(selected))
}

function setResult(result) {
	if (result == undefined) result = simulate(selected)
	var table = $("#rslttable")[0]
	table.innerHTML = ""
	for (var i = 0; i < result.length; ++i) table.appendChild(getResultTRNode(result[i]))
	var state = $("#state")[0]
	var statestr = "时间：" + result.hour + "h<br/>金币：<img src=\"gold.png\" id=\"gold\" />" + result.gold + "<hr/>"
	for (var i = 0; i < ingredientNames.length; ++i) if (result.ingredients[i] != 0) {
		statestr += ingredientNames[i] + "x" + result.ingredients[i] + "<br/>"
	}
	state.innerHTML = statestr.slice(0, -5)
}

function getResultTRNode(equip) {
	var root = document.createElement("tr")
	var img = document.createElement("td")
	img.appendChild(equip.getImgNode())
	root.appendChild(img)
	var pr = document.createElement("td")
	pr.innerHTML = equip.prstr
	root.appendChild(pr)
	var require = document.createElement("td")
	var reqstr = ""
	for (var core in equip.core) {
		reqstr += getItem(core).name
		if (equip.core[core] > 1) reqstr += "x" + equip.core[core]
		reqstr += "<br/>"
	}
	for (var i = 0; i < ingredientNames.length; ++i) if (equip.ingredients[i] != 0) {
		reqstr += ingredientNames[i] + "x" + equip.ingredients[i] + "<br/>"
	}
	require.innerHTML = reqstr.slice(0, -5)
	root.appendChild(require)
	return root
}

$(function(){
	var $items = $(".select")
	for (var i = 0; i < $items.length; ++i) {
		$items[i].count = i
		$items[i].onclick = clickMaterial
		$items[i].oncontextmenu = longClickMaterial
	}
})

function uiInit() {
	setResult()
	var sc = $("#sc")[0]
	for (var i = 0; i < materials.length; ++i) {
		var node = materials[i].getImgNode()
		node.onclick = function() {
			setMaterial(-1, this.obj)
		}
		sc.appendChild(node)
		sc.appendChild(document.createTextNode(" "))
	}
}
