import { Component, OnInit } from '@angular/core';
import {interval, Subscription} from "rxjs";
import * as L from 'leaflet';
import {FoodserviceService} from "../foodservice.service";

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit {
  lat: number = 0;
  lon: number = 0;
  map!: L.Map; // Explicitly typed
  markerLokasi!: L.Marker; // Explicitly typed
  timerSubscription: Subscription|undefined;
  isInit=false

  markerTeman:any;
  lat2=0.0
  lon2=0.0


  constructor(private foodservice: FoodserviceService)
  {

  }

  ngOnInit() {
    this.getCoordinates();
  }

  getCoordinates() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.lat = position.coords.latitude;
          this.lon = position.coords.longitude;
          this.updatePosition()
          if (!this.isInit) {
            this.initializeMap()
            this.isInit = true
            this.startTimer()
          }
          else {
            this.moving()
          }

        },
        (error) => {
          console.error('Error getting location', error);
        }
      );
    } else {
      console.error('Geolocation is not supported in this browser.');
    }
  }
  updatePosition(){
    this.foodservice.InsertPosition(this.lat,this.lon).subscribe((response: any) => {});
  }
  startTimer(){
    this.timerSubscription=interval(1000).subscribe(()=>{
      this.getCoordinates()
    });
  }

  initializeMap() {
    // Create a map centered at the user's location
    this.map = L.map('map').setView([this.lat, this.lon], 13);

    // Add a Google Maps street tile layer
    const googleStreets = L.tileLayer(
      'http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
      {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      }
    );

    // Custom marker icon
    var markerIcon = L.icon({
      iconUrl: 'https://ubaya.xyz/hybrid/miftah/map-marker.png',
      iconSize: [50, 50],
      iconAnchor: [25, 50], // Anchor at the base of the icon
    });

    // Add marker to map
    this.markerLokasi = L.marker([this.lat, this.lon], { icon: markerIcon });
    this.markerLokasi.addTo(this.map);

    this.markerTeman=L.marker([this.lat2, this.lon2], {icon: markerIcon})
    this.markerTeman.addTo(this.map);


    // Add tile layer to map
    googleStreets.addTo(this.map);
  }
  moving() {
    this.markerLokasi.setLatLng([this.lat, this.lon])
    // this.map.flyTo([this.lat, this.lon],13);
    this.foodservice.position_xy().subscribe((data) => {
        this.markerTeman.setLatLng([data.lat, data.lng])
      }
    );
  }


}
