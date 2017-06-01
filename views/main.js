const header = require('./partials/header');
const footer = require('./partials/footer');

const main = tweets => `
    ${ header }
    <div class="search-box">
        <input type="text" placeholder="Search for a country...">
    </div>

    <aside class="about">
        <h3 class="about__title">About</h3>
        <p class="about__text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident labore id quia officia illo optio similique pariatur maiores, eum dolores alias, assumenda, vero velit rerum. Eaque eveniet perferendis quo iste.</p>
    </aside>

    <aside class="take-action">
        <div class="take-action__action">
            <img src="./img/paper-plane.svg" alt="Share" class="take-action__icon">
            <p class="take-action__text">Lorem ipsum dolor sit amet, consectetur adipisicing elit illo optio similique.</p>
            <button class="cta" onClick="shareIt()">Share</button>
        </div>

        <div class="take-action__action">
            <img src="./img/donation.svg" alt="Donate" class="take-action__icon">
            <p class="take-action__text">Lorem ipsum dolor sit amet, consectetur adipisicing elit illo optio similique.</p>
            <button class="cta">Donate</button>
        </div>

        <div class="take-action__action">
            <img src="./img/mail.svg" alt="Newsletter" class="take-action__icon">
            <p class="take-action__text">Lorem ipsum dolor sit amet, consectetur adipisicing elit illo optio similique.</p>
            <button class="cta">Newsletter</button>
        </div>
    </aside>

    <div class="wrapper">
        <main class="map"></main>

        <div class="c-slider" id="hammer-slider">
            <div class="c-slider__container"></div>
        </div>

        <h1 class="header__logo">
            <img src="./img/logo.svg" alt="Logo">
        </h1>

        <div class="navigation--mobile">
            <img src="./img/menu.svg" alt="Search icon" width="50">
        </div>

        <div class="mobile__menu">
            <img src="img/cross-out.svg" alt="" class="close" id="close">
            <ul class="navigation__list--mobile">
                <li class="navigation__list-item navigation__list-item--about navigation__list-item--mobile" data-id="about">About</li>
                <li class="navigation__list-item navigation__list-item--action navigation__list-item--mobile" data-id="action">Take action</li>
                <li class="navigation__list-item navigation__list-item--twitter navigation__list-item--mobile" data-id="twitter">Spread the word</li>
                <li class="navigation__list-item navigation__list-item--search navigation__list-item--mobile" data-id="search">Search</li>
            </ul>
        </div><!-- .mobile__menu -->

        <nav class="navigation">
            <ul class="navigation__list">
                <li class="navigation__list-item navigation__list-item--about" data-id="about">About</li>
                <li class="navigation__list-item navigation__list-item--action" data-id="action">Take action</li>
                <li class="navigation__list-item navigation__list-item--twitter" data-id="twitter">Spread the word</li>
                <li class="navigation__list-item navigation__list-item--search" data-id="search">
                    <img src="./img/search.svg" alt="Search icon" width="16">
                </li>
            </ul>
        </nav>

        <footer class="footer">
            <ul class="ranking-categories"></ul>
        </footer>

    </div><!-- .wrapper -->

    <article class="country-info"></article>

    <section class="twitter">
        <h3 class="twitter__title">Twitter #FreedomOfSpeech</h3>
        <ul class="twitter__tweets">
            ${tweets.statuses.map(tweet => `
                <li class="twitter__tweet">
                    <img class="twitter__user-avatar" src="${tweet.user.profile_image_url_https}" alt="Avatar">
                    <div class="twitter__content">
                        <a href="https://www.twitter.com/">${tweet.user.screen_name}</a>
                        <span class="twitter__username">${tweet.user.screen_name}</span>
                        <p class="twitter__text">${tweet.text}</p>
                    </div>
                </li>
            `)}
        </ul>
    </section>

    ${ footer }
`;

module.exports = main;