var showing803 = false

$(function() {
	$("#803btn")[0].onclick = function() {
		if (showing803) return;
		showing803 = true
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
	$("#803")[0].innerHTML = '<p style="font-weight: bold; font-size: 7vw; margin: 2vw;">803事件相关</p>首先牧羊人之心运营组成员点点(首次直播中MIO的cos者)实名在微博平台指出第一弹某领导对其进行性骚扰<br>紧接着原第一弹运营组被从官群移除(除1.8群)<br><a href="/img/803/p1.jpg" target="_blank">姥爷的证言(含点点原贴)</a> <a href="/img/803/p2.jpg" target="_blank">第一弹发表声明</a><br><a href="/img/803/p3.jpg" target="_blank">点点截图证据(编辑过)</a> <a href="/img/803/p4.jpg" target="_blank">姥爷新的证言</a><br>后雨发表长文 <a href="/img/803/p5_1.jpg" target="_blank">P1</a> <a href="/img/803/p5_2.jpg" target="_blank">P2</a>，运营组已集体离职。<br>第一弹和当事人的声明 <a href="/img/803/p6_1.jpg" target="_blank">P1</a>&nbsp;&nbsp;<a href="/img/803/p6_2.jpg" target="_blank">P2</a>&nbsp;&nbsp;<a href="/img/803/p6_3.jpg" target="_blank">P3</a>&nbsp;&nbsp;<a href="/img/803/p6_4.jpg" target="_blank">P4</a>&nbsp;&nbsp;<a href="/img/803/p6_5.jpg" target="_blank">P5</a><br><a href="/img/803/p6_6.jpg" target="_blank">P6</a>&nbsp;&nbsp;<a href="/img/803/p6_7.jpg" target="_blank">P7</a>&nbsp;&nbsp;<a href="/img/803/p7.jpg" target="_blank">P6中卢草聊天记录的完整内容</a><br>后雨的新声明 <a href="/img/803/p8_1.jpg" target="_blank">P1</a> <a href="/img/803/p8_2.jpg" target="_blank">P2</a> <a href="/img/803/p8_3.png" target="_blank">P3</a> <a href="/img/803/p8_4.jpg" target="_blank">P4</a> <a href="/img/803/p8_5.jpg" target="_blank">P5</a> <a href="/img/803/p8_6.jpg" target="_blank">P6</a> <a href="/img/803/p8_7.jpg" target="_blank">P7</a><br>北北(原运营组成员)的声明 <a href="/img/803/p9_1.png" target="_blank">P1</a> <a href="/img/803/p9_2.jpg" target="_blank">P2</a> <a href="/img/803/p9_3.jpg" target="_blank">P3</a><br><a href="/img/803/p10.png" target="_blank">点点的新声明</a> 来自原运营商务的声明 <a href="/img/803/p11_1.jpg" target="_blank">P1</a> <a href="/img/803/p11_2.jpg" target="_blank">P2</a><br><a href="/img/803/p12.jpg" target="_blank">来自某站队群众(第一弹声明P4作者)</a><br>后雨对第一弹声明的反驳 <a href="/img/803/p13_1.png" target="_blank">P1</a> <a href="/img/803/p13_2.jpg" target="_blank">P2</a> <a href="/img/803/p13_3.jpg" target="_blank">P3</a> <a href="/img/803/p13_4.jpg" target="_blank">P4</a> <a href="/img/803/p13_5.jpg" target="_blank">P5</a> <a href="/img/803/p13_6.jpg" target="_blank">P6</a><br><a href="/img/803/p14.jpg" target="_blank">第一弹官博娘的回应</a><br>外方实锤 <a href="/img/803/p15_1.jpg" target="_blank">P1</a> <a href="/img/803/p15_2.jpg" target="_blank">P2</a> <a href="/img/803/p15_3.jpg" target="_blank">P3</a> <a href="/img/803/p15_4.jpg" target="_blank">P4</a> <a href="/img/803/p15_5.jpg" target="_blank">P5</a> <a href="/img/803/p15_6.jpg" target="_blank">P6</a> <a href="/img/803/p15_7.jpg" target="_blank">P7</a> <a href="/img/803/p15_8.jpg" target="_blank">P8</a> <a href="/img/803/p15_9.jpg" target="_blank">P9</a> <a href="/img/803/p15_10.jpg" target="_blank">P10</a><br>后雨对于男女不正当关系等的反驳 <a href="/img/803/p16_1.jpg" target="_blank">P1</a> <a href="/img/803/p16_2.jpg" target="_blank">P2</a>'
	$("#803 a").click(function(e) {
		e.stopPropagation()
	})
})// <a href="/img/803/p.jpg" target="_blank"></a>