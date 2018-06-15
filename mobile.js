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

var showingInfo = false

function longClick(event) {
	event.preventDefault()
	showInfo(event, this.obj.name, this.obj.getDetailDesc())
	showingInfo = true
}

function moveIn(event) {
	if (showingInfo) {
		event = event.touches[0]
		var obj = document.elementFromPoint(event.clientX, event.clientY)
		if (obj != null) obj = obj.obj
		if (obj != undefined) showInfo(event, obj.name, obj.getDetailDesc())
		else hideInfo()
	}
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
	}
	document.body.ontouchstart = function() {
		hideInfo()
		showingInfo = false
	}
})

function uiInit() {
	setResult()
	filterChanged()

	// 生成俩表格
	var table = document.createElement("table")
	var thead = table.createTHead()
	var tbody = table.createTBody()
	table.border = "1"
	table.cellSpacing = "0"
	table.className = "infotable"
	var tr = thead.insertRow()
	tr.innerHTML = "<th style='width:15%;'></th>"
	for (var i = 0; i < ingredientNames.length; i += 2) tr.innerHTML += "<th style='width:10%;'>" + ingredientNames[i] + ((i + 1) >= ingredientNames.length ? "" : "<hr>" + ingredientNames[i + 1]) + "</th>"
	tr.innerHTML += "<th style='width:15%;'>来源</th>"
	var foo = table.cloneNode()
	foo.innerHTML = table.innerHTML
	foo.className = "forzen"
	$("#materials")[0].appendChild(foo)
	$("#materials")[0].appendChild(table)
	for (i = 0; i < materials.length; ++i) {
		tr = tbody.insertRow()
		var img = tr.insertCell()
		img.appendChild(materials[i].getImgNode())
		img.innerHTML += "<br>" + materials[i].name
		if (materials[i].name.length > 6) img.style.fontSize = "3vw"
		for (var j = 0; j < ingredientNames.length; j += 2) tr.innerHTML += "<td>" + materials[i].ingredients[j] + ((j + 1) >= ingredientNames.length ? "" : "<hr>" + materials[i].ingredients[j + 1]) + "</td>"
		tr.innerHTML += "<td><div class='source'>" + materials[i].sources.replace(/\n/g, "<br>") + "</div></td>"
	}

	var filter = document.createElement("div")
	filter.id = "equipFilter"
	$("#equips")[0].appendChild(filter)
	var line = document.createElement("div")
	line.className = "filterLine"
	filter.appendChild(line)
	var lined = document.createElement("div")
	line.appendChild(lined)
	for (i = 0; i < attributeNames.length; ++i) {
		var btn = document.createElement("button")
		btn.innerHTML = attributeNames[i].slice(0, attributeNames[i].search(/[{+-]/))
		btn.className = "filter"
		btn.ftype = 0
		btn.onclick = equipFilter
		lined.appendChild(btn)
	}
	line = document.createElement("div")
	line.className = "filterLine"
	filter.appendChild(line)
	lined = document.createElement("div")
	line.appendChild(lined)
	for (i = 0; i < posNames.length; ++i) {
		btn = document.createElement("button")
		btn.innerHTML = posNames[i]
		btn.className = "filter"
		btn.ftype = 1
		btn.onclick = equipFilter
		lined.appendChild(btn)
	}
	var tablediv = document.createElement("div")
	tablediv.id = "equipTable"
	$("#equips")[0].appendChild(tablediv)
	table = document.createElement("table")
	thead = table.createTHead()
	tbody = table.createTBody()
	table.border = "1"
	table.cellSpacing = "0"
	table.className = "infotable"
	thead.innerHTML = "<tr><th style='width:15%;'></th><th style='width:42%;'>属性</th><th style='width:10%;'>部位</th><th style='width:33%;'>推荐公式</th></tr>"
	foo = table.cloneNode()
	foo.innerHTML = table.innerHTML
	foo.classList.add("forzen")
	tablediv.appendChild(foo)
	tablediv.appendChild(table)
	for (i = 0; i < equips.length; ++i) {
		tr = tbody.insertRow()
		tr.equip = equips[i]
		img = tr.insertCell()
		img.appendChild(equips[i].getImgNode())
		img.innerHTML += "<br>" + equips[i].name
		if (equips[i].name.length > 6) img.style.fontSize = "3vw"
		tr.innerHTML += "<td>" + equips[i].getDetailDesc().replace(/\n/g, "<br>") + "</td><td>" + posNames[equips[i].position - 1] + "</td>"
		var recommend = document.createElement("td")
		tr.appendChild(recommend)
		if (templets[equips[i].type] != undefined) {
			var tmp = templets[equips[i].type]
			var p = document.createElement("div")
			p.className = "recommend"
			recommend.appendChild(p)
			for (j = 0; j < tmp.length; ++j) {
				table = document.createElement("table")
				table.cellPadding = "0"
				table.createTBody()
				tr = [table.insertRow(), table.insertRow()]
				for (var k = 0; k < 4; ++k) {
					var foo = tr[k >> 1].insertCell()
					if (tmp[j][k] != undefined) foo.appendChild(getItem(tmp[j][k]).getImgNode())
				}
				var result = simulate(tmp[j])
				tr[0].insertCell().innerHTML = "<img class='gold' src='gold.png' />" + result.gold
				for (k = 0; k < result.length; ++k) if (result[k].type == equips[i].type) {
					tr[1].insertCell().innerHTML = result[k].prstr
					break
				}
				p.appendChild(table)
				if (j != tmp.length - 1) p.appendChild(document.createElement("hr"))
			}
		}
	}
}

function filterChanged() {
	var sl = $("#sl")[0]
	sl.innerHTML = ""
	var filtered = filter(materials)
	for (var i = 0; i < filtered.length; ++i) {
		var node = filtered[i].getImgNode(filtered[i].value)
		node.onclick = function() {
			setMaterial(-1, this.obj)
		}
		sl.appendChild(node)
		sl.appendChild(document.createTextNode(" "))
	}
}

var equipFilters = [-1, -1]
function equipFilter() {
	if (this.classList.contains("f1")) {
		this.classList.remove("f1")
		equipFilters[this.ftype] = -1
	} else {
		if (equipFilters[this.ftype] != -1) this.parentNode.children[equipFilters[this.ftype]].classList.remove("f1")
		this.classList.add("f1")
		for (var i = 0; i < this.parentNode.children.length; ++i) if (this.parentNode.children[i] == this) {
			equipFilters[this.ftype] = i
			break
		}
	}
	var equipTable = $("#equipTable")[0].children[1].tBodies[0]
	for (i = 0; i < equipTable.children.length; ++i) {
		var flag = true
		var equip = equipTable.children[i].equip
		if (equipFilters[0] != -1 && (equip.attribs[equipFilters[0]] instanceof Array ? equip.attribs[equipFilters[0]][0] == 0 : equip.attribs[equipFilters[0]] == 0)) flag = false
		if (equipFilters[1] != -1 && equip.position != equipFilters[1] + 1) flag = false
		equipTable.children[i].style.display = flag ? "table-row" : "none"
	}
}
