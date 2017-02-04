		
		// --------------------------------- FUNCIONES VARIAS -----------------
	
        function mvPushMatrix() {
            var copy = mat4.create();
            mat4.set(mvMatrix, copy);
            mvMatrixStack.push(copy);
        }

        function mvPopMatrix() {
            if (mvMatrixStack.length == 0) {
                throw "Invalid popMatrix!";
            }
            mvMatrix = mvMatrixStack.pop();
        }

        function setMatrixUniforms(shaderProgram) {
            gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
            gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix);
            gl.uniformMatrix4fv(shaderProgram.vMatrixUniform, false, vMatrix);
			
			
			var normalMatrix = mat3.create();
			mat4.toInverseMat3(mvMatrix, normalMatrix);
			mat3.transpose(normalMatrix);
			gl.uniformMatrix3fv(shaderProgram.nMatrixUniform, false, normalMatrix);
        }

        function degToRad(degrees) {
            return degrees * Math.PI / 180;
        }

        function radToDeg(rad) {
			return rad * 180.0 / Math.PI;
		}
	
		function norma(vector){
			var aux=Math.sqrt(Math.pow(vector[0],2)+Math.pow(vector[1],2)+Math.pow(vector[2],2));
			if(aux==0){
				return 1;
			}else{
				return aux;
			}
			
		  }
				
		function normalizar(vector){
			var aux=[];
			var norm=norma(vector);
			aux[0]=vector[0]/norm;
			aux[1]=vector[1]/norm;
			aux[2]=vector[2]/norm;
			return aux;
			
		}	
		
		function normalizarVec2(vAux) {
		
			vNorm = [vAux[0]/Math.sqrt(vAux[0]*vAux[0]+vAux[1]*vAux[1]), vAux[1]/Math.sqrt(vAux[0]*vAux[0]+vAux[1]*vAux[1])];	
		
			return vNorm;
		}

		function calcularVec3(ptoInicio, ptoFin) {
		
			var vec3 = [];
			
			vec3[0] = ptoFin[0]-ptoInicio[0];
			vec3[1] = ptoFin[1]-ptoInicio[1];
			vec3[2] = ptoFin[2]-ptoInicio[2];
			
			return vec3
		
		}

		function productoEscalar(vector1 , vector2, normalizado){
			if(vector2[0]==0&&vector2[1]==0&&vector2[2]==0){
				return 1;
			} else {
				if(normalizado==false){
					return (vector1[0]*vector2[0]+vector1[1]*vector2[1]+vector1[2]*vector2[2]);
				} else{
					var norma1=norma(vector1);
					var norma2=norma(vector2);
					return (vector1[0]*vector2[0]+vector1[1]*vector2[1]+vector1[2]*vector2[2])/(norma1*norma2);
				}
			}
		}
						
		function productoVectorial (vector1, vector2, normalizado){
			var w=[];
			w[0]=vector1[1]*vector2[2]-vector1[2]*vector2[1];
			w[1]=vector1[2]*vector2[0]-vector1[0]*vector2[2];
			w[2]=vector1[0]*vector2[1]-vector1[1]*vector2[0];
			
			if(normalizado==false){
				return w;
			} else{
				return normalizar(w);
			}
		}
			
		function rotz(punto,angulo){
			var w= [];
			w[0]=Math.cos( (angulo))*punto[0]-Math.sin( (angulo))*punto[1];
			w[1]=Math.sin( (angulo))*punto[0]+Math.cos( (angulo))*punto[1];
			w[2]=punto[2];
			
			return w;
			
		};
		
		function roty(punto,angulo){
			var w= [];
			w[0]=Math.cos( (angulo))*punto[0]+Math.sin( (angulo))*punto[2];
			w[1]=punto[1];
			w[2]=-Math.sin( (angulo))*punto[0]+Math.cos( (angulo))*punto[2];
			
			return w;
			
		};
		
		function rotx(punto,angulo){
			var w= [];
			w[0]=punto[0];
			w[1]=Math.cos( (angulo))*punto[1]-Math.sin( (angulo))*punto[2];
			w[2]=Math.sin( (angulo))*punto[1]+Math.cos( (angulo))*punto[2];
			
			return w;
			
		};
		
		// la forma de corte esta en el plano YZ tiene unicamente 2 componentes por punto
		// path esta en el plano XY tambien tiene 2 componentes por punto
		// vecTamano tiene el mismo largo que path/2
		function verticesBarrido(formaDeCorte , path, derivada ,vecTamano){
			var vertices= [];
			var ejex1;
			var ejey1;
			var ejez1;
			var origen1=new Object();
			var aux;
			var x;
			var y;
			var z;
			//console.log(formaDeCorte);
			
			for(i=0; i<path.length/2 ; i++){
				//genero los ejes donde va la forma de corte.
				aux=[derivada[2*i], derivada[2*i+1], 0 ];
				//defino el eje de coordenedas en el que va la forma de corte
				ejex1=normalizar(aux);
				//console.log("ejex " + aux);
				ejez1=[0,0,1];
				ejey1=productoVectorial(ejez1,ejex1,true);
				//console.log("ejey " + ejey1);
				origen1.x=path[2*i];
				origen1.y=path[2*i+1];
				
				for (j=0; j<formaDeCorte.length/2; j++){
					//escribo la posicion del punto en funcion del origen de coordenedas del mundo
					x=(formaDeCorte[2*j]*ejey1[0]+formaDeCorte[2*j+1]*ejez1[0])*vecTamano[i];
					y=(formaDeCorte[2*j]*ejey1[1]+formaDeCorte[2*j+1]*ejez1[1])*vecTamano[i];
					z=(formaDeCorte[2*j]*ejey1[2]+formaDeCorte[2*j+1]*ejez1[2])*vecTamano[i];
					//console.log( "tamaño   " + vecTamano[i]);
				
					vertices.push(origen1.x+x); //ejex
					vertices.push(origen1.y+y); //ejey
					vertices.push(z);//ejez
					//console.log("vertices  "+ vertices);

					
				}
					
			}
			//console.log("vertices  "+ vertices + "   " + vertices.length);
			return vertices;
		}
		
		function normalesBarridoTamInvar(normalesFormaDeCorte , path, derivada){
			var normales= [];
			var ejex1;
			var ejey1;
			var ejez1;
			var aux;
			var x;
			var y;
			var z;
			//console.log(formaDeCorte);
			
			for(i=0; i<path.length/2 ; i++){
				//genero los ejes donde va la forma de corte.
				aux=[derivada[2*i], derivada[2*i+1], 0 ];
				//defino el eje de coordenedas en el que va la forma de corte
				ejex1=normalizar(aux);
				//console.log("ejex " + aux);
				ejez1=[0,0,1];
				ejey1=productoVectorial(ejez1,ejex1,true);
				
				
				for (j=0; j<normalesFormaDeCorte.length/2; j++){
					//escribo la posicion del punto en funcion del origen de coordenedas del mundo
					x=(normalesFormaDeCorte[2*j]*ejey1[0]+normalesFormaDeCorte[2*j+1]*ejez1[0]);
					y=(normalesFormaDeCorte[2*j]*ejey1[1]+normalesFormaDeCorte[2*j+1]*ejez1[1]);
					z=(normalesFormaDeCorte[2*j]*ejey1[2]+normalesFormaDeCorte[2*j+1]*ejez1[2]);
					//console.log( "tamaño   " + vecTamano[i]);
				
					normales.push(x); //ejex
					normales.push(y); //ejey
					normales.push(z);//ejez
					//console.log("vertices  "+ vertices);

					
				}
					
			}
			//console.log("vertices  "+ vertices + "   " + vertices.length);
			return normales;
		}
		
		//Devuelve un circulo 2D
		function generarCirculo (cantPuntos){
			var vertices= [];
			for(i=0;i<cantPuntos;i++){
				vertices.push(Math.cos(2*(Math.PI)*i/(cantPuntos-1)));
				vertices.push(Math.sin(2*(Math.PI)*i/(cantPuntos-1)));
			}
			return vertices;
		}
		
		function obtenerNormalesBarrido(formaDeCorte, normalesFormaDeCorte, tamano) {

			
			var normals=[];
			
			normalesFormaDeCorte = normalizarArrayDeVec2(normalesFormaDeCorte);
			
			for(var j=0 ; j<formaDeCorte.length;j+=2){
					
					normals=normals.concat([-1.0,0.0,0.0]);	
					
				}
			for(var i=1; i<tamano.length-1; i++){
				for(var j=0 ; j<formaDeCorte.length;j+=2){
					
					normals.push(tamano[i]-tamano[i+1]);	// Chequear si funca
					
					normals.push(normalesFormaDeCorte[j]);
					normals.push(normalesFormaDeCorte[j+1]);
					
				}
			}
			for(var j=0 ; j<formaDeCorte.length;j+=2){
					
					normals=normals.concat([1.0,0.0,0.0]);	
					
				}
		
			return normals;
			
		}
		
		function obtenerNormalesBarridoFacetado(formaDeCorte, normalesFormaDeCorte,tamano, path) {
			var normals=[];
			var binorm;
			var tg;
			var n;
			var ptoActual
			var ptoCapaSig
			var tam = normalesFormaDeCorte.length;
			
			for(var i=0; i<path.length; i+=2){
				for(var j=0 ; j<tam;j+=2){
					
					ptoActual = [path[i],formaDeCorte[j]*tamano[i],formaDeCorte[j+1]*tamano[i]];
					ptoCapaSig = [path[i+1],formaDeCorte[j]*tamano[i+1],formaDeCorte[j+1]*tamano[i+1]];
					binorm = calcularVec3(ptoActual, ptoCapaSig)
					tg = [0,-normalesFormaDeCorte[j+1],normalesFormaDeCorte[j]];
					
					n=productoVectorial(binorm,tg,true);
					normals = normals.concat(n);
					
				}
				for(var k=i*tam; k<tam*(i+1);k+=3) {
					normals= normals.concat([normals[k],normals[k+1], normals[k+2]]);
					}
			}
		
			return normals;
		}
		
		function duplicarParaFacetado(formaDeCorte) {
		
			var fdcConDup = [formaDeCorte[0],formaDeCorte[1]];
			
			for(var i=2; i<formaDeCorte.length-2; i+=2) {
			
				fdcConDup = fdcConDup.concat([formaDeCorte[i], formaDeCorte[i+1],formaDeCorte[i], formaDeCorte[i+1]]);
			}
				
			fdcConDup.push(formaDeCorte[formaDeCorte.length-2], formaDeCorte[formaDeCorte.length-1]);
			
			return fdcConDup;
		}
		
		function duplicarSimpleParaFacetado(array) {
			
			var arrayDup = [];
			
			arrayDup.push(array[0])
			
			for(var i=1; i<array.length-1; i++) {
			
				arrayDup = arrayDup.concat([array[i], array[i]]);
			}
				
			arrayDup.push(array[array.length-1]);
			
			return arrayDup
			
		}

		
		function obtenerNormales2DFacetado(formaDeCorteFacetado) {
		
			var normalesFormaDeCorteFacetado = [];
			
			var vecAux =[];
			for(var i =0; i<formaDeCorteFacetado.length; i+=4)
			{
				vecAux[0] = formaDeCorteFacetado[i+2]-formaDeCorteFacetado[i];
				vecAux[1] = formaDeCorteFacetado[i+3]-formaDeCorteFacetado[i+1];
				
				normalesFormaDeCorteFacetado = normalesFormaDeCorteFacetado.concat([-vecAux[1],vecAux[0]]);
				normalesFormaDeCorteFacetado = normalesFormaDeCorteFacetado.concat([-vecAux[1],vecAux[0]]);
			}
		
			return normalesFormaDeCorteFacetado;
			
		}
		
		function normalesDesdeDerivadas(derivadaFormaDeCorte) {
		
			var normalesFormaDeCorte = [];
			var norm =[];
			var normN =[];
			
			for(var i=0;i<derivadaFormaDeCorte.length/2; i++) {
				
					norm[0]=(-derivadaFormaDeCorte[i*2+1]);
					norm[1]=(derivadaFormaDeCorte[i*2]);
					
					normN = normalizarVec2(norm);
					
					normalesFormaDeCorte = normalesFormaDeCorte.concat(normN);
			}
			
			return normalesFormaDeCorte;
			
			
		}
		
		function obtenerVerticesRevolucion(formaDeCorte, cantCapas) {
		
		var formaDeCorte3D = [];
			
			for(i=0; i<formaDeCorte.length; i+=2) {
			
				formaDeCorte3D.push(0);
				formaDeCorte3D.push(formaDeCorte[i]);
				formaDeCorte3D.push(formaDeCorte[i+1]);
				
			}
			
			
			var vertices = [];
			
			for(i=0; i<=cantCapas; i++){
				for(j=0 ; j<formaDeCorte3D.length;j+=3){
		
					phi = 2*Math.PI*i/(cantCapas);
					
					vertices.push(formaDeCorte3D[j]*Math.cos(phi)-formaDeCorte3D[j+1]*Math.sin(phi));			
					vertices.push(formaDeCorte3D[j]*Math.sin(phi)+formaDeCorte3D[j+1]*Math.cos(phi));
					vertices.push(formaDeCorte3D[j+2]);
					
				}
			}
			
			return vertices;
			
		}
		
		
		function obtenerNormalesMangueras(vertices, path, pts) {
		
			var normals =[];
			
			for(var s=0; s<path.length;s+=2) {
				for (var i=s*pts*3/2; i<pts*3; i+=3) {
				normals[i]= vertices[i]-path[s]
				normals[i+1]= vertices[i+1]-path[s+1]
				normals[i+2]= vertices[i+2]
				
				}
			}
			
			return normals;
		
		}
		function normalizarArrayDeVec2(vec) {
			var vAux = [];
			var vNorm;
			var vecNorm = [];
			
			for(var i=0; i<vec.length; i+=2) {
				vAux = [vec[i],vec[i+1]];
				vNorm = normalizarVec2(vAux);
				vecNorm = vecNorm.concat(vNorm);
			}
			
			return vecNorm;
		}
		function normalizarArrayDeVec3(vec) {
			
			var vAux = [];
			var vNorm;
			var vecNorm = [];
			
			for(var i=0; i<vec.length; i+=3) {
				vAux = [vec[i],vec[i+1],vec[i+2]]
				vNorm = normalizar(vAux);		
				vecNorm = vecNorm.concat(vNorm);
			}
			
			return vecNorm;
		}
		
		function generarLineasNormales(vertices, normals, id) {
		
			
			//--------------BUFFER DE NORMALES
			
			var normVertex = [];
			
			//normals = normalizarArrayDeVec3(normals);
			
			for (var j=0; j<vertices.length; j+=3) {
				normVertex = normVertex.concat([vertices[j],vertices[j+1],vertices[j+2]]);	
				normVertex = normVertex.concat([vertices[j]+normals[j],vertices[j+1]+normals[j+1],vertices[j+2]+normals[j+2]]);
			}
			
			
			var normColor = [];
			for (var it=0; it<normVertex.length/3; it+=2) {
				
				normColor = normColor.concat([1.0,0.0,0.0,0.0]);
				normColor = normColor.concat([1.0,1.0,1.0,1.0]);

				}
				

			var normIndex = [];
			for (var i=0;i<normVertex.length/3; i+=2) {
				normIndex = normIndex.concat(i);
				normIndex = normIndex.concat(i+1);

			}
			
			normVertexBuffer[id] = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, normVertexBuffer[id]);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array( normVertex), gl.STATIC_DRAW);

            normColorBuffer[id] = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, normColorBuffer[id]);
            gl.bufferData(gl.ARRAY_BUFFER,  new Float32Array( normColor), gl.STATIC_DRAW);
			
			normIndexBuffer[id] = gl.createBuffer();
			normIndexBuffer[id].length = normIndex.length;

            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, normIndexBuffer[id]);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,  new Uint16Array( normIndex), gl.STATIC_DRAW);
						
		}
		
		function dibujarLineasNormales(id)  {
			gl.bindBuffer(gl.ARRAY_BUFFER, normVertexBuffer[id]);

            gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
			
			gl.bindBuffer(gl.ARRAY_BUFFER, normColorBuffer[id]);

			gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, 4, gl.FLOAT, false, 0, 0);

			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, normIndexBuffer[id]);

            gl.lineWidth(10.0);

			setMatrixUniforms();
            gl.drawElements(gl.LINES, normIndexBuffer[id].length, gl.UNSIGNED_SHORT, 0);		
		}
		
	
		
		