'use strict';
import {Color} from "./color.js";
import {StateManager} from "./state_manager.js";
import {DrawManager} from "./draw_manager.js";
import {CalcQueue} from "./calc_queue.js";
import {NodeManager} from "./node_manager.js";
/*
	misc for the application
*/

export var condition_options = ["=", "≠", ">", "≧", "<", "≦"];

export var state_manager = new StateManager();
export var calc_queue = new CalcQueue();
export var draw_manager = new DrawManager();
export var node_manager = new NodeManager();

// component type
export var component_type_val = "val";
export var component_type_trig = "trig";
export var component_type_str = "str";
export var component_type_cond = "cond";
export var component_type_io = "I/O";
export var component_type_option = "option";
export var component_type_none = "none";

// Default color
export var input_color = new Color(10,150,30);
export var input_select_color = new Color(255,0,100);
export var input_on_color = new Color(255,120,50);

export var output_color = new Color(150,20,200);
export var output_select_color = new Color(255,0,100);
export var output_on_color = new Color(255,120,50);

export var trigger_color = new Color(180,180,30);
export var trigger_select_color= new Color(255,0,100);
export var trigger_on_color = new Color(255,120,50);

export var on_color = new Color(255,255,255);
export var select_color = new Color(255,10,50);
export var default_color = new Color(150,150,150);

export var button_color= new Color(0,0,0);

export var edge_color = new Color(20,180,254);
export var edge_fcolor = new Color(250,30,80);