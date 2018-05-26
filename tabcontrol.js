"use strict";

$(function(){
	selectTab(2)
})

var selectedTab

function selectTab(index) {
	var $tabs = $(".tab")
	if (selectedTab != undefined) $tabs[selectedTab].style.display = "none"
	$tabs[index].style.display = "block"
	selectedTab = index
}
