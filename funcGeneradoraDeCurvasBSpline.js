	
	// Funcion generadora de curvas BSpline en 2D
	
	

	var CurvaBSpline=function (P0,P1,P2,P3, u){

		var punto=new Object();

		punto.x=Base0(u)*P0.x+Base1(u)*P1.x+Base2(u)*P2.x+Base3(u)*P3.x;
		punto.y=Base0(u)*P0.y+Base1(u)*P1.y+Base2(u)*P2.y+Base3(u)*P3.y;

		return punto;
	}

	var CurvaBSplineDerivadaPrimera=function (P0,P1,P2,P3,u){

		var punto=new Object();

		punto.x=Base0der(u)*P0.x+Base1der(u)*P1.x+Base2der(u)*P2.x+Base3der(u)*P3.x;
		punto.y=Base0der(u)*P0.y+Base1der(u)*P1.y+Base2der(u)*P2.y+Base3der(u)*P3.y;

		return punto;
	}
	
	//ESTA ES LA FUNCION CLAVE
	
	function obtenerArrayPuntosCurvaBSplineGr3(p0,p1,p2,p3, cantPuntos)		//Devuelve array {x1,y1,x2,y2,...} de cantPuntos*2 elem con posicion en 2D de los pts de la curva
	{
			var currentU=0;
			puntosCurva = [];
			
			for (var i =0;i<cantPuntos;i++) {
			
			currentU = i/(cantPuntos-1);
			
			puntoActual = CurvaBSpline(p0,p1,p2,p3, currentU);
			
			puntosCurva.push(puntoActual.x);
			puntosCurva.push(puntoActual.y);
			}
			
			return puntosCurva;

	}
	

	function obtenerArrayPuntosDerivadaCurvaBSplineGr3(p0,p1,p2,p3, cantPuntos)		//Devuelve array {x1,y1,x2,y2,...} de cantPuntos*2 elem con posicion en 2D de los pts de la curva
	{
			var currentU=0;
			puntosCurva = [];
			
			for (var i =0;i<cantPuntos;i++) {
			
			currentU = i/(cantPuntos-1);
			
			puntoActual = CurvaBSplineDerivadaPrimera(p0,p1,p2,p3, currentU);
			
			puntosCurva.push(puntoActual.x);
			puntosCurva.push(puntoActual.y);
			}
			
			return puntosCurva;

	}
	

var Base0=function(u) { return (1-u)*(1-u)*(1-u)*1/6;}

var Base1=function(u) { return (4-6*u*u+3*u*u*u)*1/6; }

var Base2=function(u) { return (1+3*u+3*u*u-3*u*u*u)*1/6}

var Base3=function(u) { return (u*u*u)*1/6; }



	var Base0der=function(u) { return -3*(1-u)*(1-u)*1/6;} //	-(1-u)2*1/2

	var Base1der=function(u) { return -2*u + u*u*3/2; }  //	

	var Base2der=function(u) { return 1/2 + u -u*u*3/2;}		 // 

	var Base3der=function(u) { return u*u*1/2; }			// 

	// 4 Puntos de control P0, P1, P2 y P3
	// Modificarlos para obtener otra curva

	//var P0x=100; var P0y=550;
	//var P1x=200; var P1y=100;
	//var P2x=800; var P2y=100;
	//var P3x=900; var P3y=550;

