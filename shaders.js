
  

		function getShader(gl, id) {
 
            var shaderScript, theSource, currentChild, shader;

            shaderScript = document.getElementById(id);

            if (!shaderScript) {
                return null;
            }

            theSource = "";
            currentChild = shaderScript.firstChild;

            while(currentChild) {
                if (currentChild.nodeType == currentChild.TEXT_NODE) {
                    theSource += currentChild.textContent;
                }

                currentChild = currentChild.nextSibling;
            }

            if (shaderScript.type == "x-shader/x-fragment") {
                shader = gl.createShader(gl.FRAGMENT_SHADER);
            } else if (shaderScript.type == "x-shader/x-vertex") {
                shader = gl.createShader(gl.VERTEX_SHADER);
            } else {
                // Unknown shader type
                return null;
            }

            gl.shaderSource(shader, theSource);

            // Compile the shader program
            gl.compileShader(shader);

            // See if it compiled successfully
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                alert("An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader));
                return null;
            }

            return shader;
        }
	

		function getMatrixUnifLocations(program) {
		
            program.pMatrixUniform = gl.getUniformLocation(program, "uPMatrix");
            program.mvMatrixUniform = gl.getUniformLocation(program, "uMVMatrix");
			program.nMatrixUniform = gl.getUniformLocation(program, "uNMatrix");
			program.vMatrixUniform = gl.getUniformLocation(program, "uVMatrix");
			}
		
		function getCstsAndShininessUnifLocations(program) {
		
			program.KaUniform = gl.getUniformLocation(program, "Ka");
			program.KdUniform = gl.getUniformLocation(program, "Kd");
			program.KsUniform = gl.getUniformLocation(program, "Ks");
			program.shininessUniform = gl.getUniformLocation(program, "shininess");
		
		}
		
		function getDirLightUnifLocations(program) {
			
			program.lightIntensityUniform = gl.getUniformLocation(program, "uLightIntensity");
			program.lightDirectionUniform = gl.getUniformLocation(program, "uLightDirection");
		
		}
		
		function getSpotLightUnifLocations(program) {
			program.spotPosUniform = gl.getUniformLocation(program, "uSpotPosition");
			program.spotDirUniform = gl.getUniformLocation(program, "uSpotDirection");
			program.spotIntUniform = gl.getUniformLocation(program, "spot.intensity");
			program.spotExpUniform = gl.getUniformLocation(program, "spot.exponent");
			program.spotCutUniform = gl.getUniformLocation(program, "spot.cutoff");
			program.spotAttenUniform = gl.getUniformLocation(program, "spot.attenWithDist");
		}
			
		
		function createPhongTexProgram() {
		
			var fragmentShader = getShader(gl, "PhongTexAPF-fs");
            var vertexShader = getShader(gl, "PhongTexAPF-vs");

            var program = gl.createProgram();
            gl.attachShader(program, vertexShader);
            gl.attachShader(program, fragmentShader);
            gl.linkProgram(program);

            if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
                alert("Unable to initialize the PhongTex program.");
            }

            //gl.useProgram(program);	-- ESTO VA EN DRAW

            program.vertexPositionAttribute = gl.getAttribLocation(program, "aVertexPosition");
            gl.enableVertexAttribArray(program.vertexPositionAttribute);

			program.vertexNormalAttribute = gl.getAttribLocation(program, "aVertexNormal");
			gl.enableVertexAttribArray(program.vertexNormalAttribute);

            program.textureCoordAttribute = gl.getAttribLocation(program, "aTextureCoord");
            gl.enableVertexAttribArray(program.textureCoordAttribute);
			
			
            getMatrixUnifLocations(program);
			getCstsAndShininessUnifLocations(program);
			getDirLightUnifLocations(program);
			getSpotLightUnifLocations(program);
			
		    program.samplerUniform = gl.getUniformLocation(program, "uSampler");
	
			return program;
			
		
		}
		
		function createPhongColorProgram() {
		
			var fragmentShader = getShader(gl, "PhongColorAPF-fs");
            var vertexShader = getShader(gl, "PhongColorAPF-vs");

            var program = gl.createProgram();
            gl.attachShader(program, vertexShader);
            gl.attachShader(program, fragmentShader);
            gl.linkProgram(program);

            if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
                alert("Unable to initialize the PhongColorAPF program.");
            }

            //gl.useProgram(program);	-- ESTO VA EN DRAW

            program.vertexPositionAttribute = gl.getAttribLocation(program, "aVertexPosition");
            gl.enableVertexAttribArray(program.vertexPositionAttribute);

			program.vertexNormalAttribute = gl.getAttribLocation(program, "aVertexNormal");
			gl.enableVertexAttribArray(program.vertexNormalAttribute);

            //program.vertexColorAttribute = gl.getAttribLocation(program, "aVertexColor");
            //gl.enableVertexAttribArray(program.vertexColorAttribute);
			
			// DEBUG
			//console.log("------COLOR PROGRAM");
			//console.log("programColor.vertexPositionAttribute = " + program.vertexPositionAttribute);
			//console.log("programColor.vertexNormalAttribute = " + program.vertexNormalAttribute);
			//console.log("programColor.vertexColorAttribute = " + program.vertexColorAttribute);
			//console.log("------");
			
			getMatrixUnifLocations(program);
			getCstsAndShininessUnifLocations(program);
			getDirLightUnifLocations(program);
			getSpotLightUnifLocations(program);
			
			return program;
		
		}
				
		function createPhongNormalMapProgram() {
			var fragmentShader = getShader(gl, "PhongTexNormMapAPF-fs");
            var vertexShader = getShader(gl, "PhongTexNormMapAPF-vs");

            var program = gl.createProgram();
            gl.attachShader(program, vertexShader);
            gl.attachShader(program, fragmentShader);
            gl.linkProgram(program);

            if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
                alert("Unable to initialize the PhongNormalMap program.");
            }

            //gl.useProgram(program);	-- ESTO VA EN DRAW

            program.vertexPositionAttribute = gl.getAttribLocation(program, "aVertexPosition");
            gl.enableVertexAttribArray(program.vertexPositionAttribute);

			program.vertexNormalAttribute = gl.getAttribLocation(program, "aVertexNormal");
			gl.enableVertexAttribArray(program.vertexNormalAttribute);

            program.textureCoordAttribute = gl.getAttribLocation(program, "aTextureCoord");
            gl.enableVertexAttribArray(program.textureCoordAttribute);

            program.vertexTangentAttribute = gl.getAttribLocation(program, "aVertexTangent");
            gl.enableVertexAttribArray(program.vertexTangentAttribute);
			
            getMatrixUnifLocations(program);
			getCstsAndShininessUnifLocations(program);
			getDirLightUnifLocations(program);
			getSpotLightUnifLocations(program);
			
			program.colorTexUniform = gl.getUniformLocation(program, "colorTex");
			program.normalMapTexUniform = gl.getUniformLocation(program, "normalMapTex");

			return program;
		}
		
		function createPhongTexFacetProgram() {
			var fragmentShader = getShader(gl, "PhongTexFacetAPF-fs");
            var vertexShader = getShader(gl, "PhongTexFacetAPF-vs");

            var program = gl.createProgram();
            gl.attachShader(program, vertexShader);
            gl.attachShader(program, fragmentShader);
            gl.linkProgram(program);

            if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
                alert("Unable to initialize the PhongTexFacet program.");
            }

            //gl.useProgram(program);	-- ESTO VA EN DRAW

            program.vertexPositionAttribute = gl.getAttribLocation(program, "aVertexPosition");
            gl.enableVertexAttribArray(program.vertexPositionAttribute);

			program.vertexNormalAttribute = gl.getAttribLocation(program, "aVertexNormal");
			gl.enableVertexAttribArray(program.vertexNormalAttribute);

            program.textureCoordAttribute = gl.getAttribLocation(program, "aTextureCoord");
            gl.enableVertexAttribArray(program.textureCoordAttribute);
			
			
            getMatrixUnifLocations(program);
			getCstsAndShininessUnifLocations(program);
			getDirLightUnifLocations(program);
			getSpotLightUnifLocations(program);
			
		    program.samplerUniform = gl.getUniformLocation(program, "uSampler");
	
			return program;
			
		
		}
				
		function createPhongTexAutoilumProgram() { 
			var fragmentShader = getShader(gl, "PhongTexAutoilum-fs");
            var vertexShader = getShader(gl, "PhongTexAutoilum-vs");

            var program = gl.createProgram();
            gl.attachShader(program, vertexShader);
            gl.attachShader(program, fragmentShader);
            gl.linkProgram(program);

            if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
                alert("Unable to initialize the PhongTexAutoilum program.");
            }

            //gl.useProgram(program);	-- ESTO VA EN DRAW

            program.vertexPositionAttribute = gl.getAttribLocation(program, "aVertexPosition");
            gl.enableVertexAttribArray(program.vertexPositionAttribute);

			program.vertexNormalAttribute = gl.getAttribLocation(program, "aVertexNormal");
			gl.enableVertexAttribArray(program.vertexNormalAttribute);

            program.textureCoordAttribute = gl.getAttribLocation(program, "aTextureCoord");
            gl.enableVertexAttribArray(program.textureCoordAttribute);

            getMatrixUnifLocations(program);
			getCstsAndShininessUnifLocations(program);
			getDirLightUnifLocations(program);
			getSpotLightUnifLocations(program);
			
			program.colorTexUniform = gl.getUniformLocation(program, "colorTex");
			program.autoilumTexUniform = gl.getUniformLocation(program, "autoilumTex");
			program.facetadoUniform = gl.getUniformLocation(program, "facetado");
			program.bolicheUniform = gl.getUniformLocation(program, "boliche");
			program.tUniform = gl.getUniformLocation(program, "t");

			return program;
			
		}
		
		function createPhongCubeMapReflecProgram() {
		
			var fragmentShader = getShader(gl, "PhongCubeMapReflec-fs");
            var vertexShader = getShader(gl, "PhongCubeMapReflec-vs");

            var program = gl.createProgram();
            gl.attachShader(program, vertexShader);
            gl.attachShader(program, fragmentShader);
            gl.linkProgram(program);

            if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
                alert("Unable to initialize the PhongCubeMapReflec program.");
            }

            //gl.useProgram(program);	-- ESTO VA EN DRAW

            program.vertexPositionAttribute = gl.getAttribLocation(program, "aVertexPosition");
            gl.enableVertexAttribArray(program.vertexPositionAttribute);

			program.vertexNormalAttribute = gl.getAttribLocation(program, "aVertexNormal");
			gl.enableVertexAttribArray(program.vertexNormalAttribute);

            
			
			getMatrixUnifLocations(program);
			getCstsAndShininessUnifLocations(program);
			getDirLightUnifLocations(program);
			getSpotLightUnifLocations(program);
			
			program.drawSkyBoxUniform = gl.getUniformLocation(program, "drawSkyBox");
			program.reflectFactorUniform = gl.getUniformLocation(program, "reflectFactor");
			program.cubeMapTexUniform = gl.getUniformLocation(program, "cubeMapTex");
	
	
			program.mMatrixUniform = gl.getUniformLocation(program, "uMMatrix");

	
			return program;
		
		}
			
			
		/*function initShaders() {
		
			shaderProgram = createPhongColorAPFProgram();
		

			gl.useProgram(shaderProgram);	//ESTO NO VA ACA
		
			console.log("paso  useProgram");	//DEBUG
			
			// LO QUE SIGUE NO DEBERIA ESTAR ACA
				gl.uniform3f(shaderProgram.lightIntensityUniform,0.6,0.6,0.6);
				gl.uniform3f(shaderProgram.KaUniform,0.1,0.1,0.17);
				gl.uniform3f(shaderProgram.KdUniform,0.0,0.0,0.8);
				gl.uniform3f(shaderProgram.KsUniform,1.0,1.0,1.0);
				gl.uniform1f(shaderProgram.shininessUniform, 10.0);
				
				gl.uniform3f(shaderProgram.spotPosUniform,0.0,0.0,0.0);
				gl.uniform3f(shaderProgram.spotIntUniform,1.0,1.0,1.0);
				gl.uniform3f(shaderProgram.spotDirUniform,0.0,0.0,-1.0);
				gl.uniform1f(shaderProgram.spotExpUniform, 30.0);
				gl.uniform1f(shaderProgram.spotCutUniform, 15.0);
				

        }*/
			
		