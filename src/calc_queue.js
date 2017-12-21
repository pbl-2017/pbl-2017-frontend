'use strict';

export class CalcQueue{
	constructor(){
		this.queue_1 = [];
		this.queue_2 = [];
		this.option_queue_1 = [];
		this.option_queue_2 = [];
		this.flag = true;
	}

	runCalc(){
		if(this.flag){
			this.flag = false;
			for(var i=0; i < this.queue_1.length; i++){
				this.queue_1[i].run();
			}
			this.queue_1 = [];
		}else{
			this.flag = true;
			for(var i=0; i < this.queue_2.length; i++){
				this.queue_2[i].run();
			}
			this.queue_2 = [];
		}
	}

	addQueue(que){
		if(this.flag){
			this.queue_1.push(que);
		}else{
			this.queue_2.push(que);
		}
	}
}