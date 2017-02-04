
	
	//--------------------MOUSE
	
	
	function handleMouseDown(event) {
	
		posXinicial = event.clientX;
		posYinicial = event.clientY;
		
		anguloActualX =anguloMouseX
		anguloActualY =anguloMouseY
		
		click = true
		
	
	}
	
	function handleMouseMove(event) {
	
		if(click)
		{
		despX = event.clientX-posXinicial;
		despY = event.clientY-posYinicial;
		
		anguloMouseX = anguloActualX+despX*Math.PI/1000;
		anguloMouseY = anguloActualY+despY*Math.PI/1000;
		
		}
	}
	
	function handleMouseUp(event) {
		
		click = false;
	
	}

	
	//-------------------TECLADO
	
	
    function handleKeyDown(event) {
        currentlyPressedKeys[event.keyCode] = true;
    }


    function handleKeyUp(event) {
        currentlyPressedKeys[event.keyCode] = false;
    }
	
	
    function handleKeys() {
		
		if(currentlyPressedKeys[77]) {
			//M muestra log
			mostrarLog = true;
		}
		else { 
			mostrarLog = false;					//DEBUG
		}
		
		
		
        if (currentlyPressedKeys[39]) {
            // Left
            rotIzqDer -= 2;
        }
        if (currentlyPressedKeys[37]) {
            // Right
            rotIzqDer += 2;
        }
		
        if (currentlyPressedKeys[38]) {
            // Up cursor key
            rotArrAba += 2;
        }
        if (currentlyPressedKeys[40]) {
            // Down cursor key
            rotArrAba -= 2;
        }
		
		if (currentlyPressedKeys[32]) {
            // Space - Disparo
            disparar = true;
			ascender = true;
			
        }
		if(currentlyPressedKeys[81]) {
			velDron = 10;  // Q - Aumentar Velocidad dron
		
		}
		
		if(!currentlyPressedKeys[81]) {
			velDron = 0;
		
		}
		
		
		if (!currentlyPressedKeys[32]) {
            // Space - Disparo
            disparar = false;
			
			
			ascender = false;
			
			
        }
		
		if (currentlyPressedKeys[16]) {
            // Shift - Descender
           
			descender = true;
			
        }
		
		if (!currentlyPressedKeys[16]) {
            // Shift - dejar de descender
			
			descender = false;
			
			
        }
		
		if (currentlyPressedKeys[87]) {
            // W - Rot arma +
            if(camara!=4){
				tanque.chasisTot.torreta.rotArma += 2;
			}
			if(camara==2){
				simulador.tanque.incrementarVelocidad(0.5);
			}
			
			
			avanzar = true;
		}
		
		if (!currentlyPressedKeys[87]) {
           
			avanzar = false;
		}
		
		if (currentlyPressedKeys[83]) {
            // S - Rot arma -
             if(camara!=4){
				tanque.chasisTot.torreta.rotArma -= 2;
			}
			
			retroceder = true;
        }
		
		if (!currentlyPressedKeys[83]) {
			retroceder = false;
        }
		
		
		
		if (currentlyPressedKeys[90]) {
            // Z - DeZoom
            zoom -= 2;
        }
		
		if (currentlyPressedKeys[88]) {
            // X - Zoom
            zoom += 2;
        }
		
		if (currentlyPressedKeys[65]) {
            // A - Rot torreta -
            tanque.chasisTot.torreta.rotacion[2] -= degToRad(2);
			
			despIzq = true;
        }
		
		if (!currentlyPressedKeys[65]) {
			despIzq = false;
        }
		
		if (currentlyPressedKeys[68]) {
            // D - Rot torreta +
            tanque.chasisTot.torreta.rotacion[2] +=  degToRad(2);
			
			despDer = true;
        }
		
		if (!currentlyPressedKeys[68]) {
			despDer = false;
        }
		
		if (currentlyPressedKeys[85]) {
            // U - Avanzar
            simulador.tanque.incrementarVelocidad(0.5);
        }
		
		if (currentlyPressedKeys[74]) {
            // J - Retroceder
            simulador.tanque.incrementarVelocidad(-0.5);
        }
		if(!currentlyPressedKeys[85]&&!currentlyPressedKeys[74]){
			if(simulador.tanque.obtenerVelocidad()>0){
				simulador.tanque.incrementarVelocidad(-0.5);
			}else{
				simulador.tanque.incrementarVelocidad(0.5);
			}
		}
		
		if (currentlyPressedKeys[66]) {
            // B - parar motor
            simulador.tanque.stop();
        }	

		if (currentlyPressedKeys[76]) {
            // L - boliche
            boliche = !boliche;
        }	
		
		if (currentlyPressedKeys[72]) {
            // H - doblar izquierda
			simulador.tanque.incrementarAnguloVolante(-0.4);
        }
		
		if (currentlyPressedKeys[75]) {
            // K - doblar derecha
			simulador.tanque.incrementarAnguloVolante(0.4);
        }
		
		if(!currentlyPressedKeys[72]&&!currentlyPressedKeys[75]){
			if(simulador.tanque.obtenerAnguloVolante()>0){
				simulador.tanque.incrementarAnguloVolante(-0.8);
			}else{
				simulador.tanque.incrementarAnguloVolante(0.8);
			}
		
		}
		
		if (currentlyPressedKeys[49]) {
            // 1 - camara orbital
			camara=1;
        }
		
		if (currentlyPressedKeys[50]) {
            // 2 - camara tanque
			camara=2;
        }
		
		if (currentlyPressedKeys[51]) {
            // 3 - camara mouse
			camara=3;
        }
		
		if (currentlyPressedKeys[52]) {
            // 4 - camara peaton
			camara=4;
        }
		
		
		chequearLaMagia();
			
		
		

    }
	
	function chequearLaMagia() {
		if (currentlyPressedKeys [86]) {
			laMagia [0] = true;
		}
		if (currentlyPressedKeys [73]) {
			laMagia [1] = true;
		}
		if (currentlyPressedKeys [75]) {
			laMagia [2] = true;
		}
		if (currentlyPressedKeys [73]) {
			laMagia [3] = true;
		}
		if (currentlyPressedKeys [78]) {
			laMagia [4] = true;
		}
		if (currentlyPressedKeys [71]) {
			laMagia [5] = true;
		}
		if (currentlyPressedKeys [79]) {
			laMagia [6] = true;
		}
		if (currentlyPressedKeys [32]) {
			laMagia [7] = true;
		}
		if (currentlyPressedKeys [71]) {
			laMagia [8] = true;
		}
		if (currentlyPressedKeys [65]) {
			laMagia [9] = true;
		}
		if (currentlyPressedKeys [89]) {
			laMagia [10] = true;
		}
		
		for (i=0;i<11;i++) {
			if (!laMagia[i])
				{
					magia = false;
					break;
				}
			else 
				{
					magia = true;
				}
			}
		
		
	}
