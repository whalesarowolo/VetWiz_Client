
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

//  aggrgation details ends here


  // input details ends here



  //  rice crop javascript functions

// groundnut crop management details
$("#groundnut_Mgt").on('click', function(e) {
  let weed = $('#groundnut_wcd').val();
  let fertilizer = $('#groundnut_fad').val();
  let cpp = $('#groundnut_cppd').val();
  let pestDisease = $('#groundnut_pdcd').val();
  //  validate empty input boxes
  if(weed != null || fertilizer != null ||  cpp != null || pestDisease != null) {
    let url = 'https://farm-aid-backend.herokuapp.com/api/crop/cropMag/5e65f01f2292e400173b6dab'
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
    let url = 'https://farm-aid-backend.herokuapp.com/api/crop/production/5e65f01f2292e400173b6dab'
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
    let url = 'https://farm-aid-backend.herokuapp.com/api/crop/weather/5e65f01f2292e400173b6dab'
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
    let url = 'https://farm-aid-backend.herokuapp.com/api/crop/aggregation/5e65f01f2292e400173b6dab'
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


//  Sorghum details input
$("#sorghum_input_button").on('click', function(e) {
  let seedSelection = $('#sorghum_ssd').val();
  let seedSource = $('#sorghum_ss').val();
  let seedFertilizer = $('#sorghum_ssf').val();
  let seedHerbicide = $('#sorghum_sh').val();
  let seedProtection = $('#sorghum_cpd').val();
  //  validate empty input boxes
  if(seedSource != null || seedFertilizer != null ||  seedHerbicide != null || seedProtection != null || seedSelection !== null) {
    let url = 'https://farm-aid-backend.herokuapp.com/api/crop/input/5e66044d2ac52800173cfe52'
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

//  post harvest details for sorghum
$("#sorghum_post_harvest").on('click', function(e) {
  let threshing = $('#sorghum_td').val();
  let drying = $('#sorghum_db').val();
  let packaging = $('#sorghum_pds').val();
  let storage = $('#sorghum_sds').val();
  //  validate empty input boxes
  if(threshing != null || drying != null ||  packaging != null || storage != null) {
    let url = 'https://farm-aid-backend.herokuapp.com/api/crop/postHarvest/5e66044d2ac52800173cfe52'
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

// sorghum crop management details
$("#sorghum_Mgt").on('click', function(e) {
  let weed = $('#sorghum_wcd').val();
  let fertilizer = $('#sorghum_fad').val();
  let cpp = $('#sorghum_cppd').val();
  let pestDisease = $('#sorghum_pdcd').val();
  //  validate empty input boxes
  if(weed != null || fertilizer != null ||  cpp != null || pestDisease != null) {
    let url = 'https://farm-aid-backend.herokuapp.com/api/crop/cropMag/5e66044d2ac52800173cfe52'
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
$("#sorgnum_prod").on('click', function(e) {
  let landSelection = $('#sorgnum_ls').val();
  let landPreparation = $('#sorgnum_lp').val();
  let plantTech = $('#sorgnum_pt').val();
  let harvest = $('#sorgnum_hd').val();
  let mech = $('#sorgnum_md').val();
  //  validate empty input boxes
  if(landSelection != null || landPreparation != null || plantTech != null || harvest != null || mech != null) {
    let url = 'https://farm-aid-backend.herokuapp.com/api/crop/production/5e66044d2ac52800173cfe52'
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
$("#sorghum_wc_detail").on('click', function(e) {
  let temp = $('#sorghum_tds').val();
  let rainfall = $('#sorghum_rd').val();
  let humility = $('#sorghum_hds').val();
  //  validate empty input boxes
  if(temp != null || rainfall != null ||  humility != null) {
    let url = 'https://farm-aid-backend.herokuapp.com/api/crop/weather/5e66044d2ac52800173cfe52'
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
$("#sorghum_agg").on('click', function(e) {
  let labelling = $('#sorghum_ld').val();
  let pricing = $('#sorghum_pdss').val();
  let lineage = $('#sorghum_mld').val();
  let offTaker = $('#sorghum_otd').val();
  //  validate empty input boxes
  if(labelling != null || pricing != null ||  lineage != null || offTaker != null) {
    let url = 'https://farm-aid-backend.herokuapp.com/api/crop/aggregation/5e66044d2ac52800173cfe52'
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
