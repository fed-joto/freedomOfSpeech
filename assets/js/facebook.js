(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0]
    if (d.getElementById(id)) return
    js = d.createElement(s); js.id = id
    js.src = "//connect.facebook.net/en_US/sdk.js"
    fjs.parentNode.insertBefore(js, fjs)
}(document, 'script', 'facebook-jssdk'))

function statusChangeCallback(res) {
    if (res.status === 'connected') {
        shareOnFacebook()
    } else {
        FB.login(shareOnFacebook, { scope: ['public_profile'] })
    }
}

function checkLoginState() {
    FB.getLoginStatus(statusChangeCallback) // callback called with response
}

function testAPI() {
    FB.getLoginStatus(statusChangeCallback)
}

function shareOnFacebook() {
    FB.ui({
        method: 'share',
        href: 'https://www.reporterswithoutborders.com/',
    }, () => {
        document.body.classList = ''
    });
}

window.fbAsyncInit = () => {
    FB.init({
        appId      : '1244947348881820',
        cookie     : true,
        xfbml      : true,
        version    : 'v2.8'
    })
};