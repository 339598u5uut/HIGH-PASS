import 'just-validate/dist/js/just-validate.min.js'



export function jvRequire() {
    new window.JustValidate('.js-form', {
        colorWrong: '#F06666',
        rules: {
            name: {
                required: true,
                minLength: 2,
                maxLength: 30
            },
            email: {
                required: true,
                email: true
            }
        },
        messages: {
            name: {
                minLength: 'Необходимо ввести не менее 2 символов',
                required: 'Необходимо ввести имя'
            },
            email: 'Недопустимый формат'
        }
    });

    new window.JustValidate('.section-about__form', {
        colorWrong: '#F06666',
        rules: {
            email: {
                required: true,
                email: true
            }
        },
        messages: {
            email: 'Недопустимый формат'
        }
    })
}