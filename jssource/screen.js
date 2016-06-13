
var USEIO = true;
var screenstage = null;
var screenlayer = null;
var sw,sh;
var ioqueue = [];

//var serverurl = 'http://127.0.0.1:1337';  
var serverurl = 'http://'+window.location.hostname+':'+window.location.port;

var screenanimlist = new Array();

var screenscaling = 1.0;

function initScreen() {
	
	var vpw = $(window).width();
	var vph = $(window).height();
	$('#container').css({'height': Math.round(1.0*vph).toString() + 'px'});	
	$('#container').css({'width': Math.round(1.0*vpw).toString() + 'px'});	
	sw = $('#container').width();
	sh = $('#container').height();

      screenstage = new Kinetic.Stage({
       container: "container",
       width: sw,
       height: sh
     });
        
		screenlayer = new Kinetic.Layer({name:'screenlayer'});

		screenstage.on('setupdone',function() { processNextio('setupdone');});		
		screenstage.on('startdone',function() { processNextio('startdone');});		
		screenstage.on('playdone',function() { processNextio('playdone');});		
		
		addLayerAnimation(screenlayer);
		screenstage.add(screenlayer); 

}

function addLayerAnimation(animlayer)
{
	var anim = new Kinetic.Animation(function(frame) {
		var stopflag = true;
		for (var i=0;i<screenanimlist.length;i++) {
			var action = screenanimlist[i]; 	
			var prop = action.interpolateProp(frame);
			var obj = action.parentobject;
			obj.setAttr(action.property,prop);
			
			if ((frame.time-action.starttime*1000)>action.animDuration*1000) {  
				stopflag = stopflag && true;   //if many objects wait until last one is finished
			}
			else {
				stopflag = stopflag && false;
			}
		}
	   if (stopflag == true) {
	   	this.stop();
	   	frame.time = 0.0;
	   	screenstage.fire('playdone');		

	   }
	   
	   
		
	}, animlayer);
	
	animlayer.setAttr('animation',anim);


}

function makeScreen(screenstate)
{
	screenstage.clear();
	screenlayer.destroyChildren();
	
		
	screenstate.container = 'container'; 
	
	var hwratio = screenstate.screenheight/screenstate.screenwidth;
	var vh = sh;
	var vw = sw;
	var vhwratio = vh/vw;
	if (vhwratio > hwratio) {
		var stw = vw;
		var sth = Math.round(vw*hwratio);
		screenscaling = screenstate.txscale * vw/screenstate.screenwidth;
	}
	else {
		var sth = vh;
		var stw = Math.round(vh/hwratio);
		screenscaling = vh/screenstate.screenheight;
		screenscaling = screenstate.txscale *vh/screenstate.screenheight;
	}
	
		//console.log(screenstate);		

		var objects = screenstate.layerchildren;
		//console.log(objects);
		for (var k=0;k<objects.length;k++) {
			var objstate = objects[k];
			//console.log(objstate);
			if (objstate.type == 'Group') {
				var obj = newgroupobj(false,false,objstate);
				obj.x(objstate.x*screenscaling);
				obj.y(objstate.y*screenscaling);
				obj.scale({x:screenscaling,y:screenscaling});
				screenlayer.add(obj);	
				//console.log('added group');
			}
			else {
				var obj = newobj(false,objstate);
				obj.x(objstate.x*screenscaling);
				obj.y(objstate.y*screenscaling);
				obj.scale({x:screenscaling,y:screenscaling});
				screenlayer.add(obj);
				//console.log('added obj');
			}	
		}
		//add actions for the layer
		//actions are added to the layer actionlist from where they are called using their id
		var actions = screenstate.layeractions;
		//console.log(actions);
		var actionlist = new Array();
		for (var m=0;m<actions.length;m++) {
			var actionstate = actions[m];
				var parentobject = screenlayer.find('#'+actionstate.parentobjectid)[0];
				actionstate.parentobject = parentobject;
				//console.log(actionstate);
				if (actionstate.actiontype == 'move') {
					var ss = actionstate.startstate;
					var es = actionstate.endstate;
					//console.log(ss,es);
					actionstate.startstate = {x:ss.x*screenscaling,y:ss.y*screenscaling};
					actionstate.endstate = {x:es.x*screenscaling,y:es.y*screenscaling};
					//console.log(actionstate.startstate,actionstate.endstate);
				}
				var action = new Action(actionstate.parentobject,actionstate.id,actionstate.actiontype,actionstate.startstate,actionstate.endstate,actionstate.starttime,actionstate.duration);
				actionlist.push(action);
		} 
		//console.log(actionlist);
		screenlayer.setAttr('actionlist',actionlist); 
		screenlayer.draw();
	screenstage.fire('setupdone');
}

function findObjActions(obj)
{
/**
*finds all actions acting on the object
*/
 var objactions = [];
 var actions = screenlayer.getAttr('actionlist');
 for (var ai=0;ai<actions.length;ai++) {
 	var act = actions[ai];
 	if (obj.id() == act.parentobject.id()) {
 		objactions.push(act);
 	}
 }
	return objactions;
}

function setObjstoStartstate() {

	var objs = screenlayer.getChildren();
	for (var ch=0;ch<objs.length;ch++) {
		var obj = objs[ch];
		var acts = findObjActions(obj);
		//arrange into property bins
		var bins = {};
		for (var ai = 0;ai<acts.length;ai++) {
			var acttype = acts[ai].actiontype;
			var bintype = bins[acttype];
			if (bintype == null) {
				bins[acttype] = [acts[ai]];
			}
			else {
				bintype.push(acts[ai]);
			}
		}
		var firstactions = [];
		//find earliest starttime for each actiontype and set startstate to that
		for (var key in bins) {
				var acttyplist = bins[key];
				var sttime = 10000.0;
				for (var i=0;i<acttyplist.length;i++)
				{
					if (acttyplist[i].starttime < sttime) {
						sttime = acttyplist[i].starttime;
						var shortindex = i;					
					} 	
				}
				(acttyplist[shortindex]).settoStartstate();
				firstactions.push(acttyplist[shortindex]);
			//console.log(obj.getType(),key,acttyplist[shortindex].property,obj.getAttr(acttyplist[shortindex].property));		
		}
		if (firstactions.length>0) {
			//now find earliest of all actions and setstart in case opacity and appear conflict
			var sttime = 10000.0;
			for (var j=0;j<firstactions.length;j++)
			{
				if (firstactions[j].starttime < sttime) {
					sttime = firstactions[j].starttime;
					var shortindex = j;					
				} 	
			}	
			(firstactions[shortindex]).settoStartstate();
			screenlayer.draw();		
		}
	}
	screenstage.fire('startdone');
}


function play()
{
/**
* Plays actions as cast to the screen
*/	
	screenanimlist = screenlayer.getAttr('actionlist');
	//console.log(screenanimlist);
	var anim = screenlayer.getAttr('animation');
	screenlayer.draw();
	anim.start();	
	

}

function selectLayer(layername)
{
	screenstage.clear();
	screenlayer = screenstage.find('.'+layername)[0];
	screenlayer.draw();
	//console.log(screenlayer);
}


function ioUpdate(respdata) {
		//console.log(respdata);
		var viewcommand = JSON.parse(respdata);	
		var command = viewcommand.command;
		
		//console.log(command);
		switch(command) {
			case 'update':
				var viewstate = viewcommand.info;
				makeScreen(viewstate);
			break;

			case 'start':
				setObjstoStartstate();
			
			break;

			case 'play':
				play();
			
			break;

		}
		
}

function processNextio(ev)
{
	if (ioqueue.length>0) {
		var msg = ioqueue.shift();
		ioUpdate(msg);
	}
}

$(document).ready(function () {
	initScreen();

	if (USEIO)
	{  var socket = io(serverurl);
  		socket.on(socketmessage, function (respdata) {
  	 		if (ioqueue.length==0) {
  	 			ioqueue.push(respdata);
  	 			processNextio('incoming');
  	 		}
  	 		else {
  	 			ioqueue.push(respdata);
  	 		}
  	 		
  		});
  	}


	
});