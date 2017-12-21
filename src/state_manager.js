/*
	Manage the state of Application.
	mouse position, selecting node, flags...
*/
export class StateManager{
	constructor(){
		this.mouse_pressed_x = 0;
		this.mouse_pressed_y = 0;
		this.mouse_released_x = 0;
		this.mouse_released_y = 0;
		
		// tmp var and flags
		// "node" should be changed to another word, because it's not only for Node now
		this.selected_node = null;
		this.clear_flag = true;
		
		// "node" should be changed to another word, because it's not only for Node now
		this.mouse_on_node = null
		this.mouse_on = false;

		// "node" should be changed to another word, because it's not only for Node now
		this.selected_node_init_x = 0;
		// "node" should be changed to another word, because it's not only for Node now
		this.selected_node_init_y = 0;
		
		this.dragged_flag = false;

		this.double_click = false;
		// for me, about 0 count is fell good;
		this.double_click_interval = 40;
		this.click_flag = false;
		this.interval=0;

		// use it for identify the objects uniquely
		this.allocate_id = 0;
		this.node_manager=null;
	}
	setNodeManager(manager){
		this.node_manager = manager;
	}

	getNewID(){
		return this.allocate_id;
	}

	incrementID(){
		this.allocate_id += 1;
	}
	setNextID(id){
		this.allocate_id = id;
	}

	// it might be confusing, to use this in this architecture.
	decrementID(){
		if(this.allocate_id > 0) this.allocate_id -= 1;
	}

	setMousePressedPos(x, y){
		this.mouse_pressed_x = x;
		this.mouse_pressed_y = y;
	}
	getMousePressedPos(){
		return [this.mouse_pressed_x, this.mouse_pressed_y];
	}
	getMousePressedPosX(){
		return this.mouse_pressed_x;
	}
	getMousePressedPosY(){
		return this.mouse_pressed_y;
	}

	setMouseReleasedPos(x, y){
		this.mouse_released_x = x;
		this.mouse_released_y = y;
	}
	getMouseReleasedPos(){
		return [this.mouse_released_x, this.mouse_released_y];
	}
	getMouseReleasedPosX(){
		return this.mouse_released_x;
	}
	getMouseReleasedPosY(){
		return this.mouse_released_y;
	}

	setSelected(node){
		this.selected_node = node;
	}
	getSelected(){
		return this.selected_node;
	}

	setSelectedInitPos(x, y){
		this.selected_node_init_x = x;
		this.selected_node_init_y = y;
	}
	getSelectedInitPos(){
		return [this.selected_node_init_x, this.selected_node_init_y];
	}
	getSelectedInitPosX(){
		return this.selected_node_init_x;
	}
	getSelectedInitPosY(){
		return this.selected_node_init_y;
	}

	setClearFlag(flag){
		this.clear_flag = flag;
	}
	getClearFlag(){
		return this.clear_flag;
	}

	// "Node" should be changed to another word, because it's not only for Node now
	setMouseOnNode(node){
		this.mouse_on_node = node;
	}
	// "Node" should be changed to another word, because it's not only for Node now
	getMouseOnNode(node){
		return this.mouse_on_node;
	}

	setMouseOn(flag){
		this.mouse_on = flag;
	}
	getMouseOn(){
		return this.mouse_on;
	}
	isDragged(){
		return this.dragged_flag;
	}
	setDragged(flag){
		this.dragged_flag = flag;
	}

	checkDoubleClick(){
		if(this.double_click){
			this.resetClick();
			return false;
		}else if(this.click_flag && this.interval < this.double_click_interval){
			return true;
		}
		return false;
	}
	resetClick(){
		this.double_click = false;
		this.click_flag = false;
		this.interval = 0;
	}
	clickBG(){
		if(this.checkDoubleClick()) this.double_click = true;
		else this.click_flag = true;
	}
	stepDoubleClickInterval(){
		if(this.interval >= this.double_click_interval) this.resetClick();
		else if(this.click_flag) this.interval += 1;
	}
	isDoubleClicked(){
		return this.double_click;
	}
}