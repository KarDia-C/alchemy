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
	$("#international").html('<p style="font-weight: bold; font-size: 6vw; margin: 2vw;">你遊台服開服啦！！！</p><p>遊戲下載地址：<a href="https://kardia.winyourgames.com/">https://kardia.winyourgames.com/</a></p><p>歡迎關注以下渠道獲取第一手訊息 <br><a href="https://kardia.winyourgames.com/">❤官方網站</a><br><a href="https://www.facebook.com/KarDiaTW/">❤官方粉絲團</a><br>❤微信公眾號：牧羊人之心國際版<br><a href="https://forum.gamer.com.tw/A.php?bsn=34256">❤巴哈姆特論壇</a><br><a href="https://tieba.baidu.com/%E7%89%A7%E7%BE%8A%E4%BA%BA%E4%B9%8B%E5%BF%83%E5%8F%B0%E6%9C%8D">❤百度貼吧</a><br>❤牧羊人之心國際版1群：524148718<br>❤牧羊人之心國際版2群：104843612</p>')
	$("#international a").click(function(e) {
		e.stopPropagation()
	})
})