export function yandexMapInit() {

    ymaps.ready(init);

    function init() {
        // Создание карты.
        var myMap = new ymaps.Map("map", {
            // Координаты центра карты.
            // Порядок по умолчанию: «широта, долгота».
            // Чтобы не определять координаты центра карты вручную,
            // воспользуйтесь инструментом Определение координат.
            center: [55.766700936089045, 37.629685817382786],
            // Уровень масштабирования. Допустимые значения:
            // от 0 (весь мир) до 19.
            zoom: 13,
            controls: []
        }, {
            suppressMapOpenBlock: true
        });

        var myPlacemark = new ymaps.Placemark([55.76953456898229, 37.63998549999998], {}, {
            iconLayout: 'default#image',
            iconImageHref: 'images/pin.png',
            iconImageSize: [12, 12],
            iconImageOffset: [-3, -42]
        });
        myMap.geoObjects.add(myPlacemark);

        myMap.controls.add('zoomControl', {
            size: 'small',
            float: 'none',
            position: {
                top: '50px',
                right: '30px',
            }
        });
    }
    console.log('hello from yandex-map');
}