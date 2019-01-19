$(function() {
	var status = 0
	$("#803btn")[0].onclick = function() {
		if (status != 0) return;
		status = 1
		$("#803").css("display", "block").animate({top: "20vw", opacity: "1"}, 800, function() {
			status = 2
		})
	}
	$(document.body).click(function() {
		if (status != 2) return
		status = 3
		$("#803").animate({top: "30vw", opacity: "0"}, 800, function() {
			$("#803").css("display", "none").css("top", "10vw")
			status = 0
		})
	})
	$("#803").html('<p style="font-weight: bold; font-size: 7vw; margin: 2vw;">803事件相关</p>首先牧羊人之心运营组成员点点(首次直播中MIO的cos者)实名在微博平台指出第一弹某领导对其进行性骚扰<br>紧接着原第一弹运营组被从官群移除(除1.8群)<br><a img="p1.jpg">姥爷的证言(含点点原贴)</a> <a img="p2.jpg">第一弹发表声明</a><br><a img="p3.jpg">点点截图证据(编辑过)</a> <a img="p4.jpg">姥爷新的证言</a><br>后雨发表长文 <a img="p5_1.jpg">P1</a> <a img="p5_2.jpg">P2</a>，运营组已集体离职。<br>第一弹和当事人的声明 <a img="p6_1.jpg">P1</a>&nbsp;&nbsp;<a img="p6_2.jpg">P2</a>&nbsp;&nbsp;<a img="p6_3.jpg">P3</a>&nbsp;&nbsp;<a img="p6_4.jpg">P4</a>&nbsp;&nbsp;<a img="p6_5.jpg">P5</a><br><a img="p6_6.jpg">P6</a>&nbsp;&nbsp;<a img="p6_7.jpg">P7</a>&nbsp;&nbsp;<a img="p7.jpg">P6中卢草聊天记录的完整内容</a><br>后雨的新声明 <a img="p8_1.jpg">P1</a> <a img="p8_2.jpg">P2</a> <a img="p8_3.png">P3</a> <a img="p8_4.jpg">P4</a> <a img="p8_5.jpg">P5</a> <a img="p8_6.jpg">P6</a> <a img="p8_7.jpg">P7</a><br>北北(原运营组成员)的声明 <a img="p9_1.png">P1</a> <a img="p9_2.jpg">P2</a> <a img="p9_3.jpg">P3</a><br><a img="p10.png">点点的新声明</a> 来自原运营商务的声明 <a img="p11_1.jpg">P1</a> <a img="p11_2.jpg">P2</a><br><a img="p12.jpg">来自某站队群众(第一弹声明P4作者)</a><br>后雨对第一弹声明的反驳 <a img="p13_1.png">P1</a> <a img="p13_2.jpg">P2</a> <a img="p13_3.jpg">P3</a> <a img="p13_4.jpg">P4</a> <a img="p13_5.jpg">P5</a> <a img="p13_6.jpg">P6</a><br><a img="p14.jpg">第一弹官博娘的回应</a><br>外方实锤 <a img="p15_1.jpg">P1</a> <a img="p15_2.jpg">P2</a> <a img="p15_3.jpg">P3</a> <a img="p15_4.jpg">P4</a> <a img="p15_5.jpg">P5</a> <a img="p15_6.jpg">P6</a> <a img="p15_7.jpg">P7</a> <a img="p15_8.jpg">P8</a> <a img="p15_9.jpg">P9</a> <a img="p15_10.jpg">P10</a><br>后雨对于男女不正当关系等的反驳 <a img="p16_1.jpg">P1</a> <a img="p16_2.jpg">P2</a>'.replace(/<a img="(.*?)">/g, '<a href="https://kardia-c.github.io/img/803/$1" target="_blank">'))
	$("#803 a").click(function(e) {
		e.stopPropagation()
	})
})// <a href="/img/803/p.jpg" target="_blank"></a>