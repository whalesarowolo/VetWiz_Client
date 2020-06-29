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

// tomatoes GAP functioanlity 

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
      let url = 'https://farm-aid-backend.herokuapp.com/api/crops/input/5ef9bb54c50f0e0017df379f'
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

//   hausa
//  input details ends
$("#tomatoes_input_button_hausa").on('click', function(e) {
    let seedSelection = $('#to_ssd_hausa').val();
    let seedSource = $('#to_ss_hausa').val();
    let seedFertilizer = $('#to_ssf_hausa').val();
    let seedHerbicide = $('#to_sh_hausa').val();
    let seedProtection = $('#to_cpd_hausa').val();
    console.log(seedProtection)
    //  validate empty input boxes
    if(seedSource != null || seedFertilizer != null ||  seedHerbicide != null || seedProtection != null || seedSelection !== null) {
      let url = 'https://farm-aid-backend.herokuapp.com/api/crops/hausa_input/5ef9bb54c50f0e0017df379f'
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
      let url = 'https://farm-aid-backend.herokuapp.com/api/crops/postHarvest/5ef9bb54c50f0e0017df379f'
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
$("#tomatoes_post_harvest_hausa").on('click', function(e) {
    let threshing = $('#to_td_hausa').val();
    let drying = $('#to_db_hausa').val();
    let packaging = $('#to_pds_hausa').val();
    let storage = $('#to_sds_hausa').val();
    //  validate empty input boxes
    if(threshing != null || drying != null ||  packaging != null || storage != null) {
      let url = 'https://farm-aid-backend.herokuapp.com/api/crops/hausa_postHarvest/5ef9bb54c50f0e0017df379f'
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

// aggregation 
  $("#tomatoes_agg").on('click', function(e) {
    let labelling = $('#to_ld').val();
    let pricing = $('#to_pdss').val();
    let lineage = $('#to_mld').val();
    let offTaker = $('#to_otd').val();
    //  validate empty input boxes
    if(labelling != null || pricing != null ||  lineage != null || offTaker != null) {
      let url = 'https://farm-aid-backend.herokuapp.com/api/crops/aggregation/5ef9bb54c50f0e0017df379f'
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
  $("#tomatoes_agg_hausa").on('click', function(e) {
    let labelling = $('#to_ld_hausa').val();
    let pricing = $('#to_pdss_hausa').val();
    let lineage = $('#to_mld_hausa').val();
    let offTaker = $('#to_otd_hausa').val();
    //  validate empty input boxes
    if(labelling != null || pricing != null ||  lineage != null || offTaker != null) {
      let url = 'https://farm-aid-backend.herokuapp.com/api/crops/hausa_aggregation/5ef9bb54c50f0e0017df379f'
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
      let url = 'https://farm-aid-backend.herokuapp.com/api/crops/weather/5ef9bb54c50f0e0017df379f'
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
  $("#tomaotes_wc_hausa").on('click', function(e) {
    let temp = $('#to_tds_hausa').val();
    let rainfall = $('#to_rd_hausa').val();
    let humility = $('#to_hds_hausa').val();
    //  validate empty input boxes
    if(temp != null || rainfall != null ||  humility != null) {
      let url = 'https://farm-aid-backend.herokuapp.com/api/crops/hausa_weather/5ef9bb54c50f0e0017df379f'
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
      let url = 'https://farm-aid-backend.herokuapp.com/api/crops/production/5ef9bb54c50f0e0017df379f'
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
$("#tomatoes_prod").on('click', function(e) {
    let landSelection = $('#to_ls_hausa').val();
    let landPreparation = $('#to_lp_hausa').val();
    let plantTech = $('#to_pt_hausa').val();
    let harvest = $('#to_hd_hausa').val();
    let mech = $('#to_md_hausa').val();
    //  validate empty input boxes
    if(landSelection != null || landPreparation != null || plantTech != null || harvest != null || mech != null) {
      let url = 'https://farm-aid-backend.herokuapp.com/api/crops/hausa_production/5ef9bb54c50f0e0017df379f'
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

  $("#tomatoes_Mgt").on('click', function(e) {
    let weed = $('#to_wcd').val();
    let fertilizer = $('#to_fad').val();
    let cpp = $('#to_cppd').val();
    let pestDisease = $('#to_pdcd').val();
    //  validate empty input boxes
    if(weed != null || fertilizer != null ||  cpp != null || pestDisease != null) {
      let url = 'https://farm-aid-backend.herokuapp.com/api/crops/cropMag/5ef9bb54c50f0e0017df379f'
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
  $("#tomatoes_Mgt_hausa").on('click', function(e) {
    let weed = $('#to_wcd_hausa').val();
    let fertilizer = $('#to_fad_hausa').val();
    let cpp = $('#to_cppd_hausa').val();
    let pestDisease = $('#to_pdcd_hausa').val();
    //  validate empty input boxes
    if(weed != null || fertilizer != null ||  cpp != null || pestDisease != null) {
      let url = 'https://farm-aid-backend.herokuapp.com/api/crops/hausa_cropMag/5ef9bb54c50f0e0017df379f'
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

// tomatoes GAP functioanlity  ends