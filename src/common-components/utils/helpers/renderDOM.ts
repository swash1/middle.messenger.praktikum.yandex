import { Block } from './block';

export const render = (targetElementSelector: string, block: Block) => {
    const root = document.querySelector(targetElementSelector);

    if (!root) {
        throw new Error(`Узел ${targetElementSelector} не найден!`);
    }

    root.appendChild(block.getContent());

    block.dispatchComponentDidMount();

    return root;
}
