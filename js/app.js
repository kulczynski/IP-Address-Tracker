window.addEventListener('DOMContentLoaded', () => {

    const ipInput = document.querySelector('.ip_input');
    const ipSubmit = document.querySelector('.ip_submit');
    const mapDiv = document.querySelector('.map');

    const ipAddress = document.querySelector('.ipAddress')
    const location = document.querySelector('.location')
    const timezone = document.querySelector('.timezone')
    const isp = document.querySelector('.isp')


    const api_key = "at_3kovHtBCiPycsKh5VJ4t7GeaSmn5U";

    ipSubmit.addEventListener('click', (e) => {
        e.preventDefault();
        let ip = "";
        let lat = 34.0614;
        let lng = 34.0614;
        ipInput.value == "" ? ip = "8.8.8.8" : ip = ipInput.value;

        ipAddress.innerHTML = "loading...";
        location.innerHTML = "loading...";
        timezone.innerHTML = "loading...";
        isp.innerHTML = "loading...";

        fetch(`http://geo.ipify.org/api/v1?callback=jQuery32108269691926562777_1599684328993&apiKey=${api_key}&ipAddress=${ip}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                ipAddress.innerHTML = data.ip;
                location.innerHTML = `${data.location.region}, ${data.location.city}`;
                timezone.innerHTML = data.location.timezone;
                isp.innerHTML = data.isp;
                lat = Number(data.location.lat);
                lng = Number(data.location.lng);
                refreshMapDiv();
                drawMap(lat, lng);
            })
            .catch(err => console.log(err))


    })

    // creating map in #mapid div
    function drawMap(lng = 51.505, lat = -0.09) {

        const mymap = L.map('mapid').setView([lng, lat], 13);

        const myIcon = L.icon({
            iconUrl: './images/icon-location.svg',

            iconSize: [46, 56], // size of the icon            
            iconAnchor: [23, 0], // point of the icon which will correspond to marker's location
        });

        L.marker([lng, lat], { icon: myIcon }).addTo(mymap);
        L.tileLayer(`http://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}`, {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1IjoidDBteSIsImEiOiJja2V2c2U2dDYwNHY4MnltZzdyeTg2MWhvIn0.RBfIhAYbId5mytJbgIVctg'
        }).addTo(mymap);
    }
    // drawing start map
    drawMap();
    // refreshing map
    function refreshMapDiv() {
        mapDiv.innerHTML = "<div id='mapid'></div>"
    }


});