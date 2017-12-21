import {Node, Component} from "./base_class.js"

export class NodeTemplate extends Node{
	constructor(p, pos_x, pos_y, color, select_color, on_color, calc_queue, node_id=null){
		super(p, pos_x, pos_y, color, select_color, on_color);

		this.name_margin = 50;//15;
		this.name_margin_top = 45;
		this.name_margin_left = 15;
		this.att_stroke_size = 2;
		this.output_nodes = [];
		this.input_nodes = [];
		this.head_font_size = 16;
		this.desc_font_size = 12;
		this.val = 0;
		this.calc_queue = calc_queue;
		this.node_id = node_id;
	}

	draw(){
		this.p5js.push();

		if(this.fill_flag) this.p5js.fill(this.color.r, this.color.g, this.color.b);
		else this.p5js.noFill();
		this.p5js.rect(this.x, this.y, this.w*this.static_var.scale, this.h*this.static_var.scale, this.radius);

		this.p5js.noFill();
		if(this.select_flag){
			this.p5js.strokeWeight(this.att_stroke_size);
			this.p5js.stroke(this.select_color.r, this.select_color.g, this.select_color.b);
		}else if(this.on_flag){
			this.p5js.strokeWeight(this.att_stroke_size);
			this.p5js.stroke(this.on_color.r, this.on_color.g, this.on_color.b);
		}else{
			this.p5js.strokeWeight(1);
			this.p5js.stroke(this.color.r, this.color.g, this.color.b, 200);
		}
		// outer bound
		this.p5js.rect(this.margin_x, this.margin_y, this.margin_w*this.static_var.scale, this.margin_h*this.static_var.scale, this.radius);

		this.p5js.pop()
		this.p5js.push()

		for(var i=0, len = this.components.length; i < len; i++) this.components[i].draw();

		this.p5js.pop();
	}
	addComponent(comp){
		if(comp.getIOType() == 1){
			comp.setID(this.input_nodes.length);
			this.input_nodes.push([]);
		}
		if(comp.getIOType() == 0){
			comp.setID(this.output_nodes.length);
			this.output_nodes.push([]);
		}
		this.components.push(comp);
	}

	updateComponentPos(){
		for(var i=0, len = this.components.length; i < len; i++) this.components[i].setPos(this.x, this.y);
		
		// outer stroke
		this.margin_x = this.x-this.margin;
		this.margin_y = this.y-this.margin;
		this.margin_w = this.w+this.margin*2;
		this.margin_h = this.h+this.margin*2;
	}
	isMouseOn( mx, my){
		if(mx >= this.x && mx <= this.x+this.w*this.static_var.scale && my >= this.y && my <= this.y+this.h*this.static_var.scale) return true;
		else return false;
	}

	addInputNode(node, id){
		this.input_nodes[id].push(node);
	}
	delInputNode(node, id){
		for(var i = 0; i < this.input_nodes[id].length; i++){
			if(node === this.input_nodes[id][i]){
				this.input_nodes[id].splice(i, 1);
				break;
			}
		}
	}

	addOutputNode(node, id){
		this.output_nodes[id].push(node);
	}
	delOutputNode(node, id){
		for(var i = 0; i < this.output_nodes[id].length; i++){
			if(node === this.output_nodes[id][i]){
				this.output_nodes[id].splice(i, 1);
				break;
			}
		}
	}

	hasField(){
		return false;
	}

	setVal(val){
		this.val = val;
	}
	getVal(){
		return this.val;
	}

	readInput(){
		;
	}

	writeOutput(){
		;
	}

	setDescription(desc){
		this.desc = desc;
	}

	getInfo(){
		return {};
	}

	getNodeID(){
		return this.node_id;
	}
	getComponent(comp_id=-1){
		if(comp_id<0) return this.components;
		for(var i=0; i < this.components.length; i++){
			if(comp_id == this.components[i].getComponentID()) return this.components[i];
		}
		return null;
	}

}

export class ComponentTemplate extends Component{
	constructor(p, parent, relative_pos_x, relative_pos_y, color, select_color, on_color, flag_forward){
		super(p, parent, relative_pos_x, relative_pos_y, color, select_color, on_color);

		this.radius = 12.5;
		this.r2 = this.radius*this.radius;
		this.name = name
		this.forwardable = flag_forward;
		this.comp_id = null;
		this.text_size = 14;
	}
	draw(){
		this.p5js.push();

		if(this.select_flag) this.p5js.fill(this.select_color.r, this.select_color.g, this.select_color.b);
		else if(this.on_flag) this.p5js.fill(this.on_color.r, this.on_color.g, this.on_color.b);
		else if(this.fill_flag) this.p5js.fill(this.color.r, this.color.g, this.color.b);
		ellipse(this.x, this.y, this.radius, this.radius);

		this.p5js.pop();
	}
	setName(name){
		this.name = name;
	}
	getName(name){
		return this.name;
	}
	setID(id){
		this.id = id;
	}
	getID(id){
		return this.id;
	}

	isForwardable(){
		return this.forwardable;
	}

	getX_d(){
		;
	}

	getY_d(){
		;
	}

	hasField(){
		return false;
	}

	setRadius(r){
		this.radius = r;
		this.r2 = r*r;
	}
	getRadius(){
		return this.radius;
	}

	isMouseOn( mx, my){
		if((mx-this.x)*(mx-this.x)+(my-this.y)*(my-this.y) <= this.r2) return true;
		return false;
	}
	hasForwarding(){
		return false;
	}
	getComponentID(){
		return this.comp_id;
	}
}