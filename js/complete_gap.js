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


// Ricw GAP functioanlity 

  //  input details for rice
  $("#rice_input_button").on('click', function(e) {
    let seedSelection = $('#rice_ssd').val();
    let seedSource = $('#rice_ss').val();
    let seedFertilizer = $('#rice_ssf').val();
    let seedHerbicide = $('#rice_sh').val();
    let seedProtection = $('#rice_cpd').val();
    //  validate empty input boxes
    if(seedSource != null || seedFertilizer != null ||  seedHerbicide != null || seedProtection != null || seedSelection !== null) {
      let url = 'https://farm-aid-backend.herokuapp.com/api/crops/input/5ef9bad1c50f0e0017df379c'
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
  $("#rice_input_button_hausa").on('click', function(e) {
    let seedSelection = $('#rice_ssd_hausa').val();
    let seedSource = $('#rice_ss_hausa').val();
    let seedFertilizer = $('#rice_ssf_hausa').val();
    let seedHerbicide = $('#rice_sh_hausa').val();
    let seedProtection = $('#rice_cpd_hausa').val();
    //  validate empty input boxes
    if(seedSource != null || seedFertilizer != null ||  seedHerbicide != null || seedProtection != null || seedSelection !== null) {
      let url = 'https://farm-aid-backend.herokuapp.com/api/crops/hausa_input/5ef9bad1c50f0e0017df379c'
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
      let url = 'https://farm-aid-backend.herokuapp.com/api/crops/postHarvest/5ef9bad1c50f0e0017df379c'
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
$("#rice_post_harvest_hausa").on('click', function(e) {
    let threshing = $('#rice_td_hausa').val();
    let drying = $('#rice_db_hausa').val();
    let packaging = $('#rice_pds_hausa').val();
    let storage = $('#rice_sds_hausa').val();
    //  validate empty input boxes
    if(threshing != null || drying != null ||  packaging != null || storage != null) {
      let url = 'https://farm-aid-backend.herokuapp.com/api/crops/hausa_postHarvest/5ef9bad1c50f0e0017df379c'
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
    let url = 'https://farm-aid-backend.herokuapp.com/api/crops/cropMag/5ef9bad1c50f0e0017df379c'
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
$("#rice_Mgt_Hausa").on('click', function(e) {
  let weed = $('#rice_wcd_hausa').val();
  let fertilizer = $('#rice_fad_hausa').val();
  let cpp = $('#rice_cppd_hausa').val();
  let pestDisease = $('#rice_pdcd_hausa').val();
  //  validate empty input boxes
  if(weed != null || fertilizer != null ||  cpp != null || pestDisease != null) {
    let url = 'https://farm-aid-backend.herokuapp.com/api/crops/hausa_cropMag/5ef9bad1c50f0e0017df379c'
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
      let url = 'https://farm-aid-backend.herokuapp.com/api/crops/production/5ef9bad1c50f0e0017df379c'
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

  //   production details
$("#rice_prod_hausa").on('click', function(e) {
    let landSelection = $('#rice_ls_hausa').val();
    let landPreparation = $('#rice_lp_hausa').val();
    let plantTech = $('#rice_pt_hausa').val();
    let harvest = $('#rice_hd_hausa').val();
    let mech = $('#rice_md_hausa').val();
    //  validate empty input boxes
    if(landSelection != null || landPreparation != null || plantTech != null || harvest != null || mech != null) {
      let url = 'https://farm-aid-backend.herokuapp.com/api/crops/hausa_production/5ef9bad1c50f0e0017df379c'
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
      let url = 'https://farm-aid-backend.herokuapp.com/api/crops/weather/5ef9bad1c50f0e0017df379c'
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
$("#rice_wc_detail_hausa").on('click', function(e) {
    let temp = $('#rice_tds_hausa').val();
    let rainfall = $('#rice_rd_hausa').val();
    let humility = $('#rice_hds_hausa').val();
    //  validate empty input boxes
    if(temp != null || rainfall != null ||  humility != null) {
      let url = 'https://farm-aid-backend.herokuapp.com/api/crops/hausa_weather/5ef9bad1c50f0e0017df379c'
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
      let url = 'https://farm-aid-backend.herokuapp.com/api/crops/aggregation/5ef9bad1c50f0e0017df379c'
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
$("#rice_agg_hausa").on('click', function(e) {
    let labelling = $('#rice_ld_hausa').val();
    let pricing = $('#rice_pdss_hausa').val();
    let lineage = $('#rice_mld_hausa').val();
    let offTaker = $('#rice_otd_hausa').val();
    //  validate empty input boxes
    if(labelling != null || pricing != null ||  lineage != null || offTaker != null) {
      let url = 'https://farm-aid-backend.herokuapp.com/api/crops/hausa_aggregation/5ef9bad1c50f0e0017df379c'
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

// Ricw GAP functioanlity  ends


// Groundnut GAP functioanlity  

//  Groundnut details input
$("#groundnut_input_button").on('click', function(e) {
    let seedSelection = $('#groundnut_ssd').val();
    let seedSource = $('#groundnut_ss').val();
    let seedFertilizer = $('#groundnut_ssf').val();
    let seedHerbicide = $('#groundnut_sh').val();
    let seedProtection = $('#groundnut_cpd').val();
    //  validate empty input boxes
    if(seedSource != null || seedFertilizer != null ||  seedHerbicide != null || seedProtection != null || seedSelection !== null) {
      let url = 'https://farm-aid-backend.herokuapp.com/api/crops/input/5ef9bb21c50f0e0017df379e'
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
$("#groundnut_input_hausa_button").on('click', function(e) {
    let seedSelection = $('#groundnut_ssd_hausa').val();
    let seedSource = $('#groundnut_ss_hausa').val();
    let seedFertilizer = $('#groundnut_ssf_hausa').val();
    let seedHerbicide = $('#groundnut_sh_hausa').val();
    let seedProtection = $('#groundnut_cpd_hausa').val();
    //  validate empty input boxes
    if(seedSource != null || seedFertilizer != null ||  seedHerbicide != null || seedProtection != null || seedSelection !== null) {
      let url = 'https://farm-aid-backend.herokuapp.com/api/crops/hausa_input/5ef9bb21c50f0e0017df379e'
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
      let url = 'https://farm-aid-backend.herokuapp.com/api/crops/postHarvest/5ef9bb21c50f0e0017df379e'
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
$("#groundnut_post_harvest_hausa").on('click', function(e) {
    let threshing = $('#groundnut_td_hausa').val();
    let drying = $('#groundnut_db_hausa').val();
    let packaging = $('#groundnut_pds_Hausa').val();
    let storage = $('#groundnut_sds_hausa').val();
    //  validate empty input boxes
    if(threshing != null || drying != null ||  packaging != null || storage != null) {
      let url = 'https://farm-aid-backend.herokuapp.com/api/crops/hausa_postHarvest/5ef9bb21c50f0e0017df379e'
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
      let url = 'https://farm-aid-backend.herokuapp.com/api/crops/cropMag/5ef9bb21c50f0e0017df379e'
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
$("#groundnut_Mgt_hausa").on('click', function(e) {
    let weed = $('#groundnut_wcd_hausa').val();
    let fertilizer = $('#groundnut_fad_hausa').val();
    let cpp = $('#groundnut_cppd_hausa').val();
    let pestDisease = $('#groundnut_pdcd_hausa').val();
    //  validate empty input boxes
    if(weed != null || fertilizer != null ||  cpp != null || pestDisease != null) {
      let url = 'https://farm-aid-backend.herokuapp.com/api/crops/hausa_cropMag/5ef9bb21c50f0e0017df379e'
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
      let url = 'https://farm-aid-backend.herokuapp.com/api/crops/production/5ef9bb21c50f0e0017df379e'
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


$("#groundnut_prod_hausa").on('click', function(e) {
    let landSelection = $('#groundnut_ls_hausa').val();
    let landPreparation = $('#groundnut_lp_hausa').val();
    let plantTech = $('#groundnut_pt_hausa').val();
    let harvest = $('#groundnut_hd_hausa').val();
    let mech = $('#groundnut_md_hausa').val();
    //  validate empty input boxes
    if(landSelection != null || landPreparation != null || plantTech != null || harvest != null || mech != null) {
      let url = 'https://farm-aid-backend.herokuapp.com/api/crops/hausa_production/5ef9bb21c50f0e0017df379e'
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
      let url = 'https://farm-aid-backend.herokuapp.com/api/crops/weather/5ef9bb21c50f0e0017df379e'
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
$("#groundnut_wc_detail_hausa").on('click', function(e) {
    let temp = $('#groundnut_tds_hausa').val();
    let rainfall = $('#groundnut_rd_hausa').val();
    let humility = $('#groundnut_hds_hausa').val();
    //  validate empty input boxes
    if(temp != null || rainfall != null ||  humility != null) {
      let url = 'https://farm-aid-backend.herokuapp.com/api/crops/hausa_weather/5ef9bb21c50f0e0017df379e'
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
      let url = 'https://farm-aid-backend.herokuapp.com/api/crops/aggregation/5ef9bb21c50f0e0017df379e'
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
$("#groudnut_agg_hausa").on('click', function(e) {
    let labelling = $('#groundnut_ld_hausa').val();
    let pricing = $('#groundnut_pdss_hausa').val();
    let lineage = $('#groundnut_mld_hausa').val();
    let offTaker = $('#groudnut_otd_hausa').val();
    //  validate empty input boxes
    if(labelling != null || pricing != null ||  lineage != null || offTaker != null) {
      let url = 'https://farm-aid-backend.herokuapp.com/api/crops/hausa_aggregation/5ef9bb21c50f0e0017df379e'
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

// Groundnut GAP functioanlity  ends


// Sorghum GAP functioanlity  

//  Sorghum details input
$("#sorghum_input_button").on('click', function(e) {
    let seedSelection = $('#sorghum_ssd').val();
    let seedSource = $('#sorghum_ss').val();
    let seedFertilizer = $('#sorghum_ssf').val();
    let seedHerbicide = $('#sorghum_sh').val();
    let seedProtection = $('#sorghum_cpd').val();
    //  validate empty input boxes
    if(seedSource != null || seedFertilizer != null ||  seedHerbicide != null || seedProtection != null || seedSelection !== null) {
      let url = 'https://farm-aid-backend.herokuapp.com/api/crops/input/5ef9bb15c50f0e0017df379d'
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
$("#sorghum_input_button_hausa").on('click', function(e) {
    let seedSelection = $('#sorghum_ssd_hausa').val();
    let seedSource = $('#sorghum_ss_hausa').val();
    let seedFertilizer = $('#sorghum_ssf_hausa').val();
    let seedHerbicide = $('#sorghum_sh_hausa').val();
    let seedProtection = $('#sorghum_cpd_hausa').val();
    //  validate empty input boxes
    if(seedSource != null || seedFertilizer != null ||  seedHerbicide != null || seedProtection != null || seedSelection !== null) {
      let url = 'https://farm-aid-backend.herokuapp.com/api/crops/hausa_input/5ef9bb15c50f0e0017df379d'
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
      let url = 'https://farm-aid-backend.herokuapp.com/api/crops/postHarvest/5ef9bb15c50f0e0017df379d'
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


$("#sorghum_post_harvest_hausa").on('click', function(e) {
    let threshing = $('#sorghum_td_hausa').val();
    let drying = $('#sorghum_db_hausa').val();
    let packaging = $('#sorghum_pds_hausa').val();
    let storage = $('#sorghum_sds_hausa').val();
    //  validate empty input boxes
    if(threshing != null || drying != null ||  packaging != null || storage != null) {
      let url = 'https://farm-aid-backend.herokuapp.com/api/crops/hausa_postHarvest/5ef9bb15c50f0e0017df379d'
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
      let url = 'https://farm-aid-backend.herokuapp.com/api/crops/cropMag/5ef9bb15c50f0e0017df379d'
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


$("#sorghum_Mgt_hausa").on('click', function(e) {
    let weed = $('#sorghum_wcd_hausa').val();
    let fertilizer = $('#sorghum_fad_hausa').val();
    let cpp = $('#sorghum_cppd_hausa').val();
    let pestDisease = $('#sorghum_pdcd_hausa').val();
    //  validate empty input boxes
    if(weed != null || fertilizer != null ||  cpp != null || pestDisease != null) {
      let url = 'https://farm-aid-backend.herokuapp.com/api/crops/hausa_cropMag/5ef9bb15c50f0e0017df379d'
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
      let url = 'https://farm-aid-backend.herokuapp.com/api/crops/production/5ef9bb15c50f0e0017df379d'
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


$("#sorgnum_prod_hausa").on('click', function(e) {
    let landSelection = $('#sorgnum_ls_hausa').val();
    let landPreparation = $('#sorgnum_lp_hausa').val();
    let plantTech = $('#sorgnum_pt_hausa').val();
    let harvest = $('#sorgnum_hd_hausa').val();
    let mech = $('#sorgnum_md_hausa').val();
    //  validate empty input boxes
    if(landSelection != null || landPreparation != null || plantTech != null || harvest != null || mech != null) {
      let url = 'https://farm-aid-backend.herokuapp.com/api/crops/hausa_production/5ef9bb15c50f0e0017df379d'
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
// Sorghum GAP functioanlity  ends