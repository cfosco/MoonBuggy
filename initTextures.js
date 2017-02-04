	
	function initTextures() {
		initTextureDomo();
		initTexturePlano();
		initTextureModulo();
		initTextureChasis();
		initTextureRueda();
		initTextureTorre();
		initTextureTierra();
		initTextureTanqueBase();
		initTextureCielo();
		initTextureConten();
		initTextureDron();
	}

	
	function initTextureDomo() {
		domoTexture = gl.createTexture();
		domoTexture.image = new Image();
		domoTexture.image.onload = function() {
			handleLoadedTexture(domoTexture);
		}
		domoTexture.image.src = "Imagenes/domo.jpg";
		
		domoAutoilumTexture = gl.createTexture();
		domoAutoilumTexture.image = new Image();
		domoAutoilumTexture.image.onload = function() {
			handleLoadedTexture(domoAutoilumTexture);
		}
		domoAutoilumTexture.image.src = "Imagenes/domo-ilum.jpg";
	}
	
	function initTexturePlano() {
		planoTexture = gl.createTexture();
		planoTexture.image = new Image();
		planoTexture.image.onload = function() {
			handleLoadedTexture(planoTexture);
		}
		planoTexture.image.src = "Imagenes/superficie.jpg";
		
		planoNormMapTexture = gl.createTexture();
		planoNormMapTexture.image = new Image();
		planoNormMapTexture.image.onload = function() {
			handleLoadedTexture(planoNormMapTexture);
		}
		planoNormMapTexture.image.src = "Imagenes/superficie-20.jpg";
	}
	
	function initTextureConten() {
		contenTexture = gl.createTexture();
		contenTexture.image = new Image();
		contenTexture.image.onload = function() {
			handleLoadedTexture(contenTexture);
		}
		contenTexture.image.src = "Imagenes/chapas.jpg";
		
		contenNormMapTexture = gl.createTexture();
		contenNormMapTexture.image = new Image();
		contenNormMapTexture.image.onload = function() {
			handleLoadedTexture(contenNormMapTexture);
		}
		contenNormMapTexture.image.src = "Imagenes/chapasNormal10.jpg";
	}
	
	
	
	function initTextureModulo() {
		moduloTexture = gl.createTexture();
		moduloTexture.image = new Image();
		moduloTexture.image.onload = function() {
			handleLoadedTexture(moduloTexture)
		}
		moduloTexture.image.src = "Imagenes/modulos.jpg";
		
		moduloAutoilumTexture = gl.createTexture();
		moduloAutoilumTexture.image = new Image();
		moduloAutoilumTexture.image.onload = function() {
			handleLoadedTexture(moduloAutoilumTexture)
		}
		moduloAutoilumTexture.image.src = "Imagenes/modulos-ilum.jpg";
	}
	
	function initTextureChasis(){
		chasisTexture = gl.createTexture();
		chasisTexture.image = new Image();
		chasisTexture.image.onload = function() {
			handleLoadedTexture(chasisTexture)
		}
		chasisTexture.image.src = "Imagenes/TexturaChasis.jpg";
	}
	
	function initTextureRueda(){
		ruedaTexture = gl.createTexture();
		ruedaTexture.image = new Image();
		ruedaTexture.image.onload = function() {
			handleLoadedTexture(ruedaTexture)
		}
		ruedaTexture.image.src = "Imagenes/wheel.jpg";
	}
	
	function initTextureTorre(){
		torreTexture = gl.createTexture();
		torreTexture.image = new Image();
		torreTexture.image.onload = function() {
			handleLoadedTexture(torreTexture)
		}
		torreTexture.image.src = "Imagenes/torre.jpg";
		
		torreAutoilumTexture = gl.createTexture();
		torreAutoilumTexture.image = new Image();
		torreAutoilumTexture.image.onload = function() {
			handleLoadedTexture(torreAutoilumTexture)
		}
		torreAutoilumTexture.image.src = "Imagenes/torre-ilum.jpg";
		
	}
	
	function initTextureTierra(){
		tierraTexture = gl.createTexture();
		tierraTexture.image= new Image();
		tierraTexture.image.onload = function(){
			handleLoadedTexture(tierraTexture);
		}
		tierraTexture.image.src = "Imagenes/earthmab.jpg";
		
	
	}
	
	
	function initTextureTanqueBase(){
		tanqueBaseTexture = gl.createTexture();
		tanqueBaseTexture.image = new Image;
		tanqueBaseTexture.image.onload= function(){
			handleLoadedTexture(tanqueBaseTexture);
		}
	
	}
	
	function initTextureCielo(){
	
		cieloTexture = gl.createTexture();
		
		cieloTexture.imgs = [];
		
		for (var i =0 ; i<6;i++) {
		cieloTexture.imgs[i]= new Image();
		cieloTexture.imgs[i].onload = function(){
			if(!cubeMapHandled) {
				handleCubeMap(cieloTexture);
				cubeMapHandled = true;
			}
		}
		cieloTexture.imgs[i].src = "Imagenes/cielo_"+suffixes[i]+".jpg";
		
		}

	}
	
	function initTextureDron(){
	
		dronTexture = gl.createTexture();
		dronTexture.image = new Image();
		dronTexture.image.onload = function() {
			handleLoadedTexture(dronTexture)
		}
		dronTexture.image.src = "Imagenes/cuerpoDron.jpg";
	
	
	}
	
	
	function handleCubeMap(texture) {
    
    	
		texture.type = gl.TEXTURE_CUBE_MAP;
		gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
		gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
		
		var targets = [
		  gl.TEXTURE_CUBE_MAP_POSITIVE_X,
		  gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
		  gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
		  gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
		  gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
		  gl.TEXTURE_CUBE_MAP_NEGATIVE_Z
		];
		
		for(var i = 0; i < targets.length; i++)
		  gl.texImage2D(targets[i], 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.imgs[i]);
		
		gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
		gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
		//gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_R, gl.CLAMP_TO_EDGE);
		gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
		gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);
  }
  

	function handleLoadedTexture(texture) {
		gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
		gl.bindTexture(gl.TEXTURE_2D, texture);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);
		
		// gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
		// gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
		// gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		// gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
		
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
        gl.generateMipmap(gl.TEXTURE_2D);
		
		gl.bindTexture(gl.TEXTURE_2D, null);
	  }
	  
	function handleCubeMapTexture (texture) {
		
	}

	  
	  
	  
	  
	  
	  
 // GENERACION DE TEXTURECOORD BUFFERS


	function generarTextureBufferDomo(cantPuntosU,cantPuntosV) {	//Esto iria mas bien en initBuffers
	
		var textureCoords = [];
		
		for(j=0;j<=cantPuntosU;j++){
			for(i=0;i<cantPuntosV;i++){
				textureCoords.push(2*j/(cantPuntosU-1));
				textureCoords.push(i/(cantPuntosV-1));
					
			}
		}
		
		domoTextureCoordBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, domoTextureCoordBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoords), gl.STATIC_DRAW);
		
		
	}
	
		
	// BUFFER MODULO	
	function generarTextureBufferModulo(cantPuntosU,cantPuntosV,cantPuntosCurva) {
		var textureCoords = [];
		// console.log("puntos u = " + cantPuntosU + "  puntos v = " +cantPuntosV);
		
			texturarFormaCorteModulo(textureCoords,cantPuntosCurva,-224/1024);
			// console.log("largo textureCoords " + textureCoords.length/2);
			texturarFormaCorteModulo(textureCoords,cantPuntosCurva,-223/1024);
			// console.log("largo textureCoords " + textureCoords.length/2);
			texturarFormaCorteModulo(textureCoords,cantPuntosCurva,-111/1024);
			// console.log("largo textureCoords " + textureCoords.length/2);
			texturarFormaCorteModulo(textureCoords,cantPuntosCurva,0/1024);
			// console.log("largo textureCoords " + textureCoords.length/2);
			texturarFormaCorteModulo(textureCoords,cantPuntosCurva,795/1024);
			// console.log("largo textureCoords " + textureCoords.length/2);
			texturarFormaCorteModulo(textureCoords,cantPuntosCurva,800/1024);
			// console.log("largo textureCoords " + textureCoords.length/2);
			texturarFormaCorteModulo(textureCoords,cantPuntosCurva,900/1024);
			// console.log("largo textureCoords " + textureCoords.length/2);
			texturarFormaCorteModulo(textureCoords,cantPuntosCurva,1024/1024);
			// console.log("largo textureCoords " + textureCoords.length/2);
		// for(i=0;i<cantPuntosU;i++){
			// texturarFormaCorteModulo(textureCoords,cantPuntosCurva,i/(cantPuntosU-1));
			
		// }
		// console.log("largo textureCoords final" + textureCoords.length/2);
		
		
		moduloTextureCoordBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, moduloTextureCoordBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoords), gl.STATIC_DRAW);
		
		
		// DEBUG
		// console.log("cant vertices con textura modulo = " + textureCoords.length/2);
		
	}
	
	function texturarFormaCorteModulo(textureCoords,cantPuntosCurva,puntoU){
	//primer curva
			for(j=0;j<cantPuntosCurva;j++){
				
				textureCoords.push(puntoU); //horizontal U
				textureCoords.push(j*(110/((cantPuntosCurva-1)*512))); //vertical V
				
			}
			//hueco
			for(j=0;j<4;j++){
				textureCoords.push(puntoU); //horizontal U
				textureCoords.push(j*(150/((4-1)*512))+60/512); //vertical V //restar
			}
		
			//segunda curva
			for(j=0;j<cantPuntosCurva;j++){
				
				textureCoords.push(puntoU); //horizontal U
				textureCoords.push(j*(130/((cantPuntosCurva-1)*512))+162/512); //vertical V
				
			}
			//techo
			textureCoords.push(puntoU); //horizontal U
			textureCoords.push(1); //vertical V
			 
			// SEGUNDA MITAD
			
			//primer curva
			for(j=0;j<cantPuntosCurva;j++){
				
				textureCoords.push(puntoU); //horizontal U
				textureCoords.push(292/512-j*(130/((cantPuntosCurva-1)*512))); //vertical V
				
			}
			//hueco
			for(j=0;j<4;j++){
				textureCoords.push(puntoU); //horizontal U
				textureCoords.push(210/512-j*(150/((4-1)*512))); //vertical V //sumar
			}
		
			//segunda curva
			for(j=0;j<cantPuntosCurva;j++){
				
				textureCoords.push(puntoU); //horizontal U
				textureCoords.push(102/512-j*(110/((cantPuntosCurva-1)*512))); //vertical V 
				
			}
			//pis0
			textureCoords.push(puntoU); //horizontal U
			textureCoords.push(110/512); //vertical V
			textureCoords.push(puntoU); //horizontal U
			textureCoords.push(112/512);
	
	}
	
	// BUFFER CHASIS
	function generarTextureBufferChasis(cantPuntosU,cantPuntosV) {
		var textureCoords = [];
		for(j=0;j<cantPuntosU;j++){
			for(i=0;i<cantPuntosV;i++){
				textureCoords.push(2*i/(cantPuntosU-1));
				textureCoords.push(j%4);
					
			}
		}
		
		chasisTextureCoordBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, chasisTextureCoordBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoords), gl.STATIC_DRAW);
	}
	
	
	function generarTextureBufferRueda(cantPuntosCirc,cantPuntosPath) {
	
		var textureCoordsRueda = [];
		
		generarCirculoRueda(textureCoordsRueda,cantPuntosCirc,0);
		generarCirculoRueda(textureCoordsRueda,cantPuntosCirc,370);
		generarCirculoRueda(textureCoordsRueda,cantPuntosCirc,510);
		generarCirculoRueda(textureCoordsRueda,cantPuntosCirc,510);
		generarCirculoRueda(textureCoordsRueda,cantPuntosCirc,370);
		generarCirculoRueda(textureCoordsRueda,cantPuntosCirc,0);
			
	
		
		 //console.log("cant vertices con textura Rueda = " + textureCoordsRueda.length/2);
		console.log(textureCoordsRueda);
		
		
		ruedaTextureCoordBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, ruedaTextureCoordBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordsRueda), gl.STATIC_DRAW);
		
	}
	
	function generarCirculoRueda(textureCoordsRueda,cantPuntosCirc,radio){
		for(j=0;j<cantPuntosCirc;j++){
			
			textureCoordsRueda.push((512 + radio*Math.cos(2 * j* Math.PI / (cantPuntosCirc-1)))/1024);
			textureCoordsRueda.push((498 + radio*Math.sin(2 * j* Math.PI / (cantPuntosCirc-1)))/1024);
			
		
		}
	}
	
	function generarTextureBufferTorre(cantPuntosV,cantPuntosU,cantPuntosCurva,torreRecta) {
		var textureCoords = [];
		
		for(j=0;j<cantPuntosU;j++){
		//curva1
			if(torreRecta==false){
				for(i=0;i<cantPuntosCurva;i++){
				
					textureCoords.push(2*j/(cantPuntosU-1));
					textureCoords.push(i*(456/((cantPuntosCurva-1)*1024)));
						
				}
			}
			else {
				for(i=0;i<4;i++){
				
					textureCoords.push(2*j/(cantPuntosU-1));
					textureCoords.push(i*(456/((cantPuntosCurva-1)*1024)));
			
				}
			}
			
		//curva2
			for(i=0;i<cantPuntosCurva;i++){
			
				textureCoords.push(2*j/(cantPuntosU-1));
				textureCoords.push(i*(294/((cantPuntosCurva-1)*1024))+456/1024);
					
			}
		
		//hueco1
			for(i=0;i<cantPuntosCurva;i++){
			
				textureCoords.push(2*j/(cantPuntosU-1));
				textureCoords.push(i*(35/((cantPuntosCurva-1)*1024))+654/1024);
					
			}
		//hueco2
			for(i=0;i<cantPuntosCurva;i++){
			
				textureCoords.push(2*j/(cantPuntosU-1));
				textureCoords.push(i*(35/((cantPuntosCurva-1)*1024))+785/1024);
					
			}
		//curva4
			for(i=0;i<cantPuntosCurva;i++){
			
				textureCoords.push(2*j/(cantPuntosU-1));
				textureCoords.push(i*(84/((cantPuntosCurva-1)*1024))+820/1024);
					
			}
		// curva5
			for(i=0;i<cantPuntosCurva;i++){
			
				textureCoords.push(2*j/(cantPuntosU-1));
				textureCoords.push(i*(120/((cantPuntosCurva-1)*1024))+854/1024);
					
			}
		}
		// console.log("cant vertices con textura torre = " + textureCoords.length/2);
		
		torreTextureCoordBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, torreTextureCoordBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoords), gl.STATIC_DRAW);
	
		
	}
	
	function generarTextureBufferCono(cantPuntosU,cantPuntosV){
		var textureCoords=[];
		
		for(j=0;j<=cantPuntosU;j++){
			for(i=0;i<cantPuntosV;i++){
				textureCoords.push(2*j/(cantPuntosU-1));
				textureCoords.push(i/(cantPuntosV-1));
					
			}
		}
		
		coneTextureCoordBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER,coneTextureCoordBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoords),gl.STATIC_DRAW);
		
		
		
	
	}
	
	function generarTextureBufferCilindro(cantPuntosU,cantPuntosV){
		var textureCoords=[];
		
		
		for(j=0;j<cantPuntosU;j++){
				textureCoords.push(0.5);	//4*j/(cantPuntosU-1)
				textureCoords.push(0.0);
					
			}
		for(j=0;j<cantPuntosU;j++){
				textureCoords.push(0.5);	//4*j/(cantPuntosU-1)
				textureCoords.push(0.0);
					
			}	
		for(j=0;j<cantPuntosU;j++){
				textureCoords.push(4*j/(cantPuntosU-1));
				textureCoords.push(0.0);
					
			}
			
		for(j=0;j<cantPuntosU;j++){
				textureCoords.push(4*j/(cantPuntosU-1));
				textureCoords.push(1);
					
			}
		
		for(j=0;j<cantPuntosU;j++){
			textureCoords.push(4*j/(cantPuntosU-1));
			textureCoords.push(0.001);
					
		}
		for(j=0;j<cantPuntosU;j++){
			textureCoords.push(0.5);	//4*j/(cantPuntosU-1)
			textureCoords.push(0.001);
					
		}
		for(j=0;j<cantPuntosU;j++){
			textureCoords.push(0.5);	//4*j/(cantPuntosU-1)
			textureCoords.push(0.0);
					
		}
		
		
		
		//console.log("largo textura cilindro  " + textureCoords.length/2);
		cilTextureCoordBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER,cilTextureCoordBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoords),gl.STATIC_DRAW);
		
	}
	
	
	