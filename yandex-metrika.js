// Яндекс.Метрика для водоканал48.рф
(function() {
    if (location.protocol === 'file:') {
        return;
    }

    const counterId = (typeof SITE_CONFIG !== 'undefined' && SITE_CONFIG.yandexMetrikaId) || '110566718';

    (function(m,e,t,r,i,k,a){
        m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();
        for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
    })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=' + counterId, 'ym');

    ym(counterId, 'init', {
        ssr: true,
        webvisor: true,
        clickmap: true,
        ecommerce: "dataLayer",
        accurateTrackBounce: true,
        trackLinks: true
    });

    window.ymCounterId = counterId;
})();
