/*jshint esversion: 6 */
console.log('Service Worker: Registered');

const nameOfCache = 'restaurant-cache-1';

//files that are going to be cached
const cacheFiles = [
    '/',
    '/index.html',
    '/restaurant.html',
    '/css/styles.css',
    '/js/dbhelper.js',
    '/js/main.js',
    '/js/restaurant_info.js',
    '/data/restaurants.json',    
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg'
];

//install service worker, add cacheFiles to cache
self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open(nameOfCache).then(function(cache){
            return cache.addAll(cacheFiles);
        }).catch(error => {
            console.log(error);
        })

    );
    
});

//Activate service worker, deletes old cache name and create new one
self.addEventListener('activate', function(event){
    event.waitUntil(
        caches.keys().then(function(cacheNames){
            return Promise.all(
                cacheNames.filter(function (cacheName){
                    return cacheName.startsWith('restaurant-') &&
                    cacheName != nameOfCache;
                }).map(function(cacheName){
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

self.addEventListener('fetch', function(event){
    event.respondWith(
        caches.match(event.request).then(function(response){
            return response || fetch(event.request);
        })
    );
});