	
	//////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////
	////////////////////       DIBUJABLES        /////////////////////////
	
		
	
  
		function Modulo(vectorEscala, posicion, rotacion, material) {	
			
			this.vectorEscala = vectorEscala;
			this.posicion = posicion;
			this.rotacion = rotacion;
			this.material = material;
			
			
			this.draw = function() {
		
				mvPushMatrix();

				// Moverse a la posicion del domo
				mat4.translate(mvMatrix, this.posicion);
				mat4.rotate(mvMatrix, this.rotacion[0], [1.0, 0.0, 0.0]);
				mat4.rotate(mvMatrix, this.rotacion[1], [0.0, 1.0, 0.0]);
				mat4.rotate(mvMatrix, this.rotacion[2], [0.0, 0.0, 1.0]);
				
				mat4.scale(mvMatrix, this.vectorEscala);

				this.dibujarModulo();

				mvPopMatrix();
		
			}
			
			this.dibujarModulo = function() {
		
					this.material.prepararParaDibujar();
					
					gl.bindBuffer(gl.ARRAY_BUFFER, moduloVertexBuffer);
					gl.vertexAttribPointer(this.material.program.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
					
					if(this.material.usaTexturas) {
					gl.bindBuffer(gl.ARRAY_BUFFER, moduloTextureCoordBuffer);
					gl.vertexAttribPointer(this.material.program.textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
					}
					
					gl.bindBuffer(gl.ARRAY_BUFFER, moduloNormalsBuffer);
					gl.vertexAttribPointer(this.material.program.vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0);

					gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, moduloVertexIndexBuffer);

				// Dibujamos.
					setMatrixUniforms(this.material.program);
					gl.drawElements(gl.TRIANGLES, moduloVertexIndexBuffer.length, gl.UNSIGNED_SHORT, 0);		
					
					if (verNormales) {
						dibujarLineasNormales(idModulo);
					}
		
				}
		
		
		}
		
		
		
		function Torre(vectorEscala, posicion, rotacion, material) {
			
			this.vectorEscala = vectorEscala;
			this.posicion = posicion;
			this.rotacion = rotacion;
			this.material = material;
			
			
			this.draw = function() {
		
				mvPushMatrix();

				
				// Moverse a la posicion del domo
				mat4.translate(mvMatrix, this.posicion);
				mat4.rotate(mvMatrix, this.rotacion[0], [1.0, 0.0, 0.0]);
				mat4.rotate(mvMatrix, this.rotacion[1], [0.0, 1.0, 0.0]);
				mat4.rotate(mvMatrix, this.rotacion[2], [0.0, 0.0, 1.0]);
			
				mat4.scale(mvMatrix, this.vectorEscala);

			
				this.dibujarTorre();

				mvPopMatrix();
		
			}
			
			this.dibujarTorre = function() {
			
				this.material.prepararParaDibujar();
				
				gl.bindBuffer(gl.ARRAY_BUFFER, torreVertexBuffer);
				gl.vertexAttribPointer(this.material.program.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);

				 // gl.bindBuffer(gl.ARRAY_BUFFER, torreVertexColorBuffer);
				 // gl.vertexAttribPointer(this.material.program.vertexColorAttribute, 4, gl.FLOAT, false, 0, 0);
				
				if(this.material.usaTexturas) {
					gl.bindBuffer(gl.ARRAY_BUFFER, torreTextureCoordBuffer);
					gl.vertexAttribPointer(this.material.program.textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
					}
				
				gl.bindBuffer(gl.ARRAY_BUFFER, torreNormalsBuffer);
				gl.vertexAttribPointer(this.material.program.vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0);

				gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, torreVertexIndexBuffer);

			// Dibujamos.
				setMatrixUniforms(this.material.program);
				gl.drawElements(gl.TRIANGLES, torreVertexIndexBuffer.length, gl.UNSIGNED_SHORT, 0);	

				if (verNormales) {
					dibujarLineasNormales(idTorre);
					
					}
			}
				
		}
		
		
		
		function Domo(vectorEscala, posicion, rotacion, material) {
			
			this.vectorEscala = vectorEscala;
			this.posicion = posicion;
			this.rotacion = rotacion;
			this.material = material;
			
			this.draw = function() {
		
				mvPushMatrix();

			
        // Moverse a la posicion del domo
				mat4.translate(mvMatrix, this.posicion);
				mat4.rotate(mvMatrix, this.rotacion[0], [1.0, 0.0, 0.0]);
				mat4.rotate(mvMatrix, this.rotacion[1], [0.0, 1.0, 0.0]);
				mat4.rotate(mvMatrix, this.rotacion[2], [0.0, 0.0, 1.0]);
		
				mat4.scale(mvMatrix, this.vectorEscala);

		
				this.dibujarDomo();

				mvPopMatrix();
		
			}
			
			this.dibujarDomo = function() {
			
				this.material.prepararParaDibujar();
				gl.bindBuffer(gl.ARRAY_BUFFER, domoVertexBuffer);
				gl.vertexAttribPointer(this.material.program.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
				
				gl.bindBuffer(gl.ARRAY_BUFFER, domoNormalsBuffer);
				gl.vertexAttribPointer(this.material.program.vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0);
				
				if (this.material.usaTexturas) {
				gl.bindBuffer(gl.ARRAY_BUFFER, domoTextureCoordBuffer);
				gl.vertexAttribPointer(this.material.program.textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
				}
				
				gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, domoVertexIndexBuffer);

			// Dibujamos.
				setMatrixUniforms(this.material.program);
				gl.drawElements(gl.TRIANGLES, domoVertexIndexBuffer.length, gl.UNSIGNED_SHORT, 0);		
			
				
				if (verNormales) {
					dibujarLineasNormales(idDomo);
				}
			}
		
		
		}
		
		
		
		function Plano(vectorEscala,posicion,rotacion, material) {
			this.vectorEscala = vectorEscala;
			this.posicion = posicion;
			this.rotacion = rotacion;
			this.material = material;
			
			
			this.draw = function() {
				mvPushMatrix();

				mat4.translate(mvMatrix, this.posicion);
				mat4.rotate(mvMatrix, this.rotacion[0], [1.0, 0.0, 0.0]);
				mat4.rotate(mvMatrix, this.rotacion[1], [0.0, 1.0, 0.0]);
				mat4.rotate(mvMatrix, this.rotacion[2], [0.0, 0.0, 1.0]);
			
				mat4.scale(mvMatrix, this.vectorEscala);

			
				this.dibujarPlano();

				mvPopMatrix();
				
			};
			
			this.dibujarPlano = function() {	
			
				this.material.prepararParaDibujar();
				gl.bindBuffer(gl.ARRAY_BUFFER, planeVertexBuffer);
				gl.vertexAttribPointer(this.material.program.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);

								
				gl.bindBuffer(gl.ARRAY_BUFFER, planeNormalsBuffer);
				gl.vertexAttribPointer(this.material.program.vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0);
				
				if(this.material.usaTangentes){
				gl.bindBuffer(gl.ARRAY_BUFFER, planeTangentBuffer);
				gl.vertexAttribPointer(this.material.program.vertexTangentAttribute, 3, gl.FLOAT, false, 0, 0);
				}
				
				if(this.material.usaTexturas){
				gl.bindBuffer(gl.ARRAY_BUFFER, planeTextureCoordBuffer);
				gl.vertexAttribPointer(this.material.program.textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
				}
				gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, planeVertexIndexBuffer);

			// Dibujamos.
				setMatrixUniforms(this.material.program);
				gl.drawElements(gl.TRIANGLE_STRIP, planeVertexIndexBuffer.length, gl.UNSIGNED_SHORT, 0);
					
				//gl.disableVertexAttribArray(); //DEBUG
				
				//console.log("materialSuelo.programNormalMap.vertexNormalAttribute = " +this.material.program.vertexNormalAttribute); 
				
				
				if (verNormales) {
					dibujarLineasNormales(idPlano);
				}
			}
		
		}
		
		
		
		function Esfera (radio, posicion, rotacion ,material) {
			this.radio=radio;
			this.posicion = posicion;
			this.rotacion = rotacion;
			this.material = material;
			
			this.draw = function () { //ORDEN DE LA ROTACION: YZX
				mvPushMatrix();

			
        // Moverse a la posicion de la esfera
				mat4.translate(mvMatrix, this.posicion);
				mat4.rotate(mvMatrix, this.rotacion[1], [0.0, 1.0, 0.0]);
				mat4.rotate(mvMatrix, this.rotacion[2], [0.0, 0.0, 1.0]);
				mat4.rotate(mvMatrix, this.rotacion[0], [1.0, 0.0, 0.0]);

				mat4.scale(mvMatrix, [this.radio,this.radio,this.radio]);

				
				this.dibujarEsfera();

				mvPopMatrix();
			}
			
			this.dibujarEsfera = function() {

				this.material.prepararParaDibujar();
					
				gl.bindBuffer(gl.ARRAY_BUFFER, esfVertexBuffer);
				gl.vertexAttribPointer(this.material.program.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);

				if(this.material.usaTexturas){
					gl.bindBuffer(gl.ARRAY_BUFFER,esfTextureCoordBuffer);
					gl.vertexAttribPointer(this.material.program.textureCoordAttribute, 2, gl.FLOAT, false , 0 ,0);
				
				}
				
				gl.bindBuffer(gl.ARRAY_BUFFER, esfNormalsBuffer);
				gl.vertexAttribPointer(this.material.program.vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0);

				gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, esfVertexIndexBuffer);

			// Dibujamos.
				setMatrixUniforms(this.material.program);
				gl.drawElements(gl.TRIANGLE_STRIP, esfVertexIndexBufferLength, gl.UNSIGNED_SHORT, 0);
				
				if (verNormales) {
					dibujarLineasNormales(idEsf);
				}
			}
		
		}
		
		function Cilindro(alto, radio, posicion, rotacion, material) {
		
			this.alto = alto;
			this.radio = radio;
			this.posicion = posicion;
			this.rotacion = rotacion;
			this.material = material;
			this.mMatrix = mat4.create();
			
		this.draw = function () {
				mvPushMatrix();

				mat4.identity(this.mMatrix);
				// Moverse a la posicion del cilindro
				mat4.translate(this.mMatrix, this.posicion);
				mat4.rotate(this.mMatrix, this.rotacion[0], [1.0, 0.0, 0.0]);
				mat4.rotate(this.mMatrix, this.rotacion[1], [0.0, 1.0, 0.0]);
				mat4.rotate(this.mMatrix, this.rotacion[2], [0.0, 0.0, 1.0]);
				
				mat4.scale(this.mMatrix, [this.radio,this.radio,this.alto]);

				mvMatrix = mat4.multiply(mvMatrix,this.mMatrix);
				this.dibujarCilindro();

				mvPopMatrix();
			};
			
		
		 this.dibujarCilindro=function() {
		 
			this.material.prepararParaDibujar();
			gl.bindBuffer(gl.ARRAY_BUFFER, cilVertexBuffer);
			gl.vertexAttribPointer(this.material.program.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);

			
			if(this.material.usaTexturas) {
			
			gl.bindBuffer(gl.ARRAY_BUFFER, cilTextureCoordBuffer);
			gl.vertexAttribPointer(this.material.program.textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
			
			}
			
			if(this.material.usaTangentes){
				gl.bindBuffer(gl.ARRAY_BUFFER, cilTangentBuffer);
				gl.vertexAttribPointer(this.material.program.vertexTangentAttribute, 3, gl.FLOAT, false, 0, 0);
			
			}
			
			gl.bindBuffer(gl.ARRAY_BUFFER, cilNormalsBuffer);
			gl.vertexAttribPointer(this.material.program.vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0);

			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cilVertexIndexBuffer);

		// Dibujamos.
			setMatrixUniforms(this.material.program);
			gl.drawElements(gl.TRIANGLES, cilVertexIndexBuffer.length, gl.UNSIGNED_SHORT, 0);
			
			if (this.material.esReflectivo) {
				gl.uniformMatrix4fv(this.material.program.mMatrixUniform, false, this.mMatrix);
			}
			
			if (verNormales) {
				dibujarLineasNormales(idCil);
			}
		}
		
				
		}
		
		function Cubo(vectorEscala, posicion, rotacion, material) {
			this.vectorEscala = vectorEscala;
			this.posicion = posicion;
			this.rotacion = rotacion;
			this.material = material;
			this.mMatrix = mat4.create();
			
			this.draw = function() {
				mvPushMatrix();
				
				mat4.identity(this.mMatrix);
				// Moverse a la posicion del cubo
				mat4.translate(this.mMatrix, this.posicion);
				mat4.rotate(this.mMatrix, this.rotacion[0], [1.0, 0.0, 0.0]);
				mat4.rotate(this.mMatrix, this.rotacion[1], [0.0, 1.0, 0.0]);
				mat4.rotate(this.mMatrix, this.rotacion[2], [0.0, 0.0, 1.0]);
			
				mat4.scale(this.mMatrix, this.vectorEscala);

				mvMatrix = mat4.multiply(mvMatrix,this.mMatrix);
		
				this.dibujarCubo();

				mvPopMatrix();
			
			}
			
			this.dibujarCubo = function() {
			
				this.material.prepararParaDibujar();
				
				gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexBuffer);
				gl.vertexAttribPointer(this.material.program.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);

				if(this.material.usaTexturas){
					gl.bindBuffer(gl.ARRAY_BUFFER,cubeTextureCoordBuffer);
					gl.vertexAttribPointer(this.material.program.textureCoordAttribute, 2, gl.FLOAT, false , 0 ,0);
				}
				
				gl.bindBuffer(gl.ARRAY_BUFFER, cubeNormalsBuffer);
				gl.vertexAttribPointer(this.material.program.vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0);

				gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeVertexIndexBuffer);

			// Dibujamos.
				setMatrixUniforms(this.material.program);
				gl.drawElements(gl.TRIANGLES, cubeVertexIndexBuffer.length, gl.UNSIGNED_SHORT, 0);
				
				if (this.material.esReflectivo) {
					gl.uniformMatrix4fv(this.material.program.mMatrixUniform, false, this.mMatrix);
				}
				
				if (verNormales) {
					dibujarLineasNormales(idCubo);
				}
			}
		
		
			
		}
		
		function Cono (alto, radio, posicion, rotacion, material) {
			this.alto = alto;
			this.radio = radio;
			this.posicion = posicion;
			this.rotacion = rotacion;
			this.material = material;
			this.mMatrix = mat4.create();
			
			this.draw = function () {
			mvPushMatrix();
			
			mat4.identity(this.mMatrix);
			// Moverse a la posicion del cono
			mat4.translate(this.mMatrix, this.posicion);
			mat4.rotate(this.mMatrix, this.rotacion[0], [1.0, 0.0, 0.0]);
			mat4.rotate(this.mMatrix, this.rotacion[1], [0.0, 1.0, 0.0]);
			mat4.rotate(this.mMatrix, this.rotacion[2], [0.0, 0.0, 1.0]);
		
			mat4.scale(this.mMatrix, [this.radio,this.radio,this.alto]);

			mvMatrix = mat4.multiply(mvMatrix,this.mMatrix);
			
			this.dibujarCono();

			mvPopMatrix();
			};
			
			this.dibujarCono = function() {
			
				this.material.prepararParaDibujar();
				gl.bindBuffer(gl.ARRAY_BUFFER, coneVertexBuffer);
				gl.vertexAttribPointer(this.material.program.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);

				if(this.material.usaTexturas) {
				
					gl.bindBuffer(gl.ARRAY_BUFFER, coneTextureCoordBuffer);
					gl.vertexAttribPointer(this.material.program.textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
				
				}
				
				gl.bindBuffer(gl.ARRAY_BUFFER, coneNormalsBuffer);
				gl.vertexAttribPointer(this.material.program.vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0);

				gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, coneVertexIndexBuffer);

		// Dibujamos.
				setMatrixUniforms(this.material.program);
				gl.drawElements(gl.TRIANGLE_STRIP, coneVertexIndexBuffer.length, gl.UNSIGNED_SHORT, 0);
				
				if (this.material.esReflectivo) {
					gl.uniformMatrix4fv(this.material.program.mMatrixUniform, false, this.mMatrix);
				}
				
			
				if (verNormales) {
					dibujarLineasNormales(idCono);
				}
		};
			
		
		}	
		
		
		function dibujarEjes() {
			

            var ejesVertex= new Float32Array(

                [
					0.0,0.0,0.0, 
					100.0,0.0,0.0,
					100.0,0.0,0.0,
					
					0.0,0.0,0.0, 
					0.0,100.0,0.0,
					
					0.0,0.0,0.0, 
					0.0,0.0,100.0
				]

            );
			
			var ejesVertexColors = new Float32Array(
				[
					1.0,0.0,0.0,1.0,
					1.0,0.0,0.0,1.0,	//ROJO = EJE X
					
					0.0,1.0,0.0,1.0,	
					0.0,1.0,0.0,1.0,	//VERDE = EJE Y
					
					0.0,0.0,1.0,1.0,	
					0.0,0.0,1.0,1.0		//AZUL = EJE Z
				]);

            var ejesIndex = new Uint16Array(
				[
					0,1, 2,3, 4,5
				
				]);
			
			ejesVertexBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, ejesVertexBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, ejesVertex, gl.STATIC_DRAW);

            ejesColorBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, ejesColorBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, ejesVertexColors, gl.STATIC_DRAW);
			
			ejesIndexBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ejesIndexBuffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, ejesIndex, gl.STATIC_DRAW);
			
			
			gl.bindBuffer(gl.ARRAY_BUFFER, ejesVertexBuffer);

            gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
			
			gl.bindBuffer(gl.ARRAY_BUFFER, ejesColorBuffer);

			gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, 4, gl.FLOAT, false, 0, 0);

			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ejesIndexBuffer);

            gl.lineWidth(10.0);

			setMatrixUniforms();
            gl.drawElements(gl.LINES, 6, gl.UNSIGNED_SHORT, 0);

            

		}
		
		// --------------------------------FIN BUFFERS Y PRIMITIVAS
		
		
		// --------------------------------RUEDA
		
		function Rueda(alto, radio, posicion, rotacion, material) {
			
			this.alto = alto;
			this.radio = radio;
			this.posicion = posicion;
			this.rotacion = rotacion;
			this.material = material;
			
			
			this.draw = function () {	//ORDEN DE LA ROTACION: YZX
				mvPushMatrix();

					
				// Moverse a la posicion del cilindro
				mat4.translate(mvMatrix, this.posicion);
				
				mat4.rotate(mvMatrix, this.rotacion[1], [0.0, 1.0, 0.0]);
				mat4.rotate(mvMatrix, this.rotacion[2], [0.0, 0.0, 1.0]);
				mat4.rotate(mvMatrix, this.rotacion[0], [1.0, 0.0, 0.0]);
				
				mat4.scale(mvMatrix, [this.radio,this.alto,this.radio]);

				
				this.dibujarRueda();

				mvPopMatrix();
			}
		
			
			this.dibujarRueda = function() {
			
				this.material.prepararParaDibujar();
				
				gl.bindBuffer(gl.ARRAY_BUFFER, ruedaVertexBuffer);
				gl.vertexAttribPointer(this.material.program.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);

				if(this.material.usaTexturas) {
				gl.bindBuffer(gl.ARRAY_BUFFER, ruedaTextureCoordBuffer);
				gl.vertexAttribPointer(this.material.program.textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
				}
				
				
				//gl.bindBuffer(gl.ARRAY_BUFFER, ruedaVertexColorBuffer);
				//gl.vertexAttribPointer(this.material.program.vertexColorAttribute, 4, gl.FLOAT, false, 0, 0);
				
				
				gl.bindBuffer(gl.ARRAY_BUFFER, ruedaNormalsBuffer);
				gl.vertexAttribPointer(this.material.program.vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0);

				gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ruedaVertexIndexBuffer);

				
				//console.log("dibujarRueda");
				
			// Dibujamos.
				setMatrixUniforms(this.material.program);
				gl.drawElements(gl.TRIANGLES, ruedaVertexIndexBuffer.length, gl.UNSIGNED_SHORT, 0); //
				
				
				if (verNormales) {
					dibujarLineasNormales(idRueda);
				}
			};
				
		}
		
		
		// --------------------------------FIN RUEDA
		
		
		// --------------------------------OBJETOS DEL CHASIS -----------
		
		function Chasis (escala, posicion, rotacion, material){
			this.escala=escala;
			this.posicion=posicion;
			this.rotacion=rotacion;
			this.material = material;
			
			this.draw = function () {
				mvPushMatrix();

			// Moverse a la posicion del cilindro
				mat4.translate(mvMatrix, this.posicion);
				mat4.rotate(mvMatrix, degToRad(this.rotacion[0]), [1.0, 0.0, 0.0]);
				mat4.rotate(mvMatrix, degToRad(this.rotacion[1]), [0.0, 1.0, 0.0]);
				mat4.rotate(mvMatrix, degToRad(this.rotacion[2]), [0.0, 0.0, 1.0]);
				
				mat4.scale(mvMatrix, [this.escala,this.escala,this.escala]);

				
				this.dibujarChasis();
				

				mvPopMatrix();
			};
		
			this.dibujarChasis= function(){
			
				
				this.material.prepararParaDibujar();
				
				gl.bindBuffer(gl.ARRAY_BUFFER, chasisVertexBuffer);
				gl.vertexAttribPointer(this.material.program.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);

				gl.bindBuffer(gl.ARRAY_BUFFER, chasisNormalsBuffer);
				gl.vertexAttribPointer(this.material.program.vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0);
				
				if(this.material.usaTexturas){
				gl.bindBuffer(gl.ARRAY_BUFFER, chasisTextureCoordBuffer);
				gl.vertexAttribPointer(this.material.program.textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
				}
				
				gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, chasisVertexIndexBuffer);

			// Dibujamos.
				setMatrixUniforms(this.material.program);
				gl.drawElements(gl.TRIANGLES, chasisVertexIndexBuffer.length, gl.UNSIGNED_SHORT, 0); //
				
				
				if (verNormales) {
					dibujarLineasNormales(idChasis);
				}
		
			};
		
		}
		
		
		function Cabina(escala,posicion,rotacion,material){
			this.rotacion = rotacion;
			this.escala=escala;
			this.posicion=posicion;
			this.material=material;
			
			
			this.draw= function (){
		
			mvPushMatrix();

		// Moverse a la posicion 
			mat4.translate(mvMatrix, this.posicion);
			mat4.rotate(mvMatrix, degToRad(this.rotacion[0]), [1.0, 0.0, 0.0]);
			mat4.rotate(mvMatrix, degToRad(this.rotacion[1]), [0.0, 1.0, 0.0]);
			mat4.rotate(mvMatrix, degToRad(this.rotacion[2]), [0.0, 0.0, 1.0]);
			mat4.scale(mvMatrix, [this.escala,this.escala,this.escala]);

			this.dibujarCabina();
			mvPopMatrix();
			
			};
			
			this.dibujarCabina = function(){
			
				this.material.prepararParaDibujar();
				gl.bindBuffer(gl.ARRAY_BUFFER, cabinaVertexBuffer);
				gl.vertexAttribPointer(this.material.program.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);

				
				if(this.material.usaTexturas) {
				
				gl.bindBuffer(gl.ARRAY_BUFFER, cabinaTextureCoordBuffer);
				gl.vertexAttribPointer(this.material.program.textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
				
				}
			
				gl.bindBuffer(gl.ARRAY_BUFFER, cabinaNormalsBuffer);
				gl.vertexAttribPointer(this.material.program.vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0);

				gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cabinaVertexIndexBuffer);

			// Dibujamos.
				setMatrixUniforms(this.material.program);
				gl.drawElements(gl.TRIANGLES, cabinaVertexIndexBufferLength, gl.UNSIGNED_SHORT, 0);
				
				
				if (verNormales) {
					dibujarLineasNormales(idCabina);
				}
			}
		
		}
		
		
	
		function ChasisTot(vectorEscala, posicion, rotacion) {
			this.vectorEscala = vectorEscala;
			this.posicion = posicion;
			this.rotacion = rotacion;
			
			this.chasis = new Chasis(1.0, [0.0,0.0,0.0], [0.0,0.0,0.0], materialChasis);
			this.torreta = new Torreta([1.0,1.0,1.0], [0,0,0], [0,0,0]);
			this.cabina  = new Cabina(1.0, [0.0 , 0.0, 0.0], [0.0 , 0.0 , 0.0],materialCabina);
			this.faroDer = new Cubo([3, 4 ,0.2] ,[0 , 0 , 0], [0 , 0, 0], materialCabina);
			// this.faroIzq = new Cilindro(3, 1, [0,0,0], [0,degToRad(90),0], [0.0,0.0,0.0,1.0]);
			
			
			this.draw = function () {
			mvPushMatrix();
			
			mat4.translate(mvMatrix, this.posicion);
			mat4.rotate(mvMatrix, this.rotacion[1], [0.0, 1.0, 0.0]);
			mat4.rotate(mvMatrix, this.rotacion[2], [0.0, 0.0, 1.0]);
			mat4.rotate(mvMatrix, this.rotacion[0], [1.0, 0.0, 0.0]);
			mat4.scale(mvMatrix, this.vectorEscala);
			
			mvPushMatrix();
			this.chasis.draw();
			mvPopMatrix();
			mvPushMatrix();
			mat4.translate(mvMatrix,[this.vectorEscala[0]*2.0, 0.0, this.vectorEscala[2]*1.8 ]);			
			this.cabina.draw();
			mvPopMatrix();
			mvPushMatrix();
			mat4.translate(mvMatrix,[-this.vectorEscala[0]*4.5 ,  0.0, this.vectorEscala[2]*1.2]);    //Habria que poner esto en funcion de la escala del chasis
			this.torreta.draw();
			mvPopMatrix();
			mvPushMatrix();
			mat4.translate(mvMatrix,[this.vectorEscala[0]*9 ,  -this.vectorEscala[1]*0, 0.0]) // Antes era 2
			this.faroDer.draw();
			mvPopMatrix();
			// mvPushMatrix();
			// mat4.translate(mvMatrix,[this.vectorEscala[0]*9 ,  this.vectorEscala[1]*2, 0.0])
			// this.faroIzq.draw();
			// mvPopMatrix();
			
			
			mvPopMatrix();
				}
			this.animate = function(timeNow, lastTime) {
				this.torreta.animate(timeNow, lastTime);
			}
		
		
		}
		
		// --------------------------------OBJETOS AVANZADOS DE LA TORRETA CON SUS METODOS
		
		function CentroTorretaCilindro(escala, posicion, rotacion) {
			this.posicion = posicion;
			this.rotacion = rotacion;
			this.escala = escala;
			this.cilindroCentral = new Cilindro(9, 1.5, [0,0,0.1], [0,0,0],materialTorreta);
			this.conoBase = new Cono(5, 3.5, [0,0,0], [0,0,0],materialTorreta);
		
			
			this.draw = function () {
			
			mvPushMatrix();
			
			mat4.translate(mvMatrix, this.posicion);
			mat4.rotate(mvMatrix, this.rotacion[0], [1.0, 0.0, 0.0]);
			mat4.rotate(mvMatrix, this.rotacion[1], [0.0, 1.0, 0.0]);
			mat4.rotate(mvMatrix, this.rotacion[2], [0.0, 0.0, 1.0]);
			
			mat4.scale(mvMatrix, [this.escala,this.escala,this.escala]);
			
			this.cilindroCentral.draw();
			
			this.conoBase.draw();
			
			mvPopMatrix();
		};

		}
		
		
		function CanonesCuadruples(escala, posicion, rotacion) {
		
			this.desplazamiento = [0,0,0,0];
			this.vuelta = [false,false,false,false];
			this.cilindrosAnimados = [];
			this.cubosFijos = [];
			this.cubosUnion = [];
			this.rotacion = rotacion;
			this.posicion = posicion;
			this.escala = escala;
			this.cilindrosAnimados.push(new Cilindro(2, 0.5, [3,3.5,1.5], [0, degToRad(90),0], materialDisparadores));
			this.cilindrosAnimados.push(new Cilindro(2, 0.5, [3,3.5,-1.5], [0, degToRad(90),0], materialDisparadores));
			this.cilindrosAnimados.push(new Cilindro(2, 0.5, [3,-3.5,1.5], [0, degToRad(90),0], materialDisparadores));
			this.cilindrosAnimados.push(new Cilindro(2, 0.5, [3,-3.5,-1.5], [0, degToRad(90),0], materialDisparadores));
			
			this.cilUnion = new Cilindro(7,0.3, [0,3.5,0], [degToRad(90),0,0],materialTorreta);
			this.cubosUnion.push(new Cubo([1,0.25,1], [0,3.5,0], [0, 0,0], materialTorreta));
			this.cubosUnion.push(new Cubo([1,0.25,1], [0,-3.5,0], [0, 0,0], materialTorreta));
		
			this.cubosFijos.push(new Cubo([3,0.9,0.9], [0,3.5,-1.5], [0, 0,0], materialTorreta));
			this.cubosFijos.push(new Cubo([3,0.9,0.9], [0,3.5,1.5], [0, 0,0], materialTorreta));
			this.cubosFijos.push(new Cubo([3,0.9,0.9], [0,-3.5,-1.5], [0, 0,0], materialTorreta));
			this.cubosFijos.push(new Cubo([3,0.9,0.9], [0,-3.5,1.5], [0, 0,0], materialTorreta));
		
			
			this.draw = function() {
			mvPushMatrix();
			
			mat4.translate(mvMatrix, this.posicion);
			mat4.rotate(mvMatrix, this.rotacion[0], [1.0, 0.0, 0.0]);
			mat4.rotate(mvMatrix, this.rotacion[1], [0.0, 1.0, 0.0]);
			mat4.rotate(mvMatrix, this.rotacion[2], [0.0, 0.0, 1.0]);
			
			mat4.scale(mvMatrix, [this.escala,this.escala,this.escala]);

			for(i=0; i<4;i++)
			{
				mvPushMatrix();
				mat4.translate(mvMatrix, [-this.desplazamiento[i], 0,0]);
				this.cilindrosAnimados[i].draw();
				mvPopMatrix();
			}
			
			for(i=0; i<4;i++)
			{
				this.cubosFijos[i].draw();
			}
			
			this.cilUnion.draw();
			this.cubosUnion[0].draw();
			this.cubosUnion[1].draw();
			
			
			
			
			mvPopMatrix();
		
		};
			var tiempoInicioDeDisparo = 0;
			this.animate = function(timeNow, lastTime) {
		
			var velDespIda = 16/1000.0;
			var velDespVuelta = 8/1000.0;
			var elapsed = 0;
			var delayms = 350/3;
			
			this.rotacion = [0,degToRad(tanque.chasisTot.torreta.rotArma),0];
				
			if (disparar)
			{
				if (tiempoInicioDeDisparo == 0)
				{
					tiempoInicioDeDisparo = timeNow;
				}
				
				for(i=0;i<4;i++)
				{
					if(timeNow-tiempoInicioDeDisparo >= i*delayms)
					{
				
						elapsed = timeNow-lastTime;
						if (!this.vuelta[i])
						{
							this.desplazamiento[i] += velDespIda*elapsed;		
							
					
							if(this.desplazamiento[i] <= 0)
							{
								this.desplazamiento = 0;
							}
						
							if (this.desplazamiento[i] >= 1.7)
							{
								this.desplazamiento[i] = 1.7;
								this.vuelta[i] = true;
							}
						}
						
						else
						{
							this.desplazamiento[i] -= velDespVuelta*elapsed;
					
					
							if(this.desplazamiento[i] >=1.7)
							{
								this.desplazamiento = 1.7;
							}
						

							if (this.desplazamiento[i] <= 0 )
							{
								this.desplazamiento[i] = 0;
								this.vuelta[i] = false;
							}
					
					
						}
					
					}
					
				}
			}
			
			else
			{
				for(i=0;i<4;i++)
				{
					this.desplazamiento[i]=0;
					this.vuelta[i]=false;
					
				}
				tiempoInicioDeDisparo = 0;
			}
		};
		
		}

	
		function Torreta(escala, posicion, rotacion) {
		
			this.rotArma = 0;
			this.posicion = posicion;
			this.rotacion = rotacion;
			this.escala = escala;
			
			this.centroTorreta = new CentroTorretaCilindro(1, [0,0,0], [0,0,0]);
			this.arma = new CanonesCuadruples(1, [0, 0, 7.5], [0, 0, 0]);
			
			
			this.draw = function () {
				mvPushMatrix();
			
				mat4.translate(mvMatrix, this.posicion);
				mat4.rotate(mvMatrix, this.rotacion[0], [1.0, 0.0, 0.0]);
				mat4.rotate(mvMatrix, this.rotacion[1], [0.0, 1.0, 0.0]);
				mat4.rotate(mvMatrix, this.rotacion[2], [0.0, 0.0, 1.0]);
			
				mat4.scale(mvMatrix, [this.escala[0],this.escala[1],this.escala[2]]);
			
				this.centroTorreta.draw();
				this.arma.draw();

				mvPopMatrix();
			};
			
			this.animate = function (timeNow, lastTime) {
			
			//this.rotacion = [0, rotTorreta, 0];
			this.arma.animate(timeNow, lastTime);
		};
		
		}
		
		// ---------------------------------FIN OBJETOS DE TORRETA
		
		// ---------------------------------TREN DE MANEJO
		
		function Tren(escala, posicion, rotacion){
			this.posicion = posicion;
			this.rotacion = rotacion;
			this.escala = escala;
			
			//this.ruedaIzq = new Esfera(3, [0,8,0], [0,0,0]);
			//this.ruedaDer = new Esfera(3, [0,8,0], [0,0,0]);
			this.ruedaIzq = new Rueda(2,3, [0,8,0], [0,0,0], materialRueda);
			this.ruedaDer = new Rueda(2,3, [0,-8,0], [0,0,0], materialRueda);
			
				
			this.draw = function () {
			
			mvPushMatrix();
			
			//if(cont<lim){console.log("Posicion en la que se va a dibujar el tren: "+ this.posicion);}	//DEBUG
			//if(cont<lim){console.log("Rotacion con la que se va a dibujar el tren(EN GRADOS): "+ this.rotacion);} //DEBUG
			mat4.translate(mvMatrix, this.posicion);
			mat4.rotate(mvMatrix, degToRad(this.rotacion[0]), [1.0, 0.0, 0.0]);
			mat4.rotate(mvMatrix, degToRad(this.rotacion[1]), [0.0, 1.0, 0.0]);
			mat4.rotate(mvMatrix, degToRad(this.rotacion[2]), [0.0, 0.0, 1.0]);
			
			mat4.scale(mvMatrix, [this.escala,this.escala,this.escala]);
			
			//if(cont<lim){console.log("------Rueda IZQ")}; //DEBUG
			//if(cont<lim){console.log("Posicion en la que se va a dibujar la rueda IZQ: "+ this.ruedaIzq.posicion)}; //DEBUG
			//if(cont<lim){console.log("Rotacion con la que se va a dibujar la rueda IZQ(EN GRADOS): "+ this.ruedaIzq.rotacion);} //DEBUG
			this.ruedaIzq.draw();
			//if(cont<lim){console.log("------Rueda DER");} //DEBUG
			//if(cont<lim){console.log("Posicion en la que se va a dibujar la rueda DER: "+ this.ruedaDer.posicion);} //DEBUG
			//if(cont<lim){console.log("Rotacion con la que se va a dibujar la rueda DER(EN GRADOS): "+ this.ruedaDer.rotacion);} //DEBUG
			this.ruedaDer.draw();

			mvPopMatrix();
			
			};
		
			
			}
		
		
		//----------------------------------TANQUE COMPLETO
		
		function Tanque(vectorEscala, posicion,rotacion) {
			
				this.vectorEscala = vectorEscala;
				this.posicion = posicion;
				this.rotacion = rotacion;
				
				this.chasisTot  = new ChasisTot(vectorEscala, posicion, rotacion);
				this.trenDelantero = new Tren(1.0, [0,0,0], [0,0,0]);
				this.trenTrasero = new Tren(1.0, [0,0,0], [0,0,0]);
			
					
				this.draw = function() {
				
					this.chasisTot.draw();
					this.trenDelantero.draw();
					this.trenTrasero.draw();
							
		
				};
		
			}
		
		//----------------------------------DRON
		
		function Dron(vectorEscala, rotacion){
			
			this.rotacion = rotacion;
			this.vectorEscala = vectorEscala;
			this.posicion = [0,0,0];
			// this.posicion=posicion;
			this.velocidadDron=0.1;
			this.puntoCurva = 0
			
			this.centro = new Esfera(0.4,[0,0,0],[0,0,0],materialDron);//vectorEscala, posicion, rotacion	,materialManguera
			this.cuerpo = new Cilindro (0.01,1,[0,0,0],[0,0,0],materialChasis);
			this.camino=obtenerCaminoDron();
			// console.log("camino" + this.camino);
				
			this.draw = function() {	// ORDEN DE LA ROTACION: YZX
				mvPushMatrix();
				
				mat4.translate(mvMatrix, this.posicion);
				mat4.rotate(mvMatrix, this.rotacion[1], [0.0, 1.0, 0.0]);
				mat4.rotate(mvMatrix, this.rotacion[2], [0.0, 0.0, 1.0]);
				mat4.rotate(mvMatrix, this.rotacion[0], [1.0, 0.0, 0.0]);
				mat4.scale(mvMatrix, this.vectorEscala);
				this.centro.draw();
				this.cuerpo.draw();
				
				mvPopMatrix();
			
			
			}
			
			this.animate= function (timeNow, lastTime){
				var elapsed = timeNow-lastTime;
				this.puntoCurva=(Math.floor((this.puntoCurva+Math.floor(elapsed*this.velocidadDron))/3)*3)%(this.camino.length/3);
				// console.log("punto curva  " + this.puntoCurva);
				this.posicion=[this.camino[this.puntoCurva],this.camino[this.puntoCurva+1],this.camino[this.puntoCurva+2]];
				// console.log(this.posicion);
				
				
			}
		
		
		
		
		}
		
		
		//----------------------------------FIN DRON
		
		//----------------------------------MANGUERAS
		
		
		function Manguera (vectorEscala, posicion, rotacion, material, tipo){
			this.vectorEscala = vectorEscala;
			this.rotacion = rotacion;
			this.tipo = tipo;
			this.material = material;
			
			this.posicion = [posicion[0], posicion[1], posicion[2]+2*vectorEscala[2]];
			
			this.transformarPosFin = function(x,y,z) {
				
				var aux =[x*vectorEscala[0],y*vectorEscala[1],z*vectorEscala[2]];

					aux = rotx(aux, rotacion[0]);
					aux = roty(aux, rotacion[1]);
					aux = rotz(aux, rotacion[2]);
					
					aux = [aux[0]+posicion[0],aux[1]+posicion[1],aux[2]+posicion[2]]
					

					return aux;
			}
			
			this.getPosFin = function() {
				if (tipo ==1) {
					return this.transformarPosFin(60,130,0);
				}
				
				else if (tipo ==2) {
					return this.transformarPosFin(-50,130,0);

				}
				
				else if (tipo ==3) {
					return this.transformarPosFin(-120,50,0);

				}
				
				else { 
				console.log("getPosFin: tipo de manguera incorrecto");
				return [0,0,0];
				}
			}
			
			this.draw= function(){
				mvPushMatrix();

				
				// Moverse a la posicion del domo
				mat4.translate(mvMatrix, this.posicion);
				mat4.rotate(mvMatrix, this.rotacion[0], [1.0, 0.0, 0.0]);
				mat4.rotate(mvMatrix, this.rotacion[1], [0.0, 1.0, 0.0]);
				mat4.rotate(mvMatrix, this.rotacion[2], [0.0, 0.0, 1.0]);
				
				mat4.scale(mvMatrix, this.vectorEscala);

				this.dibujarManguera(this.tipo);

				mvPopMatrix();
		
			};
			
		
		this.dibujarManguera=function(tipo){
		
		if(tipo == 1) {
		
			this.material.prepararParaDibujar();
			gl.bindBuffer(gl.ARRAY_BUFFER, manguera1VertexBuffer);
			gl.vertexAttribPointer(this.material.program.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);

			// gl.bindBuffer(gl.ARRAY_BUFFER, manguera1VertexColorBuffer);
			// gl.vertexAttribPointer(this.material.program.vertexColorAttribute, 4, gl.FLOAT, false, 0, 0);
			
			gl.bindBuffer(gl.ARRAY_BUFFER, manguera1NormalsBuffer);
			gl.vertexAttribPointer(this.material.program.vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0);

			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, manguera1VertexIndexBuffer);

			// Dibujamos.
			setMatrixUniforms(this.material.program);
			gl.drawElements(gl.TRIANGLES, manguera1VertexIndexBuffer.length, gl.UNSIGNED_SHORT, 0);		
			
			
			if (verNormales) {
				dibujarLineasNormales(idManguera1);
			}
		}
		
		else if(tipo == 2) {
			this.material.prepararParaDibujar();
			
			gl.bindBuffer(gl.ARRAY_BUFFER, manguera2VertexBuffer);
			gl.vertexAttribPointer(this.material.program.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);

			// gl.bindBuffer(gl.ARRAY_BUFFER, manguera2VertexColorBuffer);
			// gl.vertexAttribPointer(this.material.program.vertexColorAttribute, 4, gl.FLOAT, false, 0, 0);
			
			gl.bindBuffer(gl.ARRAY_BUFFER, manguera2NormalsBuffer);
			gl.vertexAttribPointer(this.material.program.vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0);

			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, manguera2VertexIndexBuffer);

		// Dibujamos.
			setMatrixUniforms(this.material.program);
			gl.drawElements(gl.TRIANGLES, manguera2VertexIndexBuffer.length, gl.UNSIGNED_SHORT, 0);		
			
			if (verNormales) {
				dibujarLineasNormales(idManguera2);
			}
		}
		
		else if(tipo == 3) {
			this.material.prepararParaDibujar();
			
			gl.bindBuffer(gl.ARRAY_BUFFER, manguera3VertexBuffer);
			gl.vertexAttribPointer(this.material.program.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);

			// gl.bindBuffer(gl.ARRAY_BUFFER, manguera3VertexColorBuffer);
			// gl.vertexAttribPointer(this.material.program.vertexColorAttribute, 4, gl.FLOAT, false, 0, 0);
			
			gl.bindBuffer(gl.ARRAY_BUFFER, manguera3NormalsBuffer);
			gl.vertexAttribPointer(this.material.program.vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0);

			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, manguera3VertexIndexBuffer);

		// Dibujamos.
			setMatrixUniforms(this.material.program);
			gl.drawElements(gl.TRIANGLES, manguera3VertexIndexBuffer.length, gl.UNSIGNED_SHORT, 0);		
			
			if (verNormales) {
				dibujarLineasNormales(idManguera3);
			}
		}
		
		else { console.log("tipo de manguera incorrecto") }
		
		
		// Dibujamos las tangentes:
		
		
			/*gl.bindBuffer(gl.ARRAY_BUFFER, tgVertexBuffer);

            gl.vertexAttribPointer(lineProgram.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
			
			gl.bindBuffer(gl.ARRAY_BUFFER, tgColorBuffer);

			gl.vertexAttribPointer(lineProgram.vertexColorAttribute, 4, gl.FLOAT, false, 0, 0);

			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, tgIndexBuffer);

            gl.lineWidth(10.0);

			setMatrixUniforms();
            gl.drawElements(gl.LINES, tgIndexBuffer.length, gl.UNSIGNED_SHORT, 0);
			*/
		
		};
			
	}
	
	
	//////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////
	////////////////////       FIN DIBUJABLES        /////////////////////////
		