"use strict";

$(function(){
	selectTab(2)
})

var selectedTab

function selectTab(index) {
	var $tabs = $(".tab")
	if (selectedTab != undefined) $tabs[selectTab].style.display = "none"
	$tabs[index].style.display = "block"
	selectTab = index
}
