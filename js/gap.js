
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
