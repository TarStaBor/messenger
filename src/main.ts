import Handlebars from 'handlebars';

import * as Components from './components';
import * as Pages from './pages/index';

const pages: Record<string, [string, object?]>  = {
    'login': [ Pages.LoginPage, {test: '123'} ],
    'register': [ Pages.Register ],
    'chat': [ Pages.Chat ],
    'profile': [ Pages.Profile ],
    'errorPage404': [ Pages.ErrorPage, {ErrorPageNumber: '404', ErrorPageText: 'Не туда попали'} ],
    'errorPage500': [ Pages.ErrorPage, {ErrorPageNumber: '500', ErrorPageText: 'Мы уже фиксим'} ],
};

Object.entries(Components).forEach(([ name, component ]) => {
    Handlebars.registerPartial(name, <Handlebars.TemplateDelegate<any> | string>component);
    });

function navigate(page: string) {
    const [source, context] = pages[page];
    const container = document.getElementById('app')!;
    container.innerHTML = Handlebars.compile(source) (context);
}

document.addEventListener('DOMContentLoaded', () => navigate('login'));

document.addEventListener('click', e => {
//@ts-ignore
    const page = e.target.getAttribute('page');
    if (page) {
        navigate(page);

        e.preventDefault();
        e.stopImmediatePropagation();
    }
})