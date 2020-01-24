
// #region Global-Variables
let pageUrls = {
    farmers: '/index.html',
    Services: '/index.html?Services',
    Interests: '/index.html?Interests',
    Rants: '/index.html?Rants',
    About: '/index.html?About',
    Farmers: '/index.html?Farmers',
    Partners: '/index.html?Partners',
    Crops: '/index.html?Crops',
    Animails: '/index.html?Animals',
    Onboardfarmer: '/index?Onboarding',
    Users: '/index.html?Users'
}
// #endregion globals

// #region OnStartUp-Function
function OnStartUp(params) {
    popStateHandler();
}
OnStartUp();
// #endregion startup

// #region Navlinks-Routing
document.querySelector('#farmersLuncher').addEventListener('click', (event) => {
    let stateObj = {
        page: 'farmers'
    }
    document.title = 'Farmers';
    history.pushState(stateObj, "farmers", "?Farmers");
    RenderFarmersPage();
});

// document.querySelector('#onboardLuncher').addEventListener('click', (event) => {
//     let stateObj = {
//         page: 'onboarding'
//     }
//     document.title = 'Onboarding';
//     history.pushState(stateObj, "onboarding", "?Onboarding");
//     RenderOnboardingPage();
// });

//Partners selector
document.querySelector('#partnersLuncher').addEventListener('click', (event) => {
    let stateObj = {
        page: 'partners'
    }
    document.title = 'Partners';
    history.pushState(stateObj, "partners", "?Partners");
    RenderPartnersPage();
});

document.querySelector('#rantsLuncher').addEventListener('click', (event) => {
    let stateObj = {
        page: 'rants'
    }
    document.title = 'Rants';
    history.pushState(stateObj, "rants", "?Rants");
    RenderRantsPage();
});

// #endregion selectors

// #region View-Renderers

//Render partners dashboard

function RenderPartnersPage() {
    document.querySelector('main').innerHTML =
        `<div class="column is-4">
        <div class="field">
            <label class="label pull-left is-large">Name</label>
            <div class="control has-icons-left">
                <input class="input is-large is-rounded has-icon-left" type="email" placeholder="Text input">
                <span class="icon is-left">
                    <i class="fa fa-envelope"></i>
                </span>
            </div>
        </div>
    </div>
    <table class="column is-6 farmers">
        
    </table>`;

    var dataSet = [
        [ "Tiger Nixon", "System Architect", "Edinburgh", "5421", "2011/04/25", "$320,800" ],
        [ "Garrett Winters", "Accountant", "Tokyo", "8422", "2011/07/25", "$170,750" ],
        [ "Ashton Cox", "Junior Technical Author", "San Francisco", "1562", "2009/01/12", "$86,000" ],
        [ "Cedric Kelly", "Senior Javascript Developer", "Edinburgh", "6224", "2012/03/29", "$433,060" ],
        [ "Airi Satou", "Accountant", "Tokyo", "5407", "2008/11/28", "$162,700" ],
        [ "Brielle Williamson", "Integration Specialist", "New York", "4804", "2012/12/02", "$372,000" ],
        [ "Herrod Chandler", "Sales Assistant", "San Francisco", "9608", "2012/08/06", "$137,500" ],
        [ "Rhona Davidson", "Integration Specialist", "Tokyo", "6200", "2010/10/14", "$327,900" ],
        [ "Colleen Hurst", "Javascript Developer", "San Francisco", "2360", "2009/09/15", "$205,500" ],
        [ "Sonya Frost", "Software Engineer", "Edinburgh", "1667", "2008/12/13", "$103,600" ],
        [ "Jena Gaines", "Office Manager", "London", "3814", "2008/12/19", "$90,560" ],
        [ "Quinn Flynn", "Support Lead", "Edinburgh", "9497", "2013/03/03", "$342,000" ],
        [ "Charde Marshall", "Regional Director", "San Francisco", "6741", "2008/10/16", "$470,600" ],
        [ "Haley Kennedy", "Senior Marketing Designer", "London", "3597", "2012/12/18", "$313,500" ],
        [ "Tatyana Fitzpatrick", "Regional Director", "London", "1965", "2010/03/17", "$385,750" ],
        [ "Michael Silva", "Marketing Designer", "London", "1581", "2012/11/27", "$198,500" ],
        [ "Paul Byrd", "Chief Financial Officer (CFO)", "New York", "3059", "2010/06/09", "$725,000" ],
        [ "Gloria Little", "Systems Administrator", "New York", "1721", "2009/04/10", "$237,500" ],
        [ "Bradley Greer", "Software Engineer", "London", "2558", "2012/10/13", "$132,000" ],
        [ "Dai Rios", "Personnel Lead", "Edinburgh", "2290", "2012/09/26", "$217,500" ],
        [ "Jenette Caldwell", "Development Lead", "New York", "1937", "2011/09/03", "$345,000" ],
        [ "Yuri Berry", "Chief Marketing Officer (CMO)", "New York", "6154", "2009/06/25", "$675,000" ],
        [ "Caesar Vance", "Pre-Sales Support", "New York", "8330", "2011/12/12", "$106,450" ],
        [ "Doris Wilder", "Sales Assistant", "Sydney", "3023", "2010/09/20", "$85,600" ],
        [ "Angelica Ramos", "Chief Executive Officer (CEO)", "London", "5797", "2009/10/09", "$1,200,000" ],
        [ "Gavin Joyce", "Developer", "Edinburgh", "8822", "2010/12/22", "$92,575" ],
        [ "Jennifer Chang", "Regional Director", "Singapore", "9239", "2010/11/14", "$357,650" ],
        [ "Brenden Wagner", "Software Engineer", "San Francisco", "1314", "2011/06/07", "$206,850" ],
        [ "Fiona Green", "Chief Operating Officer (COO)", "San Francisco", "2947", "2010/03/11", "$850,000" ],
        [ "Shou Itou", "Regional Marketing", "Tokyo", "8899", "2011/08/14", "$163,000" ],
        [ "Michelle House", "Integration Specialist", "Sydney", "2769", "2011/06/02", "$95,400" ],
        [ "Suki Burks", "Developer", "London", "6832", "2009/10/22", "$114,500" ],
        [ "Prescott Bartlett", "Technical Author", "London", "3606", "2011/05/07", "$145,000" ],
        [ "Gavin Cortez", "Team Leader", "San Francisco", "2860", "2008/10/26", "$235,500" ],
        [ "Martena Mccray", "Post-Sales support", "Edinburgh", "8240", "2011/03/09", "$324,050" ],
        [ "Unity Butler", "Marketing Designer", "San Francisco", "5384", "2009/12/09", "$85,675" ]
    ];

    $(".farmers").DataTable(
        {
            data: dataSet,
            columns: [
                { title: "Name" },
                { title: "Position" },
                { title: "Office" },
                { title: "Extn." },
                { title: "Start date" },
                { title: "Salary" }
            ]
        }
    );
}


function RenderFarmersPage(params) {
    document.querySelector('main').innerHTML =
        `<div class="column is-4">
        <div class="field">
            <label class="label pull-left is-large">Name</label>
            <div class="control has-icons-left">
                <input class="input is-large is-rounded has-icon-left" type="email" placeholder="Text input">
                <span class="icon is-left">
                    <i class="fa fa-envelope"></i>
                </span>
            </div>
        </div>
        <div class="field is-grouped">
            <div class="control has-icons-right">
                <button id="onboardLuncher" class="button is-large is-link is-rounded is-success">Onboard New Farmer</button>
                <span class="icon is-right">
                    <i class="fa fa-plus"></i>
                </span>
            </div>
        </div>
        </div>
    </div>
    <table class="column is-6 farmers">
        
    </table>`;

    var dataSet = [
        [ "Tiger Nixon", "System Architect", "Edinburgh", "5421", "2011/04/25", "$320,800" ],
        [ "Garrett Winters", "Accountant", "Tokyo", "8422", "2011/07/25", "$170,750" ],
        [ "Ashton Cox", "Junior Technical Author", "San Francisco", "1562", "2009/01/12", "$86,000" ],
        [ "Cedric Kelly", "Senior Javascript Developer", "Edinburgh", "6224", "2012/03/29", "$433,060" ],
        [ "Airi Satou", "Accountant", "Tokyo", "5407", "2008/11/28", "$162,700" ],
        [ "Brielle Williamson", "Integration Specialist", "New York", "4804", "2012/12/02", "$372,000" ],
        [ "Herrod Chandler", "Sales Assistant", "San Francisco", "9608", "2012/08/06", "$137,500" ],
        [ "Rhona Davidson", "Integration Specialist", "Tokyo", "6200", "2010/10/14", "$327,900" ],
        [ "Colleen Hurst", "Javascript Developer", "San Francisco", "2360", "2009/09/15", "$205,500" ],
        [ "Sonya Frost", "Software Engineer", "Edinburgh", "1667", "2008/12/13", "$103,600" ],
        [ "Jena Gaines", "Office Manager", "London", "3814", "2008/12/19", "$90,560" ],
        [ "Quinn Flynn", "Support Lead", "Edinburgh", "9497", "2013/03/03", "$342,000" ],
        [ "Charde Marshall", "Regional Director", "San Francisco", "6741", "2008/10/16", "$470,600" ],
        [ "Haley Kennedy", "Senior Marketing Designer", "London", "3597", "2012/12/18", "$313,500" ],
        [ "Tatyana Fitzpatrick", "Regional Director", "London", "1965", "2010/03/17", "$385,750" ],
        [ "Michael Silva", "Marketing Designer", "London", "1581", "2012/11/27", "$198,500" ],
        [ "Paul Byrd", "Chief Financial Officer (CFO)", "New York", "3059", "2010/06/09", "$725,000" ],
        [ "Gloria Little", "Systems Administrator", "New York", "1721", "2009/04/10", "$237,500" ],
        [ "Bradley Greer", "Software Engineer", "London", "2558", "2012/10/13", "$132,000" ],
        [ "Dai Rios", "Personnel Lead", "Edinburgh", "2290", "2012/09/26", "$217,500" ],
        [ "Jenette Caldwell", "Development Lead", "New York", "1937", "2011/09/03", "$345,000" ],
        [ "Yuri Berry", "Chief Marketing Officer (CMO)", "New York", "6154", "2009/06/25", "$675,000" ],
        [ "Caesar Vance", "Pre-Sales Support", "New York", "8330", "2011/12/12", "$106,450" ],
        [ "Doris Wilder", "Sales Assistant", "Sydney", "3023", "2010/09/20", "$85,600" ],
        [ "Angelica Ramos", "Chief Executive Officer (CEO)", "London", "5797", "2009/10/09", "$1,200,000" ],
        [ "Gavin Joyce", "Developer", "Edinburgh", "8822", "2010/12/22", "$92,575" ],
        [ "Jennifer Chang", "Regional Director", "Singapore", "9239", "2010/11/14", "$357,650" ],
        [ "Brenden Wagner", "Software Engineer", "San Francisco", "1314", "2011/06/07", "$206,850" ],
        [ "Fiona Green", "Chief Operating Officer (COO)", "San Francisco", "2947", "2010/03/11", "$850,000" ],
        [ "Shou Itou", "Regional Marketing", "Tokyo", "8899", "2011/08/14", "$163,000" ],
        [ "Michelle House", "Integration Specialist", "Sydney", "2769", "2011/06/02", "$95,400" ],
        [ "Suki Burks", "Developer", "London", "6832", "2009/10/22", "$114,500" ],
        [ "Prescott Bartlett", "Technical Author", "London", "3606", "2011/05/07", "$145,000" ],
        [ "Gavin Cortez", "Team Leader", "San Francisco", "2860", "2008/10/26", "$235,500" ],
        [ "Martena Mccray", "Post-Sales support", "Edinburgh", "8240", "2011/03/09", "$324,050" ],
        [ "Unity Butler", "Marketing Designer", "San Francisco", "5384", "2009/12/09", "$85,675" ]
    ];

    $(".farmers").DataTable(
        {
            data: dataSet,
            columns: [
                { title: "Name" },
                { title: "Position" },
                { title: "Office" },
                { title: "Extn." },
                { title: "Start date" },
                { title: "Salary" }
            ]
        }
    );

    document.querySelector('#onboardLuncher').addEventListener('click', (event) => {
        let stateObj = {
            page: 'onboarding'
        }
        document.title = 'Onboarding';
        history.pushState(stateObj, "onboarding", "?Onboarding");
        RenderOnboardingPage();
    });
}

function RenderServicesPage(params) {
    document.querySelector('main').innerHTML =
        `<div class="section main-features">
        <div class="columns is-3 container">
            <div class="column card features">
            <img src="./img/sms-1.png"/>
            <h1>Good Agricultural Practices (GAP)</h1>
            <p class="">Instant SMS on farming best practice. For market actors, deliver your message to Farm Aid’s large database of profiled farmers, to build your products’ brand awareness and increase sales.</p>
            </div>

            <div class="column card features">
            <img src="./img/weather-icon.png"/>
            <h1>Weather Advisory Services</h1>
            <p>Accurate weather information sourced from proven and reliable weather service provider to help smallholder farmer plan their their processes.</p>
            </div>

            <div class="column card features">
            <img src="./img/animal health.png"/>
            <h1>Animal Health & Livestock Production</h1>
            <p>Paravets and Community Animal health workers (CAHW) can subscribe to access information on the diagnosis, treatment and vaccines for animal diseases and sicknesses.</p>
            </div>
        </div>
    </div>`;
}

function RenderRantsPage(params) {
    document.querySelector('main').innerHTML =
        `<div class="column is-4 main-features">
        <div class="field">
            <label class="label pull-left is-large">Name</label>
            <div class="control has-icons-left">
                <input class="input is-large is-rounded has-icon-left" type="email" placeholder="Text input">
                <span class="icon is-left">
                    <i class="fa fa-envelope"></i>
                </span>
            </div>
        </div>
    </div>
    <div class="column is-4 main-features">
        <form>
        <div class="field">
            <label class="label pull-left">Name</label>
            <div class="control">
            <input class="input" type="text" placeholder="Text input">
            </div>
        </div>
        
        <div class="field">
            <label class="label pull-left">Username</label>
            <div class="control has-icons-left has-icons-right">
            <input class="input is-success" type="text" placeholder="Text input" value="bulma">
            <span class="icon is-small is-left">
                <i class="fas fa-user"></i>
            </span>
            <span class="icon is-small is-right">
                <i class="fas fa-check"></i>
            </span>
            </div>
            <p class="help is-success">This username is available</p>
        </div>
        
        <div class="field">
            <label class="label pull-left">Email</label>
            <div class="control has-icons-left has-icons-right">
            <input class="input is-danger" type="email" placeholder="Email input" value="[email protected]">
            <span class="icon is-small is-left">
                <i class="fas fa-envelope"></i>
            </span>
            <span class="icon is-small is-right">
                <i class="fas fa-exclamation-triangle"></i>
            </span>
            </div>
            <p class="help is-danger">This email is invalid</p>
        </div>
        
        <div class="field">
            <label class="label pull-left">Subject</label>
            <div class="control">
            <div class="select">
                <select>
                <option>Select dropdown</option>
                <option>With options</option>
                </select>
            </div>
            </div>
        </div>
        
        <div class="field">
            <label class="label pull-left">Message</label>
            <div class="control">
            <textarea class="textarea" placeholder="Textarea"></textarea>
            </div>
        </div>
        
        <div class="field">
            <div class="control">
            <label class="checkbox">
                <input type="checkbox">
                I agree to the <a href="#">terms and conditions</a>
            </label>
            </div>
        </div>
        
        <div class="field">
            <div class="control">
            <label class="radio">
                <input type="radio" name="question">
                Yes
            </label>
            <label class="radio">
                <input type="radio" name="question">
                No
            </label>
            </div>
        </div>
        
        <div class="field is-grouped">
            <div class="control">
            <button class="button is-link">Submit</button>
            </div>
            <div class="control">
            <button class="button is-link is-light">Cancel</button>
            </div>
        </div>
        </form>
    </div>`;
}

function RenderInterestsPage(params) {
    document.querySelector('main').innerHTML =
    `<div class="column is-4">
        <div class="field">
            <label class="label pull-left is-large">Name</label>
            <div class="control has-icons-left">
                <input class="input is-large is-rounded has-icon-left" type="email" placeholder="Text input">
                <span class="icon is-left">
                    <i class="fa fa-envelope"></i>
                </span>
            </div>
        </div>
        <div>
            <article class="panel is-success">
                <p class="panel-heading">Primary</p>
                <p class="panel-tabs">
                    <a class="is-active">All</a>
                    <a>Public</a>
                    <a>Private</a>
                    <a>Sources</a>
                    <a>Forks</a>
                </p>
                <div class="panel-block">
                    <p class="control has-icons-left">
                        <input class="input is-primary is-rounded" type="text" placeholder="Search">
                        <span class="icon is-left">
                            <i class="fa fa-search" aria-hidden="true"></i>
                        </span>
                    </p>
                </div>
                <a class="panel-block is-active">
                    <span class="panel-icon">
                        <i class="fa fa-book" aria-hidden="true"></i>
                    </span>
                    bulma
                </a>
                <a class="panel-block">
                    <span class="panel-icon">
                        <i class="fa fa-book" aria-hidden="true"></i>
                    </span>
                marksheet
                </a>
                <a class="panel-block">
                    <span class="panel-icon">
                        <i class="fa fa-book" aria-hidden="true"></i>
                    </span>
                    minireset.css
                </a>
                <a class="panel-block">
                    <span class="panel-icon">
                        <i class="fa fa-book" aria-hidden="true"></i>
                    </span>
                    jgthms.github.io
                </a>
            </article>
      
        </div>
    </div>
    <div class="column is-4">
        <form>
        <div class="field">
            <label class="label pull-left">Name</label>
            <div class="control">
            <input class="input" type="text" placeholder="Text input">
            </div>
        </div>
        
        <div class="field">
            <label class="label pull-left">Username</label>
            <div class="control has-icons-left has-icons-right">
            <input class="input is-success" type="text" placeholder="Text input" value="bulma">
            <span class="icon is-small is-left">
                <i class="fa fa-user"></i>
            </span>
            <span class="icon is-small is-right">
                <i class="fa fa-check"></i>
            </span>
            </div>
            <p class="help is-success">This username is available</p>
        </div>
        
        <div class="field">
            <label class="label pull-left">Email</label>
            <div class="control has-icons-left has-icons-right">
            <input class="input is-danger" type="email" placeholder="Email input" value="[email protected]">
            <span class="icon is-small is-left">
                <i class="fa fa-envelope"></i>
            </span>
            <span class="icon is-small is-right">
                <i class="fa fa-exclamation-triangle"></i>
            </span>
            </div>
            <p class="help is-danger">This email is invalid</p>
        </div>
        
        <div class="field">
            <label class="label pull-left">Subject</label>
            <div class="control">
            <div class="select">
                <select>
                <option>Select dropdown</option>
                <option>With options</option>
                </select>
            </div>
            </div>
        </div>
        
        <div class="field">
            <label class="label pull-left">Message</label>
            <div class="control">
            <textarea class="textarea" placeholder="Textarea"></textarea>
            </div>
        </div>
        
        <div class="field">
            <div class="control">
            <label class="checkbox">
                <input type="checkbox">
                I agree to the <a href="#">terms and conditions</a>
            </label>
            </div>
        </div>
        
        <div class="field">
            <div class="control">
            <label class="radio">
                <input type="radio" name="question">
                Yes
            </label>
            <label class="radio">
                <input type="radio" name="question">
                No
            </label>
            </div>
        </div>
        
        <div class="field is-grouped">
            <div class="control">
            <button class="button is-link">Submit</button>
            </div>
            <div class="control">
            <button class="button is-link is-light">Cancel</button>
            </div>
        </div>
        </form>
    </div>
    <div class="column is-2">
        <div class="field">
            <label class="label pull-left is-large">Name</label>
            <div class="control has-icons-left">
                <input class="input is-large is-rounded has-icon-left" type="email" placeholder="Text input">
                <span class="icon is-left">
                    <i class="fa fa-envelope"></i>
                </span>
            </div>
        </div>
    </div>`;
}

function RenderOnboardingPage(params) {
    document.querySelector('main').innerHTML =
    `<div class="column is-4 onboarding is-fullheight">
        <header>Onboard a farmer</header>
        <form id="onboard_form">
            <div class="field">
                <label class="label pull-left">First Name</label>
                <div class="control">
                    <input class="input is-large is-rounded" type="text" placeholder="First Name">
                </div>
            </div>
            
            <div class="field">
                <label class="label pull-left">Last Name</label>
                <div class="control has-icons-left has-icons-right">
                <input class="input is-success is-large is-rounded" type="text" placeholder="Last Name">
                <span class="icon is-small is-left">
                    <i class="fa fa-user"></i>
                </span>
                <span class="icon is-small is-right">
                    <i class="fa fa-check"></i>
                </span>
                </div>
                <p class="help is-success">This username is available</p>
            </div>
            
            <div class="field">
                <label class="label pull-left">Email</label>
                <div class="control has-icons-left has-icons-right">
                <input class="input is-danger" type="email" placeholder="Email input" value="[email protected]">
                <span class="icon is-small is-left">
                    <i class="fas fa-envelope"></i>
                </span>
                <span class="icon is-small is-right">
                    <i class="fas fa-exclamation-triangle"></i>
                </span>
                </div>
                <p class="help is-danger">This email is invalid</p>
            </div>
            
            <div class="field">
                <label class="label pull-left">Subject</label>
                <div class="control">
                <div class="select">
                    <select>
                    <option>Select dropdown</option>
                    <option>With options</option>
                    </select>
                </div>
                </div>
            </div>
            
            <div class="field">
                <label class="label pull-left">Message</label>
                <div class="control">
                <textarea class="textarea" placeholder="Textarea"></textarea>
                </div>
            </div>
            
            <div class="field">
                <div class="control">
                <label class="checkbox">
                    <input type="checkbox">
                    I agree to the <a href="#">terms and conditions</a>
                </label>
                </div>
            </div>
            
            <div class="field">
                <div class="control">
                <label class="radio">
                    <input type="radio" name="question">
                    Yes
                </label>
                <label class="radio">
                    <input type="radio" name="question">
                    No
                </label>
                </div>
            </div>
            
            <div class="field is-grouped">
                <div class="control">
                <button class="button is-link">Submit</button>
                </div>
                <div class="control">
                <button class="button is-link is-light">Cancel</button>
                </div>
            </div>
        </form>
    </div>
    <div class="column is-7 onboarding is-fullheight">
        <header>Farmer Onboarding</header>
    </div>`;
}


function logout() {
    localStorage.click();
    swal({
        title: 'Loging Out',
        text: 'Please wait....',
        type: 'info',
        icon: 'info',
        timer: 1500
    }).then(() => {
        window.location.replace("/index.html");
    });
}
// #endregion Renders

// #region OnPopState-Handler
function popStateHandler(event) {
    loc = window.location.href.toString().split(window.location.host)[1];

    if (loc === pageUrls.Services) {
        RenderServicesPage();
    }
    if (loc === pageUrls.farmers) {
        RenderFarmersPage();
    }
    if (loc == pageUrls.interests) {
        RenderInterestsPage();
    }
}
window.onpopstate = popStateHandler;
// #endregion popState