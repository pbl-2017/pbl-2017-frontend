'use strict';
import {input_color,input_select_color,input_on_color,output_color,output_select_color,output_on_color,button_color,component_type_val,component_type_none, component_type_io, component_type_option} from "./misc.js";
import {Input, Output, Button} from "./base_component.js";

export function input_component(p, parent, relative_pos_x, relative_pos_y, max_conn, flag_forward, name, comp_id=null){
	var component = new Input(p, parent, relative_pos_x, relative_pos_y, input_color, input_select_color, input_on_color, flag_forward, comp_id);
	component.setInstance(component);
	component.setName(name);
	component.setProperty(component_type_val);
	component.setConnectableNum(max_conn);

	return component;
}

export function output_component(p, parent, relative_pos_x, relative_pos_y, max_conn, flag_forward, name, comp_id=null){
	var component = new Output(p, parent, relative_pos_x, relative_pos_y, output_color, output_select_color, output_on_color, flag_forward, comp_id);
	component.setInstance(component);
	component.setName(name);
	component.setProperty(component_type_val);
	component.setConnectableNum(max_conn);

	return component;
}

export function button_component(p, parent, relative_pos_x, relative_pos_y, max_conn, flag_forward, name, comp_id=null){
	var component = new Button(p, parent, relative_pos_x, relative_pos_y, button_color, output_select_color, output_on_color, flag_forward, comp_id);
	component.setInstance(component);
	component.setName(name);
	component.setProperty(component_type_none);
	component.setConnectableNum(max_conn);

	return component;
}

export function io_input_component(p, parent, relative_pos_x, relative_pos_y, max_conn, flag_forward, name, comp_id=null){
	var component = new Input(p, parent, relative_pos_x, relative_pos_y, input_color, input_select_color, input_on_color, comp_id);
	component.setInstance(component);
	component.setName(name);
	component.setProperty(component_type_io);
	component.setConnectableNum(max_conn);

	return component;
}

export function io_output_component(p, parent, relative_pos_x, relative_pos_y, max_conn, flag_forward, name, comp_id=null){
	var component = new Output(p, parent, relative_pos_x, relative_pos_y, output_color, output_select_color, output_on_color, flag_forward, comp_id);
	component.setInstance(component);
	component.setName(name);
	component.setProperty(component_type_io);
	component.setConnectableNum(max_conn);

	return component;
}

export function option_input_component(p, parent, relative_pos_x, relative_pos_y, max_conn, flag_forward, name, comp_id=null){
	var component = new Input(p, parent, relative_pos_x, relative_pos_y, input_color, input_select_color, input_on_color, comp_id);
	component.setInstance(component);
	component.setName(name);
	component.setProperty(component_type_option);
	component.setConnectableNum(max_conn);

	return component;
}

export function option_output_component(p, parent, relative_pos_x, relative_pos_y, max_conn, flag_forward, name, comp_id=null){
	var component = new Output(p, parent, relative_pos_x, relative_pos_y, output_color, output_select_color, output_on_color, flag_forward, comp_id);
	component.setInstance(component);
	component.setName(name);
	component.setProperty(component_type_option);
	component.setConnectableNum(max_conn);

	return component;
}