// Import all JS here
// This file serves as the entry point for our webpack config
var $ = require("jquery");
// require("bootstrap-loader");
require("web3");
require('../node_modules/uport-connect/dist/uport-connect.js');
require('../node_modules/uport/dist/uport.js');
require("bootstrap-loader");

import { Connect, SimpleSigner } from 'uport-connect'

function uportError(msg) {
  $('#uportError').text(msg)
  $('#uportError').removeClass("hidden")
}

const uportConnect = function() {
  if ($(this).hasClass('btn-success')) {
    return false;
  }
  const uport = new Connect('KauriID Proto', {
    clientId: '2onR9ixZ1Mfs5ihpdF7fXf8iHqHmuEvRSBH',
    signer: SimpleSigner('504e290ad142acc555cd919ef201672baeb9cd0886d7962333b57515b43387f1'),
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
    $('#uport-status').text('Connected');
    $('#credential-container').text(JSON.stringify(credentials, null, 2));
    $('#myModal').modal('show');
    // Attest specific credentials
    if (typeof credentials['bundle'] == 'undefined') {
      $('#uportModal').modal('show');
      uport.attestCredentials({
        sub: credentials['address'],
        claim: {
          bundle: {
            'test': 'yes',
            'test2': 'no'
          },
        },
        exp: new Date().getTime() + 30 * 24 * 60 * 60 * 1000, // 30 days from now
      });
      console.log("Attested new credentials");
    }
  },
  function(error) {
    console.log(error);
    $('#debugPanel').text(error);
    $('#uportError').removeClass('hidden');
  })
}

$('#uport-connect').on('click', uportConnect);
