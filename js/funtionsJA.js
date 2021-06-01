var info;

//Analisis de imagenes  
function imagenes() {
    //Datos
    var urlImage = document.getElementById("UrlImg").value;
    var datos = { url: urlImage };

    //Direccion de la petición( endpoint, punto de acceso )
    var direccion = 'https://serviciovisionnorte.cognitiveservices.azure.com/vision/v3.0/analyze?visualFeatures=Categories,Description,Tags&details=Landmarks&language=ja'

    axios.post(direccion, datos, {
        headers: {
            'Ocp-Apim-Subscription-Key': '9f8839e9bd4e446c8d1bfad49bd6db72',
            'Content-type': 'application/json'
        }
    })//.then( respuesta => console.log(respuesta.data.description.captions[0].text) )
        .then((respuesta) => {
            info = respuesta.data.description.captions[0].text;
            document.getElementById("demo").innerHTML = info;
            transliterar();
        }).catch(error => { console.log(error) })
}


function transliterar() {
    var datos = [{ "Text": info }]
    var direccion = 'https://api.cognitive.microsofttranslator.com/transliterate?api-version=3.0&language=ja&fromScript=Jpan&toScript=Latn';

    axios.post(direccion, datos, {
        headers: {
            'Ocp-Apim-Subscription-Key': '58f9f4075c9c46bca61a78cfc71a45b6',
            'Ocp-Apim-Subscription-Region': 'southcentralus',
            'Content-Type': 'application/json'
        }
    })
        .then((response) => {
            console.log(response.data[0].text);
            var pronun = response.data[0].text;
            document.getElementById("pronuncia").innerHTML = pronun;
        }).catch(error => { console.log(error) });
}
