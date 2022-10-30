import { Block } from './Block';

export const renderDOM = (targetElementSelector: string, block: Block ) => {
    const root = document.querySelector(targetElementSelector);

    if (!root) {
        throw new Error(`Узел ${targetElementSelector} не найден!`);
    }

    root.appendChild(block.getContent());

    block.dispatchComponentDidMount();
}
