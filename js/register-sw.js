// Chequeo si el browser soporta Service Worker
if ('serviceWorker' in navigator){
    navigator.serviceWorker.register("../sw.js")
    .then((message)=>{
        console.log('Abri la cerveza que el SW esta andando!');
    });
} else {
    console.log('Service worker no es soportado, pero saca la cerveza del freezer!');
}