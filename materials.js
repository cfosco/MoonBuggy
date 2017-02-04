
	function cargarConstantesYShininess(Ka, Kd, Ks, shininess, program) {
		
			gl.uniform3f(program.KaUniform,Ka[0], Ka[1], Ka[2]);
			gl.uniform3f(program.KdUniform,Kd[0], Kd[1], Kd[2]);
			gl.uniform3f(program.KsUniform,Ks[0], Ks[1], Ks[2]);
			gl.uniform1f(program.shininessUniform, shininess);
	
	}
	
	function MaterialColor (Ka, Kd, Ks, shininess) {
	
		this.Ka = Ka;
		this.Kd = Kd;
		this.Ks = Ks;
		this.shininess = shininess;
		this.usaTexturas = false;
		this.usaTangentes = false;
		this.esReflectivo = false;
		
		this.program = createPhongColorProgram();
		
		this.prepararParaDibujar = function() {
		
			gl.useProgram(this.program);
			
			cargarConstantesYShininess(this.Ka, this.Kd, this.Ks, this.shininess, this.program);
			lDir.setUniforms(this.program);
			lSpot.setUniforms(this.program);
		};
	
	}
	
	
	function MaterialTexturado (Ka, Kd, Ks, shininess, textura, facetado) {
			this.Ka = Ka;
			this.Kd = Kd;
			this.Ks = Ks;
			this.shininess = shininess;
			this.textura = textura;
			this.usaTexturas = true;
			this.usaTangentes = false;
			this.esReflectivo = false;
			this.facetado = facetado;
			
			
			if(this.facetado) {
				this.program = createPhongTexFacetProgram();
			} else {
				this.program = createPhongTexProgram();
			}	
				
			this.prepararParaDibujar = function() {
			
				gl.useProgram(this.program);
				
				cargarConstantesYShininess(this.Ka, this.Kd, this.Ks, this.shininess, this.program);
				lDir.setUniforms(this.program);
				lSpot.setUniforms(this.program);
				
				
				gl.activeTexture(gl.TEXTURE0);
				gl.bindTexture(gl.TEXTURE_2D, this.textura);
				gl.uniform1i(this.program.samplerUniform, 0);
			};
	
		}
		
	// Todos los q siguen no estan listos
	function MaterialTexturadoAutoillum (Ka, Kd, Ks, shininess, textura, mapaAutoillum, facetado) {
			this.Ka = Ka;
			this.Kd = Kd;
			this.Ks = Ks;
			this.shininess = shininess;
			this.textura = textura;
			this.mapaAutoillum = mapaAutoillum;
			this.facetado = facetado;
			this.usaTexturas = true;
			this.usaTangentes = true;
			this.esReflectivo = false;
			
			
			this.program = createPhongTexAutoilumProgram();
			
			this.prepararParaDibujar = function() { 
			
				gl.useProgram(this.program);
				
				cargarConstantesYShininess(this.Ka, this.Kd, this.Ks, this.shininess, this.program);
				lDir.setUniforms(this.program);
				lSpot.setUniforms(this.program);
				
				gl.uniform1i(this.program.facetadoUniform, this.facetado);
				gl.uniform1i(this.program.bolicheUniform, boliche);
				gl.uniform1f(this.program.tUniform, lastTime%60);

				
				gl.activeTexture(gl.TEXTURE0);
				gl.bindTexture(gl.TEXTURE_2D, this.textura);
				gl.uniform1i(this.program.colorTexUniform, 0);
				
				
				gl.activeTexture(gl.TEXTURE1);
				gl.bindTexture(gl.TEXTURE_2D, this.mapaAutoillum);
				gl.uniform1i(this.program.autoilumTexUniform, 1);
			};
	
		
	}
	
	
	function MaterialRelieve (Ka, Kd, Ks, shininess, textura, mapaNorm) {
			this.Ka = Ka;
			this.Kd = Kd;
			this.Ks = Ks;
			this.shininess = shininess;
			this.textura = textura;
			this.mapaNorm = mapaNorm;
			this.usaTexturas = true;
			this.usaTangentes = true;
			this.esReflectivo = false;
			
			this.program = createPhongNormalMapProgram();
			
			this.prepararParaDibujar = function() { 
			
				gl.useProgram(this.program);
				
				cargarConstantesYShininess(this.Ka, this.Kd, this.Ks, this.shininess, this.program);
				lDir.setUniforms(this.program);
				lSpot.setUniforms(this.program);
				
				
				gl.activeTexture(gl.TEXTURE0);
				gl.bindTexture(gl.TEXTURE_2D, this.textura);
				gl.uniform1i(this.program.colorTexUniform, 0);
				
				
				gl.activeTexture(gl.TEXTURE1);
				gl.bindTexture(gl.TEXTURE_2D, this.mapaNorm);
				gl.uniform1i(this.program.normalMapTexUniform, 1);
			};
	
		
	}
		
		
	function MaterialReflectivo (Ka, Kd, Ks, shininess, refFactor, drawSkyBox, mapaReflex) {
			this.Ka = Ka;
			this.Kd = Kd;
			this.Ks = Ks;
			this.shininess = shininess;
			this.mapaReflex = mapaReflex;
			this.usaTexturas = false;
			this.usaTangentes = false;
			this.esReflectivo = true;
			this.refFactor = refFactor;
			this.drawSkyBox = drawSkyBox;
			
			this.program = createPhongCubeMapReflecProgram();
			
			this.prepararParaDibujar = function() { 
			
				gl.useProgram(this.program);
				
				cargarConstantesYShininess(this.Ka, this.Kd, this.Ks, this.shininess, this.program);
				lDir.setUniforms(this.program);
				lSpot.setUniforms(this.program);
				
				gl.uniform1i(this.program.drawSkyBoxUniform, this.drawSkyBox);
				gl.uniform1f(this.program.reflectFactorUniform, this.refFactor);
	
				
				
				gl.activeTexture(gl.TEXTURE0);
				gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.mapaReflex);
				gl.uniform1i(this.program.cubeMapTexUniform, 0);
				
			};
		
	}
	
	

	function initMaterials() {
		
		initTextures();
		materialSuelo = new MaterialRelieve([0.1,0.1,0.1], [0.3,0.3,0.3], [1.0/2,1.0/2,1.0/2],12.0, planoTexture, planoNormMapTexture);
		materialDomo = new MaterialTexturadoAutoillum([0.1,0.1,0.1], [0.6,0.6,0.6], [0.4,0.4,0.4], 3.0, domoTexture, domoAutoilumTexture,false);
		materialManguera = new MaterialColor([1.0/6,0.8/6,0.2/6], [1.0,0.6,0.2], [1.0,1.0,1.0], 20.0);
		materialModulo = new MaterialTexturadoAutoillum([0.1,0.1,0.1], [0.6,0.6,0.6], [0.4,0.4,0.4], 3.0, moduloTexture,moduloAutoilumTexture, true);
		materialChasis = new MaterialTexturado([0.1,0.1,0.1], [0.6,0.6,0.6], [1.0,1.0,1.0], 40.0, chasisTexture, true);
		materialTorreta = new MaterialReflectivo([1.0/6,0.8/6,0.2/6], [1.0,0.6,0.2], [1.0,1.0,1.0], 20.0, 0.7, false, cieloTexture);
		materialTorreDeControl = new MaterialTexturadoAutoillum([0.1,0.1,0.1], [0.6,0.6,0.6], [0.4,0.4,0.4], 3.0, torreTexture,torreAutoilumTexture, false);
		materialCabina = new MaterialReflectivo([1.0/6,0.8/6,0.2/6], [1.0,0.6,0.2], [1.0,1.0,1.0], 20.0, 0.5, false, cieloTexture);	
		// materialCabina = new MaterialTexturado();
		 materialRueda = new MaterialTexturado([0.1,0.1,0.1],[1.0,1.0,1.0],[0.5,0.5,0.5],2.0,ruedaTexture,true);
		// materialFaros = new MaterialColor();
		materialDisparadores = new MaterialColor([0.0,0.0,0.0], [0.2,0.6,1.0], [0.0,0.0,1.0], 2.0);
		materialTierra = new MaterialTexturado([0.1,0.1,0.1],[1.0,1.0,1.0],[0.5,0.5,0.5],2.0,tierraTexture,false);
		materialContenedor= new MaterialRelieve([0.1,0.1,0.1], [0.5,0.5,0.5], [1.0/2,1.0/2,1.0/2],12.0, contenTexture, contenNormMapTexture);
		materialContenedor2= new MaterialTexturado([0.1,0.1,0.1], [0.5,0.5,0.5], [1.0/2,1.0/2,1.0/2],12.0, contenTexture, false);
		
		materialCielo = new MaterialReflectivo([0.5,0.5,0.5], [0.8,0.8,0.8], [0.2,0.2,0.2], 3.0, 1.0, true, cieloTexture);
		materialDron = new MaterialTexturado([0.1,0.1,0.1],[1.0,1.0,1.0],[0.5,0.5,0.5],2.0,dronTexture,false);
	
	
	}
	
