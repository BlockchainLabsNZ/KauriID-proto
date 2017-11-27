// Import all JS here
// This file serves as the entry point for our webpack config
var $ = require("jquery");
// require("bootstrap-loader");
require("web3");
require('../node_modules/uport-connect/dist/uport-connect.js');
require('../node_modules/uport/dist/uport.js');

import { Connect, SimpleSigner } from 'uport-connect'

function uportError(msg) {
  $('#uportError').text(msg)
  $('#uportError').removeClass("hidden")
}

const uportConnect = function() {
  if ($(this).hasClass('btn-success')) {
    return false;
  }
  const uport = new Connect('Lab+ Prototype', {
    clientId: '2p2CiTD7equhDyMEUDAcybGfw1qe1YXMSD1',
    signer: SimpleSigner('24e52aca5a4059eeb9708bbb38c25705e9eb9a405289e649831362ddc92a76e2'),
    network: 'rinkeby'
    //public key 0x040951f3c3f6919b3238768ad12fd24bff02b75d66c42632a377ff7f9553847dc6837e9e09625ad137b5fd6732331cd4ab9a4bd26d929a3e6a8170227975a0cdf8
  })

  // Request credentials to login
  uport.requestCredentials({
    requested: ['name', 'phone', 'country', 'bundle'],
    notifications: true // We want this if we want to recieve credentials
  })
  .then(function(credentials) {
    // Do something
    console.log("Received credentials", credentials);
    // Attest specific credentials
    if (typeof credentials['bundle'] == 'undefined') {
      $('#uportModal').modal('show');
      $('#uportModal').on('click', 'button.save', function() {
        uport.attestCredentials({
          sub: credentials['address'],
          claim: {
            bundle: {
              'test': 'yes',
              'test2': 'no'
            },
          },
          exp: new Date().getTime() + 30 * 24 * 60 * 60 * 1000, // 30 days from now
        })
        console.log("Attested new credentials");
      });
    }
  },
  function(error) {
    console.log(error);
    $('#debugPanel').text(error);
    $('#uportError').removeClass('hidden');
  })
}

$('#uport-connect').on('click', uportConnect);
