
// #region Global-Variables
let pageUrls = {
    blog: '/index.html',
    Services: '/index.html?Services',
    Interests: '/index.html?Interests',
    Rants: '/index.html?Rants',
    About: '/index.html?About',
    Farmers: '/index.html?Farmers',
    Partners: '/index.html?Partners',
    Crops: '/index.html?Crops',
    Animails: '/index.html?Animals',
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
document.querySelector('#blogLuncher').addEventListener('click', (event) => {
    let stateObj = {
        page: 'blog'
    }
    document.title = 'Blog';
    history.pushState(stateObj, "blog", "?Blog");
    RenderBlogPage();
});

document.querySelector('#interestsLuncher').addEventListener('click', (event) => {
    let stateObj = {
        page: 'interests'
    }
    document.title = 'Interests';
    history.pushState(stateObj, "interests", "?Interests");
    RenderInterestsPage();
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
function RenderBlogPage(params) {
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
    if (loc === pageUrls.blog) {
        RenderBlogPage();
    }
    if (loc == pageUrls.interests) {
        RenderInterestsPage();
    }
}
window.onpopstate = popStateHandler;
// #endregion popState