export class DrawManager{
	constructor(){
		this.p5js = null;
		this.draw_queue = [];
		this.edge_queue = [];
		this.menu_queue = [];
		this.menu_flag = false;
		this.state_manager=null;
		this.most_large_id = 0;
	}

	draw(){
		for(var i=0, len = this.draw_queue.length; i < len; i++){
			this.draw_queue[i].draw();
		}
		for(var i=0, len = this.edge_queue.length; i < len; i++){
			this.edge_queue[i].draw();
		}

		if(this.menu_flag){
			for(var i=0; i < this.menu_queue.length; i++){
				this.menu_queue[i].draw();
			}
		}
	}
	setDrawingContext(p){
		this.p5js = p;
	}
	setStateManager(state_manager){
		this.state_manager = state_manager;
	}

	setDrawMenuFlag(flag){
		this.menu_flag = flag;
	}
	getDrawMenuFlag(){
		return this.menu_flag;
	}

	getMenuQueue(){
		return this.menu_queue;
	}
	getDrawQueue(){
		return this.draw_queue;
	}
	getEdgeQueue(){
		return this.edge_queue;
	}

	restoreNode(node){
		//console.log(node)
		this.draw_queue.push(node);
		if(this.most_large_id > node.getNodeID()){
			this.most_large_id = node.getNodeID();
			this.state_manager.setNextID(this.most_large_id);
			this.state_manager.incrementID();
		}
	}

	pushMenuQueue(obj){
		this.menu_queue.push(obj);
		obj.setNodeID(this.state_manager.getNewID());
		this.state_manager.incrementID();
	}

	pushDrawQueue(obj){
		this.draw_queue.push(obj);
		obj.setNodeID(this.state_manager.getNewID())
		this.state_manager.incrementID();
	}
	delDrawQueue(index){
		if(!isNaN(index)) this.draw_queue.splice(index, 1);
	}

	pushEdgeQueue(obj){
		this.edge_queue.push(obj);
		this.state_manager.incrementID();
	}
	delEdgeQueue(index){
		if(!isNaN(index)) this.edge_queue.splice(index, 1);
	}
}