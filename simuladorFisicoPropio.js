   


	function TanqueSim(world){
			
			this.anchoChassis=5;
	        this.altoChassis=0.001;
	        this.largoChassis=25;
	        this.radioRueda=3;
	        this.profundidadRueda=4;
	        this.segmentosRueda=32;
			this.separacionRuedaChassis=2;// se recomienda que no sea 0 porque choca con el chassis y no gira bien la rueda

	        this.anguloVolante=0;
	        this.velocidadMotor=0;


			this.chassisRb;
	        this.ruedaIzqTraRb;
	        this.ruedaDerTraRb;
	        this.ruedaIzqDelRb;
	        this.ruedaDerDelRb;			

			var distanciaRuedaAlChassis=this.anchoChassis/2+this.profundidadRueda+this.separacionRuedaChassis; 
			var _world=world;
			var constraints = [];
			var mass=1;
			var posInicial = [-40,0,10] //del tanque

			this.wheelMaterial = new CANNON.Material("wheelMaterial");

	        this.crearCuerpoRigidosTanque=function(){
			
				
		        // creamos el cuerpo rigido del chassis	
			    var chassisShape = new CANNON.Box(new CANNON.Vec3(this.largoChassis/2,this.anchoChassis/2,this.altoChassis/2));
		        this.chassisRb = new CANNON.RigidBody(mass*10,chassisShape);
		        this.chassisRb.useQuaternion = true;
		        this.chassisRb.position.set( posInicial[0], posInicial[1], posInicial[2]); 

	            //function( radiusTop, radiusBottom, height , numSegments ) 
				//var wheelShape = new CANNON.Sphere(this.radioRueda);
				
	          	var wheelShape = new CANNON.Sphere(this.radioRueda);
				// var wheelShape = new CANNON.Cylinder(this.radioRueda, this.radioRueda, this.profundidadRueda, this.segmentosRueda);

					
				var quat = new CANNON.Quaternion();
				quat.setFromAxisAngle(new CANNON.Vec3(1,0,0),-Math.PI/2);
				var translation = new CANNON.Vec3(0,0,0);
				// wheelShape.transformAllPoints(translation,quat);

	          	this.ruedaIzqTraRb = new CANNON.RigidBody(mass,wheelShape,this.wheelMaterial);
	          	this.ruedaDerTraRb = new CANNON.RigidBody(mass,wheelShape,this.wheelMaterial);
	          	this.ruedaIzqDelRb = new CANNON.RigidBody(mass,wheelShape,this.wheelMaterial);
	          	this.ruedaDerDelRb = new CANNON.RigidBody(mass,wheelShape,this.wheelMaterial);
	

		        this.ruedaIzqTraRb.useQuaternion = true;
		        this.ruedaDerTraRb.useQuaternion = true;
		        this.ruedaIzqDelRb.useQuaternion = true;
		        this.ruedaDerDelRb.useQuaternion = true;

		        // Position constrain wheels
	         	var zero = new CANNON.Vec3();

	          	
	          	this.ruedaIzqDelRb.position.set(  this.largoChassis/2,  distanciaRuedaAlChassis, posInicial[2]); 
	          	this.ruedaDerDelRb.position.set(  this.largoChassis/2, -distanciaRuedaAlChassis, posInicial[2]);
	          	this.ruedaIzqTraRb.position.set( -this.largoChassis/2,  distanciaRuedaAlChassis, posInicial[2]);
	          	this.ruedaDerTraRb.position.set( -this.largoChassis/2, -distanciaRuedaAlChassis, posInicial[2]);
				
				
	          	//this.ruedaIzqDelRb.quaternion.setFromAxisAngle( new CANNON.Vec3(-1,0,0), Math.PI/2); 
	          	//this.ruedaDerDelRb.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0), Math.PI/2);
	          	//this.ruedaIzqTraRb.quaternion.setFromAxisAngle( new CANNON.Vec3(-1,0,0), Math.PI/2 );
	          	//this.ruedaDerTraRb.quaternion.setFromAxisAngle( new CANNON.Vec3(1,0,0), Math.PI/2  );
				
			
				
				

            	var bodies = [this.chassisRb, this.ruedaDerTraRb, this.ruedaIzqTraRb, this.ruedaDerDelRb,this.ruedaIzqDelRb];

	      		for(var i=0; i<bodies.length; i++) 	_world.add(bodies[i])	 

							
//-------------DEBUG
				/*console.log("posicion INICIAL chasis:" + this.chassisRb.position);
				console.log("posicion INICIAL rueda IZQ DELANTERA:" + this.ruedaIzqDelRb.position);
				console.log("posicion INICIAL rueda DER DELANTERA:" + this.ruedaDerDelRb.position);
				console.log("posicion INICIAL rueda IZQ TRASERA:" + this.ruedaIzqTraRb.position);
				console.log("posicion INICIAL rueda DER TRASERA:" + this.ruedaDerTraRb.position);
				
				console.log("rotacion INICIAL chasis: " + radToDeg(this.getOrientacionChassis().x)+","+radToDeg(this.getOrientacionChassis().y)+","+radToDeg(this.getOrientacionChassis().z));
				console.log("rotacion INICIAL rueda IZQ DELANTERA:" + radToDeg(this.getOrientacionRuedaIzqDel().x)+","+radToDeg(this.getOrientacionRuedaIzqDel().y)+","+radToDeg(this.getOrientacionRuedaIzqDel().z));
				console.log("rotacion INICIAL rueda DER DELANTERA:" + radToDeg(this.getOrientacionRuedaDerDel()));
				console.log("rotacion INICIAL rueda IZQ TRASERA:" + radToDeg(this.getOrientacionRuedaIzqTra()));
				console.log("rotacion INICIAL rueda DER TRASERA:" + radToDeg(this.getOrientacionRuedaDerTra()));
				*/


				

	        }

			var contador =0;
	   
	        this.updateContraintsTanque=function(){
				contador++ ; //DEBUG
	        	//if(contador%5 == 0){console.log("TanqueSim.updateContraints velocidadMotor:"+this.velocidadMotor+" anguloVolante:"+this.anguloVolante);} //DEBUG
				
				
				var zero = new CANNON.Vec3();
	        	// remomevos los constraints

	      	    for(var i=0; i<constraints.length; i++) _world.removeConstraint(constraints[i]); 

	      		// Hinge the wheels
	      		var leftAxis =       new CANNON.Vec3(0,1,0);
	      		var rightAxis =      new CANNON.Vec3(0,-1,0);

	      		var angVolanteEnRadianes=Math.max(-45,Math.min(45,this.anguloVolante))*Math.PI/180;

	          	leftFrontAxis =  new CANNON.Vec3(Math.sin(angVolanteEnRadianes),Math.cos(angVolanteEnRadianes),0);
	          	rightFrontAxis = new CANNON.Vec3(Math.sin(angVolanteEnRadianes),Math.cos(angVolanteEnRadianes),0);
	        
		        leftFrontAxis.normalize();
		        rightFrontAxis.normalize();
	      
	      		//tren delantero
	    		var frontLeftHinge=new CANNON.HingeConstraint(this.chassisRb,
	    		 							new CANNON.Vec3( this.largoChassis/2, distanciaRuedaAlChassis, -this.altoChassis/2), leftFrontAxis,  
	    		 							this.ruedaIzqDelRb,  zero, leftAxis);
	            var frontRightHinge=new CANNON.HingeConstraint(this.chassisRb, 
	            					 		new CANNON.Vec3( this.largoChassis/2,-distanciaRuedaAlChassis, -this.altoChassis/2), rightFrontAxis,
	              							this.ruedaDerDelRb, zero, rightAxis);
	            // tren trasero
	            var backLeftHinge=new CANNON.HingeConstraint(this.chassisRb,
	    		 							new CANNON.Vec3(-this.largoChassis/2, distanciaRuedaAlChassis, -this.altoChassis/2), leftAxis,  
	    		 							this.ruedaIzqTraRb,   zero, leftAxis);        		
	      		var backRightHinge=new CANNON.HingeConstraint(this.chassisRb,
	      		 							new CANNON.Vec3(-this.largoChassis/2,-distanciaRuedaAlChassis, -this.altoChassis/2), rightAxis,
	      		  							this.ruedaDerTraRb,  zero, rightAxis);

				backLeftHinge.enableMotor();
	      		backRightHinge.enableMotor();

				var traccionRuedaIzq=this.velocidadMotor;
	      		var traccionRuedaDer=this.velocidadMotor;


	      		if (angVolanteEnRadianes>0) {
	          		traccionRuedaDer=Math.cos(angVolanteEnRadianes)*traccionRuedaDer*0.8;
	      		} else if (angVolanteEnRadianes<0) {
	          		traccionRuedaIzq=Math.cos(angVolanteEnRadianes)*traccionRuedaIzq*0.8;
	      		}

	      		backLeftHinge.motorTargetVelocity = -traccionRuedaIzq;
	      		backRightHinge.motorTargetVelocity = traccionRuedaDer;                  		

				constraints=[frontLeftHinge,frontRightHinge,backLeftHinge,backRightHinge]

	      		for(var i=0; i<constraints.length; i++)	_world.addConstraint(constraints[i]);
	      		 
	      
	      	}     

	      	this.incrementarVelocidad=function (incremento){
	      		//console.log("incrementarVelocidad()");
	      		this.velocidadMotor+=incremento;
	      		this.updateContraintsTanque();

	      	}   
			
			this.obtenerVelocidad= function(){
				return this.velocidadMotor;
			}

	      	this.incrementarAnguloVolante=function(incremento){
				
				this.anguloVolante=Math.max(-45,Math.min(45,this.anguloVolante+incremento))
				this.updateContraintsTanque();
	      	}   
			
			this.obtenerAnguloVolante=function(){
				return this.anguloVolante;
			}
			
			this.stop = function() {
				this.velocidadMotor=0;
	      		this.updateContraintsTanque();
			}


	      	this.getOrientacionChassis=function(){
	      		var rotation=new CANNON.Vec3();
          		this.chassisRb.quaternion.toEuler(rotation); // orden de las rotaciones YZX
     			return rotation;
	      	}
			
			this.getChassisQuaternion= function (){
				
				return this.chassisRb.quaternion;
			
			}

	      	this.getOrientacionRuedaDerDel=function(){
	      		var rotation=new CANNON.Vec3();
          		this.ruedaDerDelRb.quaternion.toEuler(rotation); // orden de las rotaciones YZX
     			return rotation;
	      	}	 

	      	this.getOrientacionRuedaIzqDel=function(){
	      		var rotation=new CANNON.Vec3();
          		this.ruedaIzqDelRb.quaternion.toEuler(rotation); // orden de las rotaciones YZX
     			return rotation;
	      	}

	      	this.getOrientacionRuedaDerTra=function(){
	      		var rotation=new CANNON.Vec3();
          		this.ruedaDerTraRb.quaternion.toEuler(rotation); // orden de las rotaciones YZX
     			return rotation;
	      	}

	      	this.getOrientacionRuedaIzqTra=function(){
	      		var rotation=new CANNON.Vec3();
          		this.ruedaIzqTraRb.quaternion.toEuler(rotation); // orden de las rotaciones YZX
     			return rotation;
	      	}   	
			
			this.crearCuerpoRigidosTanque();
	      	this.updateContraintsTanque();
			

	        
	}
	
	function DronSim(world) {
	
		this.tamX = 10;
		this.tamY = 10;
		this.tamZ = 10;
		
		this.masaDron = 10;
		
		var _world = world;
		
		this.xInicial = 300;
		this.yInicial = 0;
		this.zInicial = 120;
		
		this.formaDron = new CANNON.Box(new CANNON.Vec3(this.tamX, this.tamY, this.tamZ));
		this.dronRb = new CANNON.RigidBody(this.masaDron,this.formaDron);
		
		this.dronRb.useQuaternion = true;
	    this.dronRb.position.set(this.xInicial,this.yInicial,this.zInicial); 

		
		 _world.add(this.dronRb);
		
		
		
		this.getOrientacionDron=function(){
	      		var rotation=new CANNON.Vec3();
          		this.dronRb.quaternion.toEuler(rotation); // orden de las rotaciones YZX
     			return rotation;
	      	}
		
		
	
	}




	function Simulador(){
		
		this.tanque;
		this.dron;

		var world;
		// inicalizacion del mundo fisico

	    this.init=function(){
	      
		      world =new CANNON.World();
		      world.gravity.set(0,0,-50);
		      world.broadphase = new CANNON.NaiveBroadphase();
		      world.solver.iterations = 10;
		      
		      var mass=1;
		      var friccion=1.0 // coeficiente de rozamiento
		      var restitucion=0.1 // coef de restitucion 0.0 coche plastico   1.0 coche elastico

			  this.tanque=new TanqueSim(world);
			  this.dron = new DronSim(world);

		      // Plano del Suelo, ubicado en z = -10
		      var groundMaterial = new CANNON.Material("groundMaterial"); 
		      var groundShape = new CANNON.Plane();
		      var ground = new CANNON.RigidBody(0,groundShape,groundMaterial); // masa 0 implica que el cuerpo tiene masa infinita
		      ground.position.z = -10;
		      world.add(ground);
		 	  

    		 // Objetos de la base lunar

    		  var formaModulo = new CANNON.Box(new CANNON.Vec3(14,35,10));	//cambiar, poner parametros
              var modulo1Rb = new CANNON.RigidBody(0,formaModulo);
              modulo1Rb.position.set(300,0,0.1);
              world.add(modulo1Rb);
			  var modulo2Rb = new CANNON.RigidBody(0,formaModulo);
              modulo2Rb.position.set(300,70,0.1);
              world.add(modulo2Rb);
			  var modulo3Rb = new CANNON.RigidBody(0,formaModulo);
              modulo3Rb.position.set(300,140,0.1);
              world.add(modulo3Rb);
			  
			  var formaDomo = new CANNON.Sphere(270*0.2);
			  var domoRb = new CANNON.RigidBody(0, formaDomo);
			  domoRb.position.set(300,225,-10);
			  world.add(domoRb);
			  
			  var formaBaseTorre = new CANNON.Cylinder(60,60,90,70);
			  var baseTorreRb = new CANNON.RigidBody(0, formaBaseTorre);
			  baseTorreRb.position.set(300,-60,35);
			  world.add(baseTorreRb);
            
		      var wheelGroundContactMaterial = new CANNON.ContactMaterial(groundMaterial,this.tanque.wheelMaterial, friccion, restitucion);
		      world.addContactMaterial(wheelGroundContactMaterial);
	  	}


        this.update=function() {
		
			
			var timeStep=1/60;
          	// Step the physics world
          	world.step(timeStep);
			
			
	    }

	  	this.init();
	}


   
