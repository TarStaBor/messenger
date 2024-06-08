import Block, { CommonProps } from '../core/Block';

export function render(query: string, component: Block<CommonProps>) {
    const root = document.querySelector(query);
    if (!root) {
        throw new Error('No root element');
    }

    root.innerHTML = '';
    root.append(component.getContent() || '');

    return root;
}
