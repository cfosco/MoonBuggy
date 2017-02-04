		
		
		function initLights() {
			
			factorIntensidadLuzDir = 0.7
			factorIntensidadLuzSpot = 2.0

			var direccionLuzDir = [0.0,1.0,-0.7];
			var intensidadLuzDir = [factorIntensidadLuzDir,factorIntensidadLuzDir,factorIntensidadLuzDir];
		
			lDir = new DirLight(direccionLuzDir, intensidadLuzDir);		//En coordenadas de mundo
			lSpot = new SpotLight(	[-10.0,0.0,0.0], 					//En coordenadas de mundo
									[1.0*factorIntensidadLuzSpot,1.0*factorIntensidadLuzSpot,1.0*factorIntensidadLuzSpot], 
									[1.0,0.0,0.0], 
									50.0, 
									20.0, 
									0.004);		
		
		}	
		
		function manejarLuces() {
			
			front = [1,0,0];
			var q= simulador.tanque.getChassisQuaternion();
			var yaw = Math.atan2(2.0*(q.x*q.y + q.w*q.z), q.w*q.w + q.x*q.x - q.y*q.y - q.z*q.z);
			var pitch= -Math.asin(2.0*(q.x*q.z-q.w*q.y));
			var roll = Math.atan2(2*(q.x*q.y+q.z*q.w),1-2*(q.y*q.y+q.z*q.z));
			front =rotz(front,yaw);
			front =roty(front,pitch);
			//front = rotx(front,roll);
			
			lSpot.position = tanque.chasisTot.posicion;
			lSpot.direction = front;
						
			
		
		}
		
			//---------------------- LUCES -------------------------
		
		function DirLight (direction, intensity) {
		
			this.direction = direction;
			this.intensity = intensity;
			
			this.setUniforms = function (program) {
				gl.uniform3f(program.lightIntensityUniform,this.intensity[0],this.intensity[1],this.intensity[2]);
				gl.uniform3f(program.lightDirectionUniform,this.direction[0],this.direction[1],this.direction[2]);
			
			};
		}
		
		function SpotLight (position, intensity, direction, exponent, cutoff, attenWithDist) {
			
			this.position = position;
			this.intensity = intensity; 
			this.direction = direction; 
			this.exponent = exponent; 
			this.cutoff = cutoff
			this.attenWithDist = attenWithDist;
			
			this.setUniforms = function(shaderProgram) {
				gl.uniform3f(shaderProgram.spotPosUniform,this.position[0],this.position[1],this.position[2]);
				gl.uniform3f(shaderProgram.spotIntUniform,this.intensity[0],this.intensity[1],this.intensity[2]);
				gl.uniform3f(shaderProgram.spotDirUniform,this.direction[0],this.direction[1],this.direction[2]);
				gl.uniform1f(shaderProgram.spotExpUniform, this.exponent);
				gl.uniform1f(shaderProgram.spotCutUniform, this.cutoff);
				gl.uniform1f(shaderProgram.spotAttenUniform, this.attenWithDist);	
			};
		}