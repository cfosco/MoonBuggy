
		function manejarCamaras() {
		
			if(camara==1){
				mat4.identity(vMatrix);

		
				mat4.translate(vMatrix, [0.0, 0.0, zoom]);
		
		
				mat4.rotate(vMatrix, degToRad(rotArrAba), [1.0, 0.0, 0.0]);
					
			
				mat4.rotate(vMatrix, degToRad(-90), [1.0,0.0,0.0]);
				mat4.rotate(vMatrix, degToRad(90), [0.0, 0.0, 1.0]);
			
				mat4.rotate(vMatrix, degToRad(rotIzqDer), [0.0, 0.0, 1.0]);
				
				mvMatrix = vMatrix;

		
			}
			
			else if(camara==2){
			
				mat4.identity(vMatrix);
			
				var eye = [-60,0,20];
				var q= simulador.tanque.getChassisQuaternion();
				var yaw = Math.atan2(2.0*(q.x*q.y + q.w*q.z), q.w*q.w + q.x*q.x - q.y*q.y - q.z*q.z);
				var pitch= Math.asin(2.0*(q.x*q.z-q.w*q.y));
				eye =rotz(eye,yaw);
				eye =roty(eye,-pitch);
				
				//eye =rotx(eye,chasisTot.rotacion[0]);
				
				eye = [eye[0]+tanque.chasisTot.posicion[0], eye[1]+tanque.chasisTot.posicion[1], eye[2]+tanque.chasisTot.posicion[2]];
			
											
				vMatrix = mat4.lookAt(eye, [tanque.chasisTot.posicion[0], tanque.chasisTot.posicion[1], tanque.chasisTot.posicion[2]], [0, 0, 1]);
				
				
				//mat4.rotate(vMatrix, degToRad(rotArrAba), [1.0, 0.0, 0.0]);
				//mat4.rotate(vMatrix, degToRad(rotIzqDer), [0.0, 0.0, 1.0]);

				mvMatrix = vMatrix;
				}
				
			else if(camara == 3) {

				mat4.identity(vMatrix);
	
				mat4.translate(vMatrix,[0.0,0.0,zoom]);
				
				mat4.rotate(vMatrix, degToRad(-90), [1.0,0.0,0.0]);
				mat4.rotate(vMatrix, degToRad(90), [0.0,0.0,1.0]);
				
				mat4.rotate(vMatrix, anguloMouseY,[0.0,-1.0,0.0]);
				mat4.rotate(vMatrix, anguloMouseX, [0.0,0.0,1.0]);
				
				mvMatrix = vMatrix;

							
			}
			
			else if (camara == 4) {
			
				//mat4.identity(mvMatrix);
				mat4.identity(vMatrix);

				
				ojoPeaton = [0,0,0];
				targetPeaton = [10,0,0];
				
				targetPeaton = roty(targetPeaton, anguloMouseY);
				targetPeaton = rotz(targetPeaton, -anguloMouseX);
				
			
				
			if(avanzar) {
				
			
				var dirObsNorm = normalizar(targetPeaton);			
				posPeaton = [posPeaton[0] + k*dirObsNorm[0],posPeaton[1] + k*dirObsNorm[1],posPeaton[2] + k*dirObsNorm[2]];
				
			}
			
			if(retroceder) {
				
			
				var dirObsNorm = normalizar(targetPeaton);			
				posPeaton = [posPeaton[0] + (-k)*dirObsNorm[0],posPeaton[1] + (-k)*dirObsNorm[1],posPeaton[2] + (-k)*dirObsNorm[2]];			
			
			
			}
			
			if(despIzq) {
			
				
			
				var dirPerpNorm = productoVectorial(targetPeaton, [0,0,1], true);			
				posPeaton = [posPeaton[0] + (-k)*dirPerpNorm[0],posPeaton[1] + (-k)*dirPerpNorm[1],posPeaton[2] + (-k)*dirPerpNorm[2]];			
			
			
			}
			
			if(despDer) {
			
			
			
				var dirPerpNorm = productoVectorial(targetPeaton, [0,0,1], true);			
				posPeaton = [posPeaton[0] + k*dirPerpNorm[0],posPeaton[1] + k*dirPerpNorm[1],posPeaton[2] + k*dirPerpNorm[2]];			
			
			
			}
			
			if(ascender) {
				posPeaton = [posPeaton[0],posPeaton[1],posPeaton[2] + k];			
			}
			
			if(descender) {		
				posPeaton = [posPeaton[0],posPeaton[1],posPeaton[2] - k];			
			}
			
			ojoPeaton = posPeaton;
			targetPeaton = [targetPeaton[0]+posPeaton[0],targetPeaton[1]+posPeaton[1],targetPeaton[2]+posPeaton[2]];
				
				
												
			vMatrix = mat4.lookAt(ojoPeaton, targetPeaton, [0, 0, 1]);
				
			mvMatrix = vMatrix;
			
			}
		
		}

