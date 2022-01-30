function loadData(url) {
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.responseType = "json";
        xhr.send();
        xhr.onload = function() {
            resolve(xhr.response);
        };    
        xhr.onerror = function() {
            reject();
        }
    });
}

let map, infoWindow, clusterMarkers = [];
  
function initMap() {
    let markerImageSize = 500,  // Tamanho da imagem nativa
        markerImage = new google.maps.Size(markerImageSize, markerImageSize);
 
    let centerMap = {lat: -14, lng: -18};
    let mapOptions = {
        center: centerMap,
        scrollwheel: true, //proibição de ampliação
        zoom: 3,
        minZoom: 2,
        fullscreenControl: true
    };
  
    map = new google.maps.Map(document.getElementById("map"), mapOptions);
  
    // Cria um objeto de janela de informações e o coloca na variável infoWindow
     // Como cada janela de informações tem seu próprio conteúdo, criamos um objeto vazio sem passar o parâmetro content para ele
    infoWindow = new google.maps.InfoWindow();
  
    // Acompanha o clique em qualquer lugar no mapa
    google.maps.event.addListener(map, "click", function() {
        // infoWindow.close - fecha a janela de informações..
        infoWindow.close();
    });
  
    loadData('js/data.json').then(    
        // Percorre todas as coordenadas armazenadas em markersData
       function(markersData) {
        for (var i = 0; i < markersData.length; i++){  

            let latLng = new google.maps.LatLng(markersData[i].lat, markersData[i].lng);
            let title = markersData[i].title;
            let name = markersData[i].name;
            let fullText = markersData[i].fullText;
            let lang = markersData[i].lang;
            // let icon = {
            //             url: 'img/cohort/' + markersData[i].cohort + '.png',       
            //             scaledSize: markerImage
            //             }; 
            let img = markersData[i].img;
            let cohort = markersData[i].cohort;
            // Adiciona um marcador com uma janela de informações
             // addMarker(latLng, title, name, fullText, icon, cohort, img, lang);
            addMarker(latLng, title, name, fullText, cohort, img, lang); 
        }
        // Se você comentar markerCluster - os clusters desaparecerão
            markerCluster = new MarkerClusterer(map, clusterMarkers,
            {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
    }, function() {
        // Esta função será acionada se houver um erro durante loadData()
    });

    // Muda o estilo do mapa
    let styles = [
        {
            stylers: [
                { hue: "" },
                { saturation: -30 }
            ]
        },{
            featureType: "road",
            elementType: "geometry",
            stylers: [
                { lightness: 100 },
                { visibility: "simplified" }
            ]
        },{
            featureType: "road",
            elementType: "labels",
            stylers: [
                { visibility: "off" }
            ]
        }
    ];
    map.setOptions({styles: styles});

    // img na sua pasta
    // var markerCluster = new MarkerClusterer(map, clusterMarkers, {imagePath: 'img/m'});  
}
// Função para adicionar marcador com janela de informações
// function addMarker(latLng, title, name, fullText, icon, cohort, img, lang) {   
function addMarker(latLng, title, name, fullText, cohort, img, lang) {   
    let markers = new google.maps.Marker({
        position: latLng,
        map: map,
        title: title,
        // icon: icon
    });       

    // Permanece até remover as informações sobre o idioma  
    (lang == undefined) ? lang = "" : lang;
       
    // Faz um loop pela função, adiciona cada marcador na clusterMarkers
    let test = clusterMarkers.push(markers);
    // Acompanhando o clique em nosso marcador
    google.maps.event.addListener(markers, "click", function() {
  
        // contentString é uma variável que armazena o conteúdo da janela de informações.
        let contentString = '<div class="campersImg">' +
                            '<img src="'+ img + '" class="avatar">' +
                            // '<img src="img/' + cohort + '".png\" class=\"cohort">' +
                            // '<img src="img/cohort/' + cohort + '.png" class="cohort">' +
                             '<h3>' + name + '</h3>' +
                            '<p>' + fullText + '</p>' +
                            '<p class="lang">' + lang + '</p>' ;
         
        // Muda o conteúdo da janela de informações
        infoWindow.setContent(contentString);
  
        // Mostra a janela de informações
        infoWindow.open(map, markers);  
    });    
}
// esse código faz a pagina iniciar no footer
window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: "smooth" });

// Projeto futuro de implementação de Login 
		// $('#login-button').click(function(){
			//document.location.href = "https://dev-node-map.vercel.app/login";
		// });

//Projeto futuro de implementação idiomas
const ru = '<i class="em em-ru"></i> ';
const en = '<i class="em em-us"></i> ';
const de = '<i class="em em-de"></i> ';
const br = '<i class="em em-br"></i> ';


