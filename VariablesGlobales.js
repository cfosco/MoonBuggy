
		//-----VARIABLES GLOBALES

    var camara = 4; 
	var click = false;
    var currentlyPressedKeys = {};
	var anguloMouseX = 0;
	var anguloMouseY = 0;
	var avanzar = false;
	var retroceder = false;
	var ascender = false;
	var descender = false;
	var despIzq = false;
	var despDer = false;
	var posPeaton = [0,0,30];
	var velocidadPeaton = 2;
	var k = velocidadPeaton;
	var velDron = 0;
	var facetado = false;		//No funciona bien
	var torreRecta = false;
	var verNormales = false;	// Falta el shader q permita esto
	
	
	
	var normVertexBuffer = [];
	var normColorBuffer = [];
	var normIndexBuffer = [];
	
	var laMagia = [false,false,false,false,false,false,false,false,false,false,false,false];
	
	
			var greyColors = 
			[[0.0,0.0,0.0,0.8],
			[0.0,0.0,0.0,0.9],
			[0.0,0.0,0.0,0.1],
			[0.0,0.0,0.0,0.0] ];

		var shaderProgram;

        var mvMatrix = mat4.create();
        var mvMatrixStack = [];
        var pMatrix = mat4.create();
		var vMatrix = mat4.create();
		
		var gl; 
	
		
		var zoom = -280;
		var rotIzqDer = 0;
		var rotArrAba = 0;
		var disparar = false;
		
		var t = 0
		
		var lastTime = 0;
		
		var simulador;
		
		var posPlaneta = [3000,-100,300];
		
		var suffixes = [ "posx", "negx", "posy", "negy", "posz", "negz" ];
		var cubeMapHandled = false;
		// LUCES
		
		var lDir;
		var lSpot;
		
		var lAmbient = [0.0,0.0,0.15];
		
		var boliche = false;
		
		