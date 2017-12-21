'use strict';
import {AddNode, ConstNode, PrintNode, ButtonNode} from "./base_node.js";
import {state_manager, calc_queue, draw_manager, node_manager, input_field, select_condition, edge_color, edge_fcolor, condition_options} from "./misc.js";
import {add_node, const_node, printc_node, button_node, mod_node, menu_node, conditional_node, get_list, music_player, io_button, socket, option_button, acce_node} from "./gen_node.js";
import {Edge} from "./base_class.js";
import {NodeManager} from "./node_manager.js";
import {save_node, restore_node} from "./restore.js";

export class P5App {
	constructor(apiWrapper) {
		var s = app(apiWrapper);
		var myp5 = new p5(s);

	}
}

function app(apiWrapper){
	return function(p){
		p.setup = function () {
			p.createCanvas(p.windowWidth, p.windowHeight);
			//p.createCanvas(p.displayWidth, p.displayHeight);

			//console.log(apiWrapper.get.devices.toList());

			draw_manager.setDrawingContext(p);
			draw_manager.setStateManager(state_manager);
			
			node_manager.setDrawContext(p);
			node_manager.setApiWrapper(apiWrapper);
			node_manager.setDrawManager(draw_manager);

			// for value nput 
			var input_field = p.createInput();
			input_field.input(update_val);
  			input_field.position(100, 100);
  			input_field.size(80);
  			input_field.style("background-color", p.color(220,220,220,255));
  			input_field.style("text-align:right;");
  			input_field.hide();

  			// for dropdown box menu
  			var select_condition = p.createSelect();
  			select_condition.changed(update_val);
  			select_condition.position(100, 100);
  			select_condition.size(80);
			for(var i=0; i < condition_options.length; i++){
				select_condition.option(condition_options[i]);
			}
			select_condition.hide();

			draw_manager.pushMenuQueue(menu_node(p, 120, -70, acce_node, "加速度", null));
			draw_manager.pushMenuQueue(menu_node(p, 0, -70,  option_button, "option", null));
			draw_manager.pushMenuQueue(menu_node(p, -120, -70, io_button, "スイッチ", null));
			draw_manager.pushMenuQueue(menu_node(p, 120, 70, null, "save", null));
			draw_manager.pushMenuQueue(menu_node(p, 0, 70, null, "do nothing", null));
			draw_manager.pushMenuQueue(menu_node(p, -120, 70, null, "do nothing",null));

  			// setting up the drawing object.
  			/*
  			draw_manager.pushDrawQueue(get_list(p, 400, 100, apiWrapper));
			draw_manager.pushDrawQueue(const_node(p, 100, 100, input_field));
			draw_manager.pushDrawQueue(printc_node(p, 600, 100));
			draw_manager.pushDrawQueue(button_node(p, 100, 200));
			draw_manager.pushDrawQueue(conditional_node(p, 300, 300, select_condition));
			*/

			//draw_manager.pushDrawQueue(get_list(p, 400, 100, apiWrapper));
			//draw_manager.pushDrawQueue(music_player(p, 200, 100, apiWrapper, 2));
			//draw_manager.pushDrawQueue(socket(p, 200, 100, apiWrapper, "IoTSocket1"));
		}
		
		p.windowResized = function() {
			p.resizeCanvas(p.windowWidth, p.windowHeight);
			var menu_queue = draw_manager.getMenuQueue();
			
			for(var i=0; i < menu_queue.length; i++){
				menu_queue[i].updatePos();
			}

		}

		p.keyTyped = function (){
			// 32 = space, not working?
			if(p.key == "s") save_node();
			else if(p.key == "r") restore_node(p);
			else if(p.key == "p") console.log(draw_manager.getDrawQueue());
		}

		var update_val = function(){
			state_manager.getSelected().setVal(this.value());
		}
		
		p.draw = function () {
			p.background(70);

			calc_queue.runCalc();
			
			if(state_manager.isDoubleClicked()){
				draw_manager.setDrawMenuFlag(true);
			}else{
				state_manager.stepDoubleClickInterval();
				draw_manager.setDrawMenuFlag(false);
			}

			draw_manager.draw();
		}

		/*
			called every time when mouse is moving
			check is mouse on the nodes or components
			and change the color if mouse is on them.
		*/
		p.mouseMoved = function(){
			state_manager.setMouseOn(false);
			var ins = null;

			// when the mouse is on the object, change the color.
			if(draw_manager.getDrawMenuFlag()){
				var menu_queue = draw_manager.getMenuQueue();
				// reversing for the order of the drawing objects
				for(var len = menu_queue.length-1; 0 <= len; len--){
					ins = menu_queue[len].returnMouseOnInstance(p.mouseX, p.mouseY);;
					if(ins != null){
						if(state_manager.getMouseOnNode() != null && ins !== state_manager.getMouseOnNode()){
							state_manager.getMouseOnNode().setMouseOn(false);
							state_manager.setMouseOnNode(ins);
							ins.setMouseOn(true);
							state_manager.setMouseOn(true);
							break;
						}else{
							state_manager.setMouseOnNode(ins);
							ins.setMouseOn(true);
							state_manager.setMouseOn(true);
							break;
						}
					}
				}
				if(state_manager.getMouseOnNode() != null && state_manager.getMouseOn() == false){
					state_manager.getMouseOnNode().setMouseOn(false);
					state_manager.setMouseOnNode(null);
				}
			// same thing is written on here, so I should marge it...
			}else{
				var draw_queue = draw_manager.getDrawQueue();
				for(var len = draw_queue.length-1; 0 <= len; len--){
					ins = draw_queue[len].returnMouseOnInstance(p.mouseX, p.mouseY);
					if(ins != null){
						if(state_manager.getMouseOnNode() != null && ins !== state_manager.getMouseOnNode()){
							state_manager.getMouseOnNode().setMouseOn(false);
							state_manager.setMouseOnNode(ins);
							ins.setMouseOn(true);
							state_manager.setMouseOn(true);
							break;
						}else{
							state_manager.setMouseOnNode(ins);
							ins.setMouseOn(true);
							state_manager.setMouseOn(true);
							break;
						}
					}
				}
				if(state_manager.getMouseOnNode() != null && state_manager.getMouseOn() == false){
					state_manager.getMouseOnNode().setMouseOn(false);
					state_manager.setMouseOnNode(null);
				}
			}
		}

		/*
			called every time when mouse is pressed.
		*/
		p.mousePressed = function(){
			state_manager.setDragged(false);
			state_manager.setClearFlag(true);
			state_manager.setMousePressedPos(p.mouseX, p.mouseY);

			var ins = null;

			if(draw_manager.getDrawMenuFlag()){
				var menu_queue = draw_manager.getMenuQueue();
				// reversing for the order of the drawing objects
				for(var len = menu_queue.length-1; 0 <= len; len--){
					ins = menu_queue[len].returnMouseOnInstance(p.mouseX, p.mouseY);				
					if(ins != null){
						if(state_manager.getSelected() != null){
							// clear selected
							state_manager.getSelected().setSelected(false);
							if(state_manager.getSelected().hasField()) state_manager.getSelected().hideField();
						}
						ins.run();
						break;
					}
				}
				if(ins == null){
					state_manager.clickBG();
				}
			}else{
				var draw_queue = draw_manager.getDrawQueue();
				// reversing for the order of the drawing objects
				for(var len = draw_queue.length-1; 0 <= len; len--){
					ins = draw_queue[len].returnMouseOnInstance(p.mouseX, p.mouseY);
					if(ins != null){
						// when the mouse press was on the  action node
						if(ins.isComponent() && ins.hasForwarding() && state_manager.isDragged() == false){
							ins.run();
							if(state_manager.getSelected() != null){
								state_manager.getSelected().setSelected(false);
								if(state_manager.getSelected().hasField()) state_manager.getSelected().hideField();
							}
							if(ins.hasField()) ins.setField();
							
							// draw selected node on the front
							if(ins.isComponent() == false){
								draw_manager.delDrawQueue(len);
								draw_manager.pushDrawQueue(ins);
							}
							state_manager.setSelected(ins.getParent());
							ins.getParent().setSelected(true);
							state_manager.setSelectedInitPos(ins.getX(), ins.getY());
						// nothing was select and the selected object was not actioin node
						}else if(state_manager.getSelected() == null){
							// draw selected node on the front
							if(ins.isComponent() == false){
								draw_manager.delDrawQueue(len);
								//draw_queue.splice(len, 1);
								draw_manager.pushDrawQueue(ins);
							}

							state_manager.setSelected(ins);
							ins.setSelected(true);
							state_manager.setSelectedInitPos(ins.getX(), ins.getY());

							if(ins.hasField()) ins.setField();
						// if the pressed object was same as past which is in the state_manager
						}else if(ins === state_manager.getSelected()){
							state_manager.setSelectedInitPos(ins.getX(), ins.getY());

						// when the select and selected is a component, check an try to make link.
						}else if(ins !== state_manager.getSelected() && state_manager.getSelected().isComponent() && ins.isComponent()){
							// components only reach here.
							if(ins.getParent() !== state_manager.getSelected().getParent() && ins.isComponentValid(state_manager.getSelected())){
								var i=0;
								var edge_queue = draw_manager.getEdgeQueue();
								for(; i < edge_queue.length; i++ ){
									// break when it has a connection between two input component
									if(edge_queue[i].hasEdge(ins, state_manager.getSelected())) break;
								}
								// i == edge_queue.length means those components don't have connenction
								if(i == edge_queue.length){
									if(ins.isConnectable() && state_manager.getSelected().isConnectable()){
										// making a new edge
										if( ins.isForwardable() || state_manager.getSelected().isForwardable()) draw_manager.pushEdgeQueue(new Edge(p, ins, state_manager.getSelected(), edge_fcolor));
										else draw_manager.pushEdgeQueue(new Edge(p, ins, state_manager.getSelected(), edge_color));

										ins.connect();
										state_manager.getSelected().connect()
										// adding Node to each other
										if(ins.getIOType() == 0){
											state_manager.getSelected().getParent().addInputNode(ins.getParent(), state_manager.getSelected().getID());
											ins.getParent().addOutputNode(state_manager.getSelected().getParent(), ins.getID());
										}else{
											state_manager.getSelected().getParent().addOutputNode(ins.getParent(), state_manager.getSelected().getID());
											ins.getParent().addInputNode(state_manager.getSelected().getParent(), ins.getID());
										}
									}
								}else{
									// erasing edge
									draw_manager.delEdgeQueue(i);

									ins.disconnect();
									state_manager.getSelected().disconnect()

									if(ins.getIOType() == 0){
										state_manager.getSelected().getParent().delInputNode(ins.getParent(), state_manager.getSelected().getID());
										ins.getParent().delOutputNode(state_manager.getSelected().getParent(), ins.getID());
									}else{
										state_manager.getSelected().getParent().delOutputNode(ins.getParent(), state_manager.getSelected().getID());
										ins.getParent().delInputNode(state_manager.getSelected().getParent(), ins.getID());
									}
								}
								// clear selected
								state_manager.getSelected().setSelected(false);
								if(state_manager.getSelected().hasField()) state_manager.getSelected().hideField();
								state_manager.setSelected(null);
							}
						}else if(ins !== state_manager.getSelected()){
							state_manager.getSelected().setSelected(false);
							if(state_manager.getSelected().hasField()) state_manager.getSelected().hideField();
							if(ins.hasField()) ins.setField();
							
							// draw selected node on the front
							if(ins.isComponent() == false){
								draw_manager.delDrawQueue(len);
								draw_manager.pushDrawQueue(ins);
							}
							state_manager.setSelected(ins);
							ins.setSelected(true);
							state_manager.setSelectedInitPos(ins.getX(), ins.getY());
						}
						state_manager.setClearFlag(false);
						break;
					}
				}
				if(state_manager.getSelected() != null && state_manager.getClearFlag() == true){
					// clear selected
					state_manager.getSelected().setSelected(false);
					if(state_manager.getSelected().hasField()) state_manager.getSelected().hideField();
					state_manager.setSelected(null);
				}else if(state_manager.getSelected() == null){
					state_manager.clickBG();
				}
			}
		}

		/*
			called every time when mouse is dragging.
		*/
		p.mouseDragged = function(){
			//console.log("dragged");
			var at_least_on = false;
			var ins = null;
			var draw_queue = draw_manager.getDrawQueue();

			state_manager.setDragged(true);

			if(state_manager.getSelected() != null && !state_manager.getSelected().isComponent()){
				for(var len = draw_queue.length-1; 0 <= len; len--){
					ins = draw_queue[len].returnMouseOnInstance(p.mouseX, p.mouseY);
					if(ins != null && state_manager.getSelected() === ins){
						at_least_on = true;
						break;
					}
				}
				if(at_least_on) state_manager.getSelected().setPos(p.mouseX-(state_manager.getMousePressedPosX()-state_manager.getSelectedInitPosX()), p.mouseY-(state_manager.getMousePressedPosY()-state_manager.getSelectedInitPosY()));
			}
		}
	}
}

