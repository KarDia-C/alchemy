var showing803 = false

$(function() {
	$("#803btn")[0].onclick = function() {
		if (showing803) return;
		showing803 = true
		console.log("xxx")
		$("#803").css("display", "block").animate({top: "20vw", opacity: "1"}, 800, function() {
			document.body.onclick = function() {
				document.body.onclick = null
				$("#803").animate({top: "30vw", opacity: "0"}, 800, function() {
					$("#803").css("display", "none").css("top", "10vw")
					showing803 = false
				})
			}
		})
	}
})