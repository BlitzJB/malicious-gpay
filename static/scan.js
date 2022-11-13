const video = document.querySelector("#video");

function mountVideoStream() {
    if (!navigator.mediaDevices.getUserMedia) return

    navigator.mediaDevices.getUserMedia({ video: {facingMode: 'environment'} }).then((stream) => {
        video.srcObject = stream;
    })
}

mountVideoStream()

document.querySelector('.scan__header').addEventListener("click", () => {
    window.location.href = "/enter_amount?" + window.location.href.split('?')[1]
});

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded');
    if ('serviceWorker' in navigator) {
        console.log('CLIENT: service worker registration in progress.');
        navigator.serviceWorker.register('../sw.js', {
            scope: '.'
        })
            .then(function(registration) {
                console.log('Service Worker Registered');
            })
            .catch(function(err) {
                console.log('Service Worker Failed', err);
            });
    } else {
        console.log('CLIENT: service worker is not supported.');
    }
});