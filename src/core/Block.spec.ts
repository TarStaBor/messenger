import sinon from 'sinon';
import { expect } from 'chai';
import { describe } from 'mocha';
import Block, { CommonProps } from './Block';

interface ITestComponent extends CommonProps {
    spanText?: string;
    buttonText?: string;
}
class TestComponent extends Block<ITestComponent> {
    render() {
        return `
            <div>
                <p data-testid="test-span">{{spanText}}</p>
                <button data-testid="test-button" type="button">{{buttonText}}</button>
            </div>`;
    }
}

describe('Block tests', () => {
    const spanText = 'mock text';
    const buttonText = 'mock button text';
    let component: Block<ITestComponent>;

    beforeEach(() => {
        component = new TestComponent({
            spanText,
            buttonText,
        });
    });

    it('Должен создать компонент с состоянием из конструктора', () => {
        const text = component.element?.querySelector('[data-testid="test-span"]')?.textContent;

        expect(text).to.be.eq(spanText);
    });

    it('Компонент должен иметь реактивное поведение', () => {
        const newText = 'new text';

        component.setProps({ spanText: newText });

        const text = component.element?.querySelector('[data-testid="test-span"]')?.textContent;
        expect(text).to.be.eq(newText);
    });

    it('Компонент должен установить события на элемент', () => {
        const clickHandlerStub = sinon.stub();
        const componentWithStub = new TestComponent({
            events: {
                click: clickHandlerStub,
            },
        });

        const event = new MouseEvent('click');
        componentWithStub.element?.dispatchEvent(event);

        expect(clickHandlerStub.calledOnce).to.be.true;
    });

    it('Компонент должен вызвать dispatchComponentDidMount метод', () => {
        const clock = sinon.useFakeTimers();
        // @ts-expect-error element is private
        const spyCDM = sinon.spy(component, 'componentDidMount');

        const element = component.getContent();
        document.body.append(element!);
        clock.next();

        expect(spyCDM.calledOnce).to.be.true;
    });

    it('Компонент должен скрывать элемент при вызове метода hide', () => {
        component.hide();

        const element = component.element;
        expect(element?.style.display).to.be.eq('none');
    });
});
