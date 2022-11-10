import 'jsdom-global/register';
import chai from 'chai';
import chaiDom from 'chai-dom';

import { Block, BlockProps } from '../Block';

chai.use(chaiDom);

const emptyProps: BlockProps = {};
const propsWithAttribute: BlockProps = {
    attributes: {
        class: 'className',
    },
};
const propsWithTemplate: BlockProps = {
    contentTemplate: '<div>Template</div>',
};

describe('Компонент', () => {
    const createBlock = (props: BlockProps) => {
        return new Block(props);
    };

    it('При пустых пропсах создается div', () => {
        const block = createBlock(emptyProps);

        chai.expect(block.getContent()).to.have.tagName('div');
    });

    it('Навешиваются атрибуты', () => {
        const block = createBlock(propsWithAttribute);

        chai.expect(block.getContent()).to.have.attribute('class', 'className');
    });

    it('Рендерится шаблон', async () => {
        const block = await createBlock(propsWithTemplate);

        chai.expect(block.getContent()).to.have.html('<div>Template</div>');
    });

    it('Рендерится шаблон с компонентом-чилдом', async () => {
        const block = await createBlock(propsWithTemplate);

        const targetBlock = await createBlock({
            contentTemplate: '{{{block}}}',
            propsAndChildren: { block },
        });

        chai.expect(targetBlock.getContent()).to.have.html('<div><div>Template</div></div>');
    });

    it('Меняются пропсы', async () => {
        const block = await createBlock({
            contentTemplate: '{{number}}',
            propsAndChildren: { number: 1 },
        });

        await block.setProps({ number: 2 });

        chai.expect(block.getContent()).to.have.html('2');
    });

    it('Добавляются ивенты', async () => {
        const block = await createBlock({
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            events: [['click', () => {}]],
        });

        chai.expect(block.getEvents().length).to.eq(1);
    });

    it('Можно получить атрибут', async () => {
        const block = await createBlock(propsWithAttribute);

        chai.expect(block.getAttribute('class')).to.eq('className');
    });
});
