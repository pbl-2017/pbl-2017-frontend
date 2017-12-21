'use strict';

/*
	Basic methods and variable
	for drawing.
	well, to control the scale, it's too hard for me, I'm not using it....
*/
class static_variable{
	constructor(){
		this.scale = 1.0;
	}
	setInstance(ins){
		this.instance = ins;
	}
	getInstance(){
		return this.instance;
	}

}

var static_var = new static_variable()

/*
	the template of drawing object
*/
class DrawObject{
	constructor(p, pos_x, pos_y, color){
		this.static_var = static_var;
		this.state_manager;
		this.x = pos_x;
		this.y = pos_y;
		this.color = color;
		this.fill_flag = true;
		this.p5js = p
	}
	draw(){
		console.log("must implemented");
	}
	
	addPos(dx, dy){
		this.x += dx;
		this.y += dy;
	}

	setPos(x, y){
		this.x = x;
		this.y = y;
	}

	getPos(x, y){
		return x,y;
	}

	getX(){
		return this.x;
	}

	getY(){
		return this.y;
	}

	setColor(color){
		this.color = color;
	}
	
	setColorRGB(r,g,b){
		this.color.r = r;
		this.color.b = b;
		this.color.g = g;
	}
	
	setFill(flag){
		this.fill_flag = flag;
	}
	setLabelName(name){
		this.label_name = name;
	}
}

/*
	Class for drawing a "link".
*/
export class Edge{
	constructor(p, output_obj, input_obj, color){
		this.output_obj = output_obj;
		this.input_obj = input_obj;
		this.color = color;

		this.fill_flag = true;

		self.p5js = p
	}
	
	draw(){
		// save drawing state
		self.p5js.push();
		self.p5js.strokeWeight(2);
		if(this.fill_flag) self.p5js.stroke(this.color.r, this.color.g, this.color.b);
		self.p5js.line(this.output_obj.getX_d(), this.output_obj.getY_d(), this.input_obj.getX_d(), this.input_obj.getY_d());
		// restore drawing state
		self.p5js.pop();
	}
	isMouseOn( mx, my){
		return false;
	}
	hasEdge(node1, node2){
		return ((this.output_obj === node1 || this.output_obj === node2 ) && (this.input_obj === node1 || this.input_obj === node2));
	}
	getInfo(){
		return {"output_parent_id": this.output_obj.getParent().getNodeID(), "output_component_id": this.output_obj.getComponentID(), "input_parent_id": this.input_obj.getParent().getNodeID(), "input_component_id": this.input_obj.getComponentID()};
	}
}

/*
	Template of Components.
*/
export class Component extends DrawObject{
	constructor(p, parent, relative_pos_x, relative_pos_y, color, select_color, on_color){
		super(p, parent.getX()+relative_pos_x, parent.getY()+relative_pos_y, color);
		this.parent = parent;

		this.relative_x = relative_pos_x;
		this.relative_y = relative_pos_y;

		this.select_color = select_color;
		this.on_color = on_color;

		this.select_flag = false;
		this.on_flag = false;

		this.linked_components = [];
		this.connectable_num = 1;
		this.connection_num = 0;
	}

	// I don't know how to get the class instance itself
	setInstance(instance){
		this.instance = instance;
	}
	getInstance(){
		return  this.instance;
	}

	getParent(){
		return this.parent;
	}

	setPos(x, y){
		this.x = x+this.relative_x;
		this.y = y+this.relative_y;
	}

	setSelected(flag){
		this.select_flag = flag;
	}
	isSelected(){
		return this.selected_flag;
	}

	setMouseOn(flag){
		this.on_flag = flag;
	}
	getMouseOn(){
		return this.on_flag;
	}
	isMouseOn( mx, my){
		console.log("must implemented");
		return false;
	}
	returnMouseOnInstance(mx, my){
		if(this.isMouseOn(mx, my)) return this.instance;
		else return null;
	}
	isComponent(){
		return true;
	}

	setConnectableNum(num){
		this.connectable_num = num;
	}
	isConnectable(){
		if(this.connection_num < this.connectable_num || this.connectable_num == 0) return true;
		return false;
	}

	// 0 : output, 1 : input
	setIOType(type){
		this.io_type = type;
	}
	getIOType(type){
		return this.io_type;
	}
	setProperty(prop){
		this.property = prop;
	}
	getProperty(){
		return this.property;
	}
	isComponentValid(comp){
		if( comp.getIOType() == this.io_type || comp.getProperty() != this.property) return false;
		return true;
	}

	hasAction(){
		console.log("must implemented");
		return false;
	}
	action(){
		;
	}
	connect(){
		this.connection_num += 1;
	}
	disconnect(){
		this.connection_num -= 1;
	}
	/*
	getLink(){
		return this.linked_components;
	}
	del_link(target){
		for(var i = 0; i < this.linked_components.length; i++){
			if(target === this.linked_components[i]){
				this.linked_components.splice(i, 1);
				this.connection_num -= 1;
				break;
			}
		}
	}
	*/
}

/*
	Basic node class
*/
export class Node extends DrawObject{
	constructor(p, pos_x, pos_y, base_color, select_color, on_color){
		super(p, pos_x, pos_y, base_color);

		this.instance = this;

		this.w = 100;
		this.h = 100;
		this.radius = 10;
		this.margin = 4;
		this.margin_x = this.x-this.margin;
		this.margin_y = this.y-this.margin;
		this.margin_w = this.w+this.margin*2;
		this.margin_h = this.h+this.margin*2;
		
		this.select_color = select_color;
		this.on_color = on_color;

		this.select_flag = false;
		this.on_flag = false;

		this.components = [];

		this.component_margin = 30;
		this.top_margin = 35;
		this.desc_margin = 0;
		this.bottom_margin = 0;

		this.node_id=-1;
	}

	init(){
		this.h = this.top_margin+this.components.length*this.component_margin+this.bottom_margin;
		this.margin_h = this.h+this.margin*2;
		this.updateComponentPos();
	}
	// I don't know how to get the class instance itself
	setInstance(instance){
		this.instance = instance;
	}
	getInstance(){
		return  this.instance;
	}

	setNodeID(id){
		this.node_id = id;
	}
	getNodeID(){
		return this.node_id;
	}

	addComponent(comp){
		this.components.push(comp);
	}
	delComponent(comp){
		;
	}

	run(){
		;
	}

	draw(){
		console.log("must implemented");
	}

	getW(){
		return this.w;
	}

	getH(){
		return this.h;
	}
	getCenterX(){
		return this.x+this.w/2;
	}
	getCenterY(){
		return this.y+this.h/2;
	}
	getStableDis(){
		return this.stable_dis;
	}
	getStableMarginMin(){
		return this.stable_margin_min;
	}
	getStableMarginMax(){
		return this.stable_margin_max;
	}

	addPos(dx, dy){
		this.x += dx;
		this.y += dy;
		this.updateComponentPos();
	}
	setPos(x, y){
		this.x = x;
		this.y = y;
		this.updateComponentPos();
	}

	updateComponentPos(){
		for(var i=0, len = this.components.length; i < len; i++) this.components[i].setPos(this.x, this.y);
	}

	setSelected(flag){
		this.select_flag = flag;
	}
	isSelected(){
		return this.selected_flag;
	}

	setMouseOn(flag){
		this.on_flag = flag;
	}
	getMouseOn(){
		return this.on_flag;
	}

	isMouseOn( mx, my){
		console.log("must implemented");
		return false;
	}

	returnMouseOnInstance(mx, my){
		for(var i=0, len = this.components.length; i < len; i++){
			var cins = this.components[i].returnMouseOnInstance(mx, my);
			if(cins != null) return cins;
		}
		if(this.isMouseOn(mx, my)) return this.getInstance();
		return null;
	}

	isComponent(){
		return false;
	}
}

export class Line extends DrawObject{
	constructor(p, pos_x, pos_y, target_x, target_y, color){
		super(p, pos_x, pos_y, color);

		this.tx = target_x;
		this.ty = target_y;
	}
	draw(){
		// save drawing state
		self.p5js.push();
		if(this.fill_flag) self.p5js.fill(this.color.r, this.color.g, this.color.b);
		self.p5js.line(this.x, this.y, this.tx, this.ty);
		// restore drawing state
		self.p5js.pop();
	}
	isMouseOn( mx, my){
		// toriaezu
		return false;
	}
}