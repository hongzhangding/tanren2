function fn(date) {
	var head_1_1 = document.getElementsByClassName("head_1_1")[0];
	var oL = head_1_1.getElementsByTagName("ol")[0];
	var str = "";
	for(var i = 0; i < date.s.length; i++) {
		str += '<a target="_blank" href="https://www.baidu.com/s?wd=' + date.s[i] + '"><li>' + date.s[i] + '</li></a>';
	}
	oL.innerHTML = str;
}

window.onload = function() {
	var head_1_1 = document.getElementsByClassName("head_1_1")[0];
	var ipt = head_1_1.getElementsByTagName("input")[0];
	var a = head_1_1.getElementsByTagName("a")[0];
	var oL = head_1_1.getElementsByTagName("ol")[0];
	ipt.onkeyup = function() {
		if(ipt.value != "") {
			oL.style.display = "block";
			var script = document.createElement("script");
			script.src = "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=" + this.value + "&cb=fn"
			document.body.appendChild(script);
		} else {
			oL.style.display = "none";
		}
	}
	a.onclick = function() {
		this.href = 'https://www.baidu.com/s?wd=' + ipt.value;

	}


	//创建和初始化地图函数：
	function initMap() {
		createMap(); //创建地图
		setMapEvent(); //设置地图事件
		addMapControl(); //向地图添加控件
		addMapOverlay(); //向地图添加覆盖物
	}

	function createMap() {
		map = new BMap.Map("map");
		map.centerAndZoom(new BMap.Point(113.335153, 23.146509), 18);
	}

	function setMapEvent() {
		map.enableScrollWheelZoom();
		map.enableKeyboard();
		map.enableDragging();
		map.enableDoubleClickZoom()
	}

	function addClickHandler(target, window) {
		target.addEventListener("click", function() {
			target.openInfoWindow(window);
		});
	}

	function addMapOverlay() {
		var markers = [{
			content: "请联系我们",
			title: "我的地址",
			imageOffset: {
				width: 0,
				height: 3
			},
			position: {
				lat: 23.146812,
				lng: 113.335521
			}
		}];
		for(var index = 0; index < markers.length; index++) {
			var point = new BMap.Point(markers[index].position.lng, markers[index].position.lat);
			var marker = new BMap.Marker(point, {
				icon: new BMap.Icon("http://api.map.baidu.com/lbsapi/createmap/images/icon.png", new BMap.Size(20, 25), {
					imageOffset: new BMap.Size(markers[index].imageOffset.width, markers[index].imageOffset.height)
				})
			});
			var label = new BMap.Label(markers[index].title, {
				offset: new BMap.Size(25, 5)
			});
			var opts = {
				width: 200,
				title: markers[index].title,
				enableMessage: false
			};
			var infoWindow = new BMap.InfoWindow(markers[index].content, opts);
			marker.setLabel(label);
			addClickHandler(marker, infoWindow);
			map.addOverlay(marker);
		};
		var labels = [{
			position: {
				lng: 113.335593,
				lat: 23.146741
			},
			content: "泰然农业"
		}];
		for(var index = 0; index < labels.length; index++) {
			var opt = {
				position: new BMap.Point(labels[index].position.lng, labels[index].position.lat)
			};
			var label = new BMap.Label(labels[index].content, opt);
			map.addOverlay(label);
		};
	}
	//向地图添加控件
	function addMapControl() {
		var scaleControl = new BMap.ScaleControl({
			anchor: BMAP_ANCHOR_BOTTOM_LEFT
		});
		scaleControl.setUnit(BMAP_UNIT_IMPERIAL);
		map.addControl(scaleControl);
		var navControl = new BMap.NavigationControl({
			anchor: BMAP_ANCHOR_TOP_LEFT,
			type: BMAP_NAVIGATION_CONTROL_LARGE
		});
		map.addControl(navControl);
		var overviewControl = new BMap.OverviewMapControl({
			anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
			isOpen: true
		});
		map.addControl(overviewControl);
	}
	var map;
	initMap();

}