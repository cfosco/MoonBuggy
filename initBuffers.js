
		
		// ---------------------------------BUFFERS DE PRIMITIVAS
		
		
		
		// --------- IDENTIFICADORES (id del array de buffers de normales) 
		
		var idCil = 1;
		var idEsf = 2;
		var idCubo = 3;
		var idPlano = 4;
		var idCono = 5;
		var idChasis = 6;
		var idCabina = 7;
		var idRueda = 8;
		var idDomo = 9;
		var idTorre = 10;
		var idModulo = 11;
		var idManguera1 = 12;
		var idManguera2 = 13;
		var idManguera3 = 14;
		
		
		
		
    function initBuffersCilindro() {	//Tiene normales, FUNCIONAN
		var cantPuntosFormaDeCorte=20;
		
			
		var formaDeCorte=generarCirculo(cantPuntosFormaDeCorte);
		
		var normalesFormaDeCorte=formaDeCorte;
		
		var path=[
				0.0 ,
				0.0 ,
				0.0 ,
				0.5 ,
				1.0 ,
				1.0 ,
				1.0
				];

			var tamano=[ 
				0.0 ,
				1.0 , 
				1.0 ,
				1.0 ,
				1.0 ,
				1.0 ,
				0.0
			];	
			
			
			var vertices = [];
	
			for(var i=0; i<path.length; i++){
				for(var j=0 ; j<formaDeCorte.length;j+=2){

					vertices.push(formaDeCorte[j]*tamano[i]);
					vertices.push(formaDeCorte[j+1]*tamano[i]);
					vertices.push(path[i]);	
					
				}
			}
			
			cilVertexBuffer = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, cilVertexBuffer);
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
				
			var normals = [];
			
			for (var a = 0; a < formaDeCorte.length/2; a++) {
                    normals = normals.concat([0.0,0.0,-1.0]);
                }
			
			for (var a = 0; a < formaDeCorte.length/2; a++) {
                    normals = normals.concat([0.0,0.0,-1.0]);
                }
			
			for (var b=0; b<3;b++) {
                for (var a = 0; a < cantPuntosFormaDeCorte; a++) {
                    normals = normals.concat([Math.cos(2 * a * Math.PI / (cantPuntosFormaDeCorte-1)),Math.sin(2 * a * Math.PI / (cantPuntosFormaDeCorte-1)), 0.0]);
                }
            }
			
			for (var a = 0; a < formaDeCorte.length/2; a++) {
                    normals = normals.concat([0.0,0.0,1.0]);
                }
			
           for (var a = 0; a < formaDeCorte.length/2; a++) {
                    normals = normals.concat([0.0,0.0,1.0]);
                }
			
			cilNormalsBuffer = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, cilNormalsBuffer);
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);
			
			
			////////////////// TANGENTES
			
			var tangente=[]
			
			
			for (var a = 0; a < cantPuntosFormaDeCorte; a++) {
                    tangente = tangente.concat([0.0,0.0,-1.0]);
                }
			
			for (var a = 0; a < cantPuntosFormaDeCorte; a++) {
                     tangente = tangente.concat([-Math.sin(2 * a * Math.PI / cantPuntosFormaDeCorte),Math.cos(2 * a * Math.PI / cantPuntosFormaDeCorte), 0.0]);
                }
			
			for (var b=0; b<3;b++) {
                for (var a = 0; a < cantPuntosFormaDeCorte; a++) {
                    tangente = tangente.concat([-Math.sin(2 * a * Math.PI / cantPuntosFormaDeCorte),Math.cos(2 * a * Math.PI / cantPuntosFormaDeCorte), 0.0]);
                }
            }
			
			for (var a = 0; a < cantPuntosFormaDeCorte; a++) {
                     tangente = tangente.concat([-Math.sin(2 * a * Math.PI / cantPuntosFormaDeCorte),Math.cos(2 * a * Math.PI / cantPuntosFormaDeCorte), 0.0]);
                }
			
           for (var a = 0; a < cantPuntosFormaDeCorte; a++) {
                    tangente = tangente.concat([0.0,0.0,1.0]);
                }
			
			
			cilTangentBuffer = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, cilTangentBuffer);
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(tangente), gl.STATIC_DRAW);
			
			
			
			
			
			
			
			
			
			generarTextureBufferCilindro(formaDeCorte.length/2,path.length);
			
			
			var index=[];
			
			for(var i=0; i<path.length-1; i++){
				for(var j=0; j<formaDeCorte.length/2-1 ; j++){
					var first= i*(formaDeCorte.length/2)+j;
					var second= first+formaDeCorte.length/2;
					index.push(first);
					index.push(second);
					index.push(first+1);
					
					index.push(second);
					index.push(second+1);
					index.push(first+1);
					
					
					
				}
			}
	  
			cilVertexIndexBuffer = gl.createBuffer();
			cilVertexIndexBuffer.length = index.length;
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cilVertexIndexBuffer);
			gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(index), 
						  gl.STATIC_DRAW);
		  
			if (verNormales) {
				generarLineasNormales(vertices, normals, idChasis);
			}
					
			
			
			
			
			
			
			
			
			
			
			
			
			
	}
		
		function initBuffersEsfera() {		//Tiene normales, FUNCIONAN, sacar vertice en 0,0,0
			
			var capas = 30;
            var verticesPorCapa = 30;

            var vertices = [];
			var textureCoords = [];
			var normals = [];
            for (b=0; b<capas;b++) {
				var theta = b * Math.PI /(capas-1);
				for (var a = 0; a < verticesPorCapa; a++) {
                    var phi = a * 2 * Math.PI /(verticesPorCapa-1);
					
					var x = Math.cos(phi) *Math.sin(theta);
					var y = Math.cos(theta);
					var z = Math.sin(phi) * Math.sin(theta);
					var u = 1 - (a/(verticesPorCapa-1));
					var v = 1 - (b/(capas-1));
					
					normals.push(x);
					normals.push(y);
					normals.push(z);
					textureCoords.push(u);
					textureCoords.push(v);
					vertices.push(x);
					vertices.push(y);
					vertices.push(z);
					
				}
            }
			
          
			

            esfVertexBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, esfVertexBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
			
			// Buffer de texturas
			
			esfTextureCoordBuffer = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, esfTextureCoordBuffer);
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoords), gl.STATIC_DRAW);
	
			
					
			esfNormalsBuffer = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, esfNormalsBuffer);
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);

			
			
			/*   var colors = [
				[1.0,  1.0,  1.0,  1.0],    //blanco
				[1.0,  0.0,  0.0,  1.0],    //rojo
				[1.0,  1.0,  0.0,  1.0],    //amarillo
				[0.0,  1.0,  0.0,  1.0],    //verde
				[0.0,  0.0,  1.0,  1.0],    //azul
				[1.0,  0.0,  1.0,  1.0]     //violeta
				];

            var generatedColors = [];

            generatedColors = generatedColors.concat(colors[0]);

            for(b=0;b<capas;b++){
                for (a=0; a<verticesPorCapa; a++) {
                    generatedColors = generatedColors.concat(colors[b%2+3]);

                }
            }


            generatedColors = generatedColors.concat(colors[0]);
			*/

            // Cargamos los datos de los colores en un nuevo buffer igual que con las posiciones
            // esfVertexColorBuffer = gl.createBuffer();
            // gl.bindBuffer(gl.ARRAY_BUFFER, esfVertexColorBuffer);
            // gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(generatedColors), gl.STATIC_DRAW);


            var conectarDeDerAIzq = true;

            var esfVertexIndices = [];
			for(a=0;a<capas-2;a++){
				for(b=0;b<=verticesPorCapa;b++){
					var first =a *(verticesPorCapa+1) + b;
					var second = first + verticesPorCapa+1;
					
					esfVertexIndices.push(first);
					esfVertexIndices.push(second);
					esfVertexIndices.push(first+1);
					
					esfVertexIndices.push(second);
					esfVertexIndices.push(second+1);
					esfVertexIndices.push(first +1);
				
				}
		   }

            esfVertexIndexBufferLength = esfVertexIndices.length;
            esfVertexIndexBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, esfVertexIndexBuffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(esfVertexIndices),gl.STATIC_DRAW);
        
			if (verNormales) {
				generarLineasNormales(vertices, normals, idEsf);
			}
			

		}
	
		function initBuffersCubo() {		//Tiene normales, FUNCIONAN
			
		cubeVertexBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexBuffer);

		var vertices = [	//Sobre el ejeX, mirando hacia el origen, con Up = Z
					    // Cara de arriba
					    -1.0, -1.0,  1.0,
					     1.0, -1.0,  1.0,
					     1.0,  1.0,  1.0,
					    -1.0,  1.0,  1.0,
					    
					    // Cara de abajo
					    -1.0, -1.0, -1.0,
					    -1.0,  1.0, -1.0,
					     1.0,  1.0, -1.0,
					     1.0, -1.0, -1.0,
					    
					    // Cara derecha
					    -1.0,  1.0, -1.0,
					    -1.0,  1.0,  1.0,
					     1.0,  1.0,  1.0,
					     1.0,  1.0, -1.0,
					    
					    // Cara izquierda
					    -1.0, -1.0, -1.0,
					     1.0, -1.0, -1.0,
					     1.0, -1.0,  1.0,
					    -1.0, -1.0,  1.0,
					    
					    // Cara frontal
					     1.0, -1.0, -1.0,
					     1.0,  1.0, -1.0,
					     1.0,  1.0,  1.0,
					     1.0, -1.0,  1.0,
					    
					    // Cara trasera
					    -1.0, -1.0, -1.0,
					    -1.0, -1.0,  1.0,
					    -1.0,  1.0,  1.0,
					    -1.0,  1.0, -1.0
					  ];
		
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

		
		
		// NORMALES 
		var normals = [	0.0, 0.0, 1.0,
					0.0, 0.0, 1.0,
					0.0, 0.0, 1.0,
					0.0, 0.0, 1.0,
					
					0.0, 0.0, -1.0,
					0.0, 0.0, -1.0,
					0.0, 0.0, -1.0,
					0.0, 0.0, -1.0,
					
					0.0, 1.0, 0.0,
					0.0, 1.0, 0.0,
					0.0, 1.0, 0.0,
					0.0, 1.0, 0.0,
					
					0.0, -1.0, 0.0,
					0.0, -1.0, 0.0,
					0.0, -1.0, 0.0,
					0.0, -1.0, 0.0,
					
					1.0, 0.0, 0.0,
					1.0, 0.0, 0.0,
					1.0, 0.0, 0.0,
					1.0, 0.0, 0.0,
					
					-1.0, 0.0, 0.0,
					-1.0, 0.0, 0.0,
					-1.0, 0.0, 0.0,
					-1.0, 0.0, 0.0];
					
			
			cubeNormalsBuffer = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, cubeNormalsBuffer);
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);

			cubeTextureCoordBuffer = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, cubeTextureCoordBuffer);
			var textureCoords = [
			  // Front face
			  0.0, 0.0,
			  1.0, 0.0,
			  1.0, 1.0,
			  0.0, 1.0,

			  // Back face
			  1.0, 0.0,
			  1.0, 1.0,
			  0.0, 1.0,
			  0.0, 0.0,

			  // Top face
			  0.0, 1.0,
			  0.0, 0.0,
			  1.0, 0.0,
			  1.0, 1.0,

			  // Bottom face
			  1.0, 1.0,
			  0.0, 1.0,
			  0.0, 0.0,
			  1.0, 0.0,

			  // Right face
			  1.0, 0.0,
			  1.0, 1.0,
			  0.0, 1.0,
			  0.0, 0.0,

			  // Left face
			  0.0, 0.0,
			  1.0, 0.0,
			  1.0, 1.0,
			  0.0, 1.0,
			];
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoords), gl.STATIC_DRAW);
	
		// Definimos los colores
		/*var colors = [
		    [1.0,  1.0,  1.0,  1.0],    // Front face: white
		    [1.0,  0.0,  0.0,  1.0],    // Back face: red
		    [0.0,  1.0,  0.0,  1.0],    // Top face: green
		    [0.0,  0.0,  1.0,  1.0],    // Bottom face: blue
		    [1.0,  1.0,  0.0,  1.0],    // Right face: yellow
		    [1.0,  0.0,  1.0,  1.0]     // Left face: purple
	  	];
  
  		var generatedColors = [];
  
		for (j=0; j<6; j++) {
		    
		    for (var i=0; i<4; i++) {
			var c = colors[i%2+2];
		      	generatedColors = generatedColors.concat(c);
		    }
		}
  		cubeVertexColorBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexColorBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(generatedColors), gl.STATIC_DRAW);

		*/
		
		// Definimos el Buffer de indices
		cubeVertexIndexBuffer = gl.createBuffer();
  		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeVertexIndexBuffer);
  
		// This array defines each face as two triangles, using the
		// indices into the vertex array to specify each triangle's
		// position.

		var cubeVertexIndices = [
			0,  1,  2,      0,  2,  3,    // front
			4,  5,  6,      4,  6,  7,    // back
			8,  9,  10,     8,  10, 11,   // top
			12, 13, 14,     12, 14, 15,   // bottom
			16, 17, 18,     16, 18, 19,   // right
			20, 21, 22,     20, 22, 23    // left
		];
		
		cubeVertexIndexBuffer.length = cubeVertexIndices.length;
  		// Now send the element array to GL
  		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(cubeVertexIndices), gl.STATIC_DRAW);
		
		if (verNormales) {
				generarLineasNormales(vertices, normals, idCubo);
			}
	}
	
	    function initBuffersPlano() {		//Tiene normales, FUNCIONAN
		
			planeVertexBuffer = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, planeVertexBuffer);

			var vertices = [
							-1000, -1000,0,
							1000,-1000, 0,
							1000,1000,0,
							-1000,1000,0
							
						  ];

			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

			
			//Normales
			
			var normals = [
							0,0,1,
							0,0,1,
							0,0,1,
							0,0,1
							
						  ];
						  
			
			planeNormalsBuffer = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, planeNormalsBuffer);
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);

			
			var tangents = [
							1,0,0,
							1,0,0,
							1,0,0,
							1,0,0
							
						  ];
						  
			
			planeTangentBuffer = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, planeTangentBuffer);
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(tangents), gl.STATIC_DRAW);
			
			var texCoord = [
							1,0,
							1,1,
							0,1,
							0,0
							
						  ];
						  
			
			planeTextureCoordBuffer = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, planeTextureCoordBuffer);
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texCoord), gl.STATIC_DRAW);
				  
						  
			/*
			// Definimos los colores
			var colors = [
				[0.0,0.0,0.0,0.8],
				[0.0,0.0,0.0,0.9],
				[0.0,0.0,0.0,0.1],
				[0.0,0.0,0.0,0.0]
			];
	  
			var generatedColors = [];
	  
			for (j=0; j<4; j++) {
					c= colors[j]
					generatedColors = generatedColors.concat(c);
				
			}
			planeVertexColorBuffer = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, planeVertexColorBuffer);
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(generatedColors), gl.STATIC_DRAW);

			
			*/
			

			planeVertexIndexBuffer = gl.createBuffer();
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, planeVertexIndexBuffer);
	  

			var planeVertexIndices = [
				0,  1,  2,      0,  2,  3,    
			];
			
			planeVertexIndexBuffer.length = planeVertexIndices.length;
			gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(planeVertexIndices), gl.STATIC_DRAW);
			
			if (verNormales) {
					generarLineasNormales(vertices, normals, idPlano);
				}
		
		}
			
		function initBuffersCono() {		//Tiene normales, FUNCIONAN
		
            var capas = 6;
            var verticesPorCapa = 20;

            var vertices = [0.0, 0.0, 0.0];

            for (var b=0; b<capas;b++) {
				f = (capas-b)/capas;
                for (var a = 0; a <= verticesPorCapa; a++) {
                    vertices = vertices.concat([f*Math.cos(2 * a * Math.PI / verticesPorCapa),f*Math.sin(2 * a * Math.PI / verticesPorCapa), b/(capas)]);
                }
            }

            vertices = vertices.concat([0.0, 0.0, 1.0]);
			

            coneVertexBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, coneVertexBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
			
			generarTextureBufferCono(verticesPorCapa+1,capas);
			// Normales
			
			var normals = [0.0,0.0,-1.0];
			
			for (var b=0; b<capas;b++) {
                for (var a = 0; a <= verticesPorCapa; a++) {
                    normals = normals.concat([Math.cos(2 * a * Math.PI / verticesPorCapa),Math.sin(2 * a * Math.PI / verticesPorCapa), 1.0]);
                }
            }
			
			normals = normals.concat([0.0,0.0,1.0]);
			
			
			coneNormalsBuffer = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, coneNormalsBuffer);
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);

			
			/*   var colors = [
				[1.0,  1.0,  1.0,  1.0],    //blanco
				[1.0,  0.0,  0.0,  1.0],    //rojo
				[1.0,  1.0,  0.0,  1.0],    //amarillo
				[0.0,  1.0,  0.0,  1.0],    //verde
				[0.0,  0.0,  1.0,  1.0],    //azul
				[1.0,  0.0,  1.0,  1.0]     //violeta
				];

            var generatedColors = [];

            generatedColors = generatedColors.concat(colors[0]);

            for(b=0;b<capas;b++){
                for (a=0; a<=verticesPorCapa; a++) {
                    generatedColors = generatedColors.concat(colors[b%2+3]);

                }
            }


            generatedColors = generatedColors.concat(colors[0]);


            // Cargamos los datos de los colores en un nuevo buffer igual que con las posiciones
            coneVertexColorBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, coneVertexColorBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(generatedColors), gl.STATIC_DRAW);
			*/
			

            var conectarDeDerAIzq = true;

            var coneVertexIndices = [];
            for (var c = 1; c <= verticesPorCapa+1 ; c++) {

                coneVertexIndices = coneVertexIndices.concat(0);
                coneVertexIndices = coneVertexIndices.concat(c);

            }

            for (b=1; b<capas;b++) {

                if(conectarDeDerAIzq) {
                    for (a = 0; a < verticesPorCapa + 1; a++) {


                        coneVertexIndices = coneVertexIndices.concat((verticesPorCapa + 1) * b - a);
                        coneVertexIndices = coneVertexIndices.concat((verticesPorCapa + 1) * (b + 1) - a);

                    }
                    conectarDeDerAIzq = false;
                }

                else {
                    for (a = 0; a < verticesPorCapa + 1; a++) {
                        coneVertexIndices = coneVertexIndices.concat((verticesPorCapa + 1) * (b-1) + 1 + a);
                        coneVertexIndices = coneVertexIndices.concat((verticesPorCapa + 1) * (b) + 1 + a);
                    }

                    conectarDeDerAIzq = true;

                }
            }


            for (var c = 0; c < verticesPorCapa+1 ; c++) {

                coneVertexIndices = coneVertexIndices.concat((verticesPorCapa+1)*capas - c);
                coneVertexIndices = coneVertexIndices.concat((verticesPorCapa+1)*capas+1);

            }


            coneVertexIndexBuffer = gl.createBuffer();
            coneVertexIndexBuffer.length = coneVertexIndices.length;
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, coneVertexIndexBuffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(coneVertexIndices),gl.STATIC_DRAW);
			
			if (verNormales) {
				generarLineasNormales(vertices, normals, idCono);
			}

	   }
		
		function initBuffersChasis() {		//Tiene normales, FUNCIONAN, esta facetada unicamente la FDC
		
		
			var	formaDeCorte = [
				//Forma final
	
	
					4.0 ,  1.5 ,
					-4.0 ,  1.5 ,
					-5.0 ,  0.5 ,
					-5.0 , -1.25,
					-4.5 , -1.5 ,
					4.5 , -1.5 ,
					5.0 , -1.25,
					5.0 ,  0.5 ,
					4.0 ,  1.5 
	

				];
				
			var formaDeCorteFacetado = duplicarParaFacetado(formaDeCorte);
			
			
			var normalesFormaDeCorte=[
					
					0.0 ,  1.0 ,
					0.0 ,  1.0 ,
					-1.0 ,  1.0 ,
					-1.0 , -1.0,
					0.0 , -1.0 ,
					0.0 , -1.0 ,
					1.0 , -1.0,
					1.0 , 1.0 ,
					0.0 ,  1.0 
			
			];
			
			var normalesFormaDeCorteFacetado = obtenerNormales2DFacetado(formaDeCorteFacetado);
			
			
			if (facetado == true) {
				formaDeCorte = formaDeCorteFacetado;
				normalesFormaDeCorte = normalesFormaDeCorteFacetado;
			
			}
	
			var path=[
				-10.0 ,
				-10.0 ,
				-8.0  ,
				-6.0  , 
				4.0  ,
				6.0  ,
				7.0  ,
				9 ,
				9
				];

			var tamano=[ 
				0.0 ,
				1.0 , 
				1.1 ,
				1.25,
				1.25,
				1.1 ,
				1.0 , 
				0.7 , 
				0.0  
			];
			
			
			var vertices = [];
	
			for(var i=0; i<path.length; i++){
				for(var j=0 ; j<formaDeCorte.length;j+=2){
		
					vertices.push(path[i]*1.3);			

					vertices.push(formaDeCorte[j]*tamano[i]);
					vertices.push(formaDeCorte[j+1]*tamano[i]);
					
				}
			}
			
				chasisVertexBuffer = gl.createBuffer();
				gl.bindBuffer(gl.ARRAY_BUFFER, chasisVertexBuffer);
				gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
	
			var normals = [];
			
				normals = obtenerNormalesBarrido(formaDeCorte, normalesFormaDeCorte, tamano);
			
	
			chasisNormalsBuffer = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, chasisNormalsBuffer);
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);
	
			/*
			var colors = 
				[[1.0,  0.0,  0.0,  1.0],		//Amarillo
				[0.0,  0.0,  1.0,  1.0],    // Cara frontal: blanco
				[0.0,  1.0,  0.0,  1.0],    // Cara de atrÃÂ¡s: rojo
				[0.0,  1.0,  0.0,  1.0],    // Cara de arriba: verde
				[0.0,  0.0,  1.0,  1.0],    // Cara de abajo: azul
				[1.0,  1.0,  0.0,  1.0],    // Cara de la derecha: amarillo
				[1.0,  0.0,  1.0,  1.0]];     // Cara de la izquierda: violeta
			
		 
			var generatedColors = [];
			for (var j=0; j<path.length; j++) {
				for( var i=0 ; i<formaDeCorte.length/2;i++){
				generatedColors = generatedColors.concat(colors[j%3+3]);
				}
				
			  }
			
			
			

			//Cargamos los datos de los colores en un nuevo buffer igual que con las posiciones
			chasisVertexColorBuffer = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, chasisVertexColorBuffer);
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(generatedColors), gl.STATIC_DRAW);

			//Definimos con que indices de los buffers definidos antes, se debe dibujar
			//cada vertice de cada triangulo. 
			*/
			
			// ----------- TEXTURES
			
				generarTextureBufferChasis(path.length,formaDeCorte.length/2)
			
			// ------------ FIN TEXTURES
	
			var index=[];
			
			for(var i=0; i<path.length-1; i++){
				for(var j=0; j<formaDeCorte.length/2-1 ; j++){
					var first= i*(formaDeCorte.length/2)+j;
					var second= first+formaDeCorte.length/2;
					index.push(first);
					index.push(second);
					index.push(first+1);
					
					index.push(second);
					index.push(second+1);
					index.push(first+1);
					
					
					
				}
			}
	  
			chasisVertexIndexBuffer = gl.createBuffer();
			chasisVertexIndexBuffer.length = index.length;
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, chasisVertexIndexBuffer);
			gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(index), 
						  gl.STATIC_DRAW);
		  
				if (verNormales) {
						generarLineasNormales(vertices, normals, idChasis);
					}
					
					
					//DEBUG
					//console.log("vertices.length" + vertices.length);
 					//console.log("normals.length" + normals.length);
					//console.log("index.length" + index.length);
 
		}
  
		
		function initBuffersCabina(){		//Tiene normales, FUNCIONAN, esta facetada unicamente la FDC
			var	formaDeCorte=[
			 4.0 , 0.0,
			 2.0 , 2.0,
			-2.0 , 2.0,
			-4.0 , 0.0,
			 4.0 , 0.0,
				];
				
			var formaDeCorteFacetado= duplicarParaFacetado(formaDeCorte);
				
			var normalesFormaDeCorte = [
					1.0,0.0,
					1.0,1.0,
					-1.0,1.0,
					-1.0,0.0,
					1.0,0.0
					
			];
				
			var normalesFormaDeCorteFacetado = obtenerNormales2DFacetado(formaDeCorteFacetado);
		
			path=[
			0.0 ,
			0.0 ,
			2.0 ,
			3.25,
			4.5,
			4.5


			];

			var tamano=[ 
			0.0 ,
			1.0 ,
			0.9 ,
			0.7,
			0.5,
			0.0
			];
				
				
				
			if (facetado == true) {
					formaDeCorte = formaDeCorteFacetado;
					normalesFormaDeCorte = normalesFormaDeCorteFacetado;
				
				}
		
			var vertices=[];
		
		for(i=0; i<path.length; i++){
			for(j=0 ; j<formaDeCorte.length;j+=2) {
			
							vertices.push(path[i]);			

				vertices.push(formaDeCorte[j]*tamano[i]);
				vertices.push(formaDeCorte[j+1]*tamano[i]);
				
				// vertices.push(formaDeCorte[j]);
				// vertices.push(formaDeCorte[j+1]);
				
			
			}
			
		}
		
		
				cabinaVertexBuffer = gl.createBuffer();
				gl.bindBuffer(gl.ARRAY_BUFFER, cabinaVertexBuffer);
				gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
		
				var normals = obtenerNormalesBarrido(formaDeCorte, normalesFormaDeCorte, tamano);
				
		
				cabinaNormalsBuffer = gl.createBuffer();
				gl.bindBuffer(gl.ARRAY_BUFFER, cabinaNormalsBuffer);
				gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);
		
		 /*
		var colors = 
			[[1.0,  0.0,  0.0,  1.0],		//Amarillo
			[0.0,  0.0,  1.0,  1.0],    // Cara frontal: blanco
			[0.0,  1.0,  0.0,  1.0],    // Cara de atrÃÂ¡s: rojo
			[0.0,  1.0,  0.0,  1.0],    // Cara de arriba: verde
			[0.0,  0.0,  1.0,  1.0],    // Cara de abajo: azul
			[1.0,  1.0,  0.0,  1.0],    // Cara de la derecha: amarillo
			[1.0,  0.0,  1.0,  1.0]];     // Cara de la izquierda: violeta
		
	 
		 // Replicamos los colores de cada cara cuatro veces.
		var generatedColors = [];
		for (var j=0; j<path.length; j++) {
			for( i=0 ; i<formaDeCorte.length/2;i++){
			generatedColors = generatedColors.concat(colors[j%3+3]);
			}
			
		  }    

		// Cargamos los datos de los colores en un nuevo buffer igual que con las posiciones
		cabinaVertexColorBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, cabinaVertexColorBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(generatedColors), gl.STATIC_DRAW);

		// Definimos con que indices de los buffers definidos antes, se debe dibujar
		// cada vertice de cada triangulo. 
		
		*/
		
			var index=[];
			
			for(i=0; i<path.length-1; i++){
				for(j=0; j<formaDeCorte.length/2-1 ; j++){
					var first= i*(formaDeCorte.length/2)+j;
					var second= first+formaDeCorte.length/2;
					index.push(first);
					index.push(second);
					index.push(first+1);
					
					index.push(second);
					index.push(second+1);
					index.push(first+1);	
				}
			}
			  
			cabinaVertexIndexBuffer = gl.createBuffer();
			cabinaVertexIndexBufferLength = index.length;
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cabinaVertexIndexBuffer);
			gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(index), 
						  gl.STATIC_DRAW);
			
					if (verNormales) {
						generarLineasNormales(vertices, normals, idCabina);
					}
		
  }
		
			
		function initBuffersRueda() {		//Tiene normales, FUNCIONAN aproximadamente
			verticesPorCapa = 30;
			
			var	formaDeCorte=[];
			var normalesFormaDeCorte=[];

			
			for (var a = 0; a <= verticesPorCapa; a++) {
                    formaDeCorte = formaDeCorte.concat([Math.cos(2 * a * Math.PI / verticesPorCapa),Math.sin(2 * a * Math.PI / verticesPorCapa)]);
					normalesFormaDeCorte = normalesFormaDeCorte.concat([Math.cos(2 * a * Math.PI / verticesPorCapa),Math.sin(2 * a * Math.PI / verticesPorCapa)]);
				}
			
			var formaDeCorteFacetado = duplicarParaFacetado(formaDeCorte);
			var normalesFormaDeCorteFacetado = obtenerNormales2DFacetado(formaDeCorteFacetado);

				path=[
					-0.5,
					-0.5,
					-0.3,
					0.3,
					0.5,
					0.5
				];

				var tamano=[ 
					0.0 ,
					0.8 ,
					1.0 ,
					1.0,
					0.8,
					0.0
				];
				
					
					if (facetado == true) {
						formaDeCorte = formaDeCorteFacetado;
						normalesFormaDeCorte = normalesFormaDeCorteFacetado;
					
					}
				
			
				var vertices=[];
			
				for(i=0; i<path.length; i++){
					for(j=0 ; j<formaDeCorte.length;j+=2) {
				
										

					vertices.push(formaDeCorte[j]*tamano[i]);
					vertices.push(path[i]);	
					vertices.push(formaDeCorte[j+1]*tamano[i]);
					
				
					}
				}		
				
					
				ruedaVertexBuffer = gl.createBuffer();
				gl.bindBuffer(gl.ARRAY_BUFFER, ruedaVertexBuffer);
				gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
				
				var normalesRotadas = obtenerNormalesBarrido(formaDeCorte, normalesFormaDeCorte, tamano);
				var normals = [];
				
				for (var k=0;k<normalesRotadas.length;k+=3) {
					
					normals = normals.concat(rotz([normalesRotadas[k],-normalesRotadas[k+1],normalesRotadas[k+2]],degToRad(90)));
				}
					
				ruedaNormalsBuffer = gl.createBuffer();
				gl.bindBuffer(gl.ARRAY_BUFFER, ruedaNormalsBuffer);
				gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);
				
			/* 
			var colors = 
				[[1.0,  0.0,  0.0,  1.0],		//Amarillo
				[0.0,  0.0,  1.0,  1.0],    // Cara frontal: blanco
				[0.0,  1.0,  0.0,  1.0],    // Cara de atrÃÂ¡s: rojo
				[0.0,  1.0,  0.0,  1.0],    // Cara de arriba: verde
				[0.0,  0.0,  1.0,  1.0],    // Cara de abajo: azul
				[1.0,  1.0,  0.0,  1.0],    // Cara de la derecha: amarillo
				[1.0,  0.0,  1.0,  1.0]];     // Cara de la izquierda: violeta
			
		 
			 // Replicamos los colores de cada cara cuatro veces.
			var generatedColors = [];
			for (var j=0; j<path.length; j++) {
				for( i=0 ; i<formaDeCorte.length/2;i++){
				generatedColors = generatedColors.concat(colors[j%3+3]);
				}
				
			  }


			// Cargamos los datos de los colores en un nuevo buffer igual que con las posiciones
			ruedaVertexColorBuffer = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, ruedaVertexColorBuffer);
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(generatedColors), gl.STATIC_DRAW);
			  
			*/
			
			// TEXTURAS
			
			
			generarTextureBufferRueda(verticesPorCapa+1,path.length);
		 
			  
			
			var index=[];
			
			for(i=0; i<path.length-1; i++){
				for(j=0; j<formaDeCorte.length/2-1 ; j++){
					var first= i*(formaDeCorte.length/2)+j;
					var second= first+formaDeCorte.length/2;
					index.push(first);
					index.push(second);
					index.push(first+1);
					
					index.push(second);
					index.push(second+1);
					index.push(first+1);	
				}
			}
			  
			ruedaVertexIndexBuffer = gl.createBuffer();
			ruedaVertexIndexBuffer.length = index.length;
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ruedaVertexIndexBuffer);
			gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(index), 
						  gl.STATIC_DRAW);
					
					if (verNormales) {
						generarLineasNormales(vertices, normals, idRueda);
					}
					
					
			
		// DEBUG
		
		console.log("vertices.length /3 RUEDA= " + vertices.length/3);
		console.log("normals.length /3 RUEDA= " + normals.length/3);
		console.log("index.length RUEDA = " + index.length);
		
		}
		
		
		
		
		
		// --------------------------------- BUFFERS DE SUPERFICIES DE REVOLUCION
		
		function initBuffersDomo() {		//Tiene normales, FUNCIONAN
						
			var cantPuntos = 50;
			var cantCapas = 50;

			
			//Puntos de control de la curva de bezier del domo
			
			var p0 = new Object();
			var p1 = new Object();
			var p2 = new Object();
			var p3 = new Object();
			
			p0.x = -250;
			p0.y = 0;
			
			p1.x = -300;
			p1.y =	100;
			
			p2.x = -150;
			p2.y = 350;
			
			p3.x = 0;
			p3.y = 250;
			
			
			var formaDeCorte = obtenerArrayPuntosCurvaBezierGr3(p0,p1,p2,p3, cantPuntos);
			
			var derivadaFormaDeCorte = obtenerArrayPuntosDerivadaCurvaBezierGr3(p0,p1,p2,p3, cantPuntos);
			
			var normalesFormaDeCorte = normalesDesdeDerivadas(derivadaFormaDeCorte);
			
			
			var vertices = obtenerVerticesRevolucion(formaDeCorte, cantCapas);
			
			
			domoVertexBuffer = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, domoVertexBuffer);
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
			
			
			var normals = obtenerVerticesRevolucion(normalesFormaDeCorte, cantCapas);

			
			domoNormalsBuffer = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, domoNormalsBuffer);
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);
			
			
			/*
			var generatedColors = [];
			
			
			for( i=0 ; i<vertices.length/3;i++) {
					generatedColors = generatedColors.concat(greyColors[i%3]);
			}
				
			
			domoVertexColorBuffer = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, domoVertexColorBuffer);
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(generatedColors), gl.STATIC_DRAW);
        
			*/
			// TEXTURE COORD BUFFER
				
				generarTextureBufferDomo(cantCapas, cantPuntos);
			
				console.log("cant vertices = " + vertices.length/3); //DEBUG
			// END TEXTURE COORD
			
			
			
			 var index=[];
	
			for(i=0; i<cantCapas; i++){
				for(j=0; j<formaDeCorte.length/2-1 ; j++){
				
					var first= i*(formaDeCorte.length/2)+j;
					var second= first+formaDeCorte.length/2;
					index.push(first);
					index.push(second);
					index.push(first+1);
			
					index.push(second);
					index.push(second+1);
					index.push(first+1);
			
			
					}
			}
				  
	
			domoVertexIndexBuffer = gl.createBuffer();
			domoVertexIndexBuffer.length = index.length;
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, domoVertexIndexBuffer);
			gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(index), gl.STATIC_DRAW);
			
			if (verNormales) {
				generarLineasNormales(vertices, normals, idDomo);
			}
		}
		
		function initBuffersTorre() {		//Tiene normales, FUNCIONAN
						
			var cantPuntos = 20;
			var cantCapas = 50;
			var formaDeCorte =[];
			var derivadaFormaDeCorte =[];
			
			if(torreRecta==true) {
			//OPCION 1: Defino los primeros vertices de la forma de corte de la torre, que corresponden a la base
			formaDeCorte = [
				-50,0,
				-50,50,
				-20,80,
				-20,180
				
				];
			
			formaDeCorte = duplicarParaFacetado(formaDeCorte);
			var norm = obtenerNormales2DFacetado(formaDeCorte);
			
				for(var i =0;i<norm.length;i+=2) {
					derivadaFormaDeCorte = derivadaFormaDeCorte.concat([norm[i+1],-norm[i]]);
				}
			
			}
			
			//OPCION 2: la base se arma con una curva de bezier
			else {
			var p0base = new Object();
			var p1base = new Object();
			var p2base = new Object();
			var p3base = new Object();
			
			p0base.x = -50;
			p0base.y = 0;
			
			p1base.x = -50;
			p1base.y =	70;
			
			p2base.x = -10;
			p2base.y = 30;
			
			p3base.x = -20;
			p3base.y = 180;
			
			formaDeCorte = formaDeCorte.concat( obtenerArrayPuntosCurvaBezierGr3(p0base,p1base,p2base,p3base, cantPuntos) );
			derivadaFormaDeCorte = derivadaFormaDeCorte.concat( obtenerArrayPuntosDerivadaCurvaBezierGr3(p0base,p1base,p2base,p3base, cantPuntos) );
			
			
			
			}
			
			//Puntos de control de la curva de bezier A
			
			var p0a = new Object();
			var p1a = new Object();
			var p2a = new Object();
			var p3a = new Object();
			
			p0a.x = -20;
			p0a.y = 180;
			
			p1a.x = -40;
			p1a.y =	180;
			
			p2a.x = -60;
			p2a.y = 180;
			
			p3a.x = -80;
			p3a.y = 190;
			
			formaDeCorte = formaDeCorte.concat( obtenerArrayPuntosCurvaBezierGr3(p0a,p1a,p2a,p3a, cantPuntos) );
			derivadaFormaDeCorte = derivadaFormaDeCorte.concat( obtenerArrayPuntosDerivadaCurvaBezierGr3(p0a,p1a,p2a,p3a, cantPuntos) );
			
			
			//Puntos de control de la curva de bezier B
			
			var p0b = new Object();
			var p1b = new Object();
			var p2b = new Object();
			var p3b = new Object();
			
			p0b.x = -80;
			p0b.y = 190;
			
			p1b.x = -100;
			p1b.y =	200;
			
			p2b.x = -100;
			p2b.y = 210;
			
			p3b.x = -90;
			p3b.y = 210;
			
			formaDeCorte = formaDeCorte.concat( obtenerArrayPuntosCurvaBezierGr3(p0b,p1b,p2b,p3b, cantPuntos) );
			derivadaFormaDeCorte = derivadaFormaDeCorte.concat( obtenerArrayPuntosDerivadaCurvaBezierGr3(p0b,p1b,p2b,p3b, cantPuntos) );
			
			
			//Puntos de control de la curva de bezier C
			
			var p0c = new Object();
			var p1c = new Object();
			var p2c = new Object();
			var p3c = new Object();
			
			p0c.x = -90;
			p0c.y = 210;
			
			p1c.x = -80;
			p1c.y =	210;
			
			p2c.x = -80;
			p2c.y = 230;
			
			p3c.x = -90;
			p3c.y = 230;
			
			formaDeCorte = formaDeCorte.concat( obtenerArrayPuntosCurvaBezierGr3(p0c,p1c,p2c,p3c, cantPuntos) );
			derivadaFormaDeCorte = derivadaFormaDeCorte.concat( obtenerArrayPuntosDerivadaCurvaBezierGr3(p0c,p1c,p2c,p3c, cantPuntos) );
			
			
			//Puntos de control de la curva de bezier D
			
			var p0d = new Object();
			var p1d = new Object();
			var p2d = new Object();
			var p3d = new Object();
			
			p0d.x = -90;
			p0d.y = 230;
			
			p1d.x = -100;
			p1d.y =	230;
			
			p2d.x = -100;
			p2d.y = 240;
			
			p3d.x = -90;
			p3d.y = 250;
			
			formaDeCorte = formaDeCorte.concat( obtenerArrayPuntosCurvaBezierGr3(p0d,p1d,p2d,p3d, cantPuntos) );
			derivadaFormaDeCorte = derivadaFormaDeCorte.concat( obtenerArrayPuntosDerivadaCurvaBezierGr3(p0d,p1d,p2d,p3d, cantPuntos) );
			
			
			
			//Puntos de control de la curva de bezier E
			
			var p0e = new Object();
			var p1e = new Object();
			var p2e = new Object();
			var p3e = new Object();
			
			p0e.x = -90;
			p0e.y = 250;
			
			p1e.x = -70;
			p1e.y =	270;
			
			p2e.x = -40;
			p2e.y = 280;
			
			p3e.x = 0;
			p3e.y = 281;
			
			formaDeCorte = formaDeCorte.concat( obtenerArrayPuntosCurvaBezierGr3(p0e,p1e,p2e,p3e, cantPuntos) );
			derivadaFormaDeCorte = derivadaFormaDeCorte.concat( obtenerArrayPuntosDerivadaCurvaBezierGr3(p0e,p1e,p2e,p3e, cantPuntos) );
			
			var normalesFormaDeCorte = normalesDesdeDerivadas(derivadaFormaDeCorte);
			
			var vertices = obtenerVerticesRevolucion(formaDeCorte, cantCapas);
			
			
			torreVertexBuffer = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, torreVertexBuffer);
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);  
 
			
			
			//Normales 
			
			
			
			var normals = obtenerVerticesRevolucion(normalesFormaDeCorte, cantCapas);

			
			torreNormalsBuffer = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, torreNormalsBuffer);
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);
			
			
			/*var generatedColors = [];
			
			
			for( i=0 ; i<vertices.length/3;i++) {
					generatedColors = generatedColors.concat(greyColors[i%3]);
			}
				
			
			torreVertexColorBuffer = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, torreVertexColorBuffer);
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(generatedColors), gl.STATIC_DRAW);
			*/
			
			///////// TEXTURA
			
			generarTextureBufferTorre(formaDeCorte.length/2,cantCapas+1,cantPuntos,torreRecta);
			console.log("cant vertices con  torre = " + vertices.length/3);
			
        
			
			 var index=[];
	
			for(i=0; i<cantCapas; i++){
				for(j=0; j<formaDeCorte.length/2-1 ; j++){
				
					var first= i*(formaDeCorte.length/2)+j;
					var second= first+formaDeCorte.length/2;
					index.push(first);
					index.push(second);
					index.push(first+1);
			
					index.push(second);
					index.push(second+1);
					index.push(first+1);
			
			
					}
			}
			
	  
	
			torreVertexIndexBuffer = gl.createBuffer();
			torreVertexIndexBuffer.length = index.length;
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, torreVertexIndexBuffer);
			gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(index), gl.STATIC_DRAW);
			
			
			if (verNormales) {
				generarLineasNormales(vertices, normals, idTorre);
			}
		}
		
		
		function initBuffersModulo() {		//Tiene normales, FUNCIONAN Sin facetado ni inclinación
		
			var cantPuntos = 50;
			//Puntos de control de la curva de bezier
			
			var p0a = new Object();
			var p1a = new Object();
			var p2a = new Object();
			var p3a = new Object();
			
			p0a.x = -4;
			p0a.y = -5;
			
			p1a.x = -6;
			p1a.y =	-5;
			
			p2a.x = -7;
			p2a.y = -4;
			
			p3a.x = -7;
			p3a.y = -2;
			
			var ptosBezier1 = obtenerArrayPuntosCurvaBezierGr3(p0a,p1a,p2a,p3a, cantPuntos) ;
			var derivBezier1 = obtenerArrayPuntosDerivadaCurvaBezierGr3(p0a,p1a,p2a,p3a, cantPuntos);
			var formaDeCorte = ptosBezier1;
			var normalesFormaDeCorte = normalesDesdeDerivadas(derivBezier1);
			
			var ptosHueco = [
					//-7,-2,
					-7,-1,
					-6,-1,
					-6,1,
					-7,1,
					//-7,2
					
				];
				
			ptosHuecoDup = ptosHueco;
			var normalesHueco = obtenerNormales2DFacetado(ptosHuecoDup);
			
			
			formaDeCorte = formaDeCorte.concat(ptosHuecoDup);
			normalesFormaDeCorte = normalesFormaDeCorte.concat(normalesHueco);
			
			//Puntos de control de la curva de bezier
			
			var p0b = new Object();
			var p1b = new Object();
			var p2b = new Object();
			var p3b = new Object();
			
			p0b.x = -7;
			p0b.y = 2;
			
			p1b.x = -7;
			p1b.y =	4;
			
			p2b.x = -6;
			p2b.y = 5;
			
			p3b.x = -4;
			p3b.y = 5;
			
			var ptosBezier2 = obtenerArrayPuntosCurvaBezierGr3(p0b,p1b,p2b,p3b, cantPuntos) ;
			var derivBezier2 = obtenerArrayPuntosDerivadaCurvaBezierGr3(p0b,p1b,p2b,p3b, cantPuntos);

			
			formaDeCorte = formaDeCorte.concat(ptosBezier2);
			normalesFormaDeCorte = normalesFormaDeCorte.concat(normalesDesdeDerivadas(derivBezier2));
			formaDeCorte = formaDeCorte.concat([0,5]);
			normalesFormaDeCorte = normalesFormaDeCorte.concat([0,1]);
			
			// MITAD
			
			for (i=0; i<ptosBezier1.length; i+=2) {
				formaDeCorte = formaDeCorte.concat([-ptosBezier1[i],-ptosBezier1[i+1]]);
				normalesFormaDeCorte = normalesFormaDeCorte.concat(normalizarVec2([derivBezier1[i+1],-derivBezier1[i]]));
			}
			
			
			/*var ptosHueco2 = [
					7,2,
					7,1,
					6,1,
					6,-1,
					7,-1,
					7,-2
					
				];
			*/
			
			for(i=0;i<ptosHuecoDup.length;i++) {
				formaDeCorte.push(-ptosHuecoDup[i]);
				normalesFormaDeCorte.push(-normalesHueco[i]);

			}
			
			
			
			/*ptosHueco2 = duplicarParaFacetado(ptosHueco2);
			var normalesHueco2 = obtenerNormales2DFacetado(ptosHueco2);
			*/
			//formaDeCorte = formaDeCorte.concat(ptosHueco2);
			//normalesFormaDeCorte = normalesFormaDeCorte.concat(normalesHueco2);
				
				
			
			
			for (i=0; i<ptosBezier2.length; i+=2) {
				formaDeCorte = formaDeCorte.concat([-ptosBezier2[i],-ptosBezier2[i+1]]);
				normalesFormaDeCorte = normalesFormaDeCorte.concat(normalizarVec2([derivBezier2[i+1],-derivBezier2[i]]));
				
			}
			
			
			formaDeCorte = formaDeCorte.concat([0,-5]);
			formaDeCorte = formaDeCorte.concat([-4,-5]);
			
			normalesFormaDeCorte = normalesFormaDeCorte.concat([0,-1]);
			normalesFormaDeCorte = normalesFormaDeCorte.concat([0,-1]);		
			console.log("forma de corte " + formaDeCorte.length/2); //55
			
	
			path=[
			
				
				-35,
				-35,
				-30,
				-27,
				27,
				30,
				35,
				35
			
			];
					
			tamano=[
			
				0.0,
				1.0,
				1.0,
				2.0,
				2.0,
				1.0,
				1.0,
				0.0
				  
			];
			
			
			var vertices=[];
	
			
			//tamano = duplicarSimpleParaFacetado(tamano);
			//path = duplicarSimpleParaFacetado(path);
			console.log("largo path   " + path.length);
			for(i=0; i<path.length; i++){
				for(j=0 ; j<formaDeCorte.length;j+=2){
					vertices.push(path[i]);	
					vertices.push(formaDeCorte[j]*tamano[i]);
					vertices.push(formaDeCorte[j+1]*tamano[i]);
					
				}
			}
	
	
			moduloVertexBuffer = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, moduloVertexBuffer);
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
			
			var path2D=[];
			var path2Dderiv=[];
			for (var k=0;k<path.length;k++) {
				path2D.push(path[k]);
				path2D.push(0.0);
				
				path2Dderiv = path2Dderiv.concat([1.0,0.0]);
			}
			
			var normals = normalesBarridoTamInvar(normalesFormaDeCorte, path2D, path2Dderiv);
			//var normals=obtenerNormalesBarridoFacetado(formaDeCorte, normalesFormaDeCorte, tamano, path);
			
			
			
			moduloNormalsBuffer = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, moduloNormalsBuffer);
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);
	
			
	/*
    var generatedColors = [];
	
    for (var j=0; j<path.length; j++) {
		for( i=0 ; i<formaDeCorte.length/2;i++){
		generatedColors = generatedColors.concat(greyColors[j%3]);
		}
        
      }
    
    
    

    // Cargamos los datos de los colores en un nuevo buffer igual que con las posiciones
    moduloVertexColorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, moduloVertexColorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(generatedColors), gl.STATIC_DRAW);
	
	*/
	
	
	
			generarTextureBufferModulo(path.length, formaDeCorte.length/2,cantPuntos);
			
			console.log("cant vertices modulo = " + vertices.length/3);
			
			
			
			var index=[];
			
			for(i=0; i<path.length-1; i++){
				for(j=0; j<formaDeCorte.length/2-1 ; j++){
					var first= i*(formaDeCorte.length/2)+j;
					var second= first+formaDeCorte.length/2;
					index.push(first);
					index.push(second);
					index.push(first+1);
					
					index.push(second);
					index.push(second+1);
					index.push(first+1);
					
					
					
				}
			}
			  
			
			moduloVertexIndexBuffer = gl.createBuffer();
			moduloVertexIndexBuffer.length = index.length;
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, moduloVertexIndexBuffer);
			gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(index), 
						  gl.STATIC_DRAW);
						  
						if (verNormales) {
						generarLineasNormales(vertices, normals, idModulo);
					}
  }
  
  
  
		function initBuffersManguera1(){ 	//Tiene normales, FUNCIONAN
			var cantPuntosSeccion=20;
			var cantPuntosFormaDeCorte=20;
			var radio=2;
			var p0 = new Object();
			var p1 = new Object();
			var p2 = new Object();
			var p3 = new Object();
			var p4 = new Object();
			var p5 = new Object();
			var p6 = new Object();
			var path2D= [];
			var path2Dderiv = [];
			var puntos=[];
			var aux=[];
			
			p0.x =  0;
			p0.y =  0;
			
			p1.x = 0;
			p1.y = 40;
			
			p2.x = 30;
			p2.y = 70;
			
			p3.x = 70;
			p3.y = 70;
			
			p4.x = 100;
			p4.y = 100;
			
			p5.x = 60;
			p5.y = 130;
			
			puntos.push(p0,p0,p0,p1,p2,p3,p4,p5,p5,p5);
			
			var secciones = puntos.length-3
			for(i=0 ; i<secciones  ; i++){
				path2D=path2D.concat(obtenerArrayPuntosCurvaBSplineGr3(puntos[i],puntos[i+1],puntos[i+2],puntos[i+3],  cantPuntosSeccion));
				path2Dderiv = path2Dderiv.concat(obtenerArrayPuntosDerivadaCurvaBSplineGr3(puntos[i],puntos[i+1],puntos[i+2],puntos[i+3], cantPuntosSeccion));

				//console.log(i);
				//console.log(puntos.length);
				//console.log(path2D);
			}
			
			var tamano=[ ];
			for(i=0;i<secciones*cantPuntosSeccion;i++){
				tamano.push(radio);
			}
			
			var formaDeCorte=generarCirculo(cantPuntosFormaDeCorte);
			
			
			//var path2D=[10.0 , 0.0, 10.0 , 0.0];
			//console.log("Path Barrido   " + path2D);
			
			
			
			//var path2Dderiv=[1.0, 1.0, 1.0 , 1.0];
			//console.log(path2D. length +"  " + tamano.length*2);
			
			var vertices=verticesBarrido(formaDeCorte,path2D, path2Dderiv,tamano);
					
			manguera1VertexBuffer = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, manguera1VertexBuffer);
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
			
			
			var normals = normalesBarridoTamInvar(formaDeCorte, path2D, path2Dderiv);

			manguera1NormalsBuffer = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, manguera1NormalsBuffer);
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);
			
			
			/*var colors = 
				[[1.0,  0.0,  0.0,  1.0],		//Amarillo
				[0.0,  0.0,  1.0,  1.0],    // Cara frontal: blanco
				[0.0,  1.0,  0.0,  1.0],    // Cara de atrÃÂ¡s: rojo
				[0.0,  1.0,  0.0,  1.0],    // Cara de arriba: verde
				[0.0,  0.0,  1.0,  1.0],    // Cara de abajo: azul
				[1.0,  1.0,  0.0,  1.0],    // Cara de la derecha: amarillo
				[1.0,  0.0,  1.0,  1.0]];     // Cara de la izquierda: violeta
			
		 
			var generatedColors = [];
			for (var j=0; j<secciones*cantPuntosSeccion; j++) {
				for( i=0 ; i<cantPuntosFormaDeCorte;i++){
				generatedColors = generatedColors.concat(greyColors[j%3]);
				}
				
			  }
			
			
			

			// Cargamos los datos de los colores en un nuevo buffer igual que con las posiciones
			manguera1VertexColorBuffer = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, manguera1VertexColorBuffer);
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(generatedColors), gl.STATIC_DRAW);
			*/
			
			var index=[];
			
			for(i=0; i<secciones*cantPuntosSeccion-1; i++){
				for(j=0; j<cantPuntosFormaDeCorte-1 ; j++){
					var first= i*(cantPuntosFormaDeCorte)+j;
					var second= first+cantPuntosFormaDeCorte;
					index.push(first);
					index.push(second);
					index.push(first+1);
					
					index.push(second);
					index.push(second+1);
					index.push(first+1);
					
					
					
				}
			}
			  
			// Definimos y cargamos los datos en el buffer WebGL correspondiente.
			// Notar que esta vez se usa ELEMENT_ARRAY_BUFFER en lugar de ARRAY_BUFFER.
			// Notar tambiÃÂ©n que se usa un array de enteros en lugar de floats.
			
			manguera1VertexIndexBuffer = gl.createBuffer();
			manguera1VertexIndexBuffer.length = index.length;
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, manguera1VertexIndexBuffer);
			gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(index), 
						  gl.STATIC_DRAW);
		  
					
			//--------------BUFFER DE TANGENTES
			
			/*var verticesTg = [];
			
			for (var j=0; j<path2D.length/2; j++) {
				verticesTg = verticesTg.concat([path2D[j*2],path2D[j*2+1],0.0,path2D[j*2]+path2Dderiv[j*2],path2D[j*2+1]+path2Dderiv[j*2+1], 0.0]);				//
			}
			
			console.log(verticesTg);
			
			var tgColor = [];
			for (var it=0; it<path2D.length/2; it++) {
				
				tgColor = tgColor.concat([1.0,0.0,0.0,0.0]);
				tgColor = tgColor.concat([0.0,0.0,1.0,0.0]);

				}
				

			var tgIndex = [];
			for (var i=1;i<path2D.length/2; i++) {
				tgIndex = tgIndex.concat(i*2-1);
				tgIndex = tgIndex.concat(i*2);

			}
			
			tgVertexBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, tgVertexBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array( verticesTg), gl.STATIC_DRAW);

            tgColorBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, tgColorBuffer);
            gl.bufferData(gl.ARRAY_BUFFER,  new Float32Array( tgColor), gl.STATIC_DRAW);
			
			tgIndexBuffer = gl.createBuffer();
			tgIndexBuffer.length = tgIndex.length-2;

            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, tgIndexBuffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,  new Uint16Array( tgIndex), gl.STATIC_DRAW);
			
			
			*/
			
			if (verNormales) {
				generarLineasNormales(vertices, normals, idManguera1);
			}
						
		}
  

		function initBuffersManguera2(){	//Tiene normales, FUNCIONAN
			var cantPuntosSeccion=20;
			var cantPuntosFormaDeCorte=20;
			var radio=2;
			var p0 = new Object();
			var p1 = new Object();
			var p2 = new Object();
			var p3 = new Object();
			var p4 = new Object();
			var p5 = new Object();
			var p6 = new Object();
			var p7 = new Object();
		
			var path2D= [];
			var path2Dderiv = [];
			var puntos=[];
			var aux=[];
			
			p0.x =  0;
			p0.y =  0;
			
			p1.x = -10;
			p1.y = 40;
			
			p2.x = -20;
			p2.y = 60;
			
			p3.x = -50;
			p3.y = 40;
			
			p4.x = -70;
			p4.y = 70;
			
			p5.x = -20;
			p5.y = 90;
			
			p6.x = -20;
			p6.y = 120;
			
			p7.x = -50;
			p7.y = 130;
			
			puntos.push(p0,p0,p0,p1,p2,p3,p4,p5,p6,p7,p7,p7);
			
			var secciones = puntos.length-3
			for(i=0 ; i<secciones  ; i++){
				path2D=path2D.concat(obtenerArrayPuntosCurvaBSplineGr3(puntos[i],puntos[i+1],puntos[i+2],puntos[i+3],  cantPuntosSeccion));
				path2Dderiv = path2Dderiv.concat(obtenerArrayPuntosDerivadaCurvaBSplineGr3(puntos[i],puntos[i+1],puntos[i+2],puntos[i+3], cantPuntosSeccion));

				//console.log(i);
				//console.log(puntos.length);
				//console.log(path2D);
			}
			
			var tamano=[ ];
			for(i=0;i<secciones*cantPuntosSeccion;i++){
				tamano.push(radio);
			}
			
			var formaDeCorte=generarCirculo(cantPuntosFormaDeCorte);
			
			
			
			//var path2D=[10.0 , 0.0, 10.0 , 0.0];
			//console.log("Path Barrido   " + path2D);
			
			
			
			//var path2Dderiv=[1.0, 1.0, 1.0 , 1.0];
			//console.log(path2D. length +"  " + tamano.length*2);
			
			var vertices=verticesBarrido(formaDeCorte,path2D, path2Dderiv,tamano);
						
			manguera2VertexBuffer = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, manguera2VertexBuffer);
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
			
			var normals = normalesBarridoTamInvar(formaDeCorte, path2D, path2Dderiv);

			manguera2NormalsBuffer = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, manguera2NormalsBuffer);
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);
			
		 
			/*var generatedColors = [];
			for (var j=0; j<secciones*cantPuntosSeccion; j++) {
				for( i=0 ; i<cantPuntosFormaDeCorte;i++){
				generatedColors = generatedColors.concat(greyColors[j%3]);
				}
				
			  }
			
			
			

			// Cargamos los datos de los colores en un nuevo buffer igual que con las posiciones
			manguera2VertexColorBuffer = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, manguera2VertexColorBuffer);
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(generatedColors), gl.STATIC_DRAW);

			// Definimos con que indices de los buffers definidos antes, se debe dibujar
			// cada vertice de cada triangulo. 
			*/
			
			var index=[];
			
			for(i=0; i<secciones*cantPuntosSeccion-1; i++){
				for(j=0; j<cantPuntosFormaDeCorte-1 ; j++){
					var first= i*(cantPuntosFormaDeCorte)+j;
					var second= first+cantPuntosFormaDeCorte;
					index.push(first);
					index.push(second);
					index.push(first+1);
					
					index.push(second);
					index.push(second+1);
					index.push(first+1);
					
					
					
				}
			}
			  
			// Definimos y cargamos los datos en el buffer WebGL correspondiente.
			// Notar que esta vez se usa ELEMENT_ARRAY_BUFFER en lugar de ARRAY_BUFFER.
			// Notar tambiÃÂ©n que se usa un array de enteros en lugar de floats.
			
			manguera2VertexIndexBuffer = gl.createBuffer();
			manguera2VertexIndexBuffer.length = index.length;
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, manguera2VertexIndexBuffer);
			gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(index), 
						  gl.STATIC_DRAW);
		  
					
			//--------------BUFFER DE TANGENTES
			
			/*var verticesTg = [];
			
			for (var j=0; j<path2D.length/2; j++) {
				verticesTg = verticesTg.concat([path2D[j*2],path2D[j*2+1],0.0,path2D[j*2]+path2Dderiv[j*2],path2D[j*2+1]+path2Dderiv[j*2+1], 0.0]);				//
			}
			
			console.log(verticesTg);
			
			var tgColor = [];
			for (var it=0; it<path2D.length/2; it++) {
				
				tgColor = tgColor.concat([1.0,0.0,0.0,0.0]);
				tgColor = tgColor.concat([0.0,0.0,1.0,0.0]);

				}
				

			var tgIndex = [];
			for (var i=1;i<path2D.length/2; i++) {
				tgIndex = tgIndex.concat(i*2-1);
				tgIndex = tgIndex.concat(i*2);

			}
			
			tgVertexBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, tgVertexBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array( verticesTg), gl.STATIC_DRAW);

            tgColorBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, tgColorBuffer);
            gl.bufferData(gl.ARRAY_BUFFER,  new Float32Array( tgColor), gl.STATIC_DRAW);
			
			tgIndexBuffer = gl.createBuffer();
			tgIndexBuffer.length = tgIndex.length-2;

            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, tgIndexBuffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,  new Uint16Array( tgIndex), gl.STATIC_DRAW);
			
			console.log("tgIndex.length: " +tgIndex.length);
			console.log("tgColor.length: " +tgColor.length);
			console.log("verticesTg.length: " +verticesTg.length);
			
			*/
			
			if (verNormales) {
				generarLineasNormales(vertices, normals, idManguera2);
			}
						
		}
  		

		function initBuffersManguera3(){	//Tiene normales, FUNCIONAN
			var cantPuntosSeccion=20;
			var cantPuntosFormaDeCorte=20;
			var radio=2;
			var p0 = new Object();
			var p1 = new Object();
			var p2 = new Object();
			var p3 = new Object();
			var p4 = new Object();
			var p5 = new Object();
			var p6 = new Object();
			var path2D= [];
			var path2Dderiv = [];
			var puntos=[];
			var aux=[];
			
			p0.x =  0;
			p0.y =  0;
			
			p1.x = -30;
			p1.y = 30;
			
			p2.x = -60;
			p2.y = 30;
			
			p3.x = -80;
			p3.y = 0;
			
			p4.x = -120;
			p4.y = 10;
			
			p5.x = -120;
			p5.y = 50;
			
			puntos.push(p0,p0,p0,p1,p2,p3,p4,p5,p5,p5);
			
			var secciones = puntos.length-3
			for(i=0 ; i<secciones  ; i++){
				path2D=path2D.concat(obtenerArrayPuntosCurvaBSplineGr3(puntos[i],puntos[i+1],puntos[i+2],puntos[i+3],  cantPuntosSeccion));
				path2Dderiv = path2Dderiv.concat(obtenerArrayPuntosDerivadaCurvaBSplineGr3(puntos[i],puntos[i+1],puntos[i+2],puntos[i+3], cantPuntosSeccion));

			}
			//console.log("path2D.length = "+path2D.length + " ,puntos reales del path (secc*ptsSecc) = " +(secciones)*cantPuntosSeccion);
			
			var tamano=[ ];
			for(i=0;i<secciones*cantPuntosSeccion;i++){
				tamano.push(radio);
			}
			
			var formaDeCorte=generarCirculo(cantPuntosFormaDeCorte);
			
			
			
			//var path2D=[10.0 , 0.0, 10.0 , 0.0];
			//console.log("Path Barrido   " + path2D);
			
			
			
			//var path2Dderiv=[1.0, 1.0, 1.0 , 1.0];
			//console.log(path2D. length +"  " + tamano.length*2);
			
			var vertices=verticesBarrido(formaDeCorte,path2D, path2Dderiv,tamano);
						
			manguera3VertexBuffer = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, manguera3VertexBuffer);
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
			
			
			var normals = normalesBarridoTamInvar(formaDeCorte, path2D, path2Dderiv);

			manguera3NormalsBuffer = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, manguera3NormalsBuffer);
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);
			
			
			/*var colors = 
				[[1.0,  0.0,  0.0,  1.0],		//Amarillo
				[0.0,  0.0,  1.0,  1.0],    // Cara frontal: blanco
				[0.0,  1.0,  0.0,  1.0],    // Cara de atrÃÂ¡s: rojo
				[0.0,  1.0,  0.0,  1.0],    // Cara de arriba: verde
				[0.0,  0.0,  1.0,  1.0],    // Cara de abajo: azul
				[1.0,  1.0,  0.0,  1.0],    // Cara de la derecha: amarillo
				[1.0,  0.0,  1.0,  1.0]];     // Cara de la izquierda: violeta
			
		 
			var generatedColors = [];
			for (var j=0; j<secciones*cantPuntosSeccion; j++) {
				for( i=0 ; i<cantPuntosFormaDeCorte;i++){
				generatedColors = generatedColors.concat(greyColors[j%3]);
				}
				
			  }
			
			
			

			// Cargamos los datos de los colores en un nuevo buffer igual que con las posiciones
			manguera3VertexColorBuffer = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, manguera3VertexColorBuffer);
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(generatedColors), gl.STATIC_DRAW);

			*/
			
			var index=[];
			
			for(i=0; i<secciones*cantPuntosSeccion-1; i++){
				for(j=0; j<cantPuntosFormaDeCorte-1 ; j++){
					var first= i*(cantPuntosFormaDeCorte)+j;
					var second= first+cantPuntosFormaDeCorte;
					index.push(first);
					index.push(second);
					index.push(first+1);
					
					index.push(second);
					index.push(second+1);
					index.push(first+1);
					
					
					
				}
			}
			  
			// Definimos y cargamos los datos en el buffer WebGL correspondiente.
			// Notar que esta vez se usa ELEMENT_ARRAY_BUFFER en lugar de ARRAY_BUFFER.
			// Notar tambiÃÂ©n que se usa un array de enteros en lugar de floats.
			
			manguera3VertexIndexBuffer = gl.createBuffer();
			manguera3VertexIndexBuffer.length = index.length;
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, manguera3VertexIndexBuffer);
			gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(index), 
						  gl.STATIC_DRAW);
		  
					
			//--------------BUFFER DE TANGENTES
			
			/*var verticesTg = [];
			
			for (var j=0; j<path2D.length/2; j++) {
				verticesTg = verticesTg.concat([path2D[j*2],path2D[j*2+1],0.0,path2D[j*2]+path2Dderiv[j*2],path2D[j*2+1]+path2Dderiv[j*2+1], 0.0]);				//
			}
			
			console.log(verticesTg);
			
			var tgColor = [];
			for (var it=0; it<path2D.length/2; it++) {
				
				tgColor = tgColor.concat([1.0,0.0,0.0,0.0]);
				tgColor = tgColor.concat([0.0,0.0,1.0,0.0]);

				}
				

			var tgIndex = [];
			for (var i=1;i<path2D.length/2; i++) {
				tgIndex = tgIndex.concat(i*2-1);
				tgIndex = tgIndex.concat(i*2);

			}
			
			tgVertexBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, tgVertexBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array( verticesTg), gl.STATIC_DRAW);

            tgColorBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, tgColorBuffer);
            gl.bufferData(gl.ARRAY_BUFFER,  new Float32Array( tgColor), gl.STATIC_DRAW);
			
			tgIndexBuffer = gl.createBuffer();
			tgIndexBuffer.length = tgIndex.length-2;

            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, tgIndexBuffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,  new Uint16Array( tgIndex), gl.STATIC_DRAW);
			
			console.log("tgIndex.length: " +tgIndex.length);
			console.log("tgColor.length: " +tgColor.length);
			console.log("verticesTg.length: " +verticesTg.length);
			
			*/
			
			if (verNormales) {
				generarLineasNormales(vertices, normals, idManguera3);
			}
						
		}
  				
		
		function initBuffers() {
		

            initBuffersCilindro();
			initBuffersEsfera();
			initBuffersCubo();
			initBuffersCono();
			initBuffersChasis();
			initBuffersCabina();
			initBuffersPlano();
			initBuffersRueda();
			initBuffersDomo();
			initBuffersTorre();
			initBuffersModulo();
			initBuffersManguera1();
			initBuffersManguera2();
			initBuffersManguera3();
			

        }
		
		
		function obtenerCaminoDron(){
			var cantPuntosSeccion=10;
			var p0 = new Object();
			var p1 = new Object();
			var p2 = new Object();
			var p3 = new Object();
			var p4 = new Object();
			var p5 = new Object();
			var puntos= [];
			p0.x =  0;
			p0.y =  0;
			
			p1.x = -30;
			p1.y = 30;
			
			p2.x = -60;
			p2.y = 30;
			
			p3.x = -80;
			p3.y = 0;
			
			p4.x = -120;
			p4.y = 10;
			
			p5.x = 0;
			p5.y = 0;
			
			var path2D=[];
			var path3D=[]
			puntos.push(p0,p0,p0,p1,p2,p3,p4,p5,p5,p5);
			var secciones = puntos.length-3;
			for(i=0 ; i<secciones  ; i++){
				path2D=path2D.concat(obtenerArrayPuntosCurvaBSplineGr3(puntos[i],puntos[i+1],puntos[i+2],puntos[i+3],  cantPuntosSeccion));
			}
			for(i=0 ; i<path2D.length/2;i++){
				path3D.push(path2D[2*i]);
				path3D.push(path2D[2*i+1]);
				path3D.push(50);
			
			}
			return path3D;
		
		}
		
  