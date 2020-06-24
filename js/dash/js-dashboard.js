/*! dashboard.js | FarmAid */

/* ==========================================================================
Dashboard core JS file
========================================================================== */

//Init FarmAid search
function initSearch() {
    $('.search-field').on('keyup', function () {
        var $this = $(this);
        var $container = $this.closest('.control');
        var searchQuery = $this.val();
        var expression = new RegExp(searchQuery, "i");
        $.getJSON('assets/data/search.json', function (data) {
            $container.find('.search-results .search-result, .search-results .placeholder-wrap').remove();
            $.each(data, function (key, value) {
                if (value.title.search(expression) != -1 || value.content.search(expression) != -1) {

                    if (value.photoUrl === null) {
                        var template = `
                            <a class="search-result">
                                <div class="fake-avatar" style="background:${value.color}">
                                    <span>${value.title.slice(0, 1)}</span>
                                </div>
                                <div class="meta">
                                    <span>${value.title}</span>
                                    <span>${value.content}</span>
                                </div>
                            </a>
                        `
                    }

                    else {
                        var template = `
                            <a class="search-result">
                                <img class="${value.type === 'user' ? 'avatar' : 'record'}" src="${value.photoUrl}" alt="">
                                <div class="meta">
                                    <span>${value.title}</span>
                                    <span>${value.content}</span>
                                </div>
                            </a>
                        `
                    }

                    $container.find('.search-results').append(template);
                }
            })

            if ($container.find('.search-result').length === 0) {
                var placeholder = `
                        <div class="placeholder-wrap">
                            <div class="placeholder-content has-text-centered">
                                <img src="assets/images/illustrations/no-results.svg" alt="">
                                <h3>No Matching Results</h3>
                                <p>Sorry, we couldn't find any matching records. Please try different search terms.</p>
                            </div>
                        </div>
                    `

                $container.find('.search-results').append(placeholder);
            }
        })

        if (searchQuery === '') {
            $container.find('.search-results').removeClass('is-active');
        } else {
            $container.find('.search-results').addClass('is-active');
        }
    })
}


function cancelUser() {
    $('.modal.modal-lg.create-contact-modal.modal-hero').removeClass('is-active');  
    $('.create-contact-modal > .modal-background').removeClass('scaleInCircle');
    $('.create-contact-modal > .modal-content').removeClass('scaleIn');
    $('.create-contact-modal > .modal-close').addClass('is-hidden');
}

function newUser() {
    console.log('Working...');
    if ($('.create-contact-modal').length) {
        console.log('Creating user...');
        $('.create-contact-modal').removeClass('is-hidden').addClass('is-active');
        $('.create-contact-modal > .modal-background').addClass('scaleInCircle');
        $('.create-contact-modal > .modal-content').addClass('scaleIn');
        $('.create-contact-modal > .modal-close').removeClass('is-hidden');
    } 
}

function newMessage(params) {
    if ($('#create-note-modal').length) {
        console.log('Creating new message...');
        $('#create-note-modal').removeClass('is-hidden').addClass('is-active');
        $('#create-note-modal > .modal-background').addClass('scaleInCircle');
        $('#create-note-modal > .modal-content').addClass('scaleIn');
        $('#create-note-modal > .modal-close').removeClass('is-hidden');
    } 
}

function newInternalMessage(params) {
    if ($('#create-internal-modal').length) {
        console.log('Creating new internal message...');
        $('#create-internal-modal').removeClass('is-hidden').addClass('is-active');
        $('#create-internal-modal > .modal-background').addClass('scaleInCircle');
        $('#create-internal-modal > .modal-content').addClass('scaleIn');
        $('#create-internal-modal > .modal-close').removeClass('is-hidden');
        $("#internal_message_content").empty();
        $('#to_recipients').empty();
    } 
}

function cancelInternalMessage(params) {
    $('.modal.modal-md.icon-action-modal.modal-hero').removeClass('is-active');
    $('#create-internal-modal > .modal-background').removeClass('scaleInCircle');
    $('#create-internal-modal > .modal-content').removeClass('scaleIn');
    $('#create-internal-modal > .modal-close').addClass('is-hidden');
}

function sorghumInput(param) {
    if ($('#create-sorghum-modal').length) {
        console.log('Creating new crop...');
        $('#create-sorghum-modal').removeClass('is-hidden').addClass('is-active');
        $('#create-sorghum-modal > .modal-background').addClass('scaleInCircle');
        $('#create-sorghum-modal > .modal-content').addClass('scaleIn');
        $('#create-sorghum-modal > .modal-close').removeClass('is-hidden');
    } 
}

function sorghumPHD(param) {
    if ($('#sorghum-ph-modal').length) {
        console.log('Creating rice post harvest...');
        $('#sorghum-ph-modal').removeClass('is-hidden').addClass('is-active');
        $('#sorghum-ph-modal > .modal-background').addClass('scaleInCircle');
        $('#sorghum-ph-modal > .modal-content').addClass('scaleIn');
        $('#sorghum-ph-modal > .modal-close').removeClass('is-hidden');
    } 
}
function sorghumCMGT(param) {
    if ($('#sorghum-CMGT').length) {
        console.log('Creating rice post harvest...');
        $('#sorghum-CMGT').removeClass('is-hidden').addClass('is-active');
        $('#sorghum-CMGT > .modal-background').addClass('scaleInCircle');
        $('#sorghum-CMGT > .modal-content').addClass('scaleIn');
        $('#sorghum-CMGT > .modal-close').removeClass('is-hidden');
    } 
}

function sorghumPD(param) {
    if ($('#sorgnum-prod').length) {
        console.log('Creating new crop...');
        $('#sorgnum-prod').removeClass('is-hidden').addClass('is-active');
        $('#sorgnum-prod > .modal-background').addClass('scaleInCircle');
        $('#sorgnum-prod > .modal-content').addClass('scaleIn');
        $('#sorgnum-prod > .modal-close').removeClass('is-hidden');
    } 
}
function sorghumWC(param) {
    if ($('#sorghum-WC').length) {
        console.log('Creating new crop...');
        $('#sorghum-WC').removeClass('is-hidden').addClass('is-active');
        $('#sorghum-WC > .modal-background').addClass('scaleInCircle');
        $('#sorghum-WC > .modal-content').addClass('scaleIn');
        $('#sorghum-WC > .modal-close').removeClass('is-hidden');
    } 
}

function sorghumAGGRE(param) {
    if ($('#sorghum-aggre').length) {
        console.log('Creating new crop...');
        $('#sorghum-aggre').removeClass('is-hidden').addClass('is-active');
        $('#sorghum-aggre > .modal-background').addClass('scaleInCircle');
        $('#sorghum-aggre > .modal-content').addClass('scaleIn');
        $('#sorghum-aggre > .modal-close').removeClass('is-hidden');
    } 
}



function createCrop(param) {
    if ($('#create-crop-modal').length) {
        console.log('Creating new crop...');
        $('#create-crop-modal').removeClass('is-hidden').addClass('is-active');
        $('#create-crop-modal > .modal-background').addClass('scaleInCircle');
        $('#create-crop-modal > .modal-content').addClass('scaleIn');
        $('#create-crop-modal > .modal-close').removeClass('is-hidden');
    } 
}
function createCropHausa(param) {
    if ($('#create-tomatoes-hausa-modal').length) {
        console.log('Creating new crop...');
        $('#create-tomatoes-hausa-modal').removeClass('is-hidden').addClass('is-active');
        $('#create-tomatoes-hausa-modal > .modal-background').addClass('scaleInCircle');
        $('#create-tomatoes-hausa-modal > .modal-content').addClass('scaleIn');
        $('#create-tomatoes-hausa-modal > .modal-close').removeClass('is-hidden');
    } 
}

function riceInput(param) {
    if ($('#create-rice-modal').length) {
        console.log('Creating rice input...');
        $('#create-rice-modal').removeClass('is-hidden').addClass('is-active');
        $('#create-rice-modal > .modal-background').addClass('scaleInCircle');
        $('#create-rice-modal > .modal-content').addClass('scaleIn');
        $('#create-rice-modal > .modal-close').removeClass('is-hidden');
    } 
}
function riceInputHausa(param) {
    if ($('#create-rice-hausa-modal').length) {
        console.log('Creating rice input...');
        $('#create-rice-hausa-modal').removeClass('is-hidden').addClass('is-active');
        $('#create-rice-hausa-modal > .modal-background').addClass('scaleInCircle');
        $('#create-rice-hausa-modal > .modal-content').addClass('scaleIn');
        $('#create-rice-hausa-modal > .modal-close').removeClass('is-hidden');
    } 
}


function ricePH(param) {
    if ($('#rice-ph-modal').length) {
        console.log('Creating rice post harvest...');
        $('#rice-ph-modal').removeClass('is-hidden').addClass('is-active');
        $('#rice-ph-modal > .modal-background').addClass('scaleInCircle');
        $('#rice-ph-modal > .modal-content').addClass('scaleIn');
        $('#rice-ph-modal > .modal-close').removeClass('is-hidden');
    } 
}
function ricePHHausa(param) {
    if ($('#rice-ph-hausa-modal').length) {
        console.log('Creating rice post harvest...');
        $('#rice-ph-hausa-modal').removeClass('is-hidden').addClass('is-active');
        $('#rice-ph-hausa-modal > .modal-background').addClass('scaleInCircle');
        $('#rice-ph-hausa-modal > .modal-content').addClass('scaleIn');
        $('#rice-ph-hausa-modal > .modal-close').removeClass('is-hidden');
    } 
}


function riceCM(param) {
    if ($('#rice-CMGT').length) {
        console.log('Creating rice post harvest...');
        $('#rice-CMGT').removeClass('is-hidden').addClass('is-active');
        $('#rice-CMGT > .modal-background').addClass('scaleInCircle');
        $('#rice-CMGT > .modal-content').addClass('scaleIn');
        $('#rice-CMGT > .modal-close').removeClass('is-hidden');
    } 
}
function riceCMHausa(param) {
    if ($('#rice-CMGT-hausa').length) {
        console.log('Creating rice post harvest...');
        $('#rice-CMGT-hausa').removeClass('is-hidden').addClass('is-active');
        $('#rice-CMGT-hausa > .modal-background').addClass('scaleInCircle');
        $('#rice-CMGT-hausa > .modal-content').addClass('scaleIn');
        $('#rice-CMGT-hausa > .modal-close').removeClass('is-hidden');
    } 
}


function createph(param) {
    if ($('#create-ph-modal').length) {
        console.log('Creating new crop...');
        $('#create-ph-modal').removeClass('is-hidden').addClass('is-active');
        $('#create-ph-modal > .modal-background').addClass('scaleInCircle');
        $('#create-ph-modal > .modal-content').addClass('scaleIn');
        $('#create-ph-modal > .modal-close').removeClass('is-hidden');
    } 
}
function createphHausa(param) {
    if ($('#create-ph-hausa-modal').length) {
        console.log('Creating new crop...');
        $('#create-ph-hausa-modal').removeClass('is-hidden').addClass('is-active');
        $('#create-ph-hausa-modal > .modal-background').addClass('scaleInCircle');
        $('#create-ph-hausa-modal > .modal-content').addClass('scaleIn');
        $('#create-ph-hausa-modal > .modal-close').removeClass('is-hidden');
    } 
}


function ricePD(param) {
    if ($('#rice-prod').length) {
        console.log('Creating new crop...');
        $('#rice-prod').removeClass('is-hidden').addClass('is-active');
        $('#rice-prod > .modal-background').addClass('scaleInCircle');
        $('#rice-prod > .modal-content').addClass('scaleIn');
        $('#rice-prod > .modal-close').removeClass('is-hidden');
    } 
}
function riceWC(param) {
    if ($('#rice-WC').length) {
        console.log('Creating new crop...');
        $('#rice-WC').removeClass('is-hidden').addClass('is-active');
        $('#rice-WC > .modal-background').addClass('scaleInCircle');
        $('#rice-WC > .modal-content').addClass('scaleIn');
        $('#rice-WC > .modal-close').removeClass('is-hidden');
    } 
}
function riceAD(param) {
    if ($('#rice-aggre').length) {
        console.log('Creating new crop...');
        $('#rice-aggre').removeClass('is-hidden').addClass('is-active');
        $('#rice-aggre > .modal-background').addClass('scaleInCircle');
        $('#rice-aggre > .modal-content').addClass('scaleIn');
        $('#rice-aggre > .modal-close').removeClass('is-hidden');
    } 
}
function createCMGTHausa(param) {
    if ($('#create-CMGT-hausa').length) {
        console.log('Creating new crop...');
        $('#create-CMGT-hausa').removeClass('is-hidden').addClass('is-active');
        $('#create-CMGT-hausa > .modal-background').addClass('scaleInCircle');
        $('#create-CMGT-hausa > .modal-content').addClass('scaleIn');
        $('#create-CMGT-hausa > .modal-close').removeClass('is-hidden');
    } 
}
function createCMGT(param) {
    if ($('#create-CMGT').length) {
        console.log('Creating new crop...');
        $('#create-CMGT').removeClass('is-hidden').addClass('is-active');
        $('#create-CMGT > .modal-background').addClass('scaleInCircle');
        $('#create-CMGT > .modal-content').addClass('scaleIn');
        $('#create-CMGT > .modal-close').removeClass('is-hidden');
    } 
}


function createpro(param) {
    if ($('#create-prod').length) {
        console.log('Creating new crop...');
        $('#create-prod').removeClass('is-hidden').addClass('is-active');
        $('#create-prod > .modal-background').addClass('scaleInCircle');
        $('#create-prod > .modal-content').addClass('scaleIn');
        $('#create-prod > .modal-close').removeClass('is-hidden');
    } 
}
function createproHausa(param) {
    if ($('#create-prod-hausa').length) {
        console.log('Creating new crop...');
        $('#create-prod-hausa').removeClass('is-hidden').addClass('is-active');
        $('#create-prod-hausa > .modal-background').addClass('scaleInCircle');
        $('#create-prod-hausa > .modal-content').addClass('scaleIn');
        $('#create-prod-hausa > .modal-close').removeClass('is-hidden');
    } 
}


function createWC(param) {
    if ($('#create-WC').length) {
        console.log('Creating new crop...');
        $('#create-WC').removeClass('is-hidden').addClass('is-active');
        $('#create-WC > .modal-background').addClass('scaleInCircle');
        $('#create-WC > .modal-content').addClass('scaleIn');
        $('#create-WC > .modal-close').removeClass('is-hidden');
    } 
}
function createWCHausa(param) {
    if ($('#create-WC-hausa').length) {
        console.log('Creating new crop...');
        $('#create-WC-hausa').removeClass('is-hidden').addClass('is-active');
        $('#create-WC-hausa > .modal-background').addClass('scaleInCircle');
        $('#create-WC-hausa > .modal-content').addClass('scaleIn');
        $('#create-WC-hausa > .modal-close').removeClass('is-hidden');
    } 
}


function createaggr(param) {
    if ($('#create-aggre').length) {
        console.log('Creating new crop...');
        $('#create-aggre').removeClass('is-hidden').addClass('is-active');
        $('#create-aggre > .modal-background').addClass('scaleInCircle');
        $('#create-aggre > .modal-content').addClass('scaleIn');
        $('#create-aggre > .modal-close').removeClass('is-hidden');
    } 
}
function createaggrHausa(param) {
    if ($('#create-aggre-hausa').length) {
        console.log('Creating new crop...');
        $('#create-aggre-hausa').removeClass('is-hidden').addClass('is-active');
        $('#create-aggre-hausa > .modal-background').addClass('scaleInCircle');
        $('#create-aggre-hausa > .modal-content').addClass('scaleIn');
        $('#create-aggre-hausa > .modal-close').removeClass('is-hidden');
    } 
}

function groudnutAggr(param) {
    if ($('#groundnut-aggre').length) {
        console.log('Creating groundnut aggregation...');
        $('#groundnut-aggre').removeClass('is-hidden').addClass('is-active');
        $('#groundnut-aggre > .modal-background').addClass('scaleInCircle');
        $('#groundnut-aggre > .modal-content').addClass('scaleIn');
        $('#groundnut-aggre > .modal-close').removeClass('is-hidden');
    } 
}
function groundnutWC(param) {
    if ($('#groundnut-WC').length) {
        console.log('Creating groundnut weather and climate...');
        $('#groundnut-WC').removeClass('is-hidden').addClass('is-active');
        $('#groundnut-WC > .modal-background').addClass('scaleInCircle');
        $('#groundnut-WC > .modal-content').addClass('scaleIn');
        $('#groundnut-WC > .modal-close').removeClass('is-hidden');
    } 
}
function groundnutPD(param) {
    if ($('#groundnut-prod').length) {
        console.log('Creating groundnut production...');
        $('#groundnut-prod').removeClass('is-hidden').addClass('is-active');
        $('#groundnut-prod > .modal-background').addClass('scaleInCircle');
        $('#groundnut-prod > .modal-content').addClass('scaleIn');
        $('#groundnut-prod > .modal-close').removeClass('is-hidden');
    } 
}
function groundnutCMGT(param) {
    if ($('#groundnut-CMGT').length) {
        console.log('Creating groundnut input...');
        $('#groundnut-CMGT').removeClass('is-hidden').addClass('is-active');
        $('#groundnut-CMGT > .modal-background').addClass('scaleInCircle');
        $('#groundnut-CMGT > .modal-content').addClass('scaleIn');
        $('#groundnut-CMGT > .modal-close').removeClass('is-hidden');
    } 
}
function groundnutPH(param) {
    if ($('#groundnut-ph-modal').length) {
        console.log('Creating groundnut input...');
        $('#groundnut-ph-modal').removeClass('is-hidden').addClass('is-active');
        $('#groundnut-ph-modal > .modal-background').addClass('scaleInCircle');
        $('#groundnut-ph-modal > .modal-content').addClass('scaleIn');
        $('#groundnut-ph-modal > .modal-close').removeClass('is-hidden');
    } 
}
function groundnutInput(param) {
    if ($('#create-groundnut-modal').length) {
        console.log('Creating groundnut input...');
        $('#create-groundnut-modal').removeClass('is-hidden').addClass('is-active');
        $('#create-groundnut-modal > .modal-background').addClass('scaleInCircle');
        $('#create-groundnut-modal > .modal-content').addClass('scaleIn');
        $('#create-groundnut-modal > .modal-close').removeClass('is-hidden');
    } 
}

function updateFromSMAP() {
    console.log('Updating the farmers database from SMAP...');
    swal.fire({
        title: 'Updating...',
        text: 'Updating the farmers database',
        icon: 'info',
        timer: 2000
    });

    console.log("fetching...");
    getUserAsync()
        .then((data) => {
            //console.log(data)
            data.forEach(ele => {
                console.log("Data: ", ele);
                document.getElementById('farm_table').innerHTML += `<tr data-id="4">
                <td><img class="datatable-avatar" src="assets/images/avatars/terry.jpg" data-demo-src="assets/images/avatars/terry.jpg"></td>
                <td>Terry</td>
                <td>Daniels</td>
                <td>Scientist</td>
                <td><span class="tag">Offline</span></td>
                <td>
                    <div class="dropdown is-right dropdown-trigger styled-dropdown is-round">
                        <div class="button">
                            <i class="material-icons">more_vert</i>
                        </div>
                        <div class="dropdown-menu is-text-bigger has-text-left" role="menu">
                            <div class="dropdown-content">
                                <a href="#" class="dropdown-item">
                                    <i class="sl sl-icon-eye"></i>
                                    <span>
                                        <span>View</span>
                                        <span>View contact</span>
                                    </span>
                                </a>
                                <a class="dropdown-item">
                                    <i class="sl sl-icon-pencil"></i>
                                    <span>
                                        <span>Edit</span>
                                        <span>Edit this contact</span>
                                    </span>
                                </a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item">
                                    <i class="sl sl-icon-trash"></i>
                                    <span>
                                        <span>Delete</span>
                                        <span>Delete this contact</span>
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>

                </td>
            </tr>`;
            });
        });
}
 
async function getUserAsync() {
    
    let response = await fetch(`https://farm-aid-backend.herokuapp.com/api/smap`);
    let data = await response.json();
    return data;
}

function startModule(evt, moduleName) {
    
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("navtab-content");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
      tabcontent[i].classList.remove('is-active');
    }
    tablinks = document.getElementsByClassName("tab-link");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove('is-active');
    }

    document.getElementById(moduleName.id).style.display = "block";
    evt.currentTarget.className += " is-active";
}


$(document).ready(function($){

    "use strict";

    //Change demo images
    $('*[data-demo-src]').each(function () {
        var newSrc = $(this).attr('data-demo-src');
        if (newSrc !== undefined) {
            $(this).attr('src', newSrc);
        }
    });

    feather.replace();

    initSearch();

    //Auto set mobile layout to reader mode on page load
    setTimeout(function(){
        if (window.matchMedia('(max-width: 767px)').matches) {
            $('#reader-mode-toggle').trigger('click');
            $('#reader-mode-switch').trigger('change');
        }
    }, 500);

    //Mobile menu toggle
    $().initMobileMenu();

    $().initDashboardLayout();

    //Attribute background images
    $().initBgImages();

    //Pop Dropdowns
    $().initPopDropdowns();

    //Common dropdown
    $().initDropdowns();

    //Init Modals
    $().initModals();

    //Init Alert boxes
    $().initAlertBoxes();

    //Navigation Tabs
    $().initNavigationTabs();

    //Ripple effect
    $().initRipple();

    //Custom quickview initialization with data attributes
    $().initQuickview();

    //datepicker initialization
    $().initDatepicker();

    //wickedpicker 24 hours initialization
    $().initTimepicker();

    //Accordion initialization
    $().initAccordion();

    //Chosen select initialization
    $().initChosenSelect();

    //Adding the styled checkbox styles
    $().initCheckboxes();

    //Initialize tooltips
    $().initTooltips();

    //Initialize popovers
    $().initPopovers();

    //Busy switch behaviour
    $().initBusySwitch();

    //Complete task fab button
    $().initTaskFab();

    //Social Fab menu
    $().initSocialFab();

    //Like button
    $().initLikeButton();

    //Init Profile section
    $().initProfile();

    //Init User Creation
    

    //Fake chat messages simulation
    $().initChat();

    //Media card background images
    $().initMediaCards();

    //Svg vector map
    //$().initVectorMap();

})


// send SMS 

$("send_messages").on('click', function(e) {
    const url = 'https://farm-aid-backend.herokuapp.com/api/smap';

     fetch(url)
     .then(function(data) {
        console.log(data)
     })
     .catch(function(error){
         console.log(error)
     })
})

var usersDOM = document.getElementById('users_page');

function usersPage(params) {
      swal.fire({
        title: 'Loading Users Page',
        text: 'Please wait...',
        timer: 3000,
        allowOutsideClick: false,
        showConfirmButton: false,
        icon: 'info'
      }).then( function() {
        Swal.fire({
          title: "Please wait",
          text: "Loading data ....",
          icon: "info",
          allowOutsideClick: false,
          showConfirmButton: false,
        });
            if(("#users_page").length) {
            
              const url = 'https://farm-aid-backend.herokuapp.com/api/auth/users'
              const token = localStorage.getItem('access_token');
              const headers = new Headers();
              headers.append('Content-Type', 'application/json');
              headers.append('Authorization', token);
            
              fetch(url, {
                method: "GET",
                headers
              }).then(async (res) => res.json()).then(data => {
                  let result = '';
                  
                  data.forEach(user => {
                        result += `
                        <article class="column is-4">
                        <div class="contact-card">
                        
                            <div class="contact-block">
                                <img src=${user.avatar} alt="product" class="product-img"/>
                                <div class="contact-meta">
                                    <span class="name">${user.firstname + " " + user.lastname}</span>
                                    <span class="position">${user.bizCategory}</span>
                                    <span class="email">${user.email}</span>
                                    <span class="email">${user.phoneNumber}</span>
                                </div>
                        
                            </div>

                           
                        </div>
                        
                        </article>
                        `;
                    })
                    usersDOM.innerHTML = result;
                })

                
              }
            
              Swal.close();
            })
}
