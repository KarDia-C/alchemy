"use strict";

$(function(){
	var $tabs = $(".tab")
	for (var i = 0; i < $tabs.length; ++i) {
		$tabs[i].tab = i
		$tabs[i].onclick = function() { selectTab(this.tab) }
		$tabs[i].style.opacity = 0
	}
	selectTab(2)
})

var selectedTab

function selectTab(index) {
	var $tabs = $(".tab")
	var $tabdivs = $(".tabd")
	if (selectedTab != undefined) {
		$tabs[selectedTab].style.opacity = 0
		$tabdivs[selectedTab].style.display = "none"
	}
	$tabs[index].style.opacity = ""
	$tabdivs[index].style.display = "block"
	if (index != 2) hideSelector()
	selectedTab = index
}
