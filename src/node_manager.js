'use strict';
import {calc_queue, select_condition, input_field,default_color, on_color, select_color, draw_manager, edge_color, edge_fcolor} from "./misc.js";
import {AddNode, SubNode, MulNode, DivNode, ModNode, ConstNode, PrintCSNode, ButtonNode, MenuNode, ConditionalNode, GetList, MusicPlayerNode, IOButtonNode, SocketNode, OptionButtonNode} from "./base_node.js";
import {DeviceFactory,Socket,MP3Player} from "./APIWrapper/Devices.js";
import {Edge} from "./base_class.js"

export class NodeManager{
	constructor(){
		this.p5js = null;
		this.api_wrapper = null;
		this.draw_manager = null;
		this.margin_per_node = 60;
		this.init_gen_node_x = 100;
		this.init_gen_node_y = 300;
		this.iot_list = []

		this.readUpdate = this.readUpdate.bind(this);
	}

	setDrawContext(p5js){
		this.p5js = p5js;
	}
	setApiWrapper(api){
		this.api_wrapper = api;
	}
	setDrawManager(dm){
		this.draw_manager = dm;
	}

	startWatching(){
		this.api_wrapper.get.devices.setEvent(this.readUpdate);
	}

	readUpdate(device_list){
		// not thinking that devices will decrease;
		if(device_list==null) return;

		var update_list = [];
		var new_list=[];

        for(var i=0; i < device_list.length; i++){
        	for(var j=0; j < this.iot_list.length; j++){
        		if(this.iot_list[j].id == device_list[i].id){
        			new_list.push(device_list[i]);
        			break;
        		}
        	}
        	update_list.push(device_list[i]);
        	new_list.push(device_list[i]);

        }
        print(update_list);
        print(new_list);
        this.addIoTNode(update_list);
        this.iot_list = new_list;
    }

	addIoTNode(devices){
		for(var i=0; i < devices.length; i++){
			if(devices[i] instanceof Socket){
				this.draw_manager.pushDrawQueue(this.socket(this.p5js, this.init_gen_node_x+this.margin_per_node*i, this.init_gen_node_y, this.api_wrapper, devices[i].id));
			}else if(devices[i] instanceof MP3Player){
				this.draw_manager.pushDrawQueue(this.music_player(this.p5js, this.init_gen_node_x+this.margin_per_node*i, this.init_gen_node_y, this.api_wrapper, devices[i].id));
			}else{
				console.log("unknown device instance.");
			}
		}
	}

	// very bad code, but it's not good choice to refactor now...
	restoreNode(json_object){
		var tmp=null;
		var store_node = []
		var out_list = []
		//console.log(json_object["node"]);
		for(var i=0; i < json_object["node"].length; i++){
			//console.log(json_object["node"][i]);
			if(json_object["node"][i]["node_name"] == "MusicPlayerNode"){
				console.log(json_object["node"][i]["node_pos"][0]);
				tmp = new MusicPlayerNode(this.p5js, json_object["node"][i]["node_pos"][0], json_object["node"][i]["node_pos"][1], default_color, select_color, on_color, calc_queue, this.api_wrapper, json_object["node"][i]["device_id"], json_object["node"][i]["node_id"]);
				tmp.setInstance(tmp);
				tmp.init()
				this.draw_manager.restoreNode(tmp);
				store_node.push(tmp);
			}else if(json_object["node"][i]["node_name"] == "SocketNode"){
				tmp = new SocketNode(this.p5js, json_object["node"][i]["node_pos"][0], json_object["node"][i]["node_pos"][1], default_color, select_color, on_color, calc_queue, this.api_wrapper, json_object["node"][i]["device_id"], json_object["node"][i]["node_id"]);
				tmp.setInstance(tmp);
				tmp.init()
				this.draw_manager.restoreNode(tmp);
				store_node.push(tmp);
			}else if(json_object["node"][i]["node_name"] == "IOButtonNode"){
				tmp = new IOButtonNode(this.p5js, json_object["node"][i]["node_pos"][0], json_object["node"][i]["node_pos"][1], default_color, select_color, on_color, calc_queue, json_object["node"][i]["node_id"]);
				tmp.setInstance(tmp);
				tmp.init()
				this.draw_manager.restoreNode(tmp);
				out_list.push({"output_node_id":json_object["node"][i]["node_id"], "output_target_id":json_object["node"][i]["output_node"], "type":0})
				store_node.push(tmp);
			}else if(json_object["node"][i]["node_name"] == "OptionButtonNode"){
				tmp = new OptionButtonNode(this.p5js, json_object["node"][i]["node_pos"][0], json_object["node"][i]["node_pos"][1], default_color, select_color, on_color, calc_queue, json_object["node"][i]["node_id"]);
				tmp.setInstance(tmp);

				this.draw_manager.restoreNode(tmp);
				out_list.push({"output_node_id":json_object["node"][i]["node_id"], "output_target_id":json_object["node"][i]["output_node"], "type":1})
				store_node.push(tmp);
			}else{
				console.log("Unkown Node was found.\nIgnore");
				continue;
			}

		}

		var queue_list = this.draw_manager.getDrawQueue()
		var out_node=null
		for(var i=0; i < out_list.length; i++){
			out_node=null;
			for(var j=0; j < queue_list.length; j++){
				if(out_list[i]["output_node_id"] == queue_list[j].getNodeID()) out_node = queue_list[j];
			}

			if(out_node != null){
				for(var k = 0; k < out_list[i]["output_target_id"].length; k++){
					for(var l=0; l < queue_list.length; l++){
						if(out_list[i]["output_target_id"][k] == queue_list[l].getNodeID()){
							out_node.addOutputNode(queue_list[l], out_list[i]["type"]);
							queue_list[l].addInputNode(out_node, 0);
						}
					}
				}
			}
		}

		var output_node= null;
		var input_node = null;

		var output_comp = null;
		var input_comp = null;

		for(var i=0; i < json_object["edge"].length; i++){
			//console.log(json_object["node"][i]);
			console.log(json_object["node"][i]["node_pos"][0]);
			for(var j = 0; j < store_node.length; j++){
				if(json_object["edge"][i]["output_parent_id"] ==  store_node[j].getNodeID()) output_node = store_node[j];
				if(json_object["edge"][i]["input_parent_id"] ==  store_node[j].getNodeID()) input_node = store_node[j];
			}
			// Edge(p, output_obj, input_obj, color
			//tmp = new Edge(this.p5js, output_node, input_node, );

			output_comp = output_node.getComponent(json_object["edge"][i]["output_component_id"])
			input_comp = input_node.getComponent(json_object["edge"][i]["input_component_id"])

			if( output_comp.isForwardable()) this.draw_manager.pushEdgeQueue(new Edge(p, output_comp, input_comp, edge_fcolor));
			else this.draw_manager.pushEdgeQueue(new Edge(this.p5js, output_comp, input_comp, edge_color));
			//if( ins.isForwardable() || state_manager.getSelected().isForwardable()) draw_manager.pushEdgeQueue(new Edge(p, ins, state_manager.getSelected(), edge_fcolor));
			//else draw_manager.pushEdgeQueue(new Edge(p, ins, state_manager.getSelected(), edge_color));
			//tmp.setInstance(tmp);
			//tmp.init()
			//this.draw_manager.restoreNode(tmp);
			//console.log(tmp);
		}
	}
/*
export function add_node(p,x,y){
	var nd = new AddNode(p, x, y, default_color, select_color, on_color, calc_queue);
	nd.setInstance(nd);
	nd.init()

	return nd
}

export function sub_node(p,x,y){
	var nd = new SubNode(p, x, y, default_color, select_color, on_color, calc_queue);
	nd.setInstance(nd);
	nd.init()

	return nd
}

export function mul_node(p,x,y){
	var nd = new MulNode(p, x, y, default_color, select_color, on_color, calc_queue);
	nd.setInstance(nd);
	nd.init()

	return nd
}

export function div_node(p,x,y){
	var nd = new DivNode(p, x, y, default_color, select_color, on_color, calc_queue);
	nd.setInstance(nd);
	nd.init()

	return nd
}

export function mod_node(p,x,y){
	var nd = new ModNode(p, x, y, default_color, select_color, on_color, calc_queue);
	nd.setInstance(nd);
	nd.init()

	return nd
}

export function const_node(p,x,y, input_field){
	var nd = new ConstNode(p, x, y, default_color, select_color, on_color, calc_queue, input_field);
	nd.setInstance(nd);
	nd.init()

	return nd
}

export function conditional_node(p,x,y, select_condition){
	var nd = new ConditionalNode(p, x, y, default_color, select_color, on_color, calc_queue, select_condition);
	nd.setInstance(nd);
	nd.init()

	return nd
}

export function printc_node(p,x,y){
	var nd = new PrintCSNode(p, x, y, default_color, select_color, on_color, calc_queue);
	nd.setInstance(nd);
	nd.init()

	return nd
}

export function button_node(p,x,y){
	var nd = new ButtonNode(p, x, y, default_color, select_color, on_color, calc_queue);
	nd.setInstance(nd);
	// not calling init()

	return nd
}
*/

	get_list(p,x,y, apiWrapper){
		var nd = new GetList(p, x, y, default_color, select_color, on_color, calc_queue, apiWrapper);
		nd.setInstance(nd);
		nd.init()

		return nd
	}

	music_player(p,x,y, apiWrapper, device_id){
		var nd = new MusicPlayerNode(p, x, y, default_color, select_color, on_color, calc_queue, apiWrapper, device_id);
		nd.setInstance(nd);
		nd.init()

		return nd
	}

	socket(p,x,y, apiWrapper, device_id){
		var nd = new SocketNode(p, x, y, default_color, select_color, on_color, calc_queue, apiWrapper, device_id); //6 is only a test id
		nd.setInstance(nd);
		nd.init()

		return nd
	}

	io_button(p,x,y){
		var nd = new IOButton(p, x, y, default_color, select_color, on_color, calc_queue);
		nd.setInstance(nd);
		// not calling init()

		return nd
	}

	// position x, y is originated at center of the window.
	menu_node(p,x,y, call_function, desc, extra_arg, node_id){
		var nd = new MenuNode(p, x, y, default_color, select_color, on_color, calc_queue);
		nd.setInstance(nd);
		nd.setCallFunction(call_function);
		nd.setDrawManager(draw_manager);
		if(extra_arg != null) nd.setExtraArgument(extra_arg);
		nd.setDescription(desc);
		// not calling init()

		return nd
	}
}