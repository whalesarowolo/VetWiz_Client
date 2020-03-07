
$(document).ready(function () {
    $('textarea').on("propertychange keyup input paste",

    function () {
        var limit = $(this).data("limit");
        var remainingChars = limit - $(this).val().length;
        if (remainingChars <= 0) {
            $(this).val($(this).val().substring(0, limit));
        }
        $(this).next('span').text(remainingChars<=0?0 + " Character":remainingChars + " Characters Remaining");
    });
});

//  input details ends
$("#tomatoes_input_button").on('click', function(e) {
    let seedSelection = $('#to_ssd').val();
    let seedSource = $('#to_ss').val();
    let seedFertilizer = $('#to_ssf').val();
    let seedHerbicide = $('#to_sh').val();
    let seedProtection = $('#to_cpd').val();
    console.log(seedProtection)
    //  validate empty input boxes
    if(seedSource != null || seedFertilizer != null ||  seedHerbicide != null || seedProtection != null || seedSelection !== null) {
      let url = 'https://farm-aid-backend.herokuapp.com/api/crop/input/5e2afc0c5add721b548632c8'
      let token = localStorage.getItem('access_token');
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', token);
      let input = {
        "seedSelection": seedSource,
        "seedSource": seedSource,
        "fertilizer": seedFertilizer,
        "herbicides": seedHerbicide,
        "cropProtectionProduct": seedProtection
      }
      fetch(url, {
        method: "POST",
        body: JSON.stringify(input),
        headers
      }).then(async (res) => { 
        let resp = await res.json();
        console.log(resp)
      })
    }
  })

//  post harvest details ends
$("#tomatoes_post_harvest").on('click', function(e) {
    let threshing = $('#to_td').val();
    let drying = $('#to_db').val();
    let packaging = $('#to_pds').val();
    let storage = $('#to_sds').val();
    //  validate empty input boxes
    if(threshing != null || drying != null ||  packaging != null || storage != null) {
      let url = 'https://farm-aid-backend.herokuapp.com/api/crop/postHarvest/5e2afc0c5add721b548632c8'
      let token = localStorage.getItem('access_token');
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', token);
      let postHarvest = {
        threshing: threshing,
        drying: drying,
        packaging: packaging,
        storage: storage,
      }
      fetch(url, {
        method: "POST",
        body: JSON.stringify(postHarvest),
        headers
      }).then(async (res) => { 
        let resp = await res.json();
        console.log(resp)
      })
    }
  })

//  aggrgation details ends here
$("#tomatoes_agg").on('click', function(e) {
    let labelling = $('#to_ld').val();
    let pricing = $('#to_pdss').val();
    let lineage = $('#to_mld').val();
    let offTaker = $('#to_otd').val();
    //  validate empty input boxes
    if(labelling != null || pricing != null ||  lineage != null || offTaker != null) {
      let url = 'https://farm-aid-backend.herokuapp.com/api/crop/aggregation/5e2afc0c5add721b548632c8'
      let token = localStorage.getItem('access_token');
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', token);
      let aggregation = {
        labelling: labelling,
        pricing: pricing,
        market_linage: lineage,
        off_taker: offTaker,
      }
      fetch(url, {
        method: "POST",
        body: JSON.stringify(aggregation),
        headers
      }).then(async (res) => { 
        let resp = await res.json();
        console.log(resp)
      })
    }
  });


//  weather and climate detais
  $("#tomaotes_wc").on('click', function(e) {
    let temp = $('#to_tds').val();
    let rainfall = $('#to_rd').val();
    let humility = $('#to_hds').val();
    //  validate empty input boxes
    if(temp != null || rainfall != null ||  humility != null) {
      let url = 'https://farm-aid-backend.herokuapp.com/api/crop/weather/5e2afc0c5add721b548632c8'
      let token = localStorage.getItem('access_token');
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', token);
      let tempClimate = {
        temperature: temp,
        rainFall: rainfall,
        humility: humility,
      }
      fetch(url, {
        method: "POST",
        body: JSON.stringify(tempClimate),
        headers
      }).then(async (res) => { 
        let resp = await res.json();
        console.log(resp)
      })
    }
  })

//   production details
$("#tomatoes_prod").on('click', function(e) {
    let landSelection = $('#to_ls').val();
    let landPreparation = $('#to_lp').val();
    let plantTech = $('#to_pt').val();
    let harvest = $('#to_hd').val();
    let mech = $('#to_md').val();
    console.log("you click me")
    //  validate empty input boxes
    if(landSelection != null || landPreparation != null || plantTech != null || harvest != null || mech != null) {
      let url = 'https://farm-aid-backend.herokuapp.com/api/crop/production/5e2afc0c5add721b548632c8'
      let token = localStorage.getItem('access_token');
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', token);
      let production = {
        landSelection: landSelection,
        landPreparation: landPreparation,
        plantingTechnique: plantTech,
        harvesting: harvest,
        mechanization: mech
      }
      fetch(url, {
        method: "POST",
        body: JSON.stringify(production),
        headers
      }).then(async (res) => { 
        let resp = await res.json();
        console.log(resp)
      })
    }
  })

  // input details ends here
$("#tomatoes_Mgt").on('click', function(e) {
    let weed = $('#to_wcd').val();
    let fertilizer = $('#to_fad').val();
    let cpp = $('#to_cppd').val();
    let pestDisease = $('#to_pdcd').val();
    //  validate empty input boxes
    if(weed != null || fertilizer != null ||  cpp != null || pestDisease != null) {
      let url = 'https://farm-aid-backend.herokuapp.com/api/crop/cropMag/5e2afc0c5add721b548632c8'
      let token = localStorage.getItem('access_token');
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', token);
      let cropMag = {
        weedControl: weed,
        fertilizerApplication: fertilizer,
        cpp: cpp,
        pest_disease_control: pestDisease,
      }
      fetch(url, {
        method: "POST",
        body: JSON.stringify(cropMag),
        headers
      }).then(async (res) => { 
        let resp = await res.json();
        console.log(resp)
      })
    }
  })



  //  rice crop javascript functions

  //  input details for rice
$("#rice_input_button").on('click', function(e) {
  let seedSelection = $('#rice_ssd').val();
  let seedSource = $('#rice_ss').val();
  let seedFertilizer = $('#rice_ssf').val();
  let seedHerbicide = $('#rice_sh').val();
  let seedProtection = $('#rice_cpd').val();
  //  validate empty input boxes
  if(seedSource != null || seedFertilizer != null ||  seedHerbicide != null || seedProtection != null || seedSelection !== null) {
    let url = 'https://farm-aid-backend.herokuapp.com/api/crop/input/5e2afc0c5add721b548632c8'
    let token = localStorage.getItem('access_token');
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', token);
    let input = {
      "seedSelection": seedSource,
      "seedSource": seedSource,
      "fertilizer": seedFertilizer,
      "herbicides": seedHerbicide,
      "cropProtectionProduct": seedProtection
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify(input),
      headers
    }).then(async (res) => { 
      let resp = await res.json();
      console.log(resp)
    })
  }
})

//  post harvest details for rice
$("#rice_post_harvest").on('click', function(e) {
  let threshing = $('#rice_td').val();
  let drying = $('#rice_db').val();
  let packaging = $('#rice_pds').val();
  let storage = $('#rice_sds').val();
  //  validate empty input boxes
  if(threshing != null || drying != null ||  packaging != null || storage != null) {
    let url = 'https://farm-aid-backend.herokuapp.com/api/crop/postHarvest/5e2afc0c5add721b548632c8'
    let token = localStorage.getItem('access_token');
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', token);
    let postHarvest = {
      threshing: threshing,
      drying: drying,
      packaging: packaging,
      storage: storage,
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify(postHarvest),
      headers
    }).then(async (res) => { 
      let resp = await res.json();
      console.log(resp)
    })
  }
})

// rice crop management details
$("#rice_Mgt").on('click', function(e) {
  let weed = $('#rice_wcd').val();
  let fertilizer = $('#rice_fad').val();
  let cpp = $('#rice_cppd').val();
  let pestDisease = $('#rice_pdcd').val();
  //  validate empty input boxes
  if(weed != null || fertilizer != null ||  cpp != null || pestDisease != null) {
    let url = 'https://farm-aid-backend.herokuapp.com/api/crop/cropMag/5e2afc0c5add721b548632c8'
    let token = localStorage.getItem('access_token');
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', token);
    let cropMag = {
      weedControl: weed,
      fertilizerApplication: fertilizer,
      cpp: cpp,
      pest_disease_control: pestDisease,
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify(cropMag),
      headers
    }).then(async (res) => { 
      let resp = await res.json();
      console.log(resp)
    })
  }
})

//   production details
$("#rice_prod").on('click', function(e) {
  let landSelection = $('#rice_ls').val();
  let landPreparation = $('#rice_lp').val();
  let plantTech = $('#rice_pt').val();
  let harvest = $('#rice_hd').val();
  let mech = $('#rice_md').val();
  //  validate empty input boxes
  if(landSelection != null || landPreparation != null || plantTech != null || harvest != null || mech != null) {
    let url = 'https://farm-aid-backend.herokuapp.com/api/crop/production/5e2afc0c5add721b548632c8'
    let token = localStorage.getItem('access_token');
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', token);
    let production = {
      landSelection: landSelection,
      landPreparation: landPreparation,
      plantingTechnique: plantTech,
      harvesting: harvest,
      mechanization: mech
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify(production),
      headers
    }).then(async (res) => { 
      let resp = await res.json();
      console.log(resp)
    })
  }
})

//  weather and climate detais
$("#rice_wc_detail").on('click', function(e) {
  let temp = $('#rice_tds').val();
  let rainfall = $('#rice_rd').val();
  let humility = $('#rice_hds').val();
  //  validate empty input boxes
  if(temp != null || rainfall != null ||  humility != null) {
    let url = 'https://farm-aid-backend.herokuapp.com/api/crop/weather/5e2afc0c5add721b548632c8'
    let token = localStorage.getItem('access_token');
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', token);
    let tempClimate = {
      temperature: temp,
      rainFall: rainfall,
      humility: humility,
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify(tempClimate),
      headers
    }).then(async (res) => { 
      let resp = await res.json();
      console.log(resp)
    })
  }
})

//  aggrgation details ends here
$("#rice_agg").on('click', function(e) {
  let labelling = $('#rice_ld').val();
  let pricing = $('#rice_pdss').val();
  let lineage = $('#rice_mld').val();
  let offTaker = $('#rice_otd').val();
  //  validate empty input boxes
  if(labelling != null || pricing != null ||  lineage != null || offTaker != null) {
    let url = 'https://farm-aid-backend.herokuapp.com/api/crop/aggregation/5e2afc0c5add721b548632c8'
    let token = localStorage.getItem('access_token');
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', token);
    let aggregation = {
      labelling: labelling,
      pricing: pricing,
      market_linage: lineage,
      off_taker: offTaker,
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify(aggregation),
      headers
    }).then(async (res) => { 
      let resp = await res.json();
      console.log(resp)
    })
  }
});


//  Groundnut details input
$("#groundnut_input_button").on('click', function(e) {
  let seedSelection = $('#groundnut_ssd').val();
  let seedSource = $('#groundnut_ss').val();
  let seedFertilizer = $('#groundnut_ssf').val();
  let seedHerbicide = $('#groundnut_sh').val();
  let seedProtection = $('#groundnut_cpd').val();
  //  validate empty input boxes
  if(seedSource != null || seedFertilizer != null ||  seedHerbicide != null || seedProtection != null || seedSelection !== null) {
    let url = 'https://farm-aid-backend.herokuapp.com/api/crop/input/5e2afc0c5add721b548632c8'
    let token = localStorage.getItem('access_token');
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', token);
    let input = {
      "seedSelection": seedSource,
      "seedSource": seedSource,
      "fertilizer": seedFertilizer,
      "herbicides": seedHerbicide,
      "cropProtectionProduct": seedProtection
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify(input),
      headers
    }).then(async (res) => { 
      let resp = await res.json();
      console.log(resp)
    })
  }
})

//  post harvest details for groundnut
$("#groundnut_post_harvest").on('click', function(e) {
  let threshing = $('#groundnut_td').val();
  let drying = $('#groundnut_db').val();
  let packaging = $('#groundnut_pds').val();
  let storage = $('#groundnut_sds').val();
  //  validate empty input boxes
  if(threshing != null || drying != null ||  packaging != null || storage != null) {
    let url = 'https://farm-aid-backend.herokuapp.com/api/crop/postHarvest/5e2afc0c5add721b548632c8'
    let token = localStorage.getItem('access_token');
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', token);
    let postHarvest = {
      threshing: threshing,
      drying: drying,
      packaging: packaging,
      storage: storage,
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify(postHarvest),
      headers
    }).then(async (res) => { 
      let resp = await res.json();
      console.log(resp)
    })
  }
})

// groundnut crop management details
$("#groundnut_Mgt").on('click', function(e) {
  let weed = $('#groundnut_wcd').val();
  let fertilizer = $('#groundnut_fad').val();
  let cpp = $('#groundnut_cppd').val();
  let pestDisease = $('#groundnut_pdcd').val();
  //  validate empty input boxes
  if(weed != null || fertilizer != null ||  cpp != null || pestDisease != null) {
    let url = 'https://farm-aid-backend.herokuapp.com/api/crop/cropMag/5e2afc0c5add721b548632c8'
    let token = localStorage.getItem('access_token');
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', token);
    let cropMag = {
      weedControl: weed,
      fertilizerApplication: fertilizer,
      cpp: cpp,
      pest_disease_control: pestDisease,
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify(cropMag),
      headers
    }).then(async (res) => { 
      let resp = await res.json();
      console.log(resp)
    })
  }
})

//   production details
$("#groundnut_prod").on('click', function(e) {
  let landSelection = $('#groundnut_ls').val();
  let landPreparation = $('#groundnut_lp').val();
  let plantTech = $('#groundnut_pt').val();
  let harvest = $('#groundnut_hd').val();
  let mech = $('#groundnut_md').val();
  //  validate empty input boxes
  if(landSelection != null || landPreparation != null || plantTech != null || harvest != null || mech != null) {
    let url = 'https://farm-aid-backend.herokuapp.com/api/crop/production/5e2afc0c5add721b548632c8'
    let token = localStorage.getItem('access_token');
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', token);
    let production = {
      landSelection: landSelection,
      landPreparation: landPreparation,
      plantingTechnique: plantTech,
      harvesting: harvest,
      mechanization: mech
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify(production),
      headers
    }).then(async (res) => { 
      let resp = await res.json();
      console.log(resp)
    })
  }
})

//  weather and climate detais
$("#groundnut_wc_detail").on('click', function(e) {
  let temp = $('#groundnut_tds').val();
  let rainfall = $('#groundnut_rd').val();
  let humility = $('#groundnut_hds').val();
  //  validate empty input boxes
  if(temp != null || rainfall != null ||  humility != null) {
    let url = 'https://farm-aid-backend.herokuapp.com/api/crop/weather/5e2afc0c5add721b548632c8'
    let token = localStorage.getItem('access_token');
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', token);
    let tempClimate = {
      temperature: temp,
      rainFall: rainfall,
      humility: humility,
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify(tempClimate),
      headers
    }).then(async (res) => { 
      let resp = await res.json();
      console.log(resp)
    })
  }
})

//  aggrgation details ends here
$("#groudnut_agg").on('click', function(e) {
  let labelling = $('#groundnut_ld').val();
  let pricing = $('#groundnut_pdss').val();
  let lineage = $('#groundnut_mld').val();
  let offTaker = $('#groudnut_otd').val();
  //  validate empty input boxes
  if(labelling != null || pricing != null ||  lineage != null || offTaker != null) {
    let url = 'https://farm-aid-backend.herokuapp.com/api/crop/aggregation/5e2afc0c5add721b548632c8'
    let token = localStorage.getItem('access_token');
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', token);
    let aggregation = {
      labelling: labelling,
      pricing: pricing,
      market_linage: lineage,
      off_taker: offTaker,
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify(aggregation),
      headers
    }).then(async (res) => { 
      let resp = await res.json();
      console.log(resp)
    })
  }
});