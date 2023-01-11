
//previnir que nosso formulario seja enviado, pois enviado ele recarregará a pagina
document.querySelector('.busca').addEventListener('submit', async (event)=>{
    event.preventDefault()

    let input = document.querySelector('#procurar').value

    if  (input !== ''){
        showWarning('carregando...')

        //url chamando a nossa api usando encodeURI pra mandar nosso input corretamente
       let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=32a97795c2211cf4b502bd9888eeb55d&units=metric&lang=pt_br`
    
       //async e await pra rodar nossa funçao somente quando o resultado da url retornar
       let results = await fetch(url)
       let json = await results.json()


       //a localizaçao encontrada retorna cod 200, caso nao tenha sido 200 a loc nao foi encontrada
       if(json.cod === 200){
        showinfo({
            name: json.name,
            country: json.sys.country,
            temp: json.main.temp,
            tempicon: json.weather[0].icon,
            windspeed: json.wind.speed,
            windangle: json.wind.deg,
       })

       }else{
        showWarning("nao encontramos essa localização")
       }

    }
})


//func pra mostrar as informaçoes
function showinfo(json){
    showWarning('');

    document.querySelector('.resultado').style.display='block';

    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;

    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`;

    document.querySelector('.ventoInfo').innerHTML = `${json.windspeed} <span>km/h</span>`;

    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempicon}@2x.png`)

    document.querySelector('.ventoPonto').style.transform =`rotate(${json.windangle}deg)`

    if(json.temp > 20){
        document.body.style.background = '#bbc52a'
    }else if(json.temp > 15){
        document.body.style.background = '#b2d2ef'
    }else
    document.body.style.background = '#1b0d41'
    
}


//func pra incluir a mensagem no VW
function showWarning(msg){
    document.querySelector(".aviso").innerHTML = msg;
}