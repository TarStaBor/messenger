import sinon from 'sinon';
import { expect } from 'chai';
import { beforeEach } from 'mocha';
import Block, { CommonProps } from './Block.ts';
import store from './store.ts';
import Router from './Router.ts';

class TestPageClass extends Block<CommonProps> {
    render() {
        return '<div>Page</div>';
    }
}

describe('Router tests', () => {
    let router: Router;

    beforeEach(() => {
        router = new Router('#app', store);
        router.use('/', TestPageClass).use('/testPage', TestPageClass).start();
    });

    it('Первоначальная инициализация срабатывает', () => {
        expect(window.location.pathname).to.eq('/');
    });

    it('Метод "router.go" должен работать', () => {
        router.go('/testPage');

        expect(window.location.pathname).to.eq('/testPage');
    });

    it('Метод "router.forward" должен работать', () => {
        // @ts-expect-error history is private
        const historyForwardStub = sinon.stub(router.history, 'forward');

        router.forward();
        expect(historyForwardStub.called).to.be.true;
        historyForwardStub.restore();
    });

    it('Метод "router.back" должен работать', () => {
        // @ts-expect-error back is private
        const historyForwardStub = sinon.stub(router.history, 'back');

        router.back();
        expect(historyForwardStub.calledOnce).to.be.true;
        historyForwardStub.restore();
    });
});
