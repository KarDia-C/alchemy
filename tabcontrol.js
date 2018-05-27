"use strict";

$(function(){
	var $tabs = $(".tab")
	for (var i = 0; i < $tabs.length; ++i) {
		$tabs[i].tab = i
		$tabs[i].onclick = function() { selectTab(this.tab) }
		$tabs[i].style.backgroundSize = "0"
	}
	selectTab(2)
})

var selectedTab

function selectTab(index) {
	var $tabs = $(".tab")
	var $tabdivs = $(".tabd")
	if (selectedTab != undefined) {
		$tabs[selectedTab].style.backgroundSize = "0" // 这种写法我自己都想吐槽。。
		$tabdivs[selectedTab].style.display = "none"
	}
	$tabs[index].style.backgroundSize = ""
	$tabdivs[index].style.display = "block"
	if (index != 2) hideSelector()
	selectedTab = index
}
