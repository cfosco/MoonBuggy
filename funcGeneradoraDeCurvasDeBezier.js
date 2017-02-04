	
	// Funcion generadora de curvas de Bezier en 2D
	
	
	var CurvaBezier=function (P0,P1,P2,P3, u){

		var punto=new Object();

		punto.x=BaseBezier0(u)*P0.x+BaseBezier1(u)*P1.x+BaseBezier2(u)*P2.x+BaseBezier3(u)*P3.x;
		punto.y=BaseBezier0(u)*P0.y+BaseBezier1(u)*P1.y+BaseBezier2(u)*P2.y+BaseBezier3(u)*P3.y;

		return punto;
	}
	
	

	var CurvaBezierDerivadaPrimera=function (P0,P1,P2,P3,u){

		var punto=new Object();

		punto.x=BaseBezier0der(u)*P0.x+BaseBezier1der(u)*P1.x+BaseBezier2der(u)*P2.x+BaseBezier3der(u)*P3.x;
		punto.y=BaseBezier0der(u)*P0.y+BaseBezier1der(u)*P1.y+BaseBezier2der(u)*P2.y+BaseBezier3der(u)*P3.y;

		return punto;
	}
	
	function obtenerArrayPuntosCurvaBezierGr3(p0,p1,p2,p3, cantPuntos)		//Devuelve array {x1,y1,x2,y2,...} de cantPuntos*2 elem con posicion en 2D de los pts de la curva
	{
			var currentU=0;
			puntosCurva = [];
			
			for (var i =0;i<cantPuntos;i++) {
			
			currentU = i/(cantPuntos-1);
			
			puntoActual = CurvaBezier(p0,p1,p2,p3, currentU);
			
			puntosCurva.push(puntoActual.x);
			puntosCurva.push(puntoActual.y);
			}
			
			return puntosCurva;

	}
	
	function obtenerArrayPuntosDerivadaCurvaBezierGr3(p0,p1,p2,p3, cantPuntos)		//Devuelve array {x1,y1,x2,y2,...} de cantPuntos*2 elem con posicion en 2D de los pts de la curva
	{
			var currentU=0;
			puntosCurva = [];
			
			for (var i =0;i<cantPuntos;i++) {
			
			currentU = i/(cantPuntos-1);
			
			puntoActual = CurvaBezierDerivadaPrimera(p0,p1,p2,p3, currentU);
			
			puntosCurva.push(puntoActual.x);
			puntosCurva.push(puntoActual.y);
			}
			
			return puntosCurva;

	}
	
	
	
	// Definimos las BaseBeziers de Berstein, dependen de u

	var BaseBezier0=function(u) { return (1-u)*(1-u)*(1-u);}

	var BaseBezier1=function(u) { return 3*(1-u)*(1-u)*u; }

	var BaseBezier2=function(u) { return 3*(1-u)*u*u;}

	var BaseBezier3=function(u) { return u*u*u; }



	var BaseBezier0der=function(u) { return -3*u*u+6*u-3;} //-3u2 +6u -3

	var BaseBezier1der=function(u) { return 9*u*u-12*u+3; }  // 9u2 -12u +3

	var BaseBezier2der=function(u) { return -9*u*u+6*u;}		 // -9u2 +6u

	var BaseBezier3der=function(u) { return 3*u*u; }			// 3u2

	// 4 Puntos de control P0, P1, P2 y P3
	// Modificarlos para obtener otra curva

	//var P0x=100; var P0y=550;
	//var P1x=200; var P1y=100;
	//var P2x=800; var P2y=100;
	//var P3x=900; var P3y=550;


