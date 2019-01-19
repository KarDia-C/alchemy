$(function() {
	var status = 0
	var show = function() {
		if (status != 0) return;
		status = 1
		$("#international").css("display", "block").animate({top: "20vw", opacity: "1"}, 800, function() {
			status = 2
		})
	}
	$(document.body).click(function() {
		if (status != 2) return
		status = 3
		$("#international").animate({top: "30vw", opacity: "0"}, 800, function() {
			$("#international").css("display", "none").css("top", "10vw")
			status = 0
		})
	})
	$("#twbtn")[0].onclick = show
	$("#international").html('<p style="font-weight: bold; font-size: 6vw; margin: 2vw;">你遊台服準備開服啦！</p><p>#牧羊人之心 事前登錄啟動！<br>&#128051; 點擊前往預約：<a href="https://kardia.winyourgames.com/pre-register/" target="_blank">https://kardia.winyourgames.com/pre-register/</a><br>孵化超絕可愛的魔物蛋！<br>馴養個性十足的魔物娘！<br>踏上緊張又刺激的冒險之旅！<br>成為卡露蒂亞最強的魔物娘馴養師！<br>&#128051;即刻起！參與預約，不僅能獲得超多好禮，還有繁体中文版限定魔物娘等你來領走喔!<br>———————————————————<br>來自馴養師協會的隆重邀請</p><p><a href="https://www.taptap.com/app/156055" target="_blank">TapTap</a>的安卓預約需自備梯子哦</p>')
	$("#international a").click(function(e) {
		e.stopPropagation()
	})
	if (!localStorage.twviewed) {
		localStorage.twviewed = 1
		setTimeout(show, 100)
	}
})