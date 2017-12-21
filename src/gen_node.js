'use strict';
import {calc_queue, select_condition, input_field,default_color, on_color, select_color, draw_manager} from "./misc.js";
import {AddNode, SubNode, MulNode, DivNode, ModNode, ConstNode, PrintCSNode, ButtonNode, MenuNode, ConditionalNode, GetList, MusicPlayerNode, IOButtonNode, SocketNode, OptionButtonNode, AccelerationNode} from "./base_node.js";



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

export function get_list(p,x,y, apiWrapper){
	var nd = new GetList(p, x, y, default_color, select_color, on_color, calc_queue, apiWrapper);
	nd.setInstance(nd);
	nd.init()

	return nd
}

export function music_player(p,x,y, apiWrapper, device_id){
	var nd = new MusicPlayerNode(p, x, y, default_color, select_color, on_color, calc_queue, apiWrapper, device_id);
	nd.setInstance(nd);
	nd.init()

	return nd
}

export function socket(p,x,y, apiWrapper, device_id){
	var nd = new SocketNode(p, x, y, default_color, select_color, on_color, calc_queue, apiWrapper, device_id); //6 is only a test id
	nd.setInstance(nd);
	nd.init()

	return nd
}

export function IoTNode(p, apiWrapper, device){
	if(device instanceof Socket){
		;
	}
}

export function io_button(p,x,y){
	var nd = new IOButtonNode(p, x, y, default_color, select_color, on_color, calc_queue);
	nd.setInstance(nd);
	// not calling init()

	return nd
}

export function option_button(p,x,y){
	var nd = new OptionButtonNode(p, x, y, default_color, select_color, on_color, calc_queue);
	nd.setInstance(nd);
	// not calling init()

	return nd
}

export function acce_node(p,x,y){
	var nd = new AccelerationNode(p, x, y, default_color, select_color, on_color, calc_queue);
	nd.setInstance(nd);
	// not calling init()

	return nd
}

// position x, y is originated at center of the window.
export function menu_node(p,x,y, call_function, desc, extra_arg, node_id){
	var nd = new MenuNode(p, x, y, default_color, select_color, on_color, calc_queue);
	nd.setInstance(nd);
	nd.setCallFunction(call_function);
	nd.setDrawManager(draw_manager);
	if(extra_arg != null) nd.setExtraArgument(extra_arg);
	nd.setDescription(desc);
	// not calling init()

	return nd
}