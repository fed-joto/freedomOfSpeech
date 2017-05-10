<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<title>Freedom Of Speech</title>
		<link rel="stylesheet" href="assets/dist/index.css">
	</head>
	<body>
		<div class="search-box">
			<input type="text" placeholder="Search for a country...">
			<div class="search-result">
				<ul class="search-box__autocomplete"></ul>
			</div>
		</div>
		<aside class="about">
			<h3 class="about__title">About</h3>
			<p class="about__text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam atque magnam eveniet consequatur quidem magni iusto nostrum sapiente, beatae tempore, repellendus in rerum odit. Quas, reprehenderit adipisci autem tenetur quaerat aperiam harum. Blanditiis alias voluptatibus pariatur aliquam ex dolores, ut ipsa quidem qui totam illo saepe, earum ducimus atque eum! Explicabo magni nisi fuga maiores velit eos omnis consequatur consectetur laboriosam. Odit, libero qui, culpa porro recusandae quae, laboriosam voluptates adipisci ab doloremque quod quas nesciunt rem nostrum at earum natus pariatur placeat quaerat possimus sequi hic ea reprehenderit! Illo facere, doloremque. Nam quam cupiditate enim, libero facere, laboriosam architecto.</p>
		</aside>
		<aside class="take-action">
			<div class="take-action__action">
				<img src="" alt="" class="take-action__icon">
				<h3 class="take-action__title">Share</h3>
				<p class="take-action__text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident labore id quia officia illo optio similique pariatur maiores, eum dolores alias, assumenda, vero velit rerum. Eaque eveniet perferendis quo iste.</p>
				<button class="cta">Lorem.</button>
			</div>
			<div class="take-action__action">
				<img src="" alt="" class="take-action__icon">
				<h3 class="take-action__title">Donate</h3>
				<p class="take-action__text">Aliquam sit vero illo autem eaque hic quam id, perferendis quo, ipsa non, voluptatem sint voluptas minima ex ipsum error voluptatibus laudantium beatae modi aperiam. Nesciunt, corrupti assumenda! Earum, nostrum.</p>
				<button class="cta">Facilis!</button>
			</div>
			<div class="take-action__action">
				<img src="" alt="" class="take-action__icon">
				<h3 class="take-action__title">Newsletter</h3>
				<p class="take-action__text">Cupiditate magni incidunt vel nemo itaque quo sapiente commodi ipsam. Quas explicabo harum est quia obcaecati, distinctio, itaque quo neque aspernatur iste labore, voluptatem voluptate debitis sequi perspiciatis, possimus sint.</p>
				<button class="cta">Assumenda.</button>
			</div>
		</aside>
		<div class="wrapper">
			<header class="header">
				<h1 class="header__logo">LOGO</h1>
				<nav class="navigation">
					<ul class="navigation__list">
						<li class="navigation__list-item navigation__list-item--about">About</li>
						<li class="navigation__list-item navigation__list-item--action">Take action</li>
						<li class="navigation__list-item">Spread the word</li>
						<li class="navigation__list-item navigation__list-item--search"><img src="assets/img/search.svg" alt="Search icon" width="20"></li>
					</ul>
				</nav>
			</header>
			<article class="country-info">
				<span class="country-info__ranking-number"></span>
				<h2 class="country-info__title"></h2>
				<p class="country-info__score"></p>
				<p class="country-info__progression"></p>
				<p class="country-info__rank2015"></p>
				<p class="country-info__score2015"></p>
				<!-- <button class="cta">Call to action</button> -->
			</article>

			<main class="map">
				<?php include 'assets/img/world-map-1.svg' ?>
			</main>

			<section class="twitter">
				<h3 class="twitter__title">#Twitter</h3>
				<ul class="twitter__tweets">
					<li class="twitter__tweet">
						<img src="" alt="" class="twitter__user-avatar">
						<p class="twitter__text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum voluptate qui, distinctio iure sapiente natus aspernatur nam aliquid perspiciatis labore.</p>
						<span class="twitter__username">@username</span>
					</li>
				</ul>
			</section>

			<footer class="footer">
				<ul class="ranking-categories">
					<li class="ranking-categories__item">Lorem</li>
					<li class="ranking-categories__item">Voluptate</li>
					<li class="ranking-categories__item">Voluptates</li>
					<li class="ranking-categories__item">Laborum</li>
					<li class="ranking-categories__item">Quibusdam</li>
				</ul>
			</footer>
		</div>
		<script
  			src="https://code.jquery.com/jquery-3.2.1.min.js"
  			integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="
  			crossorigin="anonymous">
		</script>
  		<script src="https://cdn.jsdelivr.net/algoliasearch/3/algoliasearchLite.min.js"></script>
		<script src="assets/js/index.js"></script>
	</body>
</html>