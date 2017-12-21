'use strict';
import {draw_manager, node_manager} from "./misc.js";

export function save_node(){
	//var fs = WScript.CreateObject("Scripting.FileSystemObject");
	//var file = fs.CreateTextFile("text.txt");
	var nodes = [];
	var edges = [];

	var node_list = draw_manager.getDrawQueue();
	var edge_list = draw_manager.getEdgeQueue();

	for(var i=0; i < node_list.length; i++){
		nodes.push(node_list[i].getInfo());
	}

	for(var i=0; i < edge_list.length; i++){
		edges.push(edge_list[i].getInfo());
	}
	var output_text = window.JSON.stringify({"node":nodes, "edge":edges})
	console.log(output_text);
	//file.Write(output_text)
	//file.Close();
}


export function  restore_node(p){
	//var data = new XMLHttpRequest();	
	//data.open("GET", "/Users/mau/Programs/class_ex/pbl-2017-make_life_app/frontend/sato/src/restore.txt", false); //true:非同期,false:同期
	//data.send(null);

	// test file, it should be placed in the directory of index.html
	var result = p.loadStrings('./restore.txt', print);
	//var LF = String.fromCharCode(10); //改行ｺｰﾄﾞ
	/*var lines = data.responseText.split(LF);
	for (var i = 0; i < lines.length;++i) {
		var cells = lines[i].split(",");
		if( cells.length != 1 ) {
			csvData.push(cells);
		}
	}*/
	/*
	var reader = new FileReader();
	reader.readAsText("./restore.txt");
	data = JSON.parse(reader.result);
	*/
}

function print(result){
	console.log(result)
	var data = window.JSON.parse(result);
	node_manager.restoreNode(data);
}