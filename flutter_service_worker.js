'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"version.json": "94116c66301c166ce07030808f94e12b",
"index.html": "367be71474e9f985f10dbbfafd3dfc3a",
"/": "367be71474e9f985f10dbbfafd3dfc3a",
"main.dart.js": "fc6c0b449f3e42b2552f51a0e3207d45",
"flutter.js": "c71a09214cb6f5f8996a531350400a9a",
"favicon.png": "c460c1917a4fcc4a340241b8b394f113",
"icons/Icon-192.png": "86d5b353485ddfb28cbd1e2e42dd93d0",
"icons/Icon-maskable-192.png": "86d5b353485ddfb28cbd1e2e42dd93d0",
"icons/Icon-maskable-512.png": "2feec5e633ee0783f141860fb01d2f47",
"icons/Icon-512.png": "2feec5e633ee0783f141860fb01d2f47",
"manifest.json": "9b41f9ea700e3562cf7b5f53db5e4463",
"assets/images/train%2520tracks.png": "0278b0fdd2d4b9a663d75bae37a94ef4",
"assets/images/paper.jpg": "800cd5711ff05e6d0484aa6c6fa665ac",
"assets/images/bowburn.png": "b0022f24543630c8a1e42ed20255a586",
"assets/images/christchurch%2520drawing.png": "b2ea983466ea4ffb0d8bcac778c50982",
"assets/images/backs2.jpg": "2beeb2a11e4ee8c1d7a109dcf39dfa45",
"assets/images/bridge.jpg": "1643b610914899d56b80193620b734ec",
"assets/images/backs2_extended.jpg": "f1018a095702edc46aceb8f5e3a62215",
"assets/images/backs_extended.jpg": "1c17682c7b0035c45c9cb76b3ed210c6",
"assets/images/cow.png": "aec04f63930c9f826b54056b73ef2266",
"assets/images/bridesmaid%2520leaves%2520(1).png": "19f9af75fbcb19a55c358dd5ac61c651",
"assets/images/cow_icon.png": "871ec06b719bedad3f6f5f0f27b8a305",
"assets/images/hammock.jpg": "b65cac05a36802eabe655f2b922e792c",
"assets/images/backs.jpg": "06660d72c1a12a8acb635be93ab268d2",
"assets/images/cat.png": "a0d204075dd0e1dfa9c473e16448d970",
"assets/images/train%2520tracks%25202.png": "9153e9cea1607a60455c5ab399f90c83",
"assets/images/mountains.png": "faea4da0f90da5ba930455a9b9289b20",
"assets/images/wedding.jpg": "5b3d09bcecee6aa117e2b0d071f8a59a",
"assets/images/bridesmaid%2520leaves.png": "19f9af75fbcb19a55c358dd5ac61c651",
"assets/images/christchurch%2520roads.png": "37bebdcfd54de94683ef92aa4a0f1bcd",
"assets/images/sunset.jpg": "79e0fe55165c05befb798a0e27c462c7",
"assets/AssetManifest.json": "d40c720828e2c02131ca42925fb1e487",
"assets/NOTICES": "3e54a2167de7f93910904746fde1197d",
"assets/FontManifest.json": "f7ae27c1833ef446e6a6599d16f9c989",
"assets/AssetManifest.bin.json": "ed1239ee06dc882f23b74a363b1add29",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "e986ebe42ef785b27164c36a9abc7818",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/AssetManifest.bin": "afba45d48ed8bcfcdf3333c3d683a25b",
"assets/fonts/Caslon540Regular.otf": "5d41a753c94b5933bcfc8caa56dc4757",
"assets/fonts/EBGaramond-Italic-VariableFont_wght.ttf": "63fdbef09d3486493711042a2afc69ec",
"assets/fonts/Caslon540Italic.otf": "04e2117ed80a5ba4a9547cad2f3f7ceb",
"assets/fonts/MaterialIcons-Regular.otf": "0db35ae7a415370b89e807027510caf0",
"assets/fonts/EBGaramond-VariableFont_wght.ttf": "f85880cd4a0a2c60abef38ecc1acbfba",
"canvaskit/skwasm.js": "445e9e400085faead4493be2224d95aa",
"canvaskit/skwasm.js.symbols": "741d50ffba71f89345996b0aa8426af8",
"canvaskit/canvaskit.js.symbols": "38cba9233b92472a36ff011dc21c2c9f",
"canvaskit/skwasm.wasm": "e42815763c5d05bba43f9d0337fa7d84",
"canvaskit/chromium/canvaskit.js.symbols": "4525682ef039faeb11f24f37436dca06",
"canvaskit/chromium/canvaskit.js": "43787ac5098c648979c27c13c6f804c3",
"canvaskit/chromium/canvaskit.wasm": "f5934e694f12929ed56a671617acd254",
"canvaskit/canvaskit.js": "c86fbd9e7b17accae76e5ad116583dc4",
"canvaskit/canvaskit.wasm": "3d2a2d663e8c5111ac61a46367f751ac",
"canvaskit/skwasm.worker.js": "bfb704a6c714a75da9ef320991e88b03"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
