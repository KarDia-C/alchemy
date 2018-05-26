"use strict"

var infodiv

$(function(){
	var $info = $(".info")
	if ($info.length > 0) infodiv = $info[0]
	else {
		var main = $("#main")[0]
		infodiv = document.createElement("div")
		infodiv.className = "info"
		main.insertBefore(infodiv, main.children[0])
	}
	document.body.ontouchstart = hideInfo
})

// Example: showInfo(event, "阿芙杖", ["攻击+19", "暴击+7%", "吸血3%"])
// or       showInfo(event, "阿芙杖", "攻击+19\n暴击+7%\n吸血3%")
// position should contain pageX and pageY
function showInfo(position, title, detail) {
	if (detail instanceof Array) {
		detail = detail.join("\n")
	}
	var name = document.createElement("span")
	name.className = "name"
	name.innerText = title
	var br = document.createElement("br")
	var details = document.createElement("span")
	details.className = "detail"
	details.innerText = detail
	infodiv.innerHTML = ""
	infodiv.appendChild(name)
	infodiv.appendChild(br)
	infodiv.appendChild(details)
	infodiv.style.display = "inline-block"
	infodiv.style.left = (position.pageX - infodiv.clientWidth / 2) + "px"
	infodiv.style.top = (position.pageY - infodiv.clientHeight - document.body.clientWidth * .15) + "px"
}

function hideInfo() {
	infodiv.style.display = "none"
}
